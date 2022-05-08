import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useEffect,useState } from 'react'
import {MemberContext } from '../../contexts/memberContext'

const UpdateProfileModal = () => {
    const {
        memberState:{nowMember},
        updateProfile,
        showMemberUpdateModal,
        setShowMemberUpdateModal,
        setShowMemberToast
    } = useContext(MemberContext)

    const [newData, setNewData] = useState(nowMember)

    useEffect(() => setNewData(nowMember), [nowMember])

    const {fullName,firstName,lastName,department} = newData

    const onChangeDataForm = event => setNewData({ ...newData, [event.target.name]: event.target.value })

    const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await updateProfile(newData)
        setShowMemberToast({ 
            show: true, 
            message, 
            type: success ? 'success' : 'danger' 
        })
		resetNewData()
	}

    const resetNewData = () => {
		setNewData(nowMember)
		setShowMemberUpdateModal(false)
	}

    const fields = [
        {
            name:'fullName',
            label:'Họ tên',
            value:fullName
        },
        {
            name:'firstName',
            label:'Tên',
            value:firstName
        },
        {
            name:'lastName',
            label:'Họ',
            value:lastName
        },
        {
            name:'department',
            label:'Ban',
            value:department
        }
    ]

    return (
        <Modal  
            size="lg" 
            show={showMemberUpdateModal} 
            onHide={resetNewData} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
				<Modal.Title>
                    Sửa thông tin
                </Modal.Title>
			</Modal.Header>

            <Form onSubmit={onSubmit}>
                <Modal.Body>            
                    {
                        fields.map(field => (
                            <Form.Group className='m-3'>
                                <Form.Label>
                                    {field.label}
                                </Form.Label>
                                <Form.Control
                                    type='text'
                                    name={field.name}
                                    required
                                    value={field.value}
                                    onChange={onChangeDataForm}
                                />
                            </Form.Group>
                        ))
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={resetNewData}>
						Cancel
					</Button>
					<Button variant='primary' type='submit'>
						Cập nhật
					</Button>
                </Modal.Footer>   
            </Form>
        </Modal>
    )
}

export default UpdateProfileModal

