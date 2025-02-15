import { NavLink } from "react-router"

const Country = ({data}) => {
  return (
    <NavLink to={`/${data.name.common}`}>
    <div className="flex flex-col  background-primary rounded-sm shadow-md w-[264px] h-[336px]" >
       <img className="rounded-t-md w-[303px] h-[160px] object-cover" src={data.flags.png} alt={`country ${data.name.common}flag`} />
       <div className="flex flex-col gap-4 pl-6 pt-6 pb-12">
           <h2 className="font-bold">{data.name.common}</h2>
           <div className="flex flex-col">
               <p><span className="font-semibold">Population:</span>{data.population}</p>
               <span className="font-semibold">
                 <p>Region: {data.region}</p>
               </span>
               <p><span className="font-semibold">
                 Captial:
                 </span> 
                 {data.capital}</p>
           </div>
       </div>
      
    </div>
    </NavLink>
  )
}

export default Country
