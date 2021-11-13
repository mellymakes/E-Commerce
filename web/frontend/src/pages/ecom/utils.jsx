import url from '../../URL'


function cookieCutter(name){

    const splittedCookie = document.cookie.split(';').map(data => data.trim().split('='))

    const value = splittedCookie.find(data => data[0] === name)

    return Array.isArray(value) === true ? value[1] : null

}

async function cart_func(prodId, action){

    const access = localStorage.getItem('access')
    
    if(access){
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${access}`,
            // 'cookie': document.cookie,   
        }
        
        const body = JSON.stringify({ prodId, action })

        await fetch(`${url}ecom/cart-func/`, { method: 'POST', headers, body })


        
    }else{
        
        const cart = cookieCutter('cart') ? JSON.parse(cookieCutter('cart')) : {}


        if(cart[`${prodId}`]){

            if(action === 'add'){
                cart[`${prodId}`]['value'] = Number(cart[`${prodId}`]['value']) + 1

                console.log(cart[`${prodId}`]['value'])
            }
            else if(action === 'sub'){

                if(cart[`${prodId}`]['value'] == 1){

                    delete cart[`${prodId}`]

                }else{
                    cart[`${prodId}`]['value'] = Number(cart[`${prodId}`]['value']) - 1
                }

                
            }
        }else{

            if(action === 'add'){
                cart[`${prodId}`]= {value: 1}
            } 
            
        }

        const cookieCart = JSON.stringify(cart)

        document.cookie = `cart=${cookieCart}`

        console.log(cookieCart)
    }

}

const fetchingAnonOrder = async setOrder =>{

    const cart = cookieCutter('cart')


    const headers = {
        'Content-Type': 'application/json'
    }

    const body = JSON.stringify({ cart })

    const data = await fetch('http://localhost:8000/api/ecom/order/', { method: 'POST', headers, body }).then(res => res.json())

    const orderr = {
        total_cost: 0,
        total_items: 0,
        oi:[]
    }  

    // console.log(data)

    let cleanedArr = []

    data.forEach(function(ddata){

        const item = cleanedArr.find(dddata => dddata.id === ddata.id)

        orderr.total_cost += ddata.price 

        if(item === undefined){

            cleanedArr.push({...ddata, nitems: 1, img: ddata.image, pname: ddata.name})

        }else{

            item.nitems += 1
            
        }

    })

    cleanedArr = cleanedArr.map(data => {

        const total_cost = data.nitems * data.price

        orderr.total_items += data.nitems

        return { ...data, total_cost }
    })


    orderr.oi = cleanedArr
    
    setOrder(orderr)

}





export { cart_func, cookieCutter, fetchingAnonOrder }