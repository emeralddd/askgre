import {Route} from 'react-router-dom'
const PublicRoute = ({component:Component,...rest}) => {

    return (
        <Route {...rest} render={props => {
            return (
            <>
                <Component {...rest} {...props} /> 
            </>
        )}} />
    )
}

export default PublicRoute
