import { PalletePreview } from './PalletePreview.jsx'

export function PalleteList({ visiblePalletes, onToggleMarked }) {
  return (
    <div className='pallete-list'>
      {visiblePalletes.map((pallete) => (
        <article key={pallete._id}>
          <PalletePreview onToggleMarked={onToggleMarked} pallete={pallete} />
        </article>
      ))}
    </div>
  )
}
