import { useContext, useEffect, useState } from "react"
import Sidebar from "../components/layout/Sidebar"
import overviewimage from '../assets/overview-image.jpg'
import { UserContext } from "../contexts/userContext"
import { MemberContext} from "../contexts/memberContext"
import { QueueContext } from "../contexts/queueContext"
import axios from "axios"
import { apiURL } from "../utils/VariableName"

const Overview = () => {
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
                    <Sidebar page="overview"/>
                    
                    <div className="content">
                        Overview

                        <div className="image-box">
                            <img className="image" src={overviewimage} />
                        </div>

                        <div className="data-box">
                            <div className="number">
                                <div className="box">
                                    There are {queue.length} members in queue!
                                </div>

                                <div className="total">
                                    <div className="box">
                                        <p className="ctnt">
                                            Total members
                                        </p>
                                        
                                        <p className="num">
                                            {members.length}
                                        </p>
                                    </div>

                                    <div className="box">
                                        <p className="ctnt">
                                            Total users
                                        </p>
                                        
                                        <p className="num">
                                            {users.length}
                                        </p>
                                    </div>
                                </div>

                                <div className="box-flr">
                                    <p className="ctnt">
                                        Sent but not checked yet
                                    </p>
                                    <p className="num">
                                        {members.filter(member => (!member.finished && member.sentMedia.length!==0)).length}
                                    </p>
                                </div>

                                <div className="box-flr">
                                    <p className="ctnt">
                                    Checked
                                    </p>
                                    <p className="num">
                                        {members.filter(member => (member.finished)).length}
                                    </p>
                                </div>

                                <div className="box-flr">
                                    <p className="ctnt">
                                        Unsent
                                    </p>
                                    <p className="num">
                                        {members.filter(member => (!member.finished && member.sentMedia.length===0)).length}
                                    </p>
                                </div>
                            </div>

                            <div className="task">
                                <p>
                                    Task
                                </p>

                                <p className={`status-${task.active?`active`:`none`}`}>
                                    {task.active?'Active':'None'}
                                </p>

                                <p className="what">
                                    Title
                                </p>

                                <p className="ctnt">
                                    {task.title}
                                </p>

                                <p className="what">
                                    Contents
                                </p>

                                <p className="ctnt">
                                    {task.content}
                                </p>

                                <p className="what">
                                    Deadline
                                </p>

                                <p className="ctnt">
                                    {task.deadline}
                                </p>
                            </div>

                        </div>

                    </div>
                </div>         
            </div>
        </>
    )
}

export default Overview
