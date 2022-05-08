import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useEffect,useState } from 'react'
import {MemberContext } from '../../contexts/memberContext'

const UpdateMemberModal = () => {
    const {
        memberState:{nowMember},
        updateMember,
        showMemberUpdateModal,
        setShowMemberUpdateModal,
        setShowMemberToast
    } = useContext(MemberContext)

    const [newData, setNewData] = useState(nowMember)

    useEffect(() => setNewData(nowMember), [nowMember])

    const {fullName,note} = newData

    const onChangeDataForm = event => setNewData({ ...newData, [event.target.name]: event.target.value })

    const onSubmit = async event => {
		event.preventDefault()
        // console.log(newData)
		const {success, message} = await updateMember(newData)
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
                    Thêm ghi chú
                </Modal.Title>
			</Modal.Header>

            <Form onSubmit={onSubmit}>
                <Modal.Body>            
                    <h3>{fullName}</h3>

                    <Form.Group className='m-3'>
                        <Form.Label>
                            Ghi chú
                        </Form.Label>
                        <Form.Control
                            type='text'
                            name='note'
                            required
                            value={note}
                            onChange={onChangeDataForm}
                        />
					</Form.Group>
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

export default UpdateMemberModal

