import { Link } from "react-router-dom"
import {AuthContext} from '../../contexts/authContext'
import {useContext} from 'react'
import logo from '../../assets/logo.png'

const NavbarPublic = () => {

    let dashboard=null
    let log = null

    const {authState: {authLoading, isAuthenticated}} = useContext(AuthContext)

    if(!authLoading) {
        if(isAuthenticated) {
            dashboard = (
                <>
                    <Link to='/dashboard'>
                        <p className="item">
                            Bảng Điều Khiển
                        </p>
                    </Link>
                </>
            )

            log = (
                <>
                    <Link to='/logout'>
                        <p className="item">
                            Đăng xuất
                        </p>
                    </Link>
                </>
            )
        } else {
            log = (
                <>
                    <Link to='/login'>
                        <p className="item">
                            Đăng nhập
                        </p>
                    </Link>
                </>
            )
        }
    }

    
    return (
        <>
            <div className="navpub">
                <a href="https://github.com/emeralddd" target='_blank'>
                    <p className="item">
                        Github
                    </p>
                </a>

                {dashboard}

                {log}
        </div>
        </>
    )
}

export default NavbarPublic
