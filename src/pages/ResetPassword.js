import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { gql, useMutation } from '@apollo/client';
import { useForm } from '../utils/hooks/useForm';


export const ResetPassword = (props) => {

    //Hacer el markup
    //extraer el token de la barra de <direcciones
    //extraer el usuario y contrasena nuevos y pasarlos a use form
    //pasar user, token y password a usemutation

    //add confirmation when new user is sent

    const [errors, setErrors] = useState({})

    const token = props.match.params.resetId;


    const initialState = {
        username: '',
        token,
        password: '',
        confirmPassword: ''
    }
    
    const {onChange, onSubmit, values } = useForm(resetPasswordCallback, initialState)
    

    const [resetPassword] = useMutation(RESET_PASSWORD, {
        variables: values,
        onError(err){
            setErrors(err.graphQLErrors[0].extensions.exception.errors)
            console.log(err)
        }
    });      
    
    function resetPasswordCallback(){
        resetPassword();
    }


    return (
        <div className="form-container">
            
            <Form onSubmit={onSubmit} noValidate >
                <h1>Register</h1>
                <Form.Input
                    label="Username"
                    placeholder= "Username"
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Password"
                    placeholder= "Password"
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password ? true : false}
                    onChange={onChange}
                />
                <Form.Input
                    label="Confirm Password"
                    placeholder= "Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword ? true : false}
                    onChange={onChange}
                />
                <Button type="submit" primary>
                    Change my password
                </Button>
            </Form>
            { Object.keys(errors).length > 0 && (
                <div className="ui error message">
                <ul className="list">
                    {Object.values(errors).map(value => (
                        <li key={value}>{value}</li>
                    ))}
                </ul>
            </div>   
            )}
        </div>
    )
}

const RESET_PASSWORD = gql`
  mutation($username: String!, $token: String!, $password: String!, $confirmPassword: String! ) {
    passwordReset(username: $username, token: $token, password: $password, confirmPassword: $confirmPassword)
  }
`;