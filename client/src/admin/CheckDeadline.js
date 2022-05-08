import {useContext, useEffect, useState} from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import ActionButtons from '../components/items/ActionButtons'
import {MemberContext} from '../contexts/memberContext'
import Toast from 'react-bootstrap/Toast'
import UpdateMemberModal from '../components/form/UpdateMemberModal'
import NavbarPrivate from '../components/layout/NavbarPrivate'
import Sidebar from '../components/layout/Sidebar'
import Button from 'react-bootstrap/Button'
import Footer from '../components/layout/Footer'

const CheckDeadline = () => {
    const {
        memberState: {members,membersLoading}, 
        getMember,
        showMemberToast: {show,message,type},
        setShowMemberToast,
    } = useContext(MemberContext)

    const [typeData, setNewType] = useState('all')

    useEffect(() => {
        getMember()
        setNewType('all')
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
                    <div className={`card-${typeData==='all'?`visible`:(typeData==='finished'?(member.finished?`visible`:`hidden`):(typeData==='empty'?(member.sentMedia.length===0&&(!member.finished)?`visible`:`hidden`):(member.sentMedia.length!==0&&(!member.finished)?`visible`:`hidden`)))}`}>
                        <h2>{member.fullName}</h2>
                        <h4>Ban: {member.department}</h4>
                        <h4>Hoàn thành: {member.finished?'Rồi':'Chưa'}</h4>
                        <h4>Ghi chú: {member.note}</h4>

                        <p>Video</p>

                        {member.sentMedia.map(att => (
                            (att.includes('video')
                            ?
                            <span>
                                <video width="320" controls>
                                    <source src={att} type="video/mp4" />
                                </video>
                            </span>
                            :
                            <></>
                            )
                        ))}

                        <p>Image</p>

                        {member.sentMedia.map(att => (
                            (att.includes('video')
                            ?
                            <></>
                            :
                            <span>
                                <img src={att} width="320" alt="alt"/>
                            </span>
                            )
                        ))}

                        <ActionButtons _id={member._id} note={member.note}/>

                        <hr />
                    </div>
                ))}
            </div>
        )
    }

    const filterName = [
        {
            name:'all',
            label:'Tất cả'
        },
        {
            name:'finished',
            label:'Đã hoàn thành'
        },
        {
            name:'empty',
            label:'Chưa nạp'
        },
        {
            name:'waiting',
            label:'Đã nạp'
        }
    ]

    const update = (type) => {
        setNewType(type)
    }

    return (
        <>
            <div className='page'>
                <NavbarPrivate />    
                <div className="dashboard">
                    <Sidebar page="checkdeadline"/>
                    <div className="content">
                        <UpdateMemberModal />
                        <p>
                            Check Deadline
                        </p>
                        <Card className='m-3' bg='danger' text='light'>
                            <Card.Header>
                                Thông Báo Từ Quản Trị Trang
                            </Card.Header>
                            <Card.Text>
                                <h3 className='m-3 text-center'>Các bạn sử dụng cần cẩn thận, xem xét kĩ lưỡng mới chấp nhận deadline. Nếu nạp deadline nhưng không đủ cần ghi chú đầy đủ để mem biết!</h3>
                            </Card.Text>
                        </Card>
                        
                        <div className='filter-control'>
                            {
                                filterName.map(filter => (
                                    <Button variant='primary' className='button' onClick={update.bind(this, filter.name)}>
                                        {filter.label}
                                    </Button>
                                ))
                            }
                        </div>

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

export default CheckDeadline
