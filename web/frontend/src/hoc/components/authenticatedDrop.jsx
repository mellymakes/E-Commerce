import React, { useState } from 'react'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { smollArrow } from '../../img/index'


function AuthenticatedDrop({ setDropdown, isAuth }) {

    const [rest, setRest] = useState(false)

    const logout = () => { localStorage.clear(); window.location.reload(); setDropdown(false) }


    const arrowClass = rest ? "dropin__option dropin__arrow" : "dropin__option dropin__arrow--down"
    const ddropClass = rest ? "ddrop ddrop--active  " : "ddrop"


    if(isAuth){

        return (
            <>
            <NavLink className="dropin__option" to="/" exact activeClassName='dropin__activeopt' onClick={() => setDropdown(false)}>
                Store
            </NavLink>
            <NavLink className="dropin__option" to="/order" exact activeClassName='dropin__activeopt' onClick={() => setDropdown(false)}>
                Order
            </NavLink>
            <div className={arrowClass} onClick={() => setRest(!rest)}>
                {smollArrow}
                <ul className={ddropClass}>
                    <NavLink className="ddrop__option" to="#" onClick={logout}>
                        Log Out
                    </NavLink>
                </ul>
            </div>
            </>
        )

    }else{

        return (
            <>
            <NavLink className="dropin__option" to="/" exact activeClassName='dropin__activeopt' onClick={() => setDropdown(false)}>
                Store
            </NavLink>
            <NavLink className="dropin__option" to="/order" exact activeClassName='dropin__activeopt' onClick={() => setDropdown(false)}>
                Order
            </NavLink>
            <div className={arrowClass} onClick={() => setRest(!rest)}>
                {smollArrow}
                <ul className={ddropClass}>
                <NavLink className="dropin__option" to="/login" exact onClick={() => setDropdown(false)}>
                    Login
                </NavLink>
                <NavLink className="dropin__option" to="/signup" exact onClick={() => setDropdown(false)}>
                    Sign Up
                </NavLink>
                </ul>
            </div>
            </>
        )

    }


}


const mapStateToProps = state => {

    return {
        isAuth: state.auth.is_authenticated
    }
}

export default connect(mapStateToProps, null)(AuthenticatedDrop)