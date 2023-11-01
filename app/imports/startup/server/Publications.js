import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Contacts } from '../../api/contact/Contacts';

Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const { username } = this.user || {};
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Contacts.userPublicationName, function () {
  if (this.userId) {
    const { username } = this.user || {};
    return Contacts.collection.find({ owner: username });
  }
  return this.ready();
});

Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});
