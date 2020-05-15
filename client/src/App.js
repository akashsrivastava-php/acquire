import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { Routing } from './route/Route.js';
import './App.css';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
class App extends Component {
  render() {
    return (
      <div>
       { Routing() }
      </div>
    );
  }
}

export default App;
