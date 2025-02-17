

const CustomSelect = ({dropDownRef,toggleDropDownList,regionFilter,regionFilters,theme,onRegionFilterChange}) => {
  return ( 
       <div className="custom-select w-[200px] ">
            <button ref={dropDownRef} onClick={toggleDropDownList} className="select-button background-primary rounded-md shadow-lg py-[18px] px-5" role="combobox"
                             aria-label="select button"
                             aria-haspopup="listbox"
                             aria-expanded="false"
                             aria-controls="select-dropdown">
              <span className="selected-value text-primary">{regionFilter ? regionFilter : "Filter By Region"}</span>
              <span className={`arrow-icon ${theme=='light' ? "border-Very-Dark-Blue"  : "border-White"}`}></span>
            </button>
            <ul className="select-dropdown hide-dropdown shadow-lg rounded-md ">
            { regionFilters.map((region,index)=>{
                return <li key={index} className={`select-option background-primary hover:${theme=="light" ?"bg-Very-Light-Gray"  : "bg-Very-Dark-Blue" } first:rounded-t-md last:rounded-b-md`} onClick={onRegionFilterChange}>{region}</li>
              }) }
            </ul>
          </div>

  )
}

export default CustomSelect
