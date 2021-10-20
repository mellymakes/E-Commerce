import { LOGIN_SUCCESS, LOGIN_FAILED, USER_LOADED_SUCCESS, USER_LOADED_FAILED } from '../types'


const initialState = {
    access: localStorage.getItem('access'),
    user: null,
    is_authenticated: localStorage.getItem('is_authenticated') === 'true' ? true : false
}


function reducer(state=initialState, { payload, type }){


    switch(type){

        case LOGIN_SUCCESS:

            localStorage.setItem('access', payload.access)
            localStorage.setItem('is_authenticated', true)

            // console.log(payload.access);

            return { ...state, access: payload.access, is_authenticated: true }

        
        case USER_LOADED_SUCCESS:

            return {...state, user: payload}

        
        case USER_LOADED_FAILED:
        case LOGIN_FAILED:

            localStorage.removeItem('access')
            localStorage.removeItem('is_authenticated')

            return {...initialState, is_authenticated: false}

        default:

            return state
    }
}


export default reducer