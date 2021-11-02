import React, { useState } from 'react'
import { whiteLogo, burger } from '../img'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import AuthenticatedDrop from './components/authenticatedDrop.jsx'
import NotAuthenticatedDrop from './components/notAuthenticatedDrop'
import './scss/navbar.scss'

function Navbar({ isAuth }) {
    
    const [dropdown, setDropdown] = useState(true)

    
    const dropdownClass = () => dropdown ? 'dropdown dropdown--active' : 'dropdown'
    
    const navItems = () => {
        if(isAuth){

            return <AuthenticatedDrop setDropdown={setDropdown}/>

        }else{
            return <AuthenticatedDrop setDropdown={setDropdown} />
        }
    }
    const dropdownItems = () => {
        if(isAuth){

            return(
                <>
                <NavLink className="dropin__option" to="/" exact activeClassName='dropin__activeopt' onClick={() => setDropdown(false)}>
                    Store
                </NavLink>
                <NavLink className="dropin__option" to="/order" exact activeClassName='dropin__activeopt' onClick={() => setDropdown(false)}>
                    Order
                </NavLink>
                <NavLink className="dropin__option" to="#">
                    Log Out
                </NavLink>
                </>
            )
        }else{
            return(
                <>
                <NavLink className="dropin__option" to="/login" exact activeClassName="navin__activeopt" onClick={() => setDropdown(false)}>
                    Login
                </NavLink>
                <NavLink className="dropin__option" to="/signup" exact activeClassName="navin__activeopt"  onClick={() => setDropdown(false)}>
                    Sign Up
                </NavLink>
                </>
            )
        }
    }

    return (
        <>
            <div className="nav">
                <div className="navin con-90-res">

                    <div className="navin__logo">
                        {whiteLogo}
                    </div>
                        <div className="navin__menu">
                            <div className="navin__list">
                                {navItems()}
                                <div className="navin__burger" onClick={() => setDropdown(!dropdown)}>
                                    <img src={burger} alt=""/>
                                </div>
                            </div>
                        </div>
                </div>
            </div>
            <div className={dropdownClass()}>
                <div className="dropin con-90-res">
                        {dropdownItems()}
                </div>
            </div>
        </>
    )
}


const mapStateToProps = state =>{

    return {
        isAuth: state.auth.is_authenticated
    }
}

export default connect(mapStateToProps, null)(Navbar)