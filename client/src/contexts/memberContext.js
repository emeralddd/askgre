import { createContext,useReducer,useState} from "react"
import { MemberReducer } from '../reducer/memberReducer'
import { 
    apiURL,
    MEMBER_LOADED_FAIL,
    MEMBER_LOADED_SUCCESS,
    FIND_MEMBER,
    UPDATE_MEMBER 
} from "../utils/VariableName"
import axios from "axios"

export const MemberContext = createContext()

const MemberContextProvider = ({children}) => {
    const [memberState,dispatch] = useReducer(MemberReducer, {
        nowMember: {
            finished:false,
            _id:"",
            firstName:"",
            lastName:"",
            fullName:"",
            department:"",
            note:""
        },
        members: [],
        membersLoading: true
    })

    const [showMemberUpdateModal, setShowMemberUpdateModal] = useState(false)
	
	const [showMemberToast, setShowMemberToast] = useState({
		show: false,
		message: '',
		type: null
	})

    const getMember = async() => {
        try {
            const response = await axios.get(`${apiURL}/admin/getAllMembersMedia`)

            if(response.data.success) {
                dispatch({
                    type: MEMBER_LOADED_SUCCESS,
                    payload: response.data.payload
                })
            }
        } catch (error) {
            dispatch({type: MEMBER_LOADED_FAIL})
        }
    }

    const updateMember = async newData => {
        try {
            const response = await axios.put(`${apiURL}/admin/updateMemberTask`,newData)
            if(response.data.success) {
                dispatch({
                    type:UPDATE_MEMBER,
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

    const updateProfile = async newData => {
        try {
            const response = await axios.put(`${apiURL}/admin/editMemberProfile`,newData)
            if(response.data.success) {
                dispatch({
                    type:UPDATE_MEMBER,
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

    const findMember = async _id => {
        const member = memberState.members.find(member => {
            return member._id === _id
        })
        dispatch({
            type: FIND_MEMBER, 
            payload: member
        })
        return member
    }

    const MemberContextData = {
        memberState, 
        getMember,
        showMemberUpdateModal,
        setShowMemberUpdateModal,
        showMemberToast,
        setShowMemberToast,
        findMember,
        updateMember,
        updateProfile
    }

    return (
        <MemberContext.Provider value={MemberContextData}>
            {children}
        </MemberContext.Provider>
    )
}

export default MemberContextProvider
