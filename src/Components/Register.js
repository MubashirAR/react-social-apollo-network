import React, { useState } from 'react';
// import './Login.css'
import { Link, useHistory } from 'react-router-dom';
import Navbar from './Navbar';
import * as yup from 'yup';
import Form from 'react-formal';
import { REGISTER_USER_MUTATION, register } from "../services/auth";
import { useMutation } from "@apollo/react-hooks";

const regex = /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/;
const modelSchema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Invalid email ID')
    .required('Email ID is required'),
  mobile: yup
    .number()
    .required('Name is required')
    .min(1000, 'Mobile number too short')
    .max(9999999999, 'Mobile number too long')
    .round('trunc'),
  password: yup.string().matches(
    regex,
    `
    Password must be atleast 8 characters long and contain uppercase and lowercase letters, digits and special characters`
  ),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
});
export default () => {
  const initialState = {
    name: '',
    email: '',
    mobile: '',
    password: '',
    confirmPassword: '',
  };
  const [model, setModel] = useState(initialState);
  // const [register, { data, client }] = useMutation(REGISTER_USER_MUTATION)
  const history = useHistory()
  const submit = async () => {
    const res = await register(model);
    history.push('login');
  }
  return (
    <>
      <Navbar />
      <div className="jumbotron">
        <div className="card">
          <div className="card-header">{/* <h2>Sign Up</h2> */}</div>
          <div className="card-body">
            <Form className="w-100" schema={modelSchema} value={model} onSubmit={e => submit()} onChange={model => setModel(model)}>
              <fieldset className="w-100">
                <legend className="text-center">Signup</legend>

                <Form.Field className="form-control mt-3 w-100" name="name" placeholder="Your name" />
                <Form.Message className="pl-1 text-danger" for="name" />

                <Form.Field className="form-control mt-3 w-100" name="email" placeholder="Your email ID" />
                <Form.Message className="pl-1 text-danger" for="email" />

                <Form.Field className="form-control mt-3 w-100" name="mobile" placeholder="Your mobile number" />
                <Form.Message className="pl-1 text-danger" for="mobile" />

                <Form.Field className="form-control mt-3 w-100" name="password" placeholder="Password" type="password" />
                <Form.Message className="pl-1 text-danger" for="password" />

                <Form.Field className="form-control mt-3 w-100" name="confirmPassword" placeholder="Re-enter password" type="password" />
                <Form.Message className="pl-1 text-danger" for="confirmPassword" />

                <Form.Field className="form-control mt-3 w-100" name="dob" placeholder="Re-enter password" type="date" />
                <Form.Message className="pl-1 text-danger" for="dob" />
                <Form.Submit className="btn btn-primary mt-3 w-100" type="submit" >
                  Submit
                </Form.Submit>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};
