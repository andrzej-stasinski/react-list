
export const get = url => 
    new Promise((resolve, reject) => {
        fetch(url)
        .then(res => res.json())
        .then(data => resolve(data))
        .catch(err => {
            console.log(err.message)
            console.log('Run server REST API to get data')
        })
    })

export const apiCall = (url, method, body, resolve, reject) => 
    fetch(url, {
        method: method,
        headers: {
          'Content-type': 'application/json',
        },         
        body: JSON.stringify(body)
    }).then(res => {
        if(res.ok) {
            res.json().then(data => resolve(data))
        } else {
            reject(res)
        }
    })

export const post = (url, body) => 
    new Promise((resolve, reject) => apiCall(url, 'POST', body, resolve, reject))

export const put = (url, body) => 
    new Promise((resolve, reject) => apiCall(url, 'PUT', body, resolve, reject))

export const destroy = url => 
    new Promise(
        (resolve, reject) => {
            fetch(url, {
                method: 'DELETE',
                headers: {
                  'Content-type': 'application/json',
                },
            }).then(res => {
                if(res.ok) {
                    resolve(res)
                } else {
                    reject(res)
                }
            })    
        }
    )

























