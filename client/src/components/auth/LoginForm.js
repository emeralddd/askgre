import React from 'react'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import {Link} from 'react-router-dom'
import { useState, useContext } from 'react'
import { AuthContext } from '../../contexts/authContext'
import AlertMessage from '../layout/AlertMessage'
import loginimage from '../../assets/login-image.jpg'
import logo from '../../assets/askgre_full.svg'

const LoginForm = () => {

    const {loginUser} = useContext(AuthContext)

    const [loginForm,setLoginForm] = useState({
        username: '',
        password: ''
    })

    const [alert,setAlert] = useState(null)

    const {username,password} = loginForm

    const onChangeLoginForm = event => setLoginForm({...loginForm, [event.target.name]:event.target.value})

    const login = async event => {
        event.preventDefault()

        try {
            const loginData = await loginUser(loginForm)
            if(!loginData.success) {
                setAlert({
                    type: 'danger',
                    message: loginData.message
                })
            }
        } catch (error) {
            console.log(error)
        } 
        
    }

    return <>
        <div className='login'>
            <div className='box'>
                <div className='form-box'>
                    <img className='logo' src={logo} />
                    <Form onSubmit={login} className='form'>
                        <AlertMessage info={alert} />

                        <p>Username</p>

                        <Form.Control 
                            type='text' 
                            name='username' 
                            className='field'
                            required 
                            value={username}
                            onChange={onChangeLoginForm} 
                        />

                        <Form.Group>
                            <p>Password</p>
                            <Form.Control
                                type='password' 
                                name='password'
                                className='field'
                                required 
                                value={password}
                                onChange={onChangeLoginForm} />
                        </Form.Group>

                        <Button className='button' type='submit'>Login</Button>
                    </Form>
                </div>
                <div className='image-box'>
                    <img className='image' src={loginimage} />
                </div>
                
            </div>
        </div>
        
    </>
}

export default LoginForm
