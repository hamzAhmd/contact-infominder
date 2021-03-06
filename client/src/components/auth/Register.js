import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AlertContext from '../../context/alert/alertContext';
import AuthContext from '../../context/auth/authContext';
import {
  Button,
  Card,
  Box,
  TextField,
  Container,
  Typography,
} from '@material-ui/core';

const Register = (props) => {
  const alertContext = useContext(AlertContext);
  const authContext = useContext(AuthContext);
  const { setAlert } = alertContext;
  const { register, error, clearErrors, isAuthenticated } = authContext;
  useEffect(() => {
    if (isAuthenticated) {
      props.history.push('/');
    }
    if (error === 'User Already Exists') {
      setAlert(error, 'danger');
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });
  const { name, email, password, password2 } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setAlert('Please Enter All Fields', 'danger');
    } else if (password !== password2) {
      setAlert('Passwords do not match', 'danger');
    } else {
      register({
        name,
        email,
        password,
      });
    }
  };

  return (
    <Container maxWidth='xs'>
      <Card
        style={{
          margin: '1.5rem 0',
          padding: '2rem 1rem',
          textAlign: 'center',
        }}
      >
        <h1>Register Account</h1>
        <form onSubmit={onSubmit}>
          <Box pb={2} pt={2}>
            <TextField
              id='outlined-basic'
              type='text'
              label='Name'
              name='name'
              size='small'
              variant='outlined'
              value={name}
              onChange={onChange}
              required
            />
          </Box>
          <TextField
            id='outlined-basic'
            type='email'
            label='Email'
            name='email'
            size='small'
            variant='outlined'
            value={email}
            onChange={onChange}
            required
          />
          <Box pt={2} pb={2}>
            <TextField
              id='outlined-basic'
              type='password'
              label='Set Password'
              name='password'
              size='small'
              variant='outlined'
              value={password}
              onChange={onChange}
              required
            />
          </Box>
          <TextField
            id='outlined-basic'
            type='password'
            label='Confirm Password'
            name='password2'
            size='small'
            variant='outlined'
            value={password2}
            onChange={onChange}
            required
          />

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '1rem',
              marginBottom: '0.5rem',
            }}
          >
            <Box pr={1}>
              <Button type='submit' variant='contained' color='primary'>
                Register
              </Button>
            </Box>
          </div>
          <Typography color='initial'>
            Already have an account?
            <Button component={Link} color='primary' to='/login'>
              Log in
            </Button>
          </Typography>
        </form>
      </Card>
    </Container>
  );
};

export default Register;
