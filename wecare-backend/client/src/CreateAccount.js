import React,{Component,Image,StyleSheet, useState} from 'react';
import { FormClose, Notification } from 'grommet-icons';
import logo from './logo.svg';

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
  style={{ zIndex: '1' }}
  {...props} />
);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

export class CreateAccount extends Component{
  constuctor() {
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
          window.location="http://localhost:3001/newPatientMedHist";}
          // var link = document.getElementById("/createAcc");
          // link.setAttribute("href", "newPatientMedHist");}
        }
        action="/insert">
          <FormField
            label="First Name"
            name="firstName"
            required
            validate={{ regexp: /^[a-z]/i }} />
          <FormField
            label="Last Name"
            name="lastName"
            required
            validate={{ regexp: /^[a-z]/i }} />
          <FormField label="Email" name="email" type="email" required />
          <FormField
            label="Password"
            name="password"
            required
            validate={{ regexp: /^(?=.{8,})(?=.*[0-9]{2})/, message: "@ least 8 digits, 2 nums" }} />
          <Box direction="row" align="center" >
            <Button label="cancel" fill = "horizontal" href="/" primary/>
            <Button label="Sign Up" 
              fill = "horizontal" 
              type="submit" />
          </Box>

        </Form>
      </Box>
    </Box>

    </Grommet>
    );
  }
}

export default CreateAccount;