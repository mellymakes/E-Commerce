import React, { useState } from 'react'
import { connect } from 'react-redux'
import SignupSuccess from './components/SignupSuccess'
import SignupFailed from './components/SignupFailed'
import { SIGNUP_SUCCESS, SIGNUP_FAILED } from '../../redux/types'
import { signup } from '../../redux/actions/authActions'
import { Redirect, useLocation } from 'react-router-dom'
import './scss/signup.scss'

function Signup(props) {

    const [signupInfo, setSignupInfo] = useState({ name: '', email: '', password: '', re_password: '' })

    const [issignedUp, setSignedUp] = useState(null)


    const location = useLocation()

    const onch = e => setSignupInfo({ ...signupInfo, [e.target.name]: e.target.value })

    const onSign = async () => {

        const { email, name, password, re_password } = signupInfo

        const res = await props.signup(email, name, password, re_password)
        
        if(res === SIGNUP_SUCCESS){

            setSignedUp(true)
        }
        else if(res === SIGNUP_FAILED){

            setSignedUp(false)
        }else{

            console.log(res);
            alert(res)
        }

    }

    if(props.isAuth){
        
        return <Redirect to={ location.state ? location.state.from : '/' }/>
    }

    const { name, email, password, re_password } = signupInfo

    if(issignedUp === true){

        return <SignupSuccess />
    }
    else if(issignedUp === false){

        return <SignupFailed />
    }

    return (
        <div className="signup">


            <div className="signup__box">

                <div className="signup__boxin">

                    <div className="signup__title">
                        <p>Sign Up</p>
                    </div>
                    <div className="signup__inputs">
                        <div className="signup__input">
                            <label htmlFor="">E-Mail</label><br/>
                            <input type="text" name="email" value={email} onChange={onch}/>
                        </div>
                        <div className="signup__input">
                            <label htmlFor="">Name</label><br/>
                            <input type="text" name="name" value={name} onChange={onch}/>
                        </div>
                        <div className="signup__input">
                            <label htmlFor="">Password</label><br/>
                            <input type="password" name="password" value={password} onChange={onch}/>
                        </div>
                        <div className="signup__input">
                            <label htmlFor="">Confirm Password</label><br/>
                            <input type="password" name="re_password" value={re_password} onChange={onch}/>
                        </div>
                        <div className="signup__input--btn">
                            <button className="pbutton relative-center signup__button" onClick={onSign}>Sign Up</button>
                        </div>
                    </div>

                </div>

            </div>


        </div>
    )
}

const mapStateToProps = state =>{
    return{
        isAuth: state.auth.is_authenticated
    }
}

export default connect(mapStateToProps, { signup })(Signup)