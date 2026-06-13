import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './styles/global.css'
import Landing from './components/landing/Landing'
import Studio from './components/studio/Studio'

const router = createBrowserRouter([
  { path: '/', element: <Landing /> },
  { path: '/studio', element: <Studio /> },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
