import React, { Component } from 'react';
import ToDoList from './container/ToDoList'
import ToDoEditForm from './components/ToDoEditForm'
import Login from './container/Login'
import NotFound from './components/NotFound'
import Navbar from './container/Navbar'
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom'
import styled from 'styled-components'
import {CurrentUserProvider, CurrentUserConsumer} from './context/CurrentUser'

const Container = styled.div`
  background: #333;
  margin: 0 auto;
  width: 80%;
  max-width: 500px;
  padding: 14px;
  border-radius: 14px;
  margin-top: 14px;
`;

const PrivateRoute = ({ component: Component, ...rest}) => (
  <Route 
    {...rest}
    render={props =>
      <CurrentUserConsumer>
        {
        ({user}) => (      
          user 
          ? (
            <Component {...props} />
          ) 
          : (
            <Redirect 
              to={{
              pathname: '/login',
              status: { from: props.location }
            }}
            />
          ))
        }
      </CurrentUserConsumer>

    }
  />
)

class App extends Component {

  render() {
    return(
      <Router>
        
        <CurrentUserProvider>
          <Container>
            <Navbar />
            <Switch>
              <Route exact path="/">
                <ToDoList />
              </Route> 
              {/* <Route path="/todo_items/:itemId" component={ToDoEditForm} />  */}
              <PrivateRoute path="/todo_items/:itemId" component={ToDoEditForm} /> 
              <Route path='/login' component={Login} />            
              <Route component={NotFound} /> 
            </Switch>
          </Container>
        </CurrentUserProvider>

      </Router>
    )
  }
}

export default App;