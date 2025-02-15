
import './App.css'
import Main from './components/Main.jsx'
import {useState} from 'react'
import { BrowserRouter,Routes, Route } from 'react-router'
import CountryDetailed from './components/CountryDetailed.jsx'
import NotFound from './components/NotFound.jsx'

function App() {
  const [theme,setTheme] = useState('light');

  return (
    <div className={`${theme} w-full h-full`}>
      <BrowserRouter>
         <Routes>
             <Route path="/" element={<Main  setTheme={setTheme}/>} />
             <Route path='/:country' element={<CountryDetailed setTheme={setTheme} />} />
             <Route path='*' element={<NotFound />} />
         </Routes>
      </BrowserRouter>
        
    </div>
  )
}

export default App
