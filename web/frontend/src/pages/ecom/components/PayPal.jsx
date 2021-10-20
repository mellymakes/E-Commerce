import React, { useState, useEffect, useRef } from 'react'
import url from '../../../URL'
import { useHistory } from 'react-router-dom'

export default function PayPal({ order, ship }) {

    
    // const [orderrr, setOrder] = useState({})

    const history = useHistory()
    const paypalDiv = useRef()


    // useEffect(() =>{

    //     const headers = { 
    //         'Content-Type': 'application/json',
    //         'Authorization': `JWT ${localStorage.getItem('access')}`
    //     }


    //     fetch(url + 'ecom/order', { method: 'GET', headers }).then(res => res.json()).then(data =>{

    //         setOrder(data)
    //         console.log(data)
    //     })

    // }, [])


    const processOrder = async () => {

        const jwt = localStorage.getItem('access')

        const headers = {
            "Content-Type": "application/json",
            "Authorization": `JWT ${jwt}`
        }

        const body = JSON.stringify({ order, ...ship })

        try{

            const data = await fetch(url + 'ecom/process_order/', { method:'POST', headers, body }).then(res => res.json())

            if(data === 'processed'){

                history.push('/')
            }else{
                alert('something went wrong')
            }

        }
        catch(err){
            console.log(err)
        }

    }

    useEffect(() =>{

        window.paypal.Buttons({

            createOrder: (data, actions, err) => {

                return actions.order.create({

                    intent: 'CAPTURE',

                    purchase_units: [
                        {
                            amount:{
                                currency_code: 'USD',
                                value: order.total_cost
                            }
                        }
                    ]


                })
            },
            onApprove: async (data, action) =>{
                
                processOrder()

                const olord = await action.order.capture()

                console.log(olord)

            },

            onError: err => console.log(err.message)

        }).render(paypalDiv.current)

    }, [])




    


    return (
        <div ref={paypalDiv} className='paypal'>



        </div>
    )
}
