import { 
    MEMBER_LOADED_FAIL, 
    MEMBER_LOADED_SUCCESS, 
    UPDATE_MEMBER,
    FIND_MEMBER 
} from "../utils/VariableName"

export const MemberReducer = (state,action) => {
    const {type,payload} = action
    switch (type) {
        case MEMBER_LOADED_SUCCESS:
            return {
                ...state,
                members: payload,
                membersLoading: false
            }
        
        case MEMBER_LOADED_FAIL:
            return {
                ...state,
                members: [],
                membersLoading: false
            }

        case FIND_MEMBER:
            return {
                ...state,
                nowMember:payload
            }
            
        case UPDATE_MEMBER: 
            const newMember = state.members.map(member => member._id === payload._id ? payload : member)

            return {
                ...state,
                members: newMember
            }
        
        default: 
            return state
    }
}