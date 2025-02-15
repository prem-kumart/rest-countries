import Header from './Header.jsx'
import { useParams,NavLink } from 'react-router'
import { useEffect,useRef,useState } from 'react';
import BorderButton from './Border.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

const CountryDetailed = () => {

  const [borderCountries,setBorderCountries] = useState([ ])
  const [isLoading,setIsLoading] = useState(false);
  const [Error, setError] = useState({});
  const params = useParams();
  const country = useRef('')

  useEffect(function(){

    async function fetchData() {

      try {
          setIsLoading(true)
          setError({})
          const response = await fetch(`https://restcountries.com/v3.1/name/${params.country}?fullText=true`);
          if(!response.ok){
              throw new Error(JSON.stringify({status:response.status , message: response.message}))
          }
          const jsonData = await response.json();
          //console.log(jsonData)
          country.current = jsonData[0]
          //console.log(country.current.borders)
          //console.log(Object.values(country.current.currencies))
         //console.log(Object.values(country.current.currencies).map((currency)=>currency.name))
        setBorderCountries(country.current.borders ? country.current.borders : []);
        setIsLoading(false)
      } 
      catch(error){
            const errorData = JSON.parse(error.message);
            setError(errorData);   
      }
  }

  fetchData();

  },[params])

 
  return (
          <>
          <Header />
          <section className='bg-Very-Light-Gray h-full w-full   pt-10 px-7 pb-10 font-Nunito-sans font-light flex flex-col gap-16 sm:px-20 overflow-y-auto'>
             
             <NavLink  to="/" >
             <button className='flex items-center gap-2.5 shadow-button pl-8 pr-9 py-2 bg-white font-light rounded-sm hover:bg-gray-100'>
                  <FontAwesomeIcon icon={faArrowLeft} />
                  Back
             </button>
             </NavLink>
          
             { country.current  && 
                   <div className='flex flex-col md:flex-row gap-11 xl:gap-36 md:items-center '>
                       <img className=' w-[320px] h-[229px]  lg:w-[560px] lg:h-[401px] rounded-md' src={country.current.flags.svg} alt={`flag of ${country.current.name.common}`} />
                       <div className='flex flex-col gap-4'>
                            <h1 className='font-bold text-[32px]'>{country.current.name.common}</h1>
                            <div className='flex flex-col gap-8 '>
                                  <div className='md:flex md:flex-row md:gap-10 xl:gap-29'>
                                    <div className='flex flex-col gap-2 '>
                                        <p ><span className='font-medium'>Native Name:</span>  {Object.values(country.current.name.nativeName)[0].common}</p>
                                        <p><span className="font-medium">Population: </span>{country.current.population}</p>
                                        <p><span className="font-medium">Region:</span> {country.current.region}</p>
                                        <p><span className="font-medium">Sub Region: </span>{country.current.subregion}</p>
                                        <p><span className="font-medium">Capital:</span> {country.current.capital[0]}</p>
                                    </div>
                                    <div className='flex flex-col gap-2'>
                                        <p><span className="font-medium">Top Level Domain:</span> {country.current.tld[0]}</p>
                                        <p><span className="font-medium">Currencies: </span>{Object.values(country.current.currencies).map((currency)=>currency.name).join(", ")}</p>
                                        <p><span className="font-medium">Languages: </span>{Object.values(country.current.languages).join(', ')}</p>
                                    </div>
                                  </div>
                                  <div className='flex flex-col sm:flex-row gap-2'>
                                    <h3 className="font-medium">Border Countries:</h3>
                                    <div className='flex flex-row flex-wrap gap-2.5'>
                                        { borderCountries.length > 0 ? borderCountries.map((borderCountry,index)=>{return <BorderButton key={index} code={borderCountry} />}) : <p>No border countries</p> }
                                   </div>
                          </div> 
                            </div>
                          
                   </div>
                </div>
              }
         
            
          </section>
          </>
  )
}

export default CountryDetailed
