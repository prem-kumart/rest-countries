import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faAngleDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from 'react'
import Country from './Country.jsx'
import Header from './Header.jsx'
import CustomSelect from './CustomSelect.jsx'

const regionFilters = ['Africa','America','Asia','Europe','Oceania']


const Main = ({theme,setTheme}) => {

  const [searchQuery,setSearchQuery] = useState('');
  const [countries,setCountries] =  useState([]);
  const [isLoading,setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [regionFilter,setRegionFilter] = useState('');
 
  const allCountries = useRef([]);
  
  const dropDownRef = useRef(null);


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
       setRegionFilter(event.target.innerText);
       const newCountryList = allCountries.current.filter((country)=>{
             
               if(country.region.toLowerCase().includes(event.target.innerText.toLowerCase())){
                 return country
               }
       })
       setCountries(newCountryList);
        toggleDropDownList();
  }

  function toggleDropDownList(){ 
    const dropDown = dropDownRef.current.nextElementSibling;
    dropDown.classList.toggle('hide-dropdown');
  }

  return (
    <>
    <Header theme={theme} setTheme={setTheme} />
    <main className="flex flex-col gap-12 background-secondary w-screen h-screen  pt-12  px-4 lg:px-20 font-Nunito-sans overflow-y-auto text-primary">
       <section className=' flex flex-col sm:flex-row gap-10  sm:h-[56px] sm:items-center lg:justify-between'>
          <div className='flex flex-row items-center max-w-[480px] w-full  gap-6 rounded-sm background-primary  shadow-lg px-3.5 lg:px-5 py-4 lg:w-max-[200px]'>
            <FontAwesomeIcon icon={faMagnifyingGlass}  className='text-primary'/>
            <label > 
                <input className={`${theme =='light' ? "text-Dark-Gray" : "text-white" }`} type="text" name="country"  value={searchQuery} placeholder='Search for a country...' onChange={onInput}/>
            </label>
          </div>
       {/*-- Custom Dropdown Structure */}
       <CustomSelect regionFilters={regionFilters} onRegionFilterChange={onRegionFilterChange} dropDownRef={dropDownRef} toggleDropDownList={toggleDropDownList} theme={theme} regionFilter={regionFilter}/>

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
