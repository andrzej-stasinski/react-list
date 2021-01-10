import React, { Component } from 'react'
import {get, update} from '../helpers/toDoItemApi'
import {Formik} from 'formik'

export default class ToDoEditForm extends Component {

    state = {
        toDoItem: null,
        fetched: false,
    }

    itemId = () => this.props.match.params.itemId

    async componentDidMount() {
        const toDoItem = await get(this.itemId())
        console.log(toDoItem)
        this.setState({ toDoItem: toDoItem, fetched: true });
    }

    render() {
        console.log(this.props)
        return (
            <div>
                <h2>ToDoEditForm</h2>
                <h3>Edit form, Param = {this.itemId()}</h3>
                {this.state.fetched
                ? <div>
                    <p>Item fetched</p>
                    <Formik 
                        initialValues={{...this.state.toDoItem}}
                        onSubmit={(values) => {
                            console.log('submitted', values)
                            update(this.itemId(), {...values})
                        }}
                    >
                    {
                        ({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <input 
                                    name='content' 
                                    onChange={handleChange} 
                                    value={values.content}
                                />
                                <button type='submit'>Update</button>
                            </form>
                        )
                    }</Formik>
                </div>
                : <div>Loading...</div>
                }
            </div>
        )
    }
}
