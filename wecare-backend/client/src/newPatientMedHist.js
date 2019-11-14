import React,{Component,Image,StyleSheet, useState} from 'react';
import logo from './logo.svg';

import { 
  FormClose, 
  Notification 

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
  RadioButton,
  

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

export class NewMedHist extends Component{
  constuctor() {
  }

  state = {}
  
  render(){
  const { selected } = this.state;
  return (
    <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level='3' margin='none'>WeCare</Heading>
        </AppBar>
        <form onSubmit={<Text>hi</Text>}>
          <Menu
              align="start"
              label="Gender"
              items={[
              { label: 'Female', onClick: () => {} },
              { label: 'Male', onClick: () => {} },]} />
      
      <Text align="start">allergic reaction to</Text>
          <Box align='start'>
            {['aspirin, ipuprofen, codeine', 'penicillin', 'erythromycin', 'tetracyline' ].map(label => (
              <Box key={label} margin={{ vertical: 'small' }}>
                <RadioButton
                  name='prop'
                  checked={selected === label}
                  label={label}
                  onChange={() => this.setState({ selected: label })} />
              </Box>
            ))}
          </Box>

          <Form>
            <FormField 
              name="age" 
              label="age"
              placeholder="probably change this age form later" />
            <Button 
              type="submit" 
              primary label="submit"
              onSubmit={<Text>probs something here</Text>} />
          </Form>
        </form>
        <Button 
          type="cool" 
          primary label="for something maybe idk" />
      </Box>
    </Grommet>
    );
  }
}

export default NewMedHist;