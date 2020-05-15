import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, /* HashRouter as Router, */ Route, Switch, Redirect } from 'react-router-dom';
import { isloggedIn } from '../utils'

import Login from '../component/Login.jsx';
import Dashboard from '../component/Dashboard.jsx';
import Register from '../component/Register';
import Add from '../component/Add';
import Edit from '../component/Edit';
import Profile from '../component/Profile';

export const Routing = (props) => {

		return (
			<Router>
				<Switch>
					<Route exact path="/" component={Login}/>
					<Route exact path="/register" component={Register}/>
					<Route path="/home" render={(props)=>{
						return isloggedIn() ? <Dashboard {...props} /> : <Redirect to={{
							pathname: "/",
						  }}/>
					}}/>
					<Route path="/add" render={(props)=>{
						return isloggedIn() ? <Add {...props} /> : <Redirect to={{
							pathname: "/",
						  }}/>
					}}/>
					<Route path="/edit/:id" render={(props)=>{
						return isloggedIn() ? <Edit {...props}/> : <Redirect to={{
							pathname: "/",
						  }}/>
					}}/>
					<Route path="/profile" render={(props)=>{
						return isloggedIn() ? <Profile {...props}/> : <Redirect to={{
							pathname: "/",
						  }}/>
					}}/>
				</Switch>
			</Router>
		);

}