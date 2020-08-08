import React, {useState} from 'react';
import {Link} from 'react-router-dom'
import './CSS/header.css'
function Header({OpenSideBar}) {
  
  return (
    <header className="header">
      <div className="navbar" style={{background:"rgb(3, 219, 136)"}}>
          <h1>
          <button class='openbtn' onClick={OpenSideBar}> ☰ </button>
            <span className="proton"><i class="fas fa-atom"></i> Proton</span>
          </h1>
          <nav>
            <ul>
              <li><Link to='/' style={{textDecoration:"none"}}><i class="fas fa-home" style={{paddingRight:"5px"}}></i>Home</Link></li>
              <li><Link to='/profile' style={{textDecoration:"none"}}><i class="fas fa-user" style={{paddingRight:"5px"}}></i>Profile</Link></li>
              <li><Link to='/profile' style={{textDecoration:"none"}}><i class="fas fa-sign-out-alt" style={{paddingRight:"5px"}}></i>Logout</Link></li>
              
            </ul>
          </nav>
      </div>
    </header>
  )
}

// const headerStyle = {
//   background: 'rgb(3, 219, 136)',
//   color: 'black',
//   textAlign: 'left',
//   padding: '10px',
//   fontFamily:"Open Sans",
//   fontWeight: "1000"
// }

export default Header;
