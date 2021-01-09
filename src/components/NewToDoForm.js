import React, { Component } from 'react'

class NewToDoForm extends Component {
    
    render() {
        const {onChange, draft, onSubmit} = this.props
        return (
            <div>
                <input 
                    type='text' onChange={onChange} value={draft} 
                />
                <button onClick={onSubmit}>Add</button>
            </div>
        )
    }
}
export default NewToDoForm







