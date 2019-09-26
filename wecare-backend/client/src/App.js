import React,{Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component{

  
  state = {names: []}

  componentDidMount() {
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
    <div className="App">
      {names.map(this.renderName)}
    </div>
  );
}}

export default App;
