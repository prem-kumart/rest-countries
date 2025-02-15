import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { faAngleDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { useEffect, useState, useRef } from 'react'
import Country from './Country.jsx'
import Header from './Header.jsx'


const Main = () => {

  const [searchQuery,setSearchQuery] = useState('');
  const [countries,setCountries] =  useState([]);
  const [isLoading,setIsLoading] = useState(false);
  // const [Error, setError] = useState('');
  const [regionFilter,setRegionFilter] = useState('');
 
  const allCountries = useRef([]);
  


  // On Initial mount fetching all the countries data and caching it in allCountries using useRef hook.
  useEffect(function(){

    async function fetchData() {
        try {
            setIsLoading(true)
            // setError({})
            const response = await fetch(`https://restcountries.com/v3.1/all`);
            console.log(response);
            if(!response.ok){
                throw new Error(JSON.stringify({status:response.status , message: response.message}))
            }
            const jsonData = await response.json();
            console.log(jsonData)
            
            allCountries.current = jsonData
            setCountries(allCountries.current);
            setIsLoading(false)
         
        } 
        catch(error){
              const errorData = JSON.parse(error.message);
              // setError(errorData);   
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
    <Header />
    <main className="flex flex-col gap-12 bg-Very-Light-Gray w-screen h-screen  pt-12  px-4 lg:px-20 font-Nunito-sans overflow-y-autos">
       <section className=' flex flex-col lg:flex-row gap-10 lg:justify-between'>
          <div className='flex flex-row items-center w-full gap-6 rounded-sm bg-white shadow-lg px-3.5 lg:px-5 py-4 lg:w-max-[200px]'>
            <FontAwesomeIcon icon={faMagnifyingGlass}  className='text-Dark-Gray'/>
            <label> 
                <input type="text" name="country"  value={searchQuery} placeholder='Search for a country...' onChange={onInput}/>
            </label>
          </div>
           <div className='bg-white w-[50%]  shadow-lg rounded-[5px] '>
           <label className='flex flex-row gap-16 pl-6 pr-5 justify-between items-center' htmlFor='region'>
                <select id='region'  value={regionFilter}  onChange={onRegionFilterChange} className="appearance-none font-Nunito-sans  bg-white py-3.5 lg:py-4 ">
                      <option className="bg-white" value="Africa">Africa </option>
                      <option value="America">America</option>
                      <option value="Asia">Asia</option>
                      <option value="Europe">Europe</option>
                      <option value="Oceania">Oceania</option>
                      <option  value="">Filter by Region</option>
              </select> 
              <FontAwesomeIcon icon={faAngleDown} className='w-[10px] h-[10px] pointer-events-none'/>
            </label>
          </div>
       </section>
       <section className='flex flex-row flex-wrap justify-center items-center gap-18'>
           { isLoading && <p>Loading Countries...</p>}
           {/* {
             Error && <p className='text-red-50'>{`${Error.status}`}</p>
           } */}
           { countries && countries.map((countryData,index)=>{
               return <Country key={index} data={countryData}/>
           })}
       </section>
    </main>
    </>
  )
}

export default Main
