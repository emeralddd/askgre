import Button from 'react-bootstrap/Button'
import {useContext} from 'react'
import {UserContext} from '../../contexts/userContext'
import editIcon from '../../assets/pencil-square.svg'
import changePasswordIcon from '../../assets/key.svg'
const UserButtons = ({_id}) => {

    const {
        findUser,
        setShowUserUpdateModal,
        setShowUserChangePasswordModal
    } = useContext(UserContext)

    const edit = async (_id) => {
        await findUser(_id)
        setShowUserUpdateModal(true)
    }

    const changePassword = async (_id) => {
        await findUser(_id)
        setShowUserChangePasswordModal(true)
    }

    return (
        <div className='buttons'>
            <Button variant='primary' className='p-2 m-1' onClick={edit.bind(this, _id)}>
                <img src={editIcon} alt='edit' className='svg-white mr-1' />
                <span>
                    Sửa thông tin
                </span>
			</Button>

            <Button variant='primary' className='p-2 m-1' onClick={changePassword.bind(this, _id)}>
                <img src={changePasswordIcon} alt='edit' className='svg-white mr-1' />
                <span>
                    Đổi mật khẩu
                </span>
			</Button>
        </div>
    )
}

export default UserButtons
