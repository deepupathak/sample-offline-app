import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { OfflineTasks } from '../api/tasks.js';

import OfflineTaskList from './offlineTaskList.jsx';

class OfflineTask extends Component {
	constructor(props) {
		super(props);

		this.handleSubmitOffline = this.handleSubmitOffline.bind(this);
	}
	handleSubmitOffline(event){
		event.preventDefault();
		// Find the text field via the React ref
		const text = ReactDOM.findDOMNode(this.refs.textInputOffline).value.trim();

		Meteor.call('insertTaskOffline', text, (err)=>{
			if(!err) {
				ReactDOM.findDOMNode(this.refs.textInputOffline).value = '';
			}
		});
	}
	render() {
		return (
			<div className="offlineTask-container">
				<form onSubmit={this.handleSubmitOffline}>
					<div className="input-groupp">
						<input type="text" className="form-controller" ref="textInputOffline" placeholder="Type to add offline tasks" title="Please fill in this field." required />
						<span className="input-group-btnn">
							<button type="submit" className="btn btn-default" title="Please click here.">
								<span className="glyphicon glyphicon-play" id="play"></span>
							</button>
						</span>
					</div>
				</form>
				<br/>
				<div className="row">
					<div className="col-sm-12">
						<p><b>Offline Tasks List (Stored in Ground db) : (Total record : {this.props.offlineCount})</b></p>
						<ul>
							{
								this.props.tasksOffline.map((value) => {
									// console.log("value >>>>", value)
									return (
										<OfflineTaskList key={value._id} task={value} />
									)
								})
							}
						</ul>
					</div>
				</div>
			</div>
		);
	}
}

OfflineTask.propTypes = {
	tasksOffline: PropTypes.array.isRequired,
	offlineCount: PropTypes.number.isRequired,
};

export default createContainer(() => {
	// handleOffline = Meteor.subscribe('offlineTask');
	if ( Meteor.status().connected ) {
		console.log("OfflineTask connection status >>>", Meteor.status().connected)
		Tracker.autorun(()=> {
			if(Ground.ready()) {
				console.log("Ground ready >>>>", Ground.ready())
				Meteor.subscribe('offlineTask');
			}
		});
		// OfflineTasks.find().observe({
		// 	added: function(document){
		// 		console.log("Record added in offlineTask ->", document._id); // Invoked when record added in database
		// 	},
		// 	changed: function(newDocument, oldDocument) {
		// 		console.log("Record changed in offlineTask ->", newDocument); // Invoked when record updated/changed in database
		// 	},
		// 	removed: function(oldDocument) {
		// 		console.log("Record removed in offlineTask ->", oldDocument._id); // Invoked when record deleted from database
		// 	}
		// })

		// OfflineTasks.clear(); // This will empty the in memory and the local storage
	}
	return {
		tasksOffline: OfflineTasks.find({}, { sort: { createdAt: -1 } }).fetch(),
		offlineCount: OfflineTasks.find({}, { sort: { createdAt: -1 } }).count()
	};
}, OfflineTask);