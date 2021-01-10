import React, { Component } from 'react'

export default class ToDoEditForm extends Component {
    render() {
        console.log(this.props)
        return (
            <div>
                <h2>ToDoEditForm</h2>
                <h3>Param = {this.props.match.params.itemId}</h3>
            </div>
        )
    }
}
