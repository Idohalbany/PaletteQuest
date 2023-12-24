import { useState, useEffect, useRef } from 'react'
import { palleteService } from '../services/pallete.service'

// make a filter by the categories of the palletes from the service and pass it to the filter component.
// map over the categories and display them as buttons in the filter component.
// when clicking on a category button.
// set the filterBy state to the category name and set the filter by on the palleteindex component to update his state.
// make a search by name input and pass it to the filter component.
// when submit on the input, set the filterBy state to the input value.

export function PalleteFilter({ onSetFilterBy }) {
  const [categories, setCategories] = useState([])
  const searchInputRef = useRef(null)

  useEffect(() => {
    const fetchedCategories = palleteService.getCategoryList()
    setCategories(fetchedCategories)
  }, [])

  function handleFilter(ev, localFilterBy) {
    ev.preventDefault()
    onSetFilterBy(localFilterBy)
  }

  return (
    <section className='filter-component'>
      <form>
        <input type='text' ref={searchInputRef} placeholder='Search Category' />
        <button type='submit' onClick={(ev) => handleFilter(ev, searchInputRef.current.value)}>
          Search
        </button>
      </form>
      <div className='filter-btns'>
        {categories.map((category, index) => (
          <button className='category-btn' key={index} onClick={(ev) => handleFilter(ev, category)}>
            {category}
          </button>
        ))}
      </div>
    </section>
  )
}
