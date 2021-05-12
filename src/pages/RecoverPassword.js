import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useForm } from "../utils/hooks/useForm";

export const RecoverPassword = () => {

  const [errors, setErrors] = useState({})
  const [isSent, setIsSent] = useState(false)

  const initialState = {
    email: ""
  };

  const { onChange, onSubmit, values } = useForm(
    recoverPasswordCallback,
    initialState
  );

  const [recoverPassword] = useMutation(RECOVER_PASSWORD, {
      variables: values,
      onError(err){
        setErrors(err.graphQLErrors[0].extensions.exception.errors)
      },
      onCompleted(){
        setIsSent(true)
      } 
  });

  
  function recoverPasswordCallback() {
    recoverPassword();
  }
  
  return (
    <div>
      <h1>Recover your password</h1>
      <Form onSubmit={onSubmit} noValidate>
        <Form.Input
          label="Email"
          placeholder="Email"
          name="email"
          type="text"
          value={values.email}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Send Email
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
      {
        isSent && (
          <div className="ui success message">Recovery email has been sent</div>
        )
      }
    </div>
  );
};

const RECOVER_PASSWORD = gql`
  mutation($email: String!) {
    recover(email: $email)
  }
`;
