import Ember from 'ember';
import Resource from './resource';
import { attr, hasMany } from 'ember-jsonapi-resources/models/resource';

export default Resource.extend({
  type: 'authors',
  service: Ember.inject.service('authors'),

  name: attr('string'),
  email: attr('string'),

  posts: hasMany('posts')
});
