import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { useContext,useEffect,useState } from 'react'
import {QueueContext } from '../../contexts/queueContext'

const UpdateVerifyModal = () => {
    const {
        queueState:{nowAccount},
        updateQueue,
        setShowQueueUpdateModal,
        setShowQueueToast,
        showQueueUpdateModal
    } = useContext(QueueContext)

    const [newData, setNewData] = useState(nowAccount)

    useEffect(() => setNewData(nowAccount), [nowAccount])

    const {firstName,lastName,fullName,department} = newData

    const onChangeDataForm = event => setNewData({ ...newData, [event.target.name]: event.target.value })

    const onSubmit = async event => {
		event.preventDefault()
		const {success, message} = await updateQueue(newData)
        setShowQueueToast({ 
            show: true, 
            message, 
            type: success ? 'success' : 'danger' 
        })
		resetNewData()
	}

    const resetNewData = () => {
		setNewData(nowAccount)
		setShowQueueUpdateModal(false)
	}

    return (
        <Modal  
            size="lg" 
            show={showQueueUpdateModal} 
            onHide={resetNewData} 
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
				<Modal.Title>
                    Xác minh
                </Modal.Title>
			</Modal.Header>

            <Form onSubmit={onSubmit}>
                <Modal.Body>            
                    <h4>Họ: {lastName}</h4>
                    <h4>Tên: {firstName}</h4>

                    <Form.Group className='mb-3 mx-3'>
                        <Form.Label>
                            Họ tên
                        </Form.Label>
                        <Form.Control
                            type='text'
                            name='fullName'
                            required
                            value={fullName}
                            onChange={onChangeDataForm}
                        />
					</Form.Group>

                    <Form.Group className='mb-3 mx-3'>
                        <Form.Label>
                            Ban
                        </Form.Label>
                        <Form.Control
                            type='text'
                            name='department'
                            required
                            value={department}
                            onChange={onChangeDataForm}
                        />
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

export default UpdateVerifyModal

