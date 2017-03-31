import { Mongo } from 'meteor/mongo';

export const OnlineTasks = new Meteor.Collection("onlineTasks"); // This collection will not persist when offline
export const OfflineTasks = new Ground.Collection("offlineTasks");

if(Meteor.isServer){
	Meteor.methods({
		'insertTaskOffline': function(text){
			OfflineTasks.insert({
				text,
				createdAt: new Date(), // current time
			});
		},
		'insertTaskOnline': function(text) {
			OnlineTasks.insert({
				text,
				createdAt: new Date(), // current time
			});
		},
		'deleteOfflineTask': function(id) {
			OfflineTasks.remove({_id: id});
		},
		'deleteOnlineTask': function(id) {
			OnlineTasks.remove({_id: id});
		}
	})
}