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

class App extends Component{

  
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

  renderName = ({last,first}) => <div key={last}>{first} {last}</div>

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
    <Box flex={true} pad='medium' overflow='auto'>
      <Box flex={false}>
        <Heading level={3} margin='none'>
          <strong>User List</strong>
        </Heading>
        <Box pad={{ top: 'medium' }} gap='small'>
          {names.map(this.renderName)}
        </Box>
      </Box>
    </Box>
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





export default App;
