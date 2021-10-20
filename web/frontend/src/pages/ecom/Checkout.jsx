import React, { useState, useEffect } from 'react'
import url from '../../URL'
import { useHistory } from 'react-router-dom'
import PayPal from './components/PayPal'
import './scss/checkout.scss'

const defaultShip = {
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: ''
}

export default function Checkout() {

    const [order, setorder] = useState({})

    const [ship, setShip] = useState(defaultShip)

    const [checkout, setCheckout] = useState(false)


    const history = useHistory()

    useEffect(() =>{

        const fetching = async () =>{

            const jwt = localStorage.getItem('access')

            if(jwt){

                const headers = {
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${jwt}`
                }

                const data = await fetch(url + 'ecom/order', { headers }).then(res => res.json())

                if(data.oi.length === 0){

                    history.push('../')

                }else{

                    setorder(data)
                }

            }else{

                localStorage.clear()
                window.location.reload()
            }

        }

        fetching()

    }, [])

    const onch = e => {

        if(e.target.value === ''){

            setCheckout(false)
        }

        setShip({...ship, [e.target.name]: e.target.value})
    }

    // console.log(order)
    const orderitems = !order.oi ? [] : order.oi 
    // console.log(orderitems)
    const { address, city, state, zip_code, country } = ship 
    const shippingClass = order.is_shipping ? '' : 'gone' 
    const items = orderitems.map((data, index) => {

        const { pname, nitems, total_cost, img } = data

        return(
            <div key={index} className="summary__item">
                <div className="summary__img"><img src={`http://localhost:8000${img}`} alt="img"/></div>
                <div className="summary__itemname">{pname}</div>
                <div className="summary__itemprice">{total_cost}$</div>
                <div className="summary__itemcount">{nitems}</div>
            </div>
        )
    })
    const total_nitems = () =>{

        let total = 0

        orderitems.forEach(data => total = total + data.nitems)

        return total
    }

    const checkForm = e =>{

        e.preventDefault()

        const values = Object.values(ship)


        let bool = true

        values.forEach(data =>{
             
            if(data === ''){

                bool = false
            }
        })

        if(!bool){
            console.log('Some shipping infos are missing')
        }

        setCheckout(bool)
    }


    return (
        <div className="con-90-res">
            <div className="checkout">
                    <div className="info-paypal">
                        <div className="info">
                            <div className={shippingClass}>
                            <h3 className="info__title">shipping Info</h3>
                            <hr/>
                                <form>
                                    <div className="info__inputgrid">

                                    <input type="text" className="info__input" name="address" placeholder="address" value={address} onChange={onch}/>
                                    <input type="text" className="info__input" name="city" placeholder="city" value={city} onChange={onch}/>
                                    <input type="text" className="info__input" name="state" placeholder="state" value={state} onChange={onch}/>
                                    <input type="text" className="info__input" name="zip_code" placeholder="zip code" value={zip_code} onChange={onch}/>
                                    <input type="text" className="info__input" name="country" placeholder="country" value={country} onChange={onch}/>
                                    
                                    </div> 

                                    <div className="info__btn">
                                    
                                    <div className="">
                                        <button onClick={checkForm}>Checkout</button>
                                    </div>

                                    </div>

                                </form>
                        
                            </div>
                            
                        </div>

                        {
                            checkout ? (
                                <PayPal order={order} ship={ship}/>
                            ) : (
                                <></>
                            )
                        }

                    </div>
                    <div className="summary">

                        <h3 className="summary__title">Order summary</h3>
                        <hr />
                        <div className="summary__grid">
                            {items}
                        </div>

                        <div className="summary__conclusion">

                            <h3>Total Costs: {order.total_cost}$</h3>
                            <h3>Items: {total_nitems()}</h3>

                            
                        </div>

                    </div>

                    

            </div>
        </div>
    )
}
