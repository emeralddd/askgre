import { Link } from "react-router-dom"
import {AuthContext} from '../../contexts/authContext'
import {useContext} from 'react'
import logo from '../../assets/askgre_full.svg'

const Sidebar = (props) => {
    const {authState: {authLoading, user}} = useContext(AuthContext)

    const items = [
        {
            name:'overview',
            label:'Overview',
            link:'/dashboard',
            icon:'speedometer2'
        },{
            name:'task',
            label:'Task',
            link:'/updatetask',
            icon:'list-task'
        },{
            name:'checkdeadline',
            label:'Check Deadline',
            link:'/checkdeadline',
            icon:'patch-check'
        },{
            name:'members',
            label:'Members',
            link:'/membermanager',
            icon:'people'
        },{
            name:'users',
            label:'Users',
            link:'/usermanager',
            icon:'person'
        },{
            name:'verifyqueue',
            label:'Verify Queue',
            link:'/verifyqueuemanager',
            icon:'person-check'
        },
        {
            name:'settings',
            label:'Settings',
            link:'/settings',
            icon:'person-check'
        },
        {
            name:'logout',
            label:'Logout',
            link:'/logout',
            icon:'person-check'
        }
    ]
    return (
        <>
            <div className="sidebar">
                <h4> Hello, {authLoading?"":user.username}</h4>
                <p>{authLoading?"":user.permission}</p>
                
                <hr className="break" />

                {
                    items.map(item => (
                        <Link to={item.link}>
                            
                            <p className={`item ${props.page===item.name?'active':''}`}>
                                <img src={require(`../../assets/${item.icon}.svg`).default} className={`filter${props.page===item.name?'-active':''}`} alt='' />
                                
                                {item.label}
                            </p>
                        </Link>
                    ))
                }

                <div className="copyright">
                    <Link to='/'>
                        <img className='logo' src={logo} />
                    </Link>
                    
                    <p> 
                        COPYRIGHT © ASKGRE 2022
                    </p>
                </div>
            </div>
        </>
    )
}

export default Sidebar
