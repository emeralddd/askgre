import Button from 'react-bootstrap/Button'
import {useContext} from 'react'
import {MemberContext} from '../../contexts/memberContext'
import editIcon from '../../assets/pencil-square.svg'
import finishIcon from '../../assets/check2-square.svg'
import definishIcon from '../../assets/x-square.svg'
const ActionButtons = ({_id,note}) => {

    const {
        updateMember,
        findMember,
        setShowMemberUpdateModal,
        setShowMemberToast
    } = useContext(MemberContext)


    const update = async (_id) => {
        await findMember(_id)
        setShowMemberUpdateModal(true)
    }

    const finish = (_id) => {
        updateMember({
            _id,
            finished:true,
            note
        })
        
        setShowMemberToast({
            show: true,
		    message: 'Thành công',
		    type: 'success'
        })
    }

    const definish = (_id) => {
        updateMember({
            _id,
            finished:false,
            note
        })

        setShowMemberToast({
            show: true,
		    message: 'Thành công',
		    type: 'success'
        })
    }

    return (
        <div className='buttons'>
            <Button variant='primary' className='p-2 m-1' onClick={update.bind(this, _id)}>
                <img src={editIcon} className='svg-white mr-1' alt='edit' />
                <span>
                    Ghi chú
                </span>
			</Button>
            <Button variant='primary' className='p-2 m-1' onClick={finish.bind(this,_id)}>
                <img src={finishIcon} className='svg-white mr-1' alt='finish' />
                <span>
                    Đã hoàn thành
                </span>
			</Button>
            <Button variant='primary' className='p-2 m-1' onClick={definish.bind(this,_id)}>
                <img src={definishIcon} className='svg-white mr-1' alt='definish' />
                <span>
                    Chưa hoàn thành
                </span>
			</Button>
        </div>
    )
}

export default ActionButtons
