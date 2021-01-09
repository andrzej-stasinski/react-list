import React, { Component } from 'react'
import './ToDoItem.css'

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
        console.log(this.props)
        const {text} = this.props
        return (
            <div>
                <div 
                    onClick={this.toggleDone}
                    className={this.state.done ? 'doneTodo' : ''}
                >
                    {text}
                </div>
            </div>
        )
    }
}

export default ToDoItem
