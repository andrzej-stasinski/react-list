import React, { Component } from 'react';
import ToDoItem from '../components/ToDoItem'
import NewToDoForm from '../components/NewToDoForm'

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
        <div>
            <h1>{this.props.title}</h1>

            {tasks.map(task => {
              return <ToDoItem key={task.text} text={task.text} done={task.done} />
            }  
            )}

            <NewToDoForm 
                onChange={this.updateDraft} 
                draft={Draft} 
                onSubmit={this.addToDo} 
            />
        </div>
      );
    }
  }

export default ToDoList