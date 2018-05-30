import axios from "axios";
import { GET_ERRORS, SET_CURRENT_USER } from './types'
import setAuthToken from '../utils/sethAuthToken'
import jwt_decode from 'jwt-decode'

export const registerUser = (userData, history) => dispatch => {
    axios
        .post('/api/users/register', userData)
        .then(res => history.push('/login'))
        .catch(err =>
            dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            })
        )
}


//Login User-get token
export const loginUser = (userData) => dispatch => {
    axios.post('/api/users/login', userData)
    .then( res => {
        //Save to localStorage
        const{ token } = res.data
        //Set token to LS
        localStorage.setItem('jwtoken', token)
        //Set token to auth header
        setAuthToken(token)
        //Decode token yo get User data
        const decoded = jwt_decode(token)
        //Set current user
        dispatch(setCurrentUser(decoded))
    })
    .catch(err => dispatch({
        type: GET_ERRORS,
        payload: err.response.data
        }))
}

//Set logged User
export const setCurrentUser = decoded => {
    return {
        type: SET_CURRENT_USER,
        payload: decoded
    }
}