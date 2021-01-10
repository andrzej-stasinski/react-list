import React, { Component } from 'react';
import './App.css'
import ToDoList from './container/ToDoList'
import ToDoEditForm from './components/ToDoEditForm'
import NotFound from './components/NotFound'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import styled from 'styled-components'
// import Container from './App.css'

const Container = styled.div`
  background: #333;
  margin: 0 auto;
  width: 80%;
  max-width: 500px;
  padding: 14px;
  border-radius: 14px;
  margin-top: 14px;
`;

class App extends Component {

  render() {
    return(
      <Router>
        <Container>
          <Switch>
            <Route exact path="/">
              <ToDoList />
            </Route> 
            <Route path="/todo_items/:itemId" component={ToDoEditForm} /> 
            <Route component={NotFound} />             
          </Switch>
        
        </Container>

      </Router>
    )
  }
}

export default App;