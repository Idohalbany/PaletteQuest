import { NavLink } from 'react-router-dom'

export function AppHeader() {
  return (
    <header className='app-header'>
      <h1>
        <i className='fa-solid fa-p'></i>
        <span> </span>
        <i className='fa-solid fa-q'></i>
      </h1>
      <nav className='nav-bar'>
        <NavLink to='/'>Palettes</NavLink>
        <NavLink to='/marked'>Marked</NavLink>
      </nav>
    </header>
  )
}
