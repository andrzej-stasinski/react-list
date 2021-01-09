import React, { Component } from 'react';
import ToDoItem from '../components/ToDoItem'
import NewToDoForm from '../components/NewToDoForm'

class ToDoList extends Component {
    static defaultProps = {
      tasks: [
        {text: 'Record a ReactJS video', done: true},
        {text: 'Go for w walk', done: false}
      ],
      title: 'MMy staff'
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
    //   const {tasks} = this.props
      const {Draft, tasks} = this.state
      return (
        <div>
          <h1>{this.props.title}</h1>
          {console.log(tasks)}

          {/* {tasks.map(task => (
            console.log(task.text, task.done)
            ))} */}

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