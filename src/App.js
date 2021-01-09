import React, { Component } from 'react';
import ToDoItem from './ToDoItem'

class ToDoList extends Component {
  state = {
    Draft: '',
    tasks: this.props.tasks
  }
  updateDraft = (e) => {
    this.setState({ Draft: e.target.value });
  }

  addToDo = () => {
    // this.setState({ tasks: this.state.tasks.concat(this.state.Draft), Draft: '' });
    this.setState({ 
      tasks: [...this.state.tasks, {text: this.state.Draft, done: false}],
      Draft: '',
    });
  }

  toggleDone = () => {
  }

  render() { 
    console.log(this.props)
    const {tasks} = this.props
    return (
      <div>
        <h1>{this.props.title}</h1>
        {/* {this.state.tasks.map(task => <div>{task.text}</div>)} */}
        {this.state.tasks.map(task => <ToDoItem text={task.text} done={task.done} />)}

        <input type='text' onChange={this.updateDraft} value={this.state.Draft} />
        <button onClick={this.addToDo}>Add</button>
      </div>
    );
  }
}

class App extends Component {
  myTask = [
      {text: 'Record a ReactJS video', done: true},
      {text: 'Go for w walk', done: false}
    ]
  render() {
    return(
      <>
        <ToDoList title='MyStuff' tasks={this.myTask} />
      </>
    )
  }
}

export default App;