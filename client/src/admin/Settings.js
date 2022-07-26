import { useContext, useEffect, useState } from "react"
import Sidebar from "../components/layout/Sidebar"
import overviewimage from '../assets/overview-image.jpg'
import { UserContext } from "../contexts/userContext"
import { MemberContext} from "../contexts/memberContext"
import { QueueContext } from "../contexts/queueContext"
import axios from "axios"
import { apiURL } from "../utils/VariableName"

const Settings = () => {
    const {
        userState: {users}, 
        getUser,
    } = useContext(UserContext)

    const {
        memberState: {members}, 
        getMember,
    } = useContext(MemberContext)

    const {
        queueState: {queue}, 
        getQueue,
    } = useContext(QueueContext)

    const [task,setTask] = useState({
        title:'',
        active:false,
        content:'',
        deadline:''
    })

    useEffect(() => {
        getUser()
        getMember()
        getQueue()
        getTask()
    }, [])

    const getTask = async () => {
        try {
            const response = await axios.get(`${apiURL}/public/displayTask`)
            if(response.data.success) {
                setTask(response.data.payload)
            }
        } catch (error) {

        }
    }

    return (
        <>
            <div className='page'>
                <div className="dashboard">
                    <Sidebar page="settings"/>
                    
                    <div className="content">
                        Settings
                        
                        <div>
                            In Development
                        </div>
                    </div>

                    
                </div>         
            </div>
        </>
    )
}

export default Settings
