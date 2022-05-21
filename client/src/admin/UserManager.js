import {useContext, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import UserButtons from '../components/items/UserButtons'
import {UserContext} from '../contexts/userContext'
import Toast from 'react-bootstrap/Toast'
import UpdateUserModal from '../components/form/UpdateUserModal'
import Sidebar from '../components/layout/Sidebar'
import ChangePasswordModal from '../components/form/ChangePasswordModal'
import LoadingSpinner from '../components/items/LoadingSpinner'

const UserManager = () => {
    const {
        userState: {users,usersLoading}, 
        getUser,
        showUserToast: {show,message,type},
        setShowUserToast,
    } = useContext(UserContext)

    useEffect(() => {
        getUser()
    }, [])

    let body = null

    if(usersLoading) {
        body = (
            <LoadingSpinner />
        )
    } else if(users.length === 0) {
        body = (
            <>
                <Card className='text-center'>
                    <Card.Header as='h1'>
                        Danh sách trống!
                    </Card.Header>
                </Card>
            </>
        )
    } else {
        body = (
            <div className='member'>
                {users.map(user => (
                    <div>
                        <p className='name'>{user.username}</p>
                        <p className='defino'>Quyền: {user.permission}</p>
                        <p className='defino'>Ban: {user.departments.join(', ')}</p>

                        <UserButtons _id={user._id} />

                        <hr />
                    </div>
                ))}
            </div>
        )
    }

    return (
        <>
            <div className='page'>  
                <div className="dashboard">
                    <Sidebar page="users"/>
                    <div className="content">
                        <UpdateUserModal />
                        <ChangePasswordModal />
                        <p>
                            Users Manager
                        </p>

                        {body}

                        <Toast
                            show={show}
                            style={{
                                position: 'fixed', 
                                top: '15%', 
                                right: '15px' 
                            }}
                            className={`bg-${type} text-white`}
                            onClose={setShowUserToast.bind(this, {
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

export default UserManager
