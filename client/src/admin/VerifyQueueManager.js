import {useContext, useEffect, useState} from 'react'
import Spinner from 'react-bootstrap/Spinner'
import Card from 'react-bootstrap/Card'
import {QueueContext} from '../contexts/queueContext'
import Toast from 'react-bootstrap/Toast'
import NavbarPrivate from '../components/layout/NavbarPrivate'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import VerifyButtons from '../components/items/VerifyButtons'
import UpdateVerifyModal from '../components/form/UpdateVerifyModal'

const VerifyQueueManager = () => {
    const {
        queueState: {queue,queueLoading}, 
        getQueue,
        showQueueToast: {show,message,type},
        setShowQueueToast,
    } = useContext(QueueContext)

    useEffect(() => {
        getQueue()
    }, [])

    let body = null

    if(queueLoading) {
        body = (
            <div className="d-flex-justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if(queue.length === 0) {
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
                {queue.map(account => (
                    <div>
                        <h4>Họ: {account.lastName}</h4>
                        <h4>Tên: {account.firstName}</h4>

                        <VerifyButtons _id={account._id}/>

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
                    <Sidebar page="verifyqueue"/>
                    <div className="content">
                        <UpdateVerifyModal />
                        <p>
                            Verify Queue
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
                            onClose={setShowQueueToast.bind(this, {
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

export default VerifyQueueManager
