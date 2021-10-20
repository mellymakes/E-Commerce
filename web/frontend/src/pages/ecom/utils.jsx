import url from '../../URL'

async function cart_func(prodId, action){

    const access = localStorage.getItem('access')
    
    if(access){
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`
        }
        
        const body = JSON.stringify({ prodId, action })

        await fetch(`${url}ecom/cart-func/`, { method: 'POST', headers, body })


        
    }else{
        alert('log in first')
    }

}





export { cart_func }