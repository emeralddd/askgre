import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useEffect,useState } from 'react'
import { UserContext } from '../../contexts/userContext'
import axios from 'axios'
import { apiURL } from '../../utils/VariableName'

const ChangePasswordModal = () => {
    const {
        userState:{nowUser},
        showUserChangePasswordModal,
        setShowUserChangePasswordModal,
        setShowUserToast
    } = useContext(UserContext)

    const [newPassword, setNewPassword] = useState("")

    useEffect(() => setNewPassword(""), [])

    const onChangeDataForm = event => {
        setNewPassword(event.target.value)
    }

    const onSubmit = async event => {
		event.preventDefault()

		const response = await axios.put(`${apiURL}/admin/changeUserPassword`,{
            username:nowUser.username,
            newPassword:newPassword
        })

        // console.log

        const {success,message} = response.data
        setShowUserToast({ 
            show: true,
            message,
            type: success ? 'success' : 'danger' 
        })
		resetNewData()
	}

    const resetNewData = () => {
		setNewPassword("")
		setShowUserChangePasswordModal(false)
	}

    return (
        <Modal  
            size="lg"
            show={showUserChangePasswordModal}
            onHide={resetNewData}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
				<Modal.Title>
                    Đổi mật khẩu
                </Modal.Title>
			</Modal.Header>

            <Form onSubmit={onSubmit}>
                <Modal.Body>
                    <h3>{nowUser.username}</h3>

                    <Form.Group className='mb-3 mx-3'>
                        <Form.Control
                            type='password'
                            name='newPassword'
                            required
                            value={newPassword}
                            onChange={onChangeDataForm}
                        />
					</Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant='secondary' onClick={resetNewData}>
						Hủy bỏ
					</Button>
					<Button variant='primary' type='submit'>
                        Đổi mật khẩu
					</Button>
                </Modal.Footer>   
            </Form>
        </Modal>
    )
}

export default ChangePasswordModal

