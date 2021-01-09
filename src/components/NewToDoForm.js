import React from 'react'

const NewToDoForm = (props) => {
    const {onChange, draft, onSubmit} = props
    return (
        <div>
                <input 
                    type='text' onChange={onChange} value={draft} 
                />
                <button onClick={onSubmit}>Add</button>            
        </div>
    )
}
export default NewToDoForm








