
import './App.css'
import Main from './components/Main.jsx'
import { BrowserRouter,Routes, Route } from 'react-router'
import CountryDetailed from './components/CountryDetailed.jsx'
import NotFound from './components/NotFound.jsx'

function App() {
  
  return (
    <>
      <BrowserRouter>
         <Routes>
             <Route path="/" element={<Main />} />
             <Route path='/:country' element={<CountryDetailed />} />
             <Route path='*' element={<NotFound />} />
         </Routes>
      </BrowserRouter>
        
    </>
  )
}

export default App
