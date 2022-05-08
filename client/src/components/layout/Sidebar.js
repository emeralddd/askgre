import { Link } from "react-router-dom"

const Sidebar = (props) => {
    const items = [
        {
            name:'dashboard',
            label:'Dashboard',
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
        }
    ]
    return (
        <>
            <div className="sidebar pt-1">
                {
                    items.map(item => (
                        <Link to={item.link}>
                            
                            <p className={`item ${props.page===item.name?'active':''}`}>
                                <img src={require(`../../assets/${item.icon}.svg`).default} className='filter' alt='' />
                                
                                {item.label}
                            </p>
                        </Link>
                    ))
                }
            </div>
        </>
    )
}

export default Sidebar
