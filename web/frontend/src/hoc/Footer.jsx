import React from 'react'
import { whiteLogo } from '../img'
import './scss/footer.scss'

// console.log(whiteLogo);

export default function Footer() {
    return (
        <div className="foot">

            <div className="con-90-res">
                
                <div className="foot__main">
                    {whiteLogo}
                </div>

                <div className="foot__bottext">
                    <p>all Copyright reserved &copy; Login page Melly</p>
                </div>

            </div>

        </div>
    )
}
