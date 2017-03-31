import React, { Component, PropTypes } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';

import { OnlineTasks } from '../api/tasks.js';

import OnlineTaskList from './onlineTaskList.jsx';

class OnlineTask extends Component {
	constructor(props) {
		super(props);

		this.handleSubmitOnline = this.handleSubmitOnline.bind(this);
	}
	handleSubmitOnline(event) {
		event.preventDefault();

		// Find the text field via the React ref
		const text = ReactDOM.findDOMNode(this.refs.textInputOnline).value.trim();
		// console.log("text value >>>>>", text)

		Meteor.call('insertTaskOnline', text, (err)=>{
			if(!err) {
				ReactDOM.findDOMNode(this.refs.textInputOnline).value = '';
			}
		});
	}
	render() {
		return (
			<div className="onlineTask-container">
				<form onSubmit={this.handleSubmitOnline}>
					<div className="input-groupp">
						<input type="text" title="Please fill in this field." className="form-controller" ref="textInputOnline" placeholder="Type to add online tasks" required />
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
						<p><b>Online Tasks List (Stored in mongodb) : (Total record : {this.props.onlineCount})</b></p>
						<ul>
							{
								this.props.tasksOnline.map((value) => {
									// console.log("value >>>>", value)
									return (
										<OnlineTaskList key={value._id} task={value} />
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

OnlineTask.propTypes = {
	tasksOnline: PropTypes.array.isRequired,
	onlineCount: PropTypes.number.isRequired,
};

export default createContainer(() => {
	// Meteor.subscribe('onlineTask');
	if ( Meteor.status().connected ) {
		console.log("OnlineTask connection status >>>", Meteor.status().connected)
		Tracker.autorun(()=> {
			Meteor.subscribe('onlineTask');
		});
		// OnlineTasks.find().observe({
		// 	added: function(document){
		// 		console.log("Record added in onlineTask ->", document._id); // Invoked when record added in database
		// 	},
		// 	changed: function(newDocument, oldDocument) {
		// 		console.log("Record changed in onlineTask ->", newDocument); // Invoked when record updated/changed in database
		// 	},
		// 	removed: function(oldDocument) {
		// 		console.log("Record removed in onlineTask ->", oldDocument._id); // Invoked when record deleted from database
		// 	}
		// })
	}
	return {
		tasksOnline: OnlineTasks.find({}, { sort: { createdAt: -1 } }).fetch(),
		onlineCount: OnlineTasks.find({}, { sort: { createdAt: -1 } }).count(),
	};
}, OnlineTask);