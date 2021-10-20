import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Store, Checkout, Order, Login, Signup } from './pages'
import ProtectedRoute from './hoc/ProtectedRoute'
import Layout from './hoc/Layout'

function App({ lel }){

    return(
        <Router>

            <Layout>
                
                <Switch>

                    <ProtectedRoute path="/" exact component={Store}/>
                    <ProtectedRoute path="/order" exact component={Order}/>
                    <ProtectedRoute path="/order/checkout" component={Checkout}/>

                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={Signup}/>

                </Switch>

            </Layout>

        </Router>
    )
}

const mapStateToProps = state =>{
    return {lel: state.auth}
}

export default connect(mapStateToProps, null)(App)