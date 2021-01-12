import React, { Component } from 'react'
import './ToDoItem.css'
import styled from 'styled-components'
import {Link} from 'react-router-dom'

const Item = styled.div`
  background: #555;
  border-radius: 10px;
  padding: 14px;
  margin-bottom: 7px;
  border: 1px solid yellow;
  color: ${props => props.done ? '#6f6' : 'auto'};
  text-decoration: ${props => props.done ? 'line-through' : 'auto'};
`;

const LinkA = styled(Link)`
    color: palevioletred;
    text-decoration: none; 
    margin-left: 10px;
    &hover {color: #fff;}
`
const Button = styled.button`
    cursor: pointer;
`

class ToDoItem extends Component {

    toggleDone = () => this.props.toggleDone(this.props.id)

    destroy = () => this.props.destroy(this.props.id)

    render() {
        // console.log(this.props)
        const {id, text, done} = this.props
        return (
            <Item done={done}>
                <div onClick={this.toggleDone}>{text}</div>
                <Button onClick={this.destroy}>X</Button>
                <LinkA 
                    to={`/todo_items/${id}`} 
                    style={{textDecoration: 'none'}}
                >
                Edit</LinkA>
            </Item>
        )
    }
}

export default ToDoItem
