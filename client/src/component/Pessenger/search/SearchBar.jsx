import React from 'react'

const SearchBar = () => {
  return (
   <>
   <div className="col-md-3 bg-light p-3 border-end">
             <h5 className="mb-3">🔍 Search Vehicles</h5>
             <input
               type="text"
               className="form-control mb-3"
               placeholder="Enter vehicle no or type"
             />
             <button className="btn btn-primary w-100">Search</button>
           </div>
   </>
  )
}

export default SearchBar