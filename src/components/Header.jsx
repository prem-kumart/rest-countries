


const Header = ({setTheme}) => {
  return (
    <header className="flex flex-row justify-between background-primary px-4 sm:px-20 py-6 shadow-lg font-Nunito-sans">
        <h1 className="text-primary font-extrabold text-sm sm:text-2xl">Where in the world?</h1>
        <div className="flex flex-row gap-2 items-center cursor-pointer" onClick={()=>setTheme((theme)=> theme === 'light' ? 'dark' : 'light')}>
            <img className="h-4 w-4 lg:h-5 lg:w-5" src="./assets/moon-svgrepo-com.svg" alt="moon icon" />
            <p className="text-primary">Dark Mode</p>
        </div>
    </header>
  )
}

export default Header
