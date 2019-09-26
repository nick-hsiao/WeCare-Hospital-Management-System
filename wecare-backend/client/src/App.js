import React,{Component,Image,StyleSheet} from 'react';
import logo from './logo.svg';
import './App.css';
import backdrop from './img/hmsbackdrop.jpg'

class App extends Component{

  
  state = {names: []}

  componentDidMount() {
    console.log(backdrop);
    this.getNames();
  }

  getNames = _ => {
    fetch('http://localhost:3001/names')
    .then(res => res.json())
    .then(res => this.setState({names: res.data}));
  }

  renderName = ({last,first}) => <div key={last}>{first} {last}</div>

render(){
  const {names} = this.state;

 return (
   <div style={{backgroundImage: `url(${backdrop})`,position: 'fixed',height:'100%',width: '100%',backgroundSize: 'cover',overflow: 'hidden'}}>
    
    <div className="App">
      
      <h1 style={{color: 'white',paddingBottom: 150}}> WeCare Hospital Management System</h1>
      <div style={{fontSize: 25,color:'black'}}>
        <h2>Users List</h2>
        {names.map(this.renderName)}
      </div>
    </div>
  </div>
  );

  


}}





export default App;
