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

    toggleDone = () => this.props.toggleDone(this.props.id)

    destroy = () => this.props.destroy(this.props.id)

    render() {
        // console.log(this.props)
        const {text, done} = this.props
        return (
            <Item 
                done={done}
            >
                <div onClick={this.toggleDone}>{text}</div>
                <button onClick={this.destroy}>X</button>
            </Item>
        )
    }
}

export default ToDoItem
