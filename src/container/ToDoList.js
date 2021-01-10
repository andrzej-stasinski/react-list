import React, { Component } from 'react';
import ToDoItem from '../components/ToDoItem'
import NewToDoForm from '../components/NewToDoForm'
import styled from 'styled-components'
import * as toDoItemApi from '../helpers/toDoItemApi'
import * as _ from 'ramda'

const Header = styled.h1`
  color: yellow;
`;

class ToDoList extends Component {

    getDate = () => {
      fetch('http://localhost:3004/transactions')
      .then(res => res.json())
      .then(json => {
        console.log(json)
        this.setState({ tasks: json });
      })
    }

    componentDidMount = async () => {
      console.log('componentDidMount')
      const tasks = await toDoItemApi.getAll()
      console.log(tasks)
      this.setState({tasks : tasks});
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
  
    addToDo = async () => {
      const {tasks, Draft} = this.state
      console.log(Draft)
      const task = await toDoItemApi.create({
        content: Draft, 
        create: new Date().toLocaleString()
      })
      console.log(task)
      this.setState({tasks: _.append(task, tasks), Draft: ''})
    }

    // addJSON = () => {
    //   const dataObj = {
    //     "content": "Added info 2",
    //     "done": true,
    //     "updated": "empty",
    //     "created": new Date().toLocaleString(),
    //   }
    //   fetch('http://localhost:3004/transactions', {
    //     method: 'POST',
    //     headers: {
    //       'Content-type': 'application/json',
    //     },         
    //     body: JSON.stringify(dataObj)
    //   })
    //   .then(() => {
    //     console.log('Added')
    //     this.getDate()
    //   })
    //   .catch(() => console.log('NOT Added'))
    // }

    findById = (id, arr) => {
      const index = _.findIndex(_.propEq('id', id))(arr)
      return {index, task: arr[index]}
    }

    destroyToDo = async (id) => {
      const {tasks} = this.state
      await toDoItemApi.destroy(id)
      // const res = await toDoItemApi.destroy(id)
      const {index} = this.findById(id, tasks)
      this.setState({ tasks: _.remove(index, 1, tasks) });
    }

    toggleDone = async (id) => {
      const {tasks} = this.state
      const {index, task} = this.findById(id, tasks)
      const {create, content} = task
      const res = await toDoItemApi.update(id, {
        done: !task.done, create, content
      })
      this.setState({tasks : _.update(index, res, tasks) });
    }
  
    render() { 
      console.log('state = ', this.state)
      console.log('props = ', this.props)
      const {Draft, tasks} = this.state
      return (
        <div>
            <Header>{this.props.title}</Header>

            {tasks.map(task => {
              return  <ToDoItem 
                        key={task.id} 
                        id={task.id} 
                        destroy={this.destroyToDo} 
                        text={task.content} 
                        done={task.done}
                        toggleDone={this.toggleDone}
                      />
            }  
            )}

            {/* <button onClick={this.addJSON}>Add ready data - outside INPUT</button> */}

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