import {toDoItemApiUrl} from './routes'
import * as api from './api'

export const getAll = () => api.get(toDoItemApiUrl())

export const get = id => 
    api.get(toDoItemApiUrl(id))

export const create = params => {
    console.log(params)
    return api.post(toDoItemApiUrl(), {...params})
}

export const destroy = id => 
    api.destroy(toDoItemApiUrl(id))

export const update = (id, params) => 
    api.put(toDoItemApiUrl(id), {...params})















