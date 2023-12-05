import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

import App from './App.jsx'
import SearchCities from './pages/SearchCities'
import SavedCities from './pages/SavedCities'


ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)