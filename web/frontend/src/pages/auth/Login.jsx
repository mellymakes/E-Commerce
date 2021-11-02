import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, useLocation } from 'react-router-dom'
import { login } from '../../redux/actions/authActions'
import { LOGIN_SUCCESS } from '../../redux/types'
import './scss/login.scss'



function Login({ auth, login }) {
  
    const [loginData, setLoginData] = useState({email:'', password: ''})

    

    const ac = new AbortController()

    useEffect(() =>{

        return () =>{
            ac.abort()
        }

        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onch = (e) => setLoginData({...loginData, [e.target.name]: e.target.value})

    const onLog = async e =>{

        e.preventDefault()

        const { signal } = ac

        const { email, password } = loginData

        if(email && password){

            const res = await login(email, password, signal).then(ddd => ddd)

            if(res === LOGIN_SUCCESS){
                
                setLoginData({email:'', password: ''})
                
            }else{
           
                alert(res)
               
            }

            
        }else{
            alert('Fill in the blanks')
        }
    }


    const { email, password } = loginData
    const location = useLocation()

    if(auth){

        return <Redirect to={location.state ? location.state.from : '/'}/>
    }
    return (
        <div className="login">
            <div className="login__box">

                <div className="login__boxin">

                    <div className="login__title">
                        <p>Login</p>
                    </div>
                    <form onSubmit={onLog}>
                        <div className="login__inputs">
                            <div className="login__input">
                                <label htmlFor="">E-Mail</label><br/>
                                <input type="text" name="email" value={email} onChange={onch}/>
                            </div>
                            <div className="login__input">
                                <label htmlFor="">Password</label><br/>
                                <input type="password" name="password" value={password} onChange={onch}/>
                            </div>
                            <div className="login__input--btn">
                                <button className="pbutton relative-center login__button">Login</button>
                            </div>
                        </div>
                    </form>

                </div>

            </div>


        </div>
    )
}

const mapStateToProps = state =>{

    return {
        auth: state.auth.is_authenticated
    }
}

export default connect(mapStateToProps, { login })(Login)
