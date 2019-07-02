import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, Switch} from "react-router-dom";
import './App.css';
import MainPage from './components/MainPage'
import Beer from './components/Beer'
import About from './components/About'
import Nav from './components/Nav'

class App extends Component {
  constructor() {
    super();
    this.allBeers = [];
    this.state = {
      beers: '',
      isLoading: true
    };
  }

  componentDidMount() {
    const self = this;

    const requestInfo = {
      method: 'GET',
      headers: new Headers({
        'Content-type': 'application/json',
      })
    }

    fetch('https://api.punkapi.com/v2/beers', requestInfo)
        .then(response => {
          if(response.ok){
            return response.json();
          } else {
            throw new Error('Request to get all beers failed');
          }
        })
        .then(beers => {
          self.allBeers = beers;
          // console.log(beers);
          this.setState({
            beers: beers
          })

          // console.log(this.state.beers);

        });
  }

  render(){

    return (
        <Router>
            <Nav />
            <div className="App">
                <Switch>
                    <Route path='/' exact component={MainPage}/>
                    <Route path='/beer/:id' component={Beer}/>
                    <Route path='/about/' component={About}/>
                </Switch>

            </div>
        </Router>
    );
  }
}

export default App;
