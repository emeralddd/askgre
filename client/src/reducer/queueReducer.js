import { 
    QUEUE_LOADED_FAIL, 
    QUEUE_LOADED_SUCCESS, 
    UPDATE_QUEUE,
    FIND_QUEUE 
} from "../utils/VariableName"

export const QueueReducer = (state,action) => {
    const {type,payload} = action
    switch (type) {
        case QUEUE_LOADED_SUCCESS:
            return {
                ...state,
                queue: payload,
                queueLoading: false
            }
        
        case QUEUE_LOADED_FAIL:
            return {
                ...state,
                queue: [],
                queueLoading: false
            }

        case FIND_QUEUE:
            return {
                ...state,
                nowAccount:payload
            }
            
        case UPDATE_QUEUE: 
            let newQueue = []
            for(const account of state.queue){
                if(account._id!==payload._id) newQueue=[...newQueue,account]
            }

            return {
                ...state,
                queue: newQueue
            }
        
        default: 
            return state
    }
}