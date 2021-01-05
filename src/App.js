import React, { Component } from 'react';


class ToDoList extends Component {
  state = {
    Draft: '',
    tasks: this.props.tasks
  }
  updateDraft = (e) => {
    this.setState({ Draft: e.target.value });
  }

  addToDo = () => {
    this.setState({ tasks: this.state.tasks.concat(this.state.Draft), Draft: '' });
  }

  render() { 
    const {tasks, Draft} = this.state
    return (
      <div>
        <h1>{this.props.title}</h1>
        {tasks.map(task => <div key={task}><p>{task}</p></div>)}
        <input type='text' onChange={this.updateDraft} value={Draft} />
        <button onClick={this.addToDo}>Add</button>
      </div>
    );
  }
}

class App extends Component {
  myTask = ['Record a ReactJS video', 'Go for w walk']
  render() {
    return(
      <>
        <ToDoList title='MyStuff' tasks={this.myTask} />
      </>
    )
  }
}

export default App;