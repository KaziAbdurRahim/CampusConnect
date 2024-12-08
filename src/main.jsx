import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import TimetableApp from './TimetableApp.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <TimetableApp></TimetableApp>
  </StrictMode>,
)
