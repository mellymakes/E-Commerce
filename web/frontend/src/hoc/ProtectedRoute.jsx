import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { Route, Redirect, useLocation } from 'react-router-dom'
import { verify_token } from '../redux/actions/authActions'


function ProtectedRoute({component: Component, isAuth, verify_token,...rest}) {

    
    useEffect(() =>{

        verify_token()

//eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    const location = useLocation()


    return (
        <Route {...rest} render={ props =>{


                return <Component {...props}/>
   
        }} />
    )
}

const mapStateToProps = state =>{

    return {isAuth: state.auth.is_authenticated}
}

export default connect(mapStateToProps, { verify_token })(ProtectedRoute)
