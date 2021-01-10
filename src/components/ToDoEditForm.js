import React, { Component } from 'react'
import {get, update} from '../helpers/toDoItemApi'
import {Formik} from 'formik'
import {Link} from 'react-router-dom'
import {SubmitButton, TextInput, Label, Select, ErrorMsg} from '../helpers/theme'
import {withRouter} from 'react-router-dom'
import * as _ from 'ramda'

class ToDoEditForm extends Component {

    state = {
        toDoItem: null,
        fetched: false,
        disabled: false,
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
                            this.props.history.push('/')
                        }}
                        validate={(values) => {
                            let errors = {}
                            if(!values.content) {
                                errors.content = 'Required'
                            } else 
                            if(values.content.length < 4) {
                                errors.content = 'Too short, min 4 characters'
                            } else 
                            if(values.content.includes('ass') || values.content.includes('pussy')) {
                                errors.content = 'Change your language'
                            }
                            if(_.isEmpty(errors)) {
                                this.setState({ disabled: false });
                            } else {
                                this.setState({ disabled: true });
                            }
                            return errors
                        }}
                        render={({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                            isSubmitting
                        }) => (
                            <form onSubmit={handleSubmit}>
                                <Label>
                                    Content *
                                    <ErrorMsg>{errors.content}</ErrorMsg>
                                    <TextInput 
                                        name='content' 
                                        onChange={handleChange} 
                                        value={values.content}
                                    />                                    
                                </Label>

                                <Label>
                                    Priority
                                    <Select 
                                        name='priority' 
                                        onChange={handleChange}
                                        value={values.priority}
                                    >
                                        <option value='low'>Low</option>
                                        <option value='high'>Hight</option>
                                        <option value='urgent'>Urgent</option>
                                    </Select>
                                </Label>

                                <Label>
                                    Important
                                    <TextInput 
                                        name='important' 
                                        onChange={handleChange} 
                                        value={values.important}
                                    />                                    
                                </Label>

                                <Label>
                                    Done?
                                    <input type='checkbox' name='done'
                                        value={values.done}
                                        checked={values.done}
                                        onChange={handleChange}
                                    />
                                </Label>

                                <SubmitButton type='submit' disabled={this.state.disabled}
                                >
                                    Update
                                </SubmitButton>
                            </form>
                        )}
                    />
                    <br/>
                    <Link to='/' style={{color: '#aaa'}}>HomePage</Link>
                </div>
                : <div>Loading...</div>
                }
            </div>
        )
    }
}

export default withRouter(ToDoEditForm)
