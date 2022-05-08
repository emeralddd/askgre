import { Link } from "react-router-dom"
import {AuthContext} from '../../contexts/authContext'
import {useContext} from 'react'
import logo from '../../assets/logo_full_white.png'

const NavbarPrivate = () => {

    let hello = null

    const {authState: {authLoading, user}} = useContext(AuthContext)

    if(!authLoading) {
        hello = (
            <>
                <p className="navprihellotext">
                    Hola, {user.username}
                </p>
            </>
        )
    }

    
    return (
        <>
            <div className="navpri">
                <div className="">
                    <Link to='/'>
                        <img src={logo} alt="" className="navprilogoimg" />
                    </Link>
                </div>

                <div className="navprihello">
                    {hello}
                </div>

                <div className="navpriitems">
                    <Link to='/logout'>
                        <p className="navpriitemseach">
                            Đăng xuất
                        </p>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NavbarPrivate
