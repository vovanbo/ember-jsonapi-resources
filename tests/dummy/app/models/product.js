import Ember from 'ember';
import Resource from './resource';
import { attr, toMany } from 'ember-jsonapi-resources/models/resource';

export default Resource.extend({
  type: 'products',
  service: Ember.inject.service('products'),

  name: attr('string'),

  pictures: toMany('pictures')
});
