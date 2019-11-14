import React,{Component,Image,StyleSheet, useState} from 'react';
import { FormClose, Notification, Aid } from 'grommet-icons';
import logo from './logo.svg';

import {
  Collapsible, 
  Layer, 
  ResponsiveContext,
  Box,
  Button,
  CheckBox,
  Heading,
  Grommet,
  Menu,
  FormField,
  Form,
  TextInput,
  Select,
  Text,
  RadioButton,
  DropButton,
  

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

export class MedHist extends Component{
  constuctor() {
  }

  state = { aspirinChecked: false,
            penicillinChecked: false,
            latexChecked: false,
            anemiaChecked: false,
            anxietyChecked: false, 
            arthritisChecked: false, 
            asthmaChecked: false, 
            cancerChecked: false, 
            depressionChecked: false,
            diabetesChecked: false,
            ulcersChecked: false,
          }
  
  render(){
    const { aspirinChecked, 
            penicillinChecked, 
            latexChecked, 
            fluorideChecked,
            anemiaChecked,
            anxietyChecked, 
            arthritisChecked, 
            asthmaChecked, 
            cancerChecked, 
            depressionChecked,
            diabetesChecked,
            ulcersChecked, } = this.state;
    return (
      <Grommet theme={theme} full>
      <Box fill>
        <AppBar>
          <Heading level='3' margin='none'>WeCare</Heading>
        </AppBar>

        <Text>Check any known allergies:</Text>
        <CheckBox
          checked={aspirinChecked}
          label='aspirin'
          onChange={event => this.setState({ aspirinChecked: event.target.checked })} />
        <CheckBox
          checked={penicillinChecked}
          label='penicillin'
          onChange={event => this.setState({ penicillinChecked: event.target.checked })} />
        <CheckBox
          checked={latexChecked}
          label='latex'
          onChange={event => this.setState({ latexChecked: event.target.checked })} />

        <Text>Check if you have ever experienced the following conditions:</Text>
        <CheckBox
          checked={anemiaChecked}
          label='anemia'
          onChange={event => this.setState({ anemiaChecked: event.target.checked })} />
        <CheckBox
          checked={anxietyChecked}
          label='anxiety'
          onChange={event => this.setState({ anxietyChecked: event.target.checked })} />
        <CheckBox
          checked={arthritisChecked}
          label='arthritis'
          onChange={event => this.setState({ arthritisChecked: event.target.checked })} />
        <CheckBox
          checked={asthmaChecked}
          label='asthma'
          onChange={event => this.setState({ asthmaChecked: event.target.checked })} />
        <CheckBox
          checked={cancerChecked}
          label='cancer'
          onChange={event => this.setState({ cancerChecked: event.target.checked })} />
        <CheckBox
          checked={depressionChecked}
          label='depression'
          onChange={event => this.setState({ depressionChecked: event.target.checked })} />
        <CheckBox
          checked={diabetesChecked}
          label='diabetes'
          onChange={event => this.setState({ diabetesChecked: event.target.checked })} />
        <CheckBox
          checked={ulcersChecked}
          label='ulcers'
          onChange={event => this.setState({ ulcersChecked: event.target.checked })} />

        <Button
          icon={<Aid />}
          label="Submit"
          onClick={() => {}} />
      </Box>

      </Grommet>
    );




}}

export default MedHist;