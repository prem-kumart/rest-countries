import { useEffect,useState, useRef } from "react"

const BorderButton = ({code}) => {

    const [isLoading,setIsLoading] = useState(false); 
    const [error,setError] = useState('');
    const [countryName, setCountryName] = useState('');

    const country = useRef([])

    useEffect(function(){

            async function fetchData() {

            try {
                setIsLoading(true)
                const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
                
                if(!response.ok){
                    throw new Error(`Http Error: ${response.status}`)
                }
                const jsonData = await response.json();
                
                country.current = jsonData[0]
                setCountryName(country.current.name.common);
                
                setIsLoading(false)
            } 
            catch(e){
                setIsLoading(false)   
                setError(e.message)

                }
        }

                fetchData();

    },[code])


return (
    <div className="flex  justify-center items-center  background-primary text-primary font-Nunito-sans text-Dark-Blue shadow-button-sm min-w-[96px] min-h-[28px] rounded-[2px] px-1.5 py-2 ">
        {isLoading && <div className="animate-spin w-5 h-5 border-t-2 border-b-2 border-primary rounded-full"></div>}
        {error && <div>{error}</div>}
        {countryName ? countryName :  code}
    </div>
  )

}

export default BorderButton
