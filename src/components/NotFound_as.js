import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router'


const NotFound = (props) => {
    let [counter, setCounter] = useState(5)
    let [intervalId, setIntervalId] = useState(null)

    const countdown = () => {
        console.log(counter)
        setCounter(counter--)
    }

    useEffect(() => {
        console.log('useEffect')
        intervalId = setInterval(countdown, 1000)
        setIntervalId(intervalId)
    },[])
    useEffect(() => {
        return () => {
            console.log('UNMOUNT');
            clearInterval(intervalId)
        }
    }, []); 

    // console.log(props)
    // console.log(counter)
    return (
        <div>
            <h2>Sorry, Page not Found</h2>
            <h3>Not match for <code>{props.location.pathname}</code></h3>
            <h3>Redirect to Homepage for {counter} seconds</h3>
            {counter === -1 && <Redirect to='/' /> }
        </div>
    )
}

export default NotFound
