import React, { Component, PropTypes } from 'react';

import { OfflineTasks } from '../api/tasks.js';

// Task component - represents a single todo item

export default class OfflineTaskList extends Component {
	constructor(props) {
		super(props);

		this.deleteThisTask = this.deleteThisTask.bind(this);
	}
	deleteThisTask() {
		Meteor.call('deleteOfflineTask', this.props.task._id);
	}
	render() {
		// console.log("Task props >>>>>", this.props.task)
		return (
			<li>
				{this.props.task.text}&nbsp;&nbsp;
				<button className="btn btn-default" id="delete" onClick={this.deleteThisTask} title="Please click here.">
					<span className="glyphicon glyphicon-remove-sign"></span>
				</button>
			</li>
		);
	}
}

OfflineTaskList.propTypes = {
	// This component gets the task to display through a React prop.
	// We can use propTypes to indicate it is required
	task: PropTypes.object.isRequired,
};