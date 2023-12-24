// Add all rights reserved to the footer with the current year and icon
// Add a created by "Ido Halbany"
// Add "Images from Pexels.com" with a link to the website "https://www.pexels.com/"
// Add a div to the icons with a class of "social-icons"
// Add three icons from fontawesome.com to GitHub, LinkedIn, and Phone
// import fontawesome from '@fortawesome/fontawesome'

export function AppFooter() {
  return (
    <footer className='app-footer'>
      <div className='footer-container'>
        <div className='footer-left'>
          <p>
            © 2023 All rights reserved <span> |</span>
          </p>
          <p>
            Created by Ido Halbany <span> |</span>
          </p>
          <p>
            Images from <a href='https://www.pexels.com/'>Pexels.com</a>
          </p>
        </div>
        <div className='footer-right'>
          <div className='social-icons'>
            <a href='https://github.com/Idohalbany'>
              <i className='fab fa-github'></i>
            </a>
            <a href='https://www.linkedin.com/in/ido-halbany-3bb183290/'>
              <i className='fab fa-linkedin'></i>
            </a>
            <a href='tel:054-227-4855'>
              <i className='fas fa-phone'></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
