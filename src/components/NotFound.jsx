import Header from "./Header.jsx"


const NotFound = () => {
  return (
     <div>
        <Header/>
        <div className='flex items-center justify-center h-[80vh]'>
          <h1 className='text-3xl font-bold'>404 Not Found</h1>
        </div>
     </div>
  )
}

export default NotFound;
