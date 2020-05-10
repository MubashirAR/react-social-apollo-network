import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from 'react-router-dom';
import Navbar from './Navbar';
import * as yup from 'yup';
import Form from 'react-formal';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { LOGIN_MUTATION, GET_USER_QUERY, login } from '../services/auth';
const modelSchema = yup.object({
  email: yup.string().email('Invalid email ID').required('Email ID is required'),
  password: yup.string().min(8),
});
export default () => {
  const initialState = {
    email: '',
    password: '',
  };
  const [model, setModel] = useState(initialState);
  const { loading, client, fetchMore } = useQuery(GET_USER_QUERY);
  // const [login, { data }] = useMutation(LOGIN_MUTATION);
  const history = useHistory();
  const submit = async () => {
    const resp = await login(model);
    resp.__typename = 'loggedInUser'
    client.writeData({
      data: {
        loggedInUser: resp,
      },
    });
    // console.log({userResp})
    if (resp) {
      history.push('/feed');
    } else {
      alert('Invalid credentials. Please try again!');
    }
  };
  return (
    <>
      <Navbar />
      <div className="jumbotron">
        <div className="card">
          <div className="card-header">{/* <h2>Login</h2> */}</div>
          <div className="card-body">
            <Form className="w-100" schema={modelSchema} value={model} onSubmit={(e) => submit()} onChange={(model) => setModel(model)}>
              <fieldset className="w-100">
                <legend className="text-center">Login</legend>

                <Form.Field className="form-control mt-3 w-100" name="email" placeholder="Your email ID" />
                <Form.Message className="pl-1 text-danger" for="email" />

                <Form.Field className="form-control mt-3 w-100" name="password" placeholder="Password" type="password" />
                <Form.Message className="pl-1 text-danger" for="password" />
                <Form.Submit className="btn btn-primary mt-3 w-100" type="submit">
                  Submit
                </Form.Submit>
              </fieldset>
            </Form>
            {/* <input placeholder="username" type="text" className="form-control"></input>
            <input placeholder="password" type="text" className="form-control mt-3"></input>
            <Link className="btn btn-primary mt-3 px-5 py-2" to="/feed">
              Login
            </Link> */}
          </div>
        </div>
      </div>
    </>
  );
};
