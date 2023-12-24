import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service'
import { extractColors } from 'extract-colors'
import { useEffect, useState } from 'react'

export function PalletePreview({ pallete, onToggleMarked }) {
  const [colors, setColors] = useState([])
  const [isHover, setIsHover] = useState(false)

  useEffect(() => {
    extractColors(pallete.thumbnail).then((colors) => {
      const limitedColors = colors.slice(0, 5)
      setColors(limitedColors)
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

  return (
    <div
      style={pallete.isMarked ? { border: '1px solid white' } : {}}
      onMouseLeave={() => setIsHover(false)}
      onMouseEnter={() => setIsHover(true)}
      className='pallete-preview'>
      <p
        style={isHover ? { opacity: '1' } : { opacity: '0' }}
        onClick={() => onToggleMarked(pallete)}
        className='toggle-pallete'>
        {pallete.isMarked ? (
          <>
            <i className='tag remove fa-solid fa-xmark'></i> Remove
          </>
        ) : (
          <>
            <i className='tag add fa-solid fa-plus'></i> Add
          </>
        )}
      </p>
      <img src={pallete.thumbnail} alt={pallete.name} />
      <div className='color-container'>
        {colors.map((color, index) => (
          <div
            onClick={() => copyToClipboard(color.hex)}
            className='color'
            key={index}
            style={{
              backgroundColor: color.hex,
              cursor: 'pointer',
              width: '30px',
              height: '30px',
              transition: 'all 0.1s ease-in-out',
            }}></div>
        ))}
      </div>
    </div>
  )
}
