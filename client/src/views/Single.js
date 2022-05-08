import axios from "axios"
import { useEffect, useState } from "react"
import { apiURL } from "../utils/VariableName"
import Spinner from 'react-bootstrap/Spinner'
import NavbarPublic from "../components/layout/NavbarPublic"

const Single = (props) => {

    const _id = props.match.params._id
    
    const [statusState, setStatusState] = useState({
        loading: true,
        success: 0,
        data: []
    })

    const find = async () => {
        try {
            const response = await axios.get(`${apiURL}/public/getImageVideo/${_id}`)
            if(response.data.success) {
                setStatusState({
                    loading: false,
                    success: 200,
                    data: [response.data.fetchMember.fullName,response.data.fetchMember.department,response.data.fetchMember.media,response.data.fetchMember.finished,response.data.fetchMember.note]
                })
            }
        } catch (error) {
            setStatusState({
                loading: false,
                success: 404,
            })
        }
    }
    
    useEffect(() => {
        find()
    }, [])

    let body = null
    
    if(statusState.loading) {
        body = (
            <div className="d-flex-justify-content-center mt-2">
                <Spinner animation='border' variant='info' />
            </div>
        )
    } else if(statusState.success === 404) {
        body = (
            <>
                <h1>404</h1>
                <h3>Không Tồn Tại</h3>
            </>
        )
    } else {
        body = (
            <>
                <h1>Deadline của {statusState.data[0]}</h1>
                <h3>Ban: {statusState.data[1]}</h3>
                <h3>Hoàn thành: {statusState.data[3]?'Rồi':'Chưa'}</h3>
                <h3>Ghi chú: {statusState.data[4]}</h3>
                
                <p>Video</p>

                {statusState.data[2].map(att => (
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

                {statusState.data[2].map(att => (
                    (att.includes('video')
                    ?
                    <></>
                    :
                    <span>
                        <img src={att} width="320" alt="alt"/>
                    </span>
                    )
                ))}

            </>
        )
    }

    // console.log(statusState.data)

    return (
        <>
            <NavbarPublic />
            <div className="mx-4 mt-3">
                {body}
            </div>
        </>
    )
}

export default Single
