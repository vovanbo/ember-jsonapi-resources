import Ember from 'ember';
import Resource from 'ember-jsonapi-resources/models/resource';
import { attr, toOne, toMany } from 'ember-jsonapi-resources/models/resource';

let <%= classifiedModuleName %> = Resource.extend({
  type: '<%= resource %>',
  service: Ember.inject.service('<%= resource %>'),

  <%= attrs %>
});

<%= classifiedModuleName %>.reopenClass({

  getDefaults() {
    return {
      attributes: {}
    };
  }
});

export default <%= classifiedModuleName %>;
