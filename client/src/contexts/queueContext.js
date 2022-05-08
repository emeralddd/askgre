import { createContext,useReducer,useState} from "react"
import { QueueReducer } from '../reducer/queueReducer'
import { 
    apiURL,
    QUEUE_LOADED_FAIL,
    QUEUE_LOADED_SUCCESS,
    FIND_QUEUE,
    UPDATE_QUEUE
} from "../utils/VariableName"
import axios from "axios"

export const QueueContext = createContext()

const QueueContextProvider = ({children}) => {
    const [queueState,dispatch] = useReducer(QueueReducer, {
        nowAccount: {
            _id:"",
            firstName:"",
            lastName:"",
            fullName:"",
            department:""
        },
        queue: [],
        queueLoading: true
    })

    const [showQueueUpdateModal, setShowQueueUpdateModal] = useState(false)
	
	const [showQueueToast, setShowQueueToast] = useState({
		show: false,
		message: '',
		type: null
	})

    const getQueue = async() => {
        try {
            const response = await axios.get(`${apiURL}/admin/getQueue`)

            if(response.data.success) {
                dispatch({
                    type: QUEUE_LOADED_SUCCESS, 
                    payload: response.data.payload
                })
            }
        } catch (error) {
            dispatch({type: QUEUE_LOADED_FAIL})
        }
    }

    const updateQueue = async newData => {
        try {
            const response = await axios.put(`${apiURL}/admin/verifyMember`,newData)
            if(response.data.success) {
                dispatch({
                    type:UPDATE_QUEUE,
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

    const findQueue = async _id => {
        const account = queueState.queue.find(account => {
            return account._id === _id
        })
        dispatch({type: FIND_QUEUE, payload: account})
        return account
    }

    const QueueContextData = {
        queueState, 
        getQueue,
        showQueueUpdateModal,
        setShowQueueUpdateModal,
        showQueueToast,
        setShowQueueToast,
        findQueue,
        updateQueue
    }

    return (
        <QueueContext.Provider value={QueueContextData}>
            {children}
        </QueueContext.Provider>
    )
}

export default QueueContextProvider
