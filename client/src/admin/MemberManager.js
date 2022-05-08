import {useContext, useEffect, useState} from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import ProfileButtons from '../components/items/ProfileButtons'
import {MemberContext} from '../contexts/memberContext'
import Toast from 'react-bootstrap/Toast'
import UpdateProfileModal from '../components/form/UpdateProfileModal'
import NavbarPrivate from '../components/layout/NavbarPrivate'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'

const MemberManager = () => {
    const {
        memberState: {members,membersLoading}, 
        getMember,
        showMemberToast: {show,message,type},
        setShowMemberToast,
    } = useContext(MemberContext)

    useEffect(() => {
        getMember()
    }, [])

    let body = null

    if(membersLoading) {
        body = (
            <div className="d-flex-justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if(members.length === 0) {
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
                {members.map(member => (
                    <div>
                        <h2>{member.fullName}</h2>
                        <h4>Họ: {member.lastName}</h4>
                        <h4>Tên: {member.firstName}</h4>
                        <h4>Ban: {member.department}</h4>

                        <ProfileButtons _id={member._id} />

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
                    <Sidebar page="members"/>
                    <div className="content">
                        <UpdateProfileModal />
                        <p>
                            Member Manager
                        </p>
                        <Card className='m-3' bg='danger' text='light'>
                            <Card.Header>
                                Thông Báo Từ Quản Trị Trang
                            </Card.Header>
                            <Card.Text>
                                <h3 className='m-3 text-center'>Các bạn sử dụng cần cẩn thận, xem xét kĩ lưỡng mới chấp nhận deadline. Nếu nạp deadline nhưng không đủ cần ghi chú đầy đủ để mem biết!</h3>
                            </Card.Text>
                        </Card>

                        {body}

                        <Toast
                            show={show}
                            style={{ 
                                position: 'fixed', 
                                top: '15%', 
                                right: '15px' 
                            }}
                            className={`bg-${type} text-white`}
                            onClose={setShowMemberToast.bind(this, {
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

export default MemberManager
