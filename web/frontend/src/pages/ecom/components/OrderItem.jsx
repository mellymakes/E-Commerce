import React from 'react'
import { cart_func } from '../utils'
import { smollArrow } from '../../../img'


export default function OrderItem({ data, reload }) {

    const { id, pname, nitems, total_cost, img } = data


    const addNSub = (e) => {

        const div = e.target.closest('div')

        const { id } = div.dataset
        
        if(div.classList.contains('oi__arrowup')){

            cart_func(id, 'add')

            // console.log('add');

        }
        else if(div.classList.contains('oi__arrowdown')){

            cart_func(id, 'sub')

            // console.log('sub');

        }else{
            console.log(div);
        }

        setTimeout(reload, 100)
    }

    return (
        <div className="oi">
            
            <div className="oi__img">
                <img src={`http://localhost:8000${img}`} alt="" />
            </div>

            <div className="oi__item"> {pname} </div>
            <div className="oi__price"> { total_cost / nitems }$ </div>
            <div className="oi__quantity"> 
            
                <p className="num">{nitems}</p>
                <div className="oi__arrowup oi__arrow" data-id={id} onClick={addNSub}>
                    {smollArrow}
                </div> 
                
                <div className="oi__arrowdown oi__arrow" data-id={id}  onClick={addNSub}>
                    {smollArrow}
                </div> 

            </div>
            <div className="oi__total"> {total_cost}$ </div>
            
        </div>
    )
}
