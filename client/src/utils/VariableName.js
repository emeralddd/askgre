export const apiURL = process.env.NODE_ENV !== 'production' ? 'http://localhost:4000/api' : 'https://rsbotserver.herokuapp.com/api'
//http://localhost:3030/api
export const LOCAL_STORAGE_TOKEN_NAME = 'dlm-admin'

export const SET_AUTH = 'SET_AUTH'

export const MEMBER_LOADED_SUCCESS = 'MEMBER_LOADED_SUCCESS'

export const MEMBER_LOADED_FAIL = 'MEMBER_LOADED_FAIL'

export const MEMBER_UPDATE = 'MEMBER_UPDATE'

export const FIND_MEMBER = 'FIND_MEMBER'

export const UPDATE_MEMBER = 'UPDATE_MEMBER'

export const QUEUE_LOADED_SUCCESS = 'QUEUE_LOADED_SUCCESS'

export const QUEUE_LOADED_FAIL = 'QUEUE_LOADED_FAIL'

export const QUEUE_UPDATE = 'QUEUE_UPDATE'

export const FIND_QUEUE = 'FIND_QUEUE'

export const UPDATE_QUEUE = 'UPDATE_QUEUE'

export const USER_LOADED_SUCCESS = 'USER_LOADED_SUCCESS'

export const USER_LOADED_FAIL = 'USER_LOADED_FAIL'

export const USER_UPDATE = 'USER_UPDATE'

export const FIND_USER = 'FIND_USER'

export const UPDATE_USER = 'UPDATE_USER'