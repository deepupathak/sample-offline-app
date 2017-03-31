import { OnlineTasks, OfflineTasks } from '/imports/api/tasks.js';

Meteor.publish('offlineTask', ()=> {
  return OfflineTasks.find();
});

Meteor.publish('onlineTask', ()=> {
  return OnlineTasks.find();
});