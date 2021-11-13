import React, { useState, useEffect } from 'react'
import OrderGrid from './components/OrderGrid'
import url from '../../URL'
import { Link } from 'react-router-dom'
import { fetchingAnonOrder } from '../ecom/utils'
import './scss/order.scss'



export default function Order() {

    const [order, setOrder] = useState({})


    const fetching = async () =>{

        const jwt = localStorage.getItem('access')


        if(jwt){
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `JWT ${jwt}`
            }
    
            const data = await fetch(url + 'ecom/order/', { headers }).then(res => res.json())
    
            setOrder(data)
        }else{
            
            fetchingAnonOrder(setOrder)
        } 

    }


    useEffect(() =>{

        const jwt = localStorage.getItem('access')

        if(jwt){

            fetching()

        }else{

            fetchingAnonOrder(setOrder)
        }

    }, [])

    const { total_cost } = order

    const total_items = () => {

        let total = 0

        if(order.oi){

            order.oi.forEach(data => total = total + data.nitems)
        }

        return total
    }

    const orderItems = order.oi ? order.oi : []

    const checkoutBtnClass = () =>  orderItems.length > 0 ? "order__checkoutbutton" : "order__checkoutbutton--disable"


    return (    
        <div className="order con-90-res">

            <div className="order__paper  order__detailpaper">

                <button>{`<--`}Continue Shopping</button>

                <div className="order__detailgrid">

                    <div className="order__detailcard">

                        <h2 className="title">Total Items</h2>
                        <h3>{total_items()}</h3>
                        
                    </div>
                    <div className="order__detailcard">

                        <h2 className="title">Total cost</h2>
                        <h3>{total_cost}$</h3>

                    </div>
                    <div className="order__detailcard">

                        <Link to="order/checkout" className={checkoutBtnClass()}>Checkout</Link>

                    </div>

                </div>
            </div>

            <div className="order__paper">

                <OrderGrid order={order} fetching={fetching}/>

            </div>

        </div>
    )
}
