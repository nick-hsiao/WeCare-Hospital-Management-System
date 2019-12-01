import React,{Component,Image,StyleSheet} from 'react';
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
  

} from 'grommet';

import './App.css';
import backdrop from './img/hmsbackdrop.jpg'

export class Home extends Component{

  
  state = {names: []}

  componentDidMount() {
    
    this.getNames();
    console.log(this.state.names);
  }

  getNames = _ => {
    fetch('http://localhost:3001/names')
    .then(res => res.json())
    .then(res => this.setState({names: res.data}));
  }

    renderName = ({ name, email }) => <div key={email}>{name} {name}</ div>

render(){
  const {names} = this.state;

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
                                <th>address</th>
                            </tr>
                        </thead>
                        <tbody>
                            {names.map(patient =>
                                <tr key={patient.id}>
                                    <td>{patient.name} </td>
                                    <td>{patient.email}</td>
                                    <td>{patient.address}</td>
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

  


}}

export default Home;