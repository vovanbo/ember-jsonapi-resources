import { moduleFor, test } from 'ember-qunit';
import Ember from 'ember';
import RSVP from 'rsvp';
import { pluralize } from 'ember-inflector';
import { setup, teardown } from 'dummy/tests/helpers/resources';

let mockServices;
const mockService = function () {
  let sandbox = this.sandbox;
  return Ember.Service.extend({
    findRelated: sandbox.spy(function () { return RSVP.Promise.resolve(Ember.Object.create({id: 1})); }),
    cacheLookup: sandbox.spy(function () { return undefined; })
  });
};
let entities = ['post', 'author'];

moduleFor('model:resource', 'Unit | Utility | toOne', {
  beforeEach() {
    setup.call(this);
    this.sandbox = window.sinon.sandbox.create();
    mockServices = {};
    entities.forEach(function (entity) {
      let serviceName = pluralize(entity);
      mockServices[serviceName] = mockService.call(this);
      this.registry.register('service:'+serviceName, mockServices[serviceName]);
    }.bind(this));
  },
  afterEach() {
    mockServices = null;
    teardown.call(this);
    this.sandbox.restore();
  }
});

test('toOne() helper sets up a promise proxy to a related resource', function(assert) {
  let post = this.container.lookup('model:post').create({
    id: '1', attributes: { title: 'Wyatt Earp', excerpt: 'Was a gambler.'},
    relationships: {
      author: {
        data: { type: 'authors', id: '1' },
        links: {
          'self': 'http://api.pixelhandler.com/api/v1/posts/1/relationships/author',
          'related': 'http://api.pixelhandler.com/api/v1/posts/1/author'
        }
      },
    }
  });
  let promise = post.get('author');
  assert.ok(promise.toString().match('ObjectProxy').length === 1, 'ObjectProxy used for toOne relation');
});
