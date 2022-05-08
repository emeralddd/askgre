import { 
    USER_LOADED_FAIL, 
    USER_LOADED_SUCCESS, 
    UPDATE_USER,
    FIND_USER
} from "../utils/VariableName"

export const UserReducer = (state,action) => {
    const {type,payload} = action
    switch (type) {
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                users: payload,
                usersLoading: false
            }
        
        case USER_LOADED_FAIL:
            return {
                ...state,
                users: [],
                usersLoading: false
            }

        case FIND_USER:
            return {
                ...state,
                nowUser:payload
            }
            
        case UPDATE_USER: 
            // console.log(payload)
            
            const newUser = state.users.map(user => user._id === payload._id ? payload : user)

            return {
                ...state,
                users: newUser
            }
        
        default: 
            return state
    }
}