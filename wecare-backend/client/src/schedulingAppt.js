
// import { FormDown } from "grommet-icons";

// import { Grommet, Box, Calendar, DropButton, Text } from "grommet";
import { grommet } from "grommet/themes";


import React,{Component,Image,StyleSheet, useState} from 'react';
import { 
    FormClose, 
    Notification,
    FormDown, 
    Schedule,
} from 'grommet-icons';

import logo from './logo.svg';

import {
  Collapsible, 
  Layer, 
  Grid,
  ResponsiveContext,
  Box,
  Button,
  Heading,
  Menu,
  FormField,
  Form,
  TextInput,
  Select,
  Text,
  RadioButtonGroup,
  TextArea,
  RangeInput,
  Grommet, 
  Calendar, 
  DropButton, 
  MaskedInput,
  Keyboard,

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

const DropContent = ({ date: initialDate, time: initialTime, onClose }) => {
    const [date, setDate] = React.useState();
    const [time, setTime] = React.useState();
  
    const close = () => onClose(date || initialDate, time || initialTime);
  
    return (
      <Box align="center">
        <Calendar
          animate={false}
          date={date || initialDate}
          onSelect={setDate}
          showAdjacentDays={false}
        />
        <Box flex={false} pad="medium" gap="small">
          <Keyboard
            onEnter={event => {
              event.preventDefault(); // so drop doesn't re-open
              close();
            }}
          >
            <MaskedInput
              mask={[
                {
                  length: [1, 2],
                  options: [
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "6",
                    "7",
                    "8",
                    "9",
                    "10",
                    "11",
                    "12"
                  ],
                  regexp: /^1[1-2]$|^[0-9]$/,
                  placeholder: "hh"
                },
                { fixed: ":" },
                {
                  length: 2,
                  options: ["00", "15", "30", "45"],
                  regexp: /^[0-5][0-9]$|^[0-9]$/,
                  placeholder: "mm"
                },
                { fixed: " " },
                {
                  length: 2,
                  options: ["am", "pm"],
                  regexp: /^[ap]m$|^[AP]M$|^[aApP]$/,
                  placeholder: "ap"
                }
              ]}
              value={time || initialTime}
              name="maskedInput"
              onChange={event => setTime(event.target.value)}
            />
          </Keyboard>
          <Box flex={false}>
            <Button label="Done" onClick={close} color="#00739D"/>
          </Box>
        </Box>
      </Box>
    );
  };
  
  const DateTimeDropButton = () => {
    const [date, setDate] = React.useState();
    const [time, setTime] = React.useState("");
    const [open, setOpen] = React.useState();
  
    const onClose = (nextDate, nextTime) => {
      setDate(nextDate);
      setTime(nextTime);
      setOpen(false);
      setTimeout(() => setOpen(undefined), 1);
    };
  
    return (
      <Grommet theme={theme}>
        <Box align="center" pad="large">
          <DropButton
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            dropContent={
              <DropContent date={date} time={time} onClose={onClose} />
            }
          >
            <Box direction="row" gap="small" align="center" pad="small">
              <Text color={date ? undefined : "dark-5"}>
                {date
                  ? `${new Date(date).toLocaleDateString()} ${time}`
                  : "Select date & time"}
              </Text>
              <Schedule />
            </Box>
          </DropButton>
        </Box>
      </Grommet>
    );
  };

  const ConcernsTextArea = () => {
    const [value, setValue] = React.useState("");
  
    const onChange = event => setValue(event.target.value);
  
    return (
      <Grommet theme={theme}>
        <Box
          width="medium"
          height="xsmall"
          border={{ color: "brand", size: "small" }}
        >
          <TextArea placeholder="Enter your concerns..." value={value} onChange={onChange} fill />
        </Box>
      </Grommet>
    );
  };

  const SymptomsTextArea = () => {
    const [value, setValue] = React.useState("");
  
    const onChange = event => setValue(event.target.value);
  
    return (
      <Grommet theme={theme}>
        <Box
          width="medium"
          height="xsmall"
          border={{ color: "brand", size: "small" }}
        >
          <TextArea placeholder="Enter your symptoms..." value={value} onChange={onChange} fill />
        </Box>
      </Grommet>
    );
  };

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};


export class SchedulingAppt extends Component{
  constuctor() {
      
  }


  render(){
    return (
        <Grommet theme={theme} full>
            <AppBar>
                <Heading level='3' margin='none'>WeCare</Heading>
            </AppBar>
            <Box align="center" pad="small" gap ="small">
                <DateTimeDropButton>
                </DateTimeDropButton>
                <ConcernsTextArea>
                </ConcernsTextArea> 
                <SymptomsTextArea>
                </SymptomsTextArea> 
                <Button label = "attempt to schedule"/>
            </Box> 
            

        </Grommet>
        );
  }
}

export default SchedulingAppt;