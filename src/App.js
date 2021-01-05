import React, { Component } from 'react';


class ToDoList extends Component {

  render() { 
    return (
      <div>
        <h1>{this.props.title}</h1>
        {this.props.tasks.map(task => <div key={task}><p>{task}</p></div>)}
        <input />
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