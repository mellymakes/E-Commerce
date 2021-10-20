import React from 'react'
import { cart_func } from '../utils'

export default function card({ data }) {

    const { id, name, price, image } = data

    return (
        <div className="storecard">

                <div className="storecard__img">

                    <img src={`http://localhost:8000${image}`} alt="img" />

                </div>

                <div className="storecard__title">
                    <h3>{name}</h3>
                </div>
                <div className="storecard__menu">

                    <div className="storecard__btn">
                        <button onClick={() => cart_func(id, 'add')}>Add to Cart</button>
                    </div>

                    <div className="storecard__price">
                        <p>{price}.00$</p>
                    </div>
                    
                </div>

        </div>
    )
}
