import { palleteService } from '../services/pallete.service'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { useEffect, useState } from 'react'
import { extractColors } from 'extract-colors'

export function Marked() {
  const [markedPalletes, setMarkedPalletes] = useState([])
  const [loading, setLoading] = useState(true)
  const [colors, setColors] = useState([])
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    setLoading(true)
    palleteService.getMarked().then((markedPalletes) => {
      setMarkedPalletes(markedPalletes)
      markedPalletes.map((pallete) => {
        extractColors(pallete.thumbnail).then((extractedColors) => {
          const limitedColors = extractedColors.slice(0, 5)
          setColors(limitedColors)
        })
      })
      setLoading(false)
    })
  }, [])

  function copyToClipboard(txt) {
    navigator.clipboard
      .writeText(txt)
      .then(() => {
        showSuccessMsg('Copied to clipboard')
      })
      .catch((err) => {
        console.error('Failed to copy', err)
        showErrorMsg('Failed to copy')
      })
  }

  function onToggleMarked(pallete) {
    pallete.isMarked = !pallete.isMarked
    palleteService
      .save(pallete)
      .then(() => {
        setMarkedPalletes((prevPallete) => prevPallete.filter((p) => p._id !== pallete._id))
        // console.log(`Saved to ${pallete.isMarked ? 'marked' : 'unmarked'}`)
        showSuccessMsg(`Action saved`)
      })
      .catch((err) => {
        console.error('Failed to save', err)
        showErrorMsg('Failed to save')
      })
  }

  if (!markedPalletes || !markedPalletes.length)
    return <h1 className='no-marked'>No marked palletes yet</h1>

  return (
    <section className='marked'>
      <h1>Marked</h1>
      {loading && <h1>Loading...</h1>}
      {!loading && (
        <div
          onMouseLeave={() => setIsHover(false)}
          onMouseEnter={() => setIsHover(true)}
          className='marked-container'>
          {markedPalletes.map((pallete) => (
            <article key={pallete._id}>
              <p
                style={isHover ? { opacity: '1' } : { opacity: '0' }}
                onClick={() => onToggleMarked(pallete)}>
                <i className='tag remove fa-solid fa-trash'></i> Remove
              </p>
              <img src={pallete.thumbnail} alt={pallete.name} />
              <div className='color-container'>
                {colors.map((color, index) => (
                  <div
                    className='color'
                    key={index}
                    onClick={() => copyToClipboard(color.hex)}
                    style={{
                      backgroundColor: color.hex,
                      cursor: 'pointer',
                      width: '30px',
                      height: '30px',
                    }}></div>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
