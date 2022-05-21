import {useContext, useEffect} from 'react'
import Card from 'react-bootstrap/Card'
import {QueueContext} from '../contexts/queueContext'
import Toast from 'react-bootstrap/Toast'
import Sidebar from '../components/layout/Sidebar'
import VerifyButtons from '../components/items/VerifyButtons'
import UpdateVerifyModal from '../components/form/UpdateVerifyModal'
import LoadingSpinner from '../components/items/LoadingSpinner'

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
            <LoadingSpinner />
        )
    } else if(queue.length === 0) {
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
                {queue.map(account => (
                    <div>
                        <p className='media'>Họ: {account.lastName}</p>
                        <p className='media'>Tên: {account.firstName}</p>

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
            </div>
        </>
    )
}

export default VerifyQueueManager
