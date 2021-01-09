import React, { Component } from 'react';
import ToDoItem from '../components/ToDoItem'
import NewToDoForm from '../components/NewToDoForm'
import styled from 'styled-components'

const Container = styled.div`
  background: #333;
  margin: 0 auto;
  width: 80%;
  max-width: 500px;
  padding: 14px;
  border-radius: 14px;
  margin-top: 14px;
`;
const Header = styled.h1`
  color: yellow;
`;

class ToDoList extends Component {

    constructor(props) {
      super(props)
      console.log('constructor')
    }

    getDate = () => {
      fetch('http://localhost:3004/transactions')
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({ tasks: json });
      })
    }

    componentDidMount() {
      console.log('componentDidMount')
      this.getDate()
    }

    componentDidUpdate() {
      console.log('componentDidUpdate')
    }
    
    static defaultProps = {
      tasks: [],
      title: 'List todo'
    }

    state = {
      Draft: '',
      tasks: this.props.tasks,
    }
    updateDraft = (e) => {
      this.setState({ Draft: e.target.value });
    }
  
    addToDo = () => {
      this.setState({ 
        tasks: [...this.state.tasks, {content: this.state.Draft, done: false}],
        Draft: '',
      });
    }

    removeAll = () => {
      this.setState({ tasks: [] });
    }

    addJSON = () => {
      const dataObj = {
        "content": "Added info 2",
        "done": true,
        "updated": "empty",
        "created": new Date().toLocaleString(),
      }
      fetch('http://localhost:3004/transactions', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json',
        },         
        body: JSON.stringify(dataObj)
      })
      .then(() => {
        console.log('Added')
        this.getDate()
      })
      .catch(() => console.log('NOT Added'))
    }
  
    render() { 
      console.log('render & props = ', this.props)
      const {Draft, tasks} = this.state
      return (
        <Container>
            <Header>{this.props.title}</Header>

            {tasks.map(task => {
              return  <ToDoItem 
                        key={task.id} 
                        id={task.id} 
                        text={task.content} 
                        done={task.done} 
                      />
            }  
            )}

            <button onClick={this.removeAll}>Remove tasks</button>
            <button onClick={this.addJSON}>Add JSON</button>

            <NewToDoForm 
                onChange={this.updateDraft} 
                draft={Draft} 
                onSubmit={this.addToDo} 
            />
        </Container>
      );
    }
  }

export default ToDoList