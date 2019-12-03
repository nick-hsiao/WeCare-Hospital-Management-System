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
    Form,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHeader,
    TableRow,
    Text

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

export class ViewOneHistory extends Component {


    state = { medhiststate: [] }

    componentDidMount() {

        let email_in_use = "";
        fetch("http://localhost:3001/userInSession")
            .then(res => res.json())
            .then(res => {
                var string_json = JSON.stringify(res);
                var email_json = JSON.parse(string_json);
                email_in_use = email_json.email;
                console.log("email in use is :" + email_in_use);
                this.getHistory(email_in_use);
            });
    }

    getHistory(value) {
        let email = "'"+ value + "'";
        console.log(email);
        fetch('http://localhost:3001/OneHistory?patientEmail='+ email)
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
                            {medhiststate.map(patient =>
                        <Table>
                            <TableBody>
                                <TableRow>
                                    <TableCell scope="row">
                                        <strong>Name</strong>
                                    </TableCell>
                                    <TableCell>{patient.name}</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell></TableCell><TableCell /><TableCell /><TableCell /><TableCell /><TableCell />
                                    <TableCell /><TableCell /><TableCell /><TableCell /><TableCell />
                                    <TableCell /><TableCell /><TableCell /><TableCell /><TableCell />
                                    <TableCell></TableCell><TableCell /><TableCell /><TableCell /><TableCell /><TableCell />
                                    <TableCell /><TableCell /><TableCell /><TableCell /><TableCell />
                                    <TableCell><strong>Email</strong></TableCell>
                                    <TableCell>{patient.email}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell scope="row">
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell scope="row">
                                        <strong>Gender</strong>
                                    </TableCell>
                                    <TableCell>
                                        {patient.gender}
                                    </TableCell><TableCell></TableCell><TableCell /><TableCell /><TableCell /><TableCell />
                                    <TableCell /><TableCell /><TableCell /><TableCell /><TableCell />
                                    <TableCell /><TableCell /><TableCell /><TableCell /><TableCell />
                                    <TableCell /><TableCell /><TableCell /><TableCell /><TableCell />
                                    <TableCell /><TableCell /><TableCell /><TableCell /><TableCell /><TableCell />
                                    <TableCell />
                                    <TableCell />
                                    <TableCell>
                                        <strong>Address</strong>
                                    </TableCell>
                                    <TableCell>{patient.address}</TableCell>
                                </TableRow>                                <TableRow>
                                    <TableCell scope="row">
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Conditions</strong>
                                    </TableCell>
                                    <TableCell>{patient.conditions}
                                        </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell scope="row">
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Surgeries</strong>
                                    </TableCell>
                                    <TableCell>{patient.surgeries}
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell scope="row">
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>
                                        <strong>Medications</strong>
                                    </TableCell>
                                    <TableCell>{patient.medication}
                                    </TableCell>
                                </TableRow>
                                <TableRow>                                    <TableCell>
                                     
                                    </TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                            )}
                </div>
            </div>

        );


        return (
            <Grommet full={true} theme={theme}>
                <Box fill={true}>

                    

                    <Header />
                    <Body />

                </Box>
            </Grommet>
        );




    }
}

export default ViewOneHistory;