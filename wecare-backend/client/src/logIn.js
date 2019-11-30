import React,{Component,Image,StyleSheet, useState} from 'react';
import logo from './logo.svg';
import{ withRouter} from 'react-router-dom';
import { 
  FormClose, 
  Notification ,

} from 'grommet-icons';

import {
  Collapsible, 
  Layer, 
  ResponsiveContext,
  Box,
  Button,
  Heading,
  Grommet,
  Menu,
  FormField,
  Form,
  TextInput,
  Select,
  Text,
  CheckBox,
  RadioButtonGroup,
  TextArea,
  RangeInput,
  

} from 'grommet';

import './App.css';
import backdrop from './img/hmsbackdrop.jpg'

const theme = {
  global: {
    colors: {
      brand: '#00739D',
    },
    font: {
      family: 'Lato',
    },
  },
};

const AppBar = (props) => (
  <Box
  tag='header'
  direction='row'
  align='center'
  justify='between'
  background='brand'
  pad={{ left: 'medium', right: 'small', vertical: 'small' }}
    //elevation='medium'
    style={{ zIndex: '1' }}
    {...props} />
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class LogIn extends Component{
  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange() {
    let path = '/Home';
    this.props.history.push(path);
  }
  
  render(){

   return (
    <Grommet theme={theme} full>
    <AppBar>
      <Heading level='3' margin='none'>WeCare</Heading>
    </AppBar>
    <Box fill align="center" justify="top">
      <Box width="medium">
        <Form
          onReset={event => console.log(event)}
          onSubmit={({ value }) => {
            console.log("Submit", value);
            window.location="/Home";}
        }>
          <FormField label="Email" name="email" type="email" required />
          <FormField
            label="Password"
            name="password"
            required />
          <Box direction="column" align="center" >
            <Button type="submit" label="Log In" fill = "horizontal" primary/>
            <Button label="Create Account" 
              fill = "horizontal" 
              href="/createAcc"/>
          </Box>
        </Form>
      </Box>
    </Box>

    </Grommet>
    );
}}

export default withRouter(LogIn);