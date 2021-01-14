import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router'


const NotFound = (props) => {
    let [counter, setCounter] = useState(5)
    const countdown = () => {
        console.log(counter)
        setCounter(counter - 1)
    }

    useEffect(() => {
        console.log('useEffect')
        let id = setTimeout(countdown, 1000)
        return () => {
            console.log('UNMOUNT')
            return clearTimeout(id)
        }        
    },[counter])

    // console.log(props)
    // console.log(counter)
    return (
        <div onClick={countdown}>
            <h2>Sorry, Page not Found</h2>
            <h3>Not match for <code>{props.location.pathname}</code></h3>
            <h3>Redirect to Homepage for {counter} seconds</h3>
            {counter === 0 && <Redirect to='/' /> }
        </div>
    )
}

export default NotFound
