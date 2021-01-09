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
    static defaultProps = {
      tasks: [
        {text: 'do some shopping', done: true},
        {text: 'watch favorite TV program', done: false}
      ],
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
        tasks: [...this.state.tasks, {text: this.state.Draft, done: false}],
        Draft: '',
      });
    }
  
    render() { 
      console.log(this.props)
      const {Draft, tasks} = this.state
      return (
        <Container>
            <Header>{this.props.title}</Header>

            {tasks.map(task => {
              return <ToDoItem key={task.text} text={task.text} done={task.done} />
            }  
            )}

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