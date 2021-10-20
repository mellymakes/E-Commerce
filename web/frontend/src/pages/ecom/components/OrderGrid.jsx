import React from 'react'
import OrderItem from './OrderItem'
import { Link } from 'react-router-dom'

export default function OrderGrid({ order, fetching }) {

    const oItems = !order.oi ? [] : order.oi.map((data, index) => <OrderItem key={index} data={data} reload={fetching}/>)

    if(oItems.length === 0){
        
        return <h1 className="order__noitem">No items in your cart. Go <Link to="/">Shopping</Link></h1>

    }
    return (
        <div className="order__grid">

                    <div className="order__gridheader">

                        <div className=""></div>
                        
                        <h3>Item</h3>
                        <h3>Price</h3>
                        <h3>Quantity</h3>
                        <h3>Total</h3>

                    </div>

                    
                    {oItems}

        </div>
    )
}
