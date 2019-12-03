import React, { Component, Image, StyleSheet, useState } from 'react';
import logo from './logo.svg';
import { withRouter } from 'react-router-dom';
import {
  FormClose,
  Notification,

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

// const FormFieldToggle = props => (
//   <Grommet theme={grommet}>
//     <Box align="center" pad="large">
//       <FormField label="Are you a doctor?" htmlFor="check-box" {...props}>
//         <Box pad={{ horizontal: "small", vertical: "xsmall" }}>
//           <CheckBox id="check-box" label="Doctor" toggle />
//         </Box>
//       </FormField>
//     </Box>
//   </Grommet>);

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null,
};

class LogIn extends Component {
  state = { isDoctor: false }

  constuctor() {
    this.routeChange = this.routeChange.bind(this);
  }

  routeChange() {
    let path = '/Home';
    this.props.history.push(path);
  }

  render() {
    const {
      isDoctor
    } = this.state;
    //[isDoc, setChecked] = React.useState(true);
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
                if (value.isDoc === true) {
                  fetch("http://localhost:3001/checkDoclogin?email=" + value.email +
                    "&password=" + value.password)
                    .then(res => res.json())
                    .then(res => {
                      if (res.data.length === 0) {
                        console.log("nope");
                      } else {
                        window.location = "DocHome";
                        console.log(res.data);
                      }
                      // console.log(JSON.stringify(res.data));
                      // console.log(res.data);
                      // console.log(typeof(res.data));
                      // this.setState({
                      //   data:res.data
                      // });
                    });
                } else {
                  fetch("http://localhost:3001/checklogin?email=" + value.email +
                    "&password=" + value.password)
                    .then(res => res.json())
                    .then(res => {
                      if (res.data.length === 0) {
                        console.log("nope");
                      } else {
                        window.location = "/Home";
                        console.log(res.data);
                      }
                      // console.log(JSON.stringify(res.data));
                      // console.log(res.data);
                      // console.log(typeof(res.data));
                      // this.setState({
                      //   data:res.data
                      // });
                    });
                }


              }

                //{"data":[]}
                //.then(response => console.log(JSON.stringify(response))
                // {
                // if (data.length === 0) {
                //   console.log("fail");
                // }
                // else {
                //   console.log(JSON.stringify(data))
                //   console.log(data.email);
                //   console.log(data.password);
                //   console.log(data.name);
                // }

                // }

                // console.log("sca");
                // console.log(resp);
                // if (resp === []){
                //   console.log("mission failed");
                // }
                // );}
              }>

              <FormField label="Email" name="email" type="email" required />
              <FormField
                type='password'
                label="Password"
                name="password"
                required />
              <FormField
                component={CheckBox}
                checked={isDoctor}
                label="I'm a doctor"
                name="isDoc"
                onChange={(event) => {
                  this.setState({ isDoctor: event.target.checked })
                  console.log("toggled");
                }}

              />
              <Box direction="column" align="center" >
                <Button type="submit" label="Log In" fill="horizontal" primary />
                <Button label="Create Account"
                  style = {{textAlign: 'center'}}
                  fill="horizontal"
                  href="/createAcc" />
              </Box>
            </Form>
          </Box>
        </Box>

      </Grommet>
    );
  }
}

export default withRouter(LogIn);