import { LOGIN_SUCCESS, LOGIN_FAILED, USER_LOADED_SUCCESS, USER_LOADED_FAILED, SIGNUP_SUCCESS, SIGNUP_FAILED } from '../types'


const REACT_APP_API_URL = 'http://localhost:8000/api/'





const load_user = () => async dispatch =>{

    const accessToken = localStorage.getItem('access')  


    if(accessToken){
    
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `JWT ${accessToken}`
        }

        try{

            const data = await fetch(`${REACT_APP_API_URL}auth/users/me/`, {method: 'GET', headers}).then(res => res.json())

            if(data.name && data.email && typeof data.id === 'number'){


                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: data
                })

            }else{
                console.log(data);
                console.log(accessToken);
                dispatch({
                    type: USER_LOADED_FAILED
                })
            }


        }catch(err){
            console.log('from catch');
            console.log(err);
            dispatch({
                type: USER_LOADED_FAILED
            })
        }

    }else{

        
        dispatch({
            type: USER_LOADED_FAILED
        })
    }
}

const login = (email, password, signal) => async dispatch =>{

    const headers = {
        "Content-Type": 'application/json'
    }

    const body = JSON.stringify({ email, password })


    try{
        const data = await fetch(`${REACT_APP_API_URL}auth/jwt/create/`,{ method:'POST', headers, body, signal }).then(res => res.json())
            
        const { access, refresh, detail } = data

        // console.log(data);

        if(access && refresh){

            dispatch({
                type: LOGIN_SUCCESS,
                payload: {access, refresh}
            })

            dispatch(load_user())

            return LOGIN_SUCCESS

        }
        else if(detail){

            dispatch({
                type: LOGIN_FAILED
            })
            
            console.log(detail);

            return detail
        }
        else{
            dispatch({
                type: LOGIN_FAILED
            })
        }
    }
    catch(err){

        console.log(err);

        dispatch({
            type:LOGIN_FAILED
        })
    }
} 



const signup = ( email, name, password, re_password ) => async dispatch =>{

    const headers = {
        'Content-Type': 'application/json'
    }

    const body = JSON.stringify({ email, name, password, re_password })


    try{

        const data = await fetch(`${REACT_APP_API_URL}auth/users/`, { method: 'POST', headers, body }).then(res => res.json())

        if(data.name === name && data.email === email){

            dispatch({
                type: SIGNUP_SUCCESS
            })

            // console.log(data);

            return SIGNUP_SUCCESS

        }else{

            dispatch({
                type: SIGNUP_FAILED
            })

            console.log(data);

            return `${Object.keys(data)[0]}: ${Object.values(data)[0][0]}`
        }
 
    }
    catch(err){
        console.log(err);

        dispatch({
            type: SIGNUP_FAILED
        })

        return SIGNUP_FAILED
    }
}



const verify_token = () => async dispatch => {

    const access = localStorage.getItem('access')

    if(access){

        const headers = {
            "Content-Type": "application/json"
        }

        const body = JSON.stringify({ token: access })


        
        try{

            const data = await fetch(`${REACT_APP_API_URL}auth/jwt/verify/`, { method: 'POST', headers, body }).then(res => res.json())

            if(Object.keys(data).length === 0){

                
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: { access }
                })

                dispatch(load_user())

                
            }else{

                console.log(data)
                dispatch({
                    type: LOGIN_FAILED
                })
            }
        }
        catch(err){

            console.log(err);
            dispatch({
                type: LOGIN_FAILED
            })
        }

    }else{
        dispatch({
            type: LOGIN_FAILED
        })
    }
}



export { login, load_user, signup, verify_token }