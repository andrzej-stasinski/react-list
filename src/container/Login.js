import React, { Component } from 'react'
import {SubmitButton} from '../helpers/theme'
import {Redirect} from 'react-router-dom'
import {CurrentUserConsumer} from '../context/CurrentUser'

class Login extends Component {

    render() {
        const { from } = this.props.location.state || {from: {pathname: '/'}}

        return (
            <CurrentUserConsumer>
            {
            ({user, login, processing}) => (
                <div>
                    {user && <Redirect to={from} />}
                    <h4>You must login to view page {from.pathname}</h4>
                    {processing
                    ? <h4>Authenticating...</h4>
                    :   (
                        <SubmitButton onClick={login}
                        >Facebook Login
                        </SubmitButton>                    
                        )
                    }
                </div>
            )
            }

            </CurrentUserConsumer>
        )
    }
}

export default Login


