import React from 'react'
import { Link } from 'react-router-dom'

export default function SignupSuccess() {
    return (
        <div className="signup_state">

            <div className="signup_state__box">
                <h1 className="signup_state__title">Success</h1>
                <p className="signup_state__subtitle">
                    Your account have been successfully made !
                </p>

                <div className="signup_state__link">
                <Link to="/login">Login In now!</Link>
                </div>
            </div>

        </div>
    )
}   
