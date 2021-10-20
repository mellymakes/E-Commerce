import React from 'react'
import { Link } from 'react-router-dom'


export default function SignupFailed() {
    return (
        <div className="signup_state">

        <div className="signup_state__box">
            <h1 className="signup_state__title">Failed</h1>
            <p className="signup_state__subtitle">
                Something went Wrong
            </p>

            <div className="signup_state__link">
            <Link to="/signup">Try Again</Link>
            </div>
        </div>

    </div>
    )
}
