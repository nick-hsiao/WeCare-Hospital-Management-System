import React, { Component, Image, StyleSheet } from 'react';
import logo from './logo.svg';
import {
    Box,
    Button,
    Heading,
    Grommet,
    Menu,
    FormField,
    TextInput,
    Select,
    Form

} from 'grommet';

import './App.css';
import backdrop from './img/hmsbackdrop.jpg'

export class ViewOneHistory extends Component {


    state = { medhiststate: [] }

    componentDidMount() {

        this.getHistory(1);
        console.log(this.state.names);
    }

    getHistory(value) {
        let uid = value;
        console.log(uid);
        fetch('http://localhost:3001/OneHistory?medHistUid='+ uid)
        .then(res => res.json())
        .then(res => this.setState({ medhiststate: res.data }));
    }

    render() {
        const { medhiststate } = this.state;

        const Header = () => (
            <Box
                tag='header'
                background='brand'
                pad='small'
                elevation='small'
                justify='between'
                direction='row'
                align='center'
                flex={false}
            >
                <Heading level={3} margin='none'>
                    <strong>WeCare</strong>
                </Heading>

            </Box>
        );

        const Body = () => (
            <div className="container">
                <div className="panel panel-default p50 uth-panel">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th>name</th>
                                <th>email</th>
                                <th>gender</th>
                            </tr>
                        </thead>
                        <tbody>
                            {medhiststate.map(patient =>
                                <tr key={patient.id}>
                                    <td>{patient.name} </td>
                                    <td>{patient.conditions}</td>
                                    <td>{patient.gender}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

        );


        return (
            <Grommet full={true}>
                <Box fill={true}>

                    

                    <Header />
                    <Body />

                </Box>
            </Grommet>
        );




    }
}

export default ViewOneHistory;