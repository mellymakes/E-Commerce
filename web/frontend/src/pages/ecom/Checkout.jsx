import React, { useState, useEffect } from 'react'
import url from '../../URL'
import { useHistory } from 'react-router-dom'
import PayPal from './components/PayPal'
import { fetchingAnonOrder } from './utils'
import { connect } from 'react-redux'
import './scss/checkout.scss'

const defaultShip = {
    address: '',
    city: '',
    state: '',
    zip_code: '',
    country: ''
}

function Checkout({ isAuth }) {

    const [order, setorder] = useState({})

    const [ship, setShip] = useState(defaultShip)

    const [userEmail, setUserEmail] = useState('')

    const [checkout, setCheckout] = useState(true)


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
                
                fetchingAnonOrder(setorder)
            }

        }

        fetching()

    }, [])

    // useEffect(() =>{

    //     const { is_shipping } = order

    //     setCheckout(!is_shipping)
    // }, [order])

    useEffect(() =>{

        setCheckout(false)

    }, [ship, userEmail])

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
    const shippingClass = order.is_shipping ? 'info-paypal' : 'gone' 
    const userBtnClass = !order.is_shipping ? 'info__btn' : 'gone' 
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

    console.log(order)

    const checkForm = e =>{

        e.preventDefault()

        let bool = true

        function checkEmail(email){

            const regex = /(\w+[\.-]?\w+)@(\w+[\.-]?\w+)\.(\w{2,})/

            const arra = regex.exec(email)

            const result = arra ? arra[0] : arra

            if(result === email){

                return true
            }else{

                return false
            }
        }

        if(!checkEmail(userEmail)){
            
            alert('E-Mail must be valid')

            bool = false

        }

        if(order.is_shipping){

        const values = Object.values(ship)


        values.forEach(data =>{
             
            if(data === ''){

                bool = false
            }
        })

    }


        if(!bool){
            console.log('Some infos are missing or incomplete')
        }

        setCheckout(bool)
    }


    return (
        <div className="con-90-res">
            <div className="checkout">

                    <div className="user-info">
                        <div className="user">
                            <h3 className="info__title">User Info</h3>
                            <hr/>
                   
                            <form>
                                <div className="user__formin">
                                    <input type="text" onChange={e => setUserEmail(e.target.value)} className="user__input" value={userEmail} name="email" placeholder="E-Mail"/>
                                </div>
                                <div className={userBtnClass}>
                                    
                                    <div className="">
                                        <button onClick={checkForm}>Submit</button>
                                    </div>

                                </div> 
                            </form>
            
                        </div>
                    </div>
                    
                    <div className={shippingClass}>
                        <div className="info">
                            <div>
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



                       
                       

                    </div>

                    {
                            checkout ? (
                                <PayPal order={order} ship={ship} userEmail={userEmail}/>
                            ) : (
                                <></>
                            )
                        }


                    


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

const mapStateToProps = state =>{

    return { isAuth: state.auth.is_authenticated }
}

export default connect(mapStateToProps, null)(Checkout)