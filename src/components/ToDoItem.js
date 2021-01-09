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
    toggleDone = () => {
        this.setState({ done: !this.state.done });
    }
    render() {
        const {text} = this.props
        return (
            <Item 
                onClick={this.toggleDone}
                done={this.state.done}
                // className={this.state.done ? 'doneStyle doneTodo' : 'doneStyle'}
            >
                {text}
            </Item>
        )
    }
}

export default ToDoItem
