import React, { Component, Image, StyleSheet, useState } from 'react';
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
    CheckBox,
    RadioButtonGroup,
    TextArea,
    Range,
    RangeInput


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

export class Settings extends Component {
    constuctor() {
    }


    render() {


        return (
            <Grommet theme={theme} full>
                <Box >
                    <AppBar>
                        <Heading level='3' margin='none'>WeCare</Heading>
                    </AppBar>

                    <Form>
                        <Text>Change your password:</Text>
                        <FormField
                            type='password'
                            label="Old password"
                            name="oldPassword"
                            required
                        />
                        <FormField
                            label="New password"
                            name="newPassword"
                            required
                        />
                        <Button
                            type="submit"
                            label="try to change"
                            primary
                        />
                    </Form>


                </Box>
            </Grommet>
        );
    }
}

export default Settings;