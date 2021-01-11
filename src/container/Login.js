import React, { Component } from 'react'
import {SubmitButton} from '../helpers/theme'
import {Redirect} from 'react-router-dom'

class Login extends Component {
    state = {
        processing: false,
        currentUser: null,
        finished: false,
    }
    fbLogin = () => {
        this.setState({ processing: true })
        window.FB.getLoginStatus(response => {
            console.log(response)
            if(response.status !== 'connected') {
                window.FB.login()
            } else {
                window.FB.api('/me', user => {
                    console.log(user)
                    sessionStorage.setItem('currentUser', user)
                    this.setState({ 
                        finished: true, 
                        processing: false, 
                        currentUser: user 
                    });
                })
            }
            if(response.status === 'connected') {
                console.log('status - connected')
            }
        })
    }    
    render() {
        const { from } = this.props.location.state || {from: {pathname: '/'}}
        const {finished} = this.state
        if(finished) {
            return <Redirect to={from} />
        }
        return (
            <div>
                <h2>Login</h2>
                {
                this.state.currentUser
                ? <h4>Hello {this.state.currentUser.name}</h4>
                : <h4>You must login to view page {from.pathname}</h4>
                }

                {
                this.state.processing
                ? <h4>Authenticating...</h4>
                :   (
                    <SubmitButton onClick={this.fbLogin}
                    >
                        Login
                    </SubmitButton>                    
                    )
                }


            </div>
        )
    }
}

export default Login


