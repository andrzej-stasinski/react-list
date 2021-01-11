import React, { Component } from 'react'
import {CurrentUserConsumer} from '../context/CurrentUser'
class Navbar extends Component {
    render() {
        return (
            <div>
                <h2>Navbar</h2>
                <CurrentUserConsumer>
                {
                (props) => {
                    console.log(props)
                    return (
                        <div>
                        {
                        props.user 
                        ? <div>
                            Hello, {props.user.name},
                            <button onClick={props.logout}>Logout</button> 
                          </div>
                        : <div>Please, login...</div>                            
                        }
                        </div>
                    )
                } 
                }
                </CurrentUserConsumer>
            </div>
        )
    }
}
export default Navbar