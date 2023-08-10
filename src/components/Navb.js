import { useState } from 'react';
import React from "react";
import { Link,useNavigate } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    NavbarText,
  } from 'reactstrap';
import model from '../model';
import Cart from '../Screens/Cart';
import { useCart } from './ContextReducer';

function Navb(){
  const data=useCart();
  const [cartView,setcarView] = useState(false)
  const navigate = useNavigate()
  const handlelogout=()=>{
    localStorage.removeItem("authtoken")
    navigate("/login")
  }
    return(
        <div>
          <Navbar light expand="md" style={{backgroundColor:"#d9e3f0" ,marginBottom:4,borderRadius:"20px"}}>
          <NavbarBrand href="/" style={{color:'black'}}>Mahesh-App</NavbarBrand>
          
          <Collapse  navbar>
            <Nav className="ml-auto" navbar>
              <div className='d-flex'>
              <NavItem >
                <Link to="/" className='nav-link active' style={{color:'black'}}>Home</Link>
              </NavItem>
              {
                (localStorage.getItem("authtoken")?
                <div className='d-flex'>
                <div>
                  <NavItem >
                  <Link to="/cart" className='nav-link active'style={{color:'black'}} >MyCart {data.length}</Link>
                  
                  </NavItem>
                </div>
                <div>
                  <NavItem >
                  <Link to="/myorders" className='nav-link active' style={{color:'black'}}>MyOrders </Link>
                  
                  </NavItem>
                </div>
                </div>
                :""
                  
                )

                
              }
              </div>
              <div className='d-flex' >

              {
                (localStorage.getItem("authtoken")?
                <NavItem >
                <Link to="/" className='nav-link active' onClick={handlelogout} style={{color:'black'}}>Logout</Link>
              </NavItem>
                :
                <div className='d-flex'>
                <NavItem>
                <Link to="/login" className='nav-link active ' style={{color:'black'}} >Login</Link>
              </NavItem>
              <NavItem>
                <Link to="/createuser" className='nav-link active ' style={{color:'black'}} >SignUp</Link>
              </NavItem>
              </div>  
                )
              }


              
              </div>
               </Nav>
          </Collapse>
        </Navbar>        
        </div>
    );
} 
export default Navb;