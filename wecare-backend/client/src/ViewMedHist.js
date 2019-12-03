import React, { Component, Image, StyleSheet, Link } from 'react';
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

export class ViewMedHist extends Component {


    state = { medhiststate: [] }

    componentDidMount() {

        this.getNames("");
        console.log(this.state.names);
    }

    getNames(value) {
        let patName = value;
        console.log(patName);
        fetch('http://localhost:3001/MedHistView?name='+ patName + '&variable=words')
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
                            </tr>
                        </thead>
                        <tbody>
                            {medhiststate.map(patient =>
                                <tr key={patient.id}>
                                    <td>{patient.Name} </td>
                                    <td>{patient.UID}
                                    </td>
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

                    <Form
                        onSubmit={({ value }) => {
                            console.log("Submit", value);
                            this.getNames(value.email);
                        }}>
                        <FormField name="email" label="Name" />
                        <Button type="submit" primary label="Submit" />
                    </Form>

                    <Header />
                    <Body />

                </Box>
            </Grommet>
        );




    }
}

export default ViewMedHist;