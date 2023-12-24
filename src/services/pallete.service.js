import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

const PEXELS_API_KEY = '6LRgIOdlxhoOECNKAhde9BvfRhTD5tcdYwKMmXiSdZDHTPRkbBhvRj6i'
const STORAGE_PALLETES_KEY = 'palleteDB'

const categories = [
  'Nature',
  'Wildlife',
  'Architecture',
  'Travel',
  'Technology',
  'Food',
  'Drink',
  'People',
  'Lifestyle',
  'Abstract',
  'Seasonal',
]

export const palleteService = {
  query,
  get,
  getMarked,
  remove,
  save,
  getDefaultFilter,
  getEmptyPallete,
  getCategoryList,
}

function query(searchTerm) {
  return new Promise((resolve, reject) => {
    let storedPalletes = utilService.loadFromStorage(STORAGE_PALLETES_KEY) || {}

    if (storedPalletes[searchTerm]) {
      // console.log('returning from storage')
      resolve(storedPalletes[searchTerm])
    } else {
      _fetchPalletes(searchTerm)
        .then((palletes) => {
          storedPalletes[searchTerm] = palletes
          utilService.saveToStorage(STORAGE_PALLETES_KEY, storedPalletes)
          // console.log('returning from fetching')
          resolve(palletes)
        })
        .catch(reject)
    }
  })
}

function _fetchPalletes(searchTerm) {
  const url = `https://api.pexels.com/v1/search?query=${searchTerm}&per_page=30`
  const headers = {
    Authorization: PEXELS_API_KEY,
  }

  return fetch(url, { headers })
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      const promiseArray = data.photos.map((photo) => {
        return utilService.toDataURL(photo.src.medium).then((dataUrl) => {
          return {
            _id: photo.id,
            category: searchTerm,
            thumbnail: dataUrl,
            isMarked: false,
          }
        })
      })

      return Promise.all(promiseArray)
    })
}

function get(palleteId) {
  return storageService.get(STORAGE_PALLETES_KEY, palleteId).then(_setNextPrevPalleteId)
}

function getMarked() {
  const categorizedPalletes = utilService.loadFromStorage(STORAGE_PALLETES_KEY) || {}
  let markedPalletes = []

  Object.keys(categorizedPalletes).forEach((category) => {
    const markedFromCategory = categorizedPalletes[category].filter((pallete) => pallete.isMarked)
    markedPalletes = [...markedPalletes, ...markedFromCategory]
  })
  return Promise.resolve(markedPalletes)
}

function remove(palleteId) {
  return storageService.remove(STORAGE_PALLETES_KEY, palleteId)
}

function save(pallete) {
  let storedPalletes = utilService.loadFromStorage(STORAGE_PALLETES_KEY) || {}
  const searchTerm = pallete.category

  const indexToUpdate = storedPalletes[searchTerm].findIndex((p) => p._id === pallete._id)
  if (indexToUpdate > -1) {
    storedPalletes[searchTerm][indexToUpdate] = pallete
    utilService.saveToStorage(STORAGE_PALLETES_KEY, storedPalletes)
  }
  return Promise.resolve()
}

function getEmptyPallete(title = '', category = '', thumbnail = '') {
  return { title, category, thumbnail }
}

function getDefaultFilter() {
  return {
    txt: '',
    category: 'random',
  }
}

function getCategoryList() {
  return categories
}
