import { createContext,useReducer,useState} from "react"
import { UserReducer } from '../reducer/userReducer'
import { 
    apiURL,
    USER_LOADED_FAIL,
    USER_LOADED_SUCCESS,
    FIND_USER,
    UPDATE_USER 
} from "../utils/VariableName"
import axios from "axios"

export const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const [userState,dispatch] = useReducer(UserReducer, {
        nowUser: {
            _id:"",
            username:"",
            permission:"",
            departments:[]
        },
        users: [],
        usersLoading: true
    })

    const [showUserUpdateModal, setShowUserUpdateModal] = useState(false)

    const [showUserChangePasswordModal, setShowUserChangePasswordModal] = useState(false)
	
	const [showUserToast, setShowUserToast] = useState({
		show: false,
		message: '',
		type: null
	})

    const getUser = async() => {
        try {
            const response = await axios.get(`${apiURL}/admin/getAllUsers`)

            if(response.data.success) {
                dispatch({
                    type: USER_LOADED_SUCCESS,
                    payload: response.data.payload
                })
            }
        } catch (error) {
            dispatch({type: USER_LOADED_FAIL})
        }
    }

    const editUser = async newData => {
        console.log(newData)

        try {
            const response = await axios.put(`${apiURL}/admin/editUser`,newData)
            if(response.data.success) {
                dispatch({
                    type:UPDATE_USER,
                    payload:response.data.payload
                })
                return response.data
            }
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const changeUserPassword = async newData => {
        try {
            const response = await axios.put(`${apiURL}/admin/changeUserPassword`,newData)
            if(response.data.success) {
                dispatch({
                    type:UPDATE_USER,
                    payload:response.data.payload
                })
                return response.data
            }
        } catch (error) {
            if(error.response.data) {
                return error.response.data
            } else return {
                success: false,
                message: error.message
            }
        }
    }

    const findUser = async _id => {
        const user = userState.users.find(user => {
            return user._id === _id
        })
        dispatch({
            type: FIND_USER, 
            payload: user
        })
        return user
    }

    const UserContextData = {
        userState, 
        getUser,
        showUserUpdateModal,
        setShowUserUpdateModal,
        showUserToast,
        setShowUserToast,
        showUserChangePasswordModal, 
        setShowUserChangePasswordModal,
        findUser,
        editUser,
        changeUserPassword
    }

    return (
        <UserContext.Provider value={UserContextData}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContextProvider
