import { useState, useEffect } from 'react'
import { palleteService } from '../services/pallete.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { PalleteList } from '../cmps/PalleteList'
import { PalleteFilter } from '../cmps/PalleteFilter'

export function PalleteIndex() {
  const [palletes, setPalletes] = useState([])
  const [visiblePalletes, setVisiblePalletes] = useState([])
  const [currentIdx, setCurrentIdx] = useState(0)
  const [loading, setLoading] = useState(true)
  const [filterBy, setFilterBy] = useState('random')

  const photosPerPage = 12

  useEffect(() => {
    setLoading(true)
    palleteService
      .query(filterBy)
      .then((fetchedPalletes) => {
        setPalletes(fetchedPalletes)
        setVisiblePalletes(fetchedPalletes.slice(0, photosPerPage))
        setCurrentIdx(photosPerPage)
        setLoading(false)
      })
      .catch((err) => {
        console.error('Fetching failed', err)
        showErrorMsg('Fetching failed')
        setLoading(false)
      })
  }, [filterBy])

  function loadMore() {
    const nextIdx = currentIdx + photosPerPage
    const nextPalletes = palletes.slice(currentIdx, nextIdx)
    setVisiblePalletes((prevPalletes) => [...prevPalletes, ...nextPalletes])
    setCurrentIdx(nextIdx)
  }

  function onSetFilterBy(filterBy) {
    setFilterBy(filterBy)
  }

  function onToggleMarked(pallete) {
    pallete.isMarked = !pallete.isMarked
    palleteService
      .save(pallete)
      .then(() => {
        // console.log(`Saved to ${pallete.isMarked ? 'marked' : 'unmarked'}`)
        showSuccessMsg(`Action saved`)
      })
      .catch((err) => {
        console.error('Failed to save', err)
        showErrorMsg('Failed to save')
      })
  }

  return (
    <section className='pallete-index'>
      <div className='pallete-intro'>
        <h1>Color Your World With Palette Quest </h1>
        <span className='tagline'>
          <i className='tag fa-solid fa-magnifying-glass'></i> Find Your Image
        </span>
        <span className='tagline'>
          <i className='tag fa-solid fa-copy'></i> Copy Colors
        </span>
        <span className='tagline'>
          <i className='tag fa-solid fa-marker'></i> Mark Your Favorites
        </span>
      </div>
      <div className='pallete-filter-container'>
        <PalleteFilter onSetFilterBy={onSetFilterBy} />
      </div>
      <div className='pallete-container'>
        {loading && <div className='loader'>Loading ...</div>}
        {!loading && (
          <PalleteList onToggleMarked={onToggleMarked} visiblePalletes={visiblePalletes} />
        )}
        <button onClick={loadMore} className='load-more'>
          Load more
        </button>
      </div>
    </section>
  )
}
