import React from 'react'
import { Link, NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
   <>
<div className="container-fluid bg-Color">
  <div className="container">
     <nav className="navbar navbar-expand-lg navbar-dark">
  <div className="container-fluid ">
    <Link to="/" className="navbar-brand" href="#">Navbar</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
   
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to="/" className="nav-link active" aria-current="page">Home</NavLink>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#">Link</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Dropdown
          </a>
          <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
            <li><a className="dropdown-item" href="#">Another action</a></li>
            <li><hr className="dropdown-divider" /></li>
            <li><a className="dropdown-item" href="#">Something else here</a></li>
          </ul>
        </li>
        <li className="nav-item">
          <a className="nav-link disabled" aria-disabled="true">Disabled</a>
        </li>
      </ul>
      
      <div className="d-flex" >
        
        <Link to="/signin" className="btn btn-success mx-3" type="submit">login</Link>
        <Link to="/signup"  className="btn btn-warning" type="submit">signup</Link>
      </div>
    </div>
  </div>
</nav>
  </div>

</div>

   </>
          
  )
}

export default Navbar