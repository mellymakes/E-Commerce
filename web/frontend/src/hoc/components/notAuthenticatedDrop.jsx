import React from 'react'
import { NavLink } from 'react-router-dom'

export default function NotAuthenticatedDrop({ setDropdown }) {
    return (
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
