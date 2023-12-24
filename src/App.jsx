import './assets/App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Marked } from './views/Marked'
import { PalleteIndex } from './views/PalleteIndex'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { UserMsg } from './cmps/UserMsg'

export function App() {
  return (
    <main className='app-container'>
      <Router>
        <AppHeader />
        <Routes>
          <Route path='/' element={<PalleteIndex />} />
          <Route path='/marked' element={<Marked />} />
        </Routes>
        <AppFooter />
        <UserMsg />
      </Router>
    </main>
  )
}
