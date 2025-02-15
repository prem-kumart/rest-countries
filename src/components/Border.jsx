import { useEffect,useState, useRef } from "react"

const BorderButton = ({code}) => {

    const [isLoading,setIsLoading] = useState(false); 
    const [Error, setError] = useState({});
    const [countryName, setCountryName] = useState('');

    const country = useRef([])

    useEffect(function(){

    async function fetchData() {

      try {
        console.log(code)
          setIsLoading(true)
          setError({})
          const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
          //console.log(response);
          if(!response.ok){
              throw new Error(JSON.stringify({status:response.status , message: response.message}))
          }
          const jsonData = await response.json();
          //console.log(jsonData)
          country.current = jsonData[0]
          setCountryName(country.current.name.common);
          
          setIsLoading(false)
      } 
      catch(error){
            const errorData = JSON.parse(error.message);
            setError(errorData);   
             }
        }

        fetchData();

    },[code])


return (
    
    <div className="flex  justify-center items-center  background-primary text-primary font-Nunito-sans text-Dark-Blue shadow-button-sm min-w-[96px] min-h-[28px] rounded-[2px] px-1.5 py-2 ">
           {countryName ? countryName :  code}
    </div>
  )
}

export default BorderButton
