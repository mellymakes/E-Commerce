import React, { useState, useEffect, useRef } from 'react'
import url from '../../../URL'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'

function PayPal({ order, ship, isAuth, userEmail: email }) {

    
    const history = useHistory()
    const paypalDiv = useRef()


    const processOrder = async () => {

       if(isAuth){

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

        }else{

            const headers = {
                'Content-Type': 'application/json'
            }

            const body = JSON.stringify({ order, email, ...ship })

            try{

                const data = await fetch(url + 'ecom/process_order/', { method: 'POST', headers, body }).then(res => res.json())

                if(data === 'non logged in process success'){

                    document.cookie="cart={}"
                    history.push('/')

                }else{

                    alert('something went wrong')

                }
            }
            catch(err){

                console.error(err)
            }
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

const mapStateToProps = state => {

    return{
        isAuth: state.auth.is_authenticated
    }
}

export default connect(mapStateToProps, null)(PayPal)
