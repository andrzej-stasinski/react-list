import React, { useState, useReducer, useEffect } from 'react';
import ToDoItem from '../components/ToDoItem'
import NewToDoForm from '../components/NewToDoForm'
import styled from 'styled-components'
import * as toDoItemApi from '../helpers/toDoItemApi'
import * as _ from 'ramda'

const Header = styled.h1`
  color: yellow;
`;

const initialState = {
  todos: {},
  todoIds: [],
}

const reducer = (state, action) => {
  switch(action.type) {
    default: return state
    case 'ADD_TODO': 
      return {
        ...state,
        todos: {
          ...state.todos,
          [action.todo.id]: action.todo
        },
        todoIds: [...state.todoIds, action.todo.id]
      }
  }
}

const ToDoList = (props) => {

  const [Draft, setDraft] = useState('')
  const [store, dispatch] = useReducer(reducer, initialState);

  console.log(store)

  const updateDraft = (e) => {
    console.log(e.target.value)
    setDraft(e.target.value)
  }

  const addToDo = async (e) => {
    e.preventDefault()
    const task = await toDoItemApi.create({
      content: Draft, 
      create: new Date().toLocaleString()
    })
    dispatch({
      type: 'ADD_TODO', 
      // todo: {id: 1, content: 'ALa ma osła', done: false}
      todo: task,
      })
    setDraft('')
  }

  useEffect(async () => {
    console.log('componentDidMount')
    const tasks = await toDoItemApi.getAll()
    console.log(tasks)
    tasks.map(task => {
      dispatch({
        type: 'ADD_TODO',
        todo: task
      })      
    })

  }, [])

  return (
        <div>
            <Header>{props.title}</Header>

            {store.todoIds.map(id => {
              return  <ToDoItem 
                        key={id} 
                        id={id} 
                        text={store.todos[id].content} 
                        done={store.todos[id].done}
                        // destroy={this.destroyToDo} 
                        // toggleDone={this.toggleDone}
                      />
            }  
            )}

            <NewToDoForm 
                onChange={updateDraft} 
                draft={Draft} 
                onSubmit={addToDo} 
            />
        </div>
  )
}



// class ToDoList extends Component {

//     getDate = () => {
//       fetch('http://localhost:3004/transactions')
//       .then(res => res.json())
//       .then(json => {
//         console.log(json)
//         this.setState({ tasks: json });
//       })
//     }

//     componentDidMount = async () => {
//       console.log('componentDidMount')
//       const tasks = await toDoItemApi.getAll()
//       console.log(tasks)
//       this.setState({tasks : tasks});
//     }
    
//     static defaultProps = {
//       tasks: [],
//       title: 'List todo'
//     }

//     state = {
//       Draft: '',
//       tasks: this.props.tasks,
//     }

//     updateDraft = (e) => {
//       this.setState({ Draft: e.target.value });
//     }
  
//     addToDo = async () => {
//       const {tasks, Draft} = this.state
//       console.log(Draft)
//       const task = await toDoItemApi.create({
//         content: Draft, 
//         create: new Date().toLocaleString()
//       })
//       console.log(task)
//       this.setState({tasks: _.append(task, tasks), Draft: ''})
//     }

//     findById = (id, arr) => {
//       const index = _.findIndex(_.propEq('id', id))(arr)
//       return {index, task: arr[index]}
//     }

//     destroyToDo = async (id) => {
//       const {tasks} = this.state
//       await toDoItemApi.destroy(id)
//       const {index} = this.findById(id, tasks)
      
//       this.setState({ tasks: _.remove(index, 1, tasks) });
//     }

//     toggleDone = async (id) => {
//       const {tasks} = this.state
//       const {index, task} = this.findById(id, tasks)
//       const {create, content} = task
//       const res = await toDoItemApi.update(id, {
//         done: !task.done, create, content
//       })
//       this.setState({tasks : _.update(index, res, tasks) });
//     }
  
//     render() { 

//     }
//   }

export default ToDoList





























































































