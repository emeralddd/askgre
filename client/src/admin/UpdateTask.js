import axios from "axios"
import { useEffect, useState } from "react"
import Spinner from "react-bootstrap/Spinner"
import Form from "react-bootstrap/Form"
import Sidebar from "../components/layout/Sidebar"
import { apiURL } from "../utils/VariableName"
import Toast from "react-bootstrap/Toast"
import Button from "react-bootstrap/Button"

const UpdateTask = () => {

    const [taskState, setTaskState] = useState({
        loading: true,
        success: 0
    })

    const [newData,setNewData] = useState({
        title:'',
        active:false,
        content:'',
        deadline:''
    })

    const [showToast,setShowToast] = useState({
        show: false,
		message: '',
		type: null
    })

    const find = async () => {
        try {
            const response = await axios.get(`${apiURL}/public/displayTask`)
            if(response.data.success) {
                setTaskState({
                    loading: false,
                    success: 200
                })
                
                setNewData(response.data.payload)
            }
        } catch (error) {
            setTaskState({
                loading: false,
                success: 404,
            })
        }
    }

    const updateTask = async (newData) => {
        try {
            const response = await axios.put(`${apiURL}/admin/updateTask`,newData)
            if(response.data.success) {
                setTaskState({
                    loading: false,
                    success: 200
                })
                
                setNewData(response.data.payload)    
            }
            return response.data
        } catch (error) {
            setTaskState({
                loading: false,
                success: 404,
            })
            return {
                success:false,
                message:error.message
            }
        }
    }
    
    useEffect(() => {
        find()
    }, [])

    const {title,active,content,deadline} = newData

    const {message,show,type} = showToast

    const onChangeDataForm = event => {
        if(event.target.type === 'checkbox') setNewData({ ...newData, [event.target.id]: event.target.checked })
        else setNewData({ ...newData, [event.target.name]: event.target.value })
    }

    const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await updateTask(newData)
        setShowToast({ 
            show: true, 
            message, 
            type: success ? 'success' : 'danger' 
        })
		// resetNewData()
	}

    let body = null
    
    if(taskState.loading) {
        body = (
            <div className="d-flex-justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if(taskState.success === 404) {
        body = (
            <>
                <h1>404</h1>
                <h3>Không Tồn Tại</h3>
            </>
        )
    } else {
        body = (
            <>
                <Form onSubmit={onSubmit} className='form-box'>        
                    <div className="group">
                        <p className="title">Tiêu đề</p>
                        <Form.Control
                            type='text'
                            name='title'
                            className="field"
                            required
                            value={title}
                            onChange={onChangeDataForm}
                        />
                    </div>
                    
                    <div className="group">
                        <p className="title">Đang diễn ra?</p>

                        <input type="checkbox" id="active" className="check" checked={active} onChange={onChangeDataForm} />
                        <span className="checkmark"></span>
                    </div>
                    
                    <div className="group">
                        <p className="title">Nội dung</p>
                        <Form.Control
                            as='textarea'
                            rows={5}
                            name='content'
                            className="field"
                            required
                            value={content}
                            onChange={onChangeDataForm}
                        />
                    </div>
                    
                    <div className="group">
                        <p className="title">Hạn</p>
                        <Form.Control
                            type='text'
                            name='deadline'
                            className="field"
                            required
                            value={deadline}
                            onChange={onChangeDataForm}
                        />
                    </div>

                    <Button variant='primary' type='submit'>
						Cập nhật
					</Button>
                </Form>
            </>
        )
    }

    return (
        <>  
            <div className="page">
                <div className="dashboard">
                    <Sidebar page="task"/>
                    <div className="content">
                        <p>Update Task</p>

                        <div>
                            {body}
                        </div>

                        <Toast
                            show={show}
                            style={{ 
                                position: 'fixed', 
                                top: '15%', 
                                right: '15px' 
                            }}
                            className={`bg-${type} text-white`}
                            onClose={setShowToast.bind(this, {
                                show: false,
                                message: '',
                                type: null
                            })}
                            delay={2000}
                            autohide
                        >
                            <Toast.Body>
                                <strong>{message}</strong>
                            </Toast.Body>
                        </Toast>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UpdateTask
