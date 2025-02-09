import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import Sums from './useMemo/Sums.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Sums />
  </StrictMode>,
)
