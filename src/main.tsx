import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/global.css'
import Landing from './components/landing/Landing'
import Studio from './components/studio/Studio'

// basename берётся из base сборки (для GitHub Pages — "/1"), локально — "/".
const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'

const router = createBrowserRouter(
  [
    { path: '/', element: <Landing /> },
    { path: '/studio', element: <Studio /> },
  ],
  { basename },
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
