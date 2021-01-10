import React, { Component } from 'react'
import {SubmitButton} from '../helpers/theme'

class Login extends Component {
    state = {
        processing: false,
    }
    fbLogin = () => {
        this.setState({ processing: true });
    }    
    render() {

        return (
            <div>
                <h2>Login</h2>
                {
                this.state.processing
                ? <h4>Authenticating...</h4>
                :   (
                    <SubmitButton onClick={this.fbLogin}
                    >
                        You must login to view page
                    </SubmitButton>                    
                    )
                }


            </div>
        )
    }
}

export default Login


