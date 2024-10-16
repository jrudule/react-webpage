import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ButtonUsage from './Header.jsx'
import Footer from './Footer.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ButtonUsage />
      <Footer />
  </StrictMode>,
)
