import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { OnlineTasks, OfflineTasks } from '../api/tasks.js';

import OnlineTask from './OnlineTask.jsx';
import OfflineTask from './OfflineTask.jsx';
import OnlineTaskList from './onlineTaskList.jsx';
import OfflineTaskList from './offlineTaskList.jsx';

// Main component - represents the whole app
export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			status: ''
		};
		this.connect = this.connect.bind(this);
		this.disconnect = this.disconnect.bind(this);
	}

	connect(event){
		event.preventDefault();
		Meteor.reconnect();
		const status = Meteor.status().status;
		// console.log("connect >> status >>>>", status);
		this.setState({ 
			status: status
		});
		// console.log("connect >> state >> status >>>>", this.state.status);
	}

	disconnect(event){
		event.preventDefault();
		Meteor.disconnect();
		const status = Meteor.status().status;
		// console.log("disconnect >> status >>>>", status);
		this.setState({
			status: status
		});
		// console.log("disconnect >> state >> status >>>>", this.state.status);
	}

	render() {
		return (
			<div className="container">
				<header>
					<h1>Meteor Offline App</h1>
					<hr/>
					<br />
					<button type="button" className="btn btn-default" id="connect" title="Please click here." onClick={this.connect}>Connect</button>&nbsp;&nbsp;
					<button type="button" className="btn btn-default" id="disconnect" title="Please click here." onClick={this.disconnect}>Disconnect</button>
					<br/><br/>
					<div>
						Client connection status:&nbsp;
						<b>
							{
								// this.state.status ?
									this.state.status == 'connecting' || this.state.status == 'connected' ?
											'connected'
										: this.state.status == 'offline' ?
											'offline'
									: ''
								// : Meteor.status().status
							}
						</b>
					</div>
					<br />
					<hr />
					<div className="row">
						<div className="col-sm-6">
							<OnlineTask />
						</div>
						<div className="col-sm-6">
							<OfflineTask />
						</div>
					</div>
				</header>
			</div>
		);
	}
}