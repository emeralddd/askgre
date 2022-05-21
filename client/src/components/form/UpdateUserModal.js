import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Table from 'react-bootstrap/Table'
import { useContext,useEffect,useState } from 'react'
import { UserContext } from '../../contexts/userContext'

const UpdateUserModal = () => {
    const {
        userState:{nowUser},
        editUser,
        showUserUpdateModal,
        setShowUserUpdateModal,
        setShowUserToast
    } = useContext(UserContext)

    const [newData, setNewData] = useState(nowUser)

    const [newDepartment, setNewDepartment] = useState("")

    useEffect(() => setNewData(nowUser), [nowUser])

    const {username,permission,departments} = newData

    const onChangeDataForm = event => {
        // console.log(nowUser)
        setNewData({ ...newData, [event.target.name]: event.target.value })
    }

    const onChangeNewDepartment = event => {
        setNewDepartment(event.target.value)
    }

    const addNewDepartment = () => {
        if(newDepartment!==''&&(!departments.includes(newDepartment))) 
            setNewData({...newData, departments:[...departments,newDepartment]})

        setNewDepartment("")
    }

    // const onChangeDataArrayForm = event => {
    //     // console.log(departments.slice())
    //     let ddd = departments.slice()
    //     // console.log(ddd)
    //     ddd[event.target.id-1]=event.target.value
    //     setNewData({...newData, [event.target.name]: ddd})
    // }

    const onSubmit = async event => {
		event.preventDefault()
        // console.log(newData)
		const {success, message} = await editUser(newData)
        setShowUserToast({ 
            show: true, 
            message, 
            type: success ? 'success' : 'danger' 
        })
		resetNewData()
	}

    const resetNewData = () => {
        // console.log(nowUser)
		setNewData(nowUser)
		setShowUserUpdateModal(false)
	}

    const deleteDepartment = index => {
        let ddd = departments.slice()
        ddd.splice(index,1)
        setNewData({...newData, departments: ddd})
    }

    return (
        <Modal  
            size="lg" 
            show={showUserUpdateModal} 
            onHide={resetNewData} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
				<Modal.Title>
                    Sửa thông tin tài khoản
                </Modal.Title>
			</Modal.Header>

            <Form onSubmit={onSubmit}>
                <Modal.Body>            
                    <h3>{nowUser.username}</h3>

                    <Form.Group className='mb-3 mx-3'>
                        <Form.Label>
                            Username
                        </Form.Label>
                        <Form.Control
                            type='text'
                            name='username'
                            required
                            value={username}
                            onChange={onChangeDataForm}
                        />
					</Form.Group>

                    <Form.Group className='mb-3 mx-3'>
                        <Form.Label>
                            Quyền
                        </Form.Label>
                        <Form.Control
                            type='text'
                            name='permission'
                            required
                            value={permission}
                            onChange={onChangeDataForm}
                        />
					</Form.Group>

                    <Form.Group className='mb-3 mx-3'>
                        <Form.Label>
                            Ban
                        </Form.Label>
                        
                        <Table hover responsive>
                            <tbody>
                                {
                                    departments.map((department,index) => (
                                        <tr>
                                            <td className='departmentParent'>
                                                <div className='devisible'>
                                                    {department}
                                                </div> 
                                                {/* <div className='deinvisible'>
                                                    <Form.Control
                                                        type='text'
                                                        name='departments'
                                                        required={true}
                                                        id={index+1}
                                                        value={department}
                                                        onChange={onChangeDataArrayForm}
                                                    />
                                                </div> */}
                                            </td>
                                            <td>
                                                <div className='text-right'>
                                                    <Button variant='danger' onClick={deleteDepartment.bind(this,index)}>
                                                        Xóa Ban
                                                    </Button>
                                                </div>
                                                
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                        
                        <Form.Control
                            type='text'
                            name='newDepartment'
                            value={newDepartment}
                            onChange={onChangeNewDepartment}
                            className='mb-2'
                        />

                        <Button variant='primary' onClick={addNewDepartment}>
                            Thêm Ban
                        </Button>

					</Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={resetNewData}>
						Hủy bỏ
					</Button>
					<Button variant='primary' type='submit'>
						Cập nhật
					</Button>
                </Modal.Footer>   
            </Form>
        </Modal>
    )
}

export default UpdateUserModal

