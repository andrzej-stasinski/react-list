import React, { Component } from 'react'

const CurrentUserContext = React.createContext() 

export class CurrentUserProvider extends Component {
    state = {
        user: null,
        processing: false,
        redirecting: false, 
    }
    getUser = () => {
        window.FB.api('/me', user => {
            this.setState({ user: user, processing: false, redirecting: true})
        })
    }
    login = () => {
        this.setState({ processing: true })
        window.FB.getLoginStatus(response => {
            if(response.status === 'connected') {
                console.log('status - connected')
                this.getUser()
            } else {
                console.log('status - NOT connected')
                window.FB.login(user => {
                    this.getUser()
                })
            }
        })
    }
    logout = () => {
        this.setState({ user: null });
    }
    render() {
        const {children} = this.props
        return (
            <div>
                <CurrentUserContext.Provider 
                    value={{
                        login: this.login,
                        logout: this.logout,
                        user: this.state.user,
                        processing: this.state.processing,
                }}>
                    {children}
                </CurrentUserContext.Provider>
                
            </div>
        )
    }
}
export const CurrentUserConsumer = CurrentUserContext.Consumer