import Button from 'react-bootstrap/Button'
import {useContext} from 'react'
import {QueueContext} from '../../contexts/queueContext'
import editIcon from '../../assets/check2-square.svg'
const VerifyButtons = ({_id}) => {
    const {
        findQueue,
        setShowQueueUpdateModal,
    } = useContext(QueueContext)


    const update = async (_id) => {
        await findQueue(_id)
        setShowQueueUpdateModal(true)
    }

    return (
        <div className='buttons'>
            <Button variant='primary' className='p-2 m-1' onClick={update.bind(this, _id)}>
                <img src={editIcon} alt='edit' className='svg-white mr-1' />
                <span>
                    Xác minh
                </span>
			</Button>
        </div>
    )
}

export default VerifyButtons
