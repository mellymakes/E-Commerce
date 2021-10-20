import React, { useState, useEffect } from 'react'
import Card from './components/Card'
import url from '../../URL'
import './scss/store.scss' 

export default function Store(props) {

    const [storeItems, setStoreItems] = useState([])
    
    const abortControl = new AbortController()

    useEffect(() =>{

        const { signal } = abortControl

        async function fetching(){

            const data = await fetch(`${url}ecom/products/`, { signal }).then(res => res.json())

            setStoreItems(data)
        }

        fetching()

        return () =>{

            abortControl.abort()
        }
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const store = storeItems.map((data, index) => <Card key={index} data={data}/>)

    return (
        <div className="store con-90-res">

            <div className="store__paper">

                <div className="store__cardgrid">

                    { store }

                </div>

            </div>

        </div>
    )
}
