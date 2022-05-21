import {useContext, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import ProfileButtons from '../components/items/ProfileButtons'
import {MemberContext} from '../contexts/memberContext'
import Toast from 'react-bootstrap/Toast'
import UpdateProfileModal from '../components/form/UpdateProfileModal'
import Sidebar from '../components/layout/Sidebar'
import LoadingSpinner from '../components/items/LoadingSpinner'

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
            <LoadingSpinner />
        )
    } else if(members.length === 0) {
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
                {members.map(member => (
                    <div>
                        <p className='name'>{member.fullName}</p>
                        <p className='defino'>Họ: {member.lastName}</p>
                        <p className='defino'>Tên: {member.firstName}</p>
                        <p className='defino'>Ban: {member.department}</p>

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
                <div className="dashboard">
                    <Sidebar page="members"/>
                    <div className="content">
                        <UpdateProfileModal />
                        <p>
                            Member Manager
                        </p>
                        <Card className='mb-3' bg='danger' text='light'>
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
            </div>
        </>
    )
}

export default MemberManager
