import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faAngleDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from 'react'
import Country from './Country.jsx'
import Header from './Header.jsx'


const Main = ({theme,setTheme}) => {

  const [searchQuery,setSearchQuery] = useState('');
  const [countries,setCountries] =  useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [regionFilter,setRegionFilter] = useState('');
 
  const allCountries = useRef([]);
  


  // On Initial mount fetching all the countries data and caching it in allCountries using useRef hook.
  useEffect(function(){

    async function fetchData() {
        try {
            setIsLoading(true)
            // setError({})
            const response = await fetch(`https://restcountries.com/v3.1/all`);
            if(!response.ok){
                
              throw new Error(`Http Error: ${response.status}`)
            }
            const jsonData = await response.json();
            //console.log(jsonData)
            
            allCountries.current = jsonData
            setCountries(allCountries.current);
            setIsLoading(false)
         
        } 
        catch(e){
              setIsLoading(false)
              
              setError(e.message)
        }
    }

    fetchData();

  },[])


  //OnSearch for a country
  function onInput(event){
      
       console.log(event.target.value)
       setSearchQuery(event.target.value);
       if(event.target.value == ""){
         setCountries(allCountries.current);
         return;
       }
       
       const newCountryList = allCountries.current.filter((country)=>{
                 if(country.name.common.toLowerCase().includes(event.target.value.toLowerCase().trim()) ){
                   return country
                 }
       })
       setCountries(newCountryList)

       
  }

  function onRegionFilterChange(event){
       console.log(event.target.value);

       setRegionFilter(event.target.value);
       const newCountryList = allCountries.current.filter((country)=>{
             
               if(country.region.toLowerCase().includes(event.target.value.toLowerCase())){
                 return country
               }
       })
       setCountries(newCountryList);
  }
 
  return (
 
    <>
    <Header theme={theme} setTheme={setTheme} />
    <main className="flex flex-col gap-12 background-secondary w-screen h-screen  pt-12  px-4 lg:px-20 font-Nunito-sans overflow-y-auto text-primary">
       <section className=' flex flex-col lg:flex-row  gap-10 lg:justify-between'>
          <div className='flex flex-row items-center w-full gap-6 rounded-sm background-primary  shadow-lg px-3.5 lg:px-5 py-4 lg:w-max-[200px]'>
            <FontAwesomeIcon icon={faMagnifyingGlass}  className='text-primary'/>
            <label > 
                <input className={`${theme =='light' ? "text-Dark-Gray" : "text-white" }`} type="text" name="country"  value={searchQuery} placeholder='Search for a country...' onChange={onInput}/>
            </label>
          </div>
           <div className='self-start background-primary shadow-lg rounded-[5px] flex flex-row items-center gap-2.5'>
                <select id='region'  value={regionFilter}  onChange={onRegionFilterChange} className=" background-primary py-3.5 lg:py-4 px-10">
                      <option value="Africa">Africa </option>
                      <option value="America">America</option>
                      <option value="Asia">Asia</option>
                      <option value="Europe">Europe</option>
                      <option value="Oceania">Oceania</option>
                      <option  value="">Filter by Region</option>
              </select> 
              {/* <FontAwesomeIcon icon={faAngleDown} className='w-[10px] h-[10px] pointer-events-none'/> */}
          </div>
       </section>
       <section className='flex flex-row flex-wrap justify-center items-center gap-18'>
           { isLoading && <p>Loading Countries...</p>}
           {
             error != 0  && <p className='text-red-800'>{error}</p>
           } 
           { countries && countries.map((countryData,index)=>{
               return <Country key={index} data={countryData}/>
           })}
       </section>
    </main>
    </>
  )
}

export default Main
