import Button from 'react-bootstrap/Button'
import {useContext} from 'react'
import {MemberContext} from '../../contexts/memberContext'
import editIcon from '../../assets/pencil-square.svg'
const ProfileButtons = ({_id}) => {

    const {
        findMember,
        setShowMemberUpdateModal,
    } = useContext(MemberContext)

    const update = async (_id) => {
        await findMember(_id)
        setShowMemberUpdateModal(true)
    }

    return (
        <div className='buttons'>
            <Button variant='primary' className='p-2 m-1' onClick={update.bind(this, _id)}>
                <img src={editIcon} className='svg-white mr-1' alt='edit' />
                <span>
                    Sửa thông tin
                </span>
			</Button>
        </div>
    )
}

export default ProfileButtons
