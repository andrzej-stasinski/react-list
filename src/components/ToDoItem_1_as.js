import React, { Component } from 'react'
import './ToDoItem.css'
import styled from 'styled-components'

const Item = styled.div`
  background: #555;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 7px;
  border: 1px solid yellow;
  color: ${props => props.done ? '#6f6' : 'auto'};
  text-decoration: ${props => props.done ? 'line-through' : 'auto'};
`;

class ToDoItem extends Component {
    static defaultProps = {
        done: false,
    }
    state = {
        done: this.props.done,
    }
    componentWillUnmount() {
        console.log('componentWillUnmount')
        console.log('* Task - ' + this.props.text + ' unmounted')
    }

    toggleDone = (id) => {
        this.setState({ done: !this.state.done });
        console.log(id)
        const dataObj = {
                "content": "Setup backend",
                "done": !this.state.done,
                "updated": "----",
                "created": new Date().toLocaleString()
        }
        fetch(`http://localhost:3004/transactions/${id}`, {
            method: 'PUT',
            headers: {
              'Content-type': 'application/json',
            },         
            body: JSON.stringify(dataObj)
          })
    }
    render() {
        console.log(this.props)
        const {text, id} = this.props
        return (
            <Item 
                onClick={() => this.toggleDone(id)}
                done={this.state.done}
            >
                {text}
            </Item>
        )
    }
}

export default ToDoItem
