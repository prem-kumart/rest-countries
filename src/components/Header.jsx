import { NavLink } from "react-router"


const Header = ({theme,setTheme}) => {

  return (
    <header className="flex flex-row justify-between background-primary px-4 sm:px-20 py-6 shadow-lg font-Nunito-sans">
         <NavLink to="/rest-countries" >
             <h1 className="text-primary font-extrabold text-sm sm:text-2xl">Where in the world?</h1>
        </NavLink>
        <div className="flex flex-row gap-2 items-center cursor-pointer" onClick={()=>setTheme((theme)=> theme === 'light' ? 'dark' : 'light')}>
            <img  className="h-4 w-4 lg:h-5 lg:w-5 " src={`${theme=='light' ? "../assets/moon-svgrepo-com.svg" : "../assets/light-svgrepo-com.svg" }`} alt="moon icon" />
            <p className="text-primary">{theme=="light" ? "Dark"  : "Light" }</p>
      
        </div>
    </header>
  )
}

export default Header
