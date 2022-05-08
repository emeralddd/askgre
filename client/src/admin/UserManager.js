import {useContext, useEffect, useState} from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import UserButtons from '../components/items/UserButtons'
import {UserContext} from '../contexts/userContext'
import Toast from 'react-bootstrap/Toast'
import UpdateUserModal from '../components/form/UpdateUserModal'
import NavbarPrivate from '../components/layout/NavbarPrivate'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import ChangePasswordModal from '../components/form/ChangePasswordModal'

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
            <div className="d-flex-justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if(users.length === 0) {
        body = (
            <>
                <Card className='text-center mx-5 my-5'>
                    <Card.Header as='h1'>
                        Khum cóa thành viên lào hớt!
                    </Card.Header>
                </Card>
            </>
        )
    } else {
        body = (
            <div className='px-5'>
                {users.map(user => (
                    <div>
                        <h2>Username: {user.username}</h2>
                        <h4>Quyền: {user.permission}</h4>
                        <h4>Ban: {user.departments.join(', ')}</h4>

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
                <NavbarPrivate />    
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
                <Footer />
            </div>
        </>
    )
}

export default UserManager
