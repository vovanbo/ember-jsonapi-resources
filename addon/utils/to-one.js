/**
  @module ember-jsonapi-resources
  @submodule utils
  @main toOne
**/

import Ember from 'ember';
import RelatedProxyUtil from 'ember-jsonapi-resources/utils/related-proxy';
import { linksPath } from 'ember-jsonapi-resources/utils/related-proxy';
import { isDasherized } from 'ember-jsonapi-resources/utils/is';

/**
  Helper to setup a has one relationship to another resource

  ```js
  let Employee = Person.extend({
    type: 'employees',
    supervisor: toOne('supervisor')
  });
  ```

  Or, with an optional type to use instead of the resource's service

  ```js
  let Person = Resource.extend({
    type: 'people',
    name: attr()
  });

  let Employee = Person.extend({
    type: 'employees',
    supervisor: toOne({ resource: 'supervisor', type: 'people' })
  });
  ```

  @method toOne
  @for Resource
  @final
  @param {String|Object} relation the name of the relationship
  @param {String} relation.resource the name of the relationship
  @param {String} relation.type the name of the type or service to use
  @return {Object} computed property
*/
export default function toOne(relation) {
  let type = relation;
  if (typeof type === 'object') {
    assertResourceAndTypeProps(relation);
    type = relation.type;
    relation = relation.resource;
  }
  assertDasherizedHasOneRelation(type);
  let kind = 'toOne';
  let util = RelatedProxyUtil.create({relationship: relation, type: type, kind: kind});
  let path = linksPath(relation);
  return Ember.computed(path, function () {
    return util.createProxy(this, kind);
  }).meta({relation: relation, type: type, kind: kind});
}

export let hasOne = toOne;

function assertResourceAndTypeProps(relation) {
  try {
    let msg = 'Options must include properties: resource, type';
    Ember.assert(msg, relation && relation.resource && relation.type);
  } catch(e) {
    Ember.Logger.warn(e.message);
  }
}

function assertDasherizedHasOneRelation(name) {
  try {
    let relationName = Ember.String.dasherize(name);
    let msg = " are recommended to use dasherized names, e.g `toOne('"+ relationName +"')`";
    msg += ", instead of `toOne('"+ name +"')`";
    Ember.assert(msg, isDasherized(name));
  } catch(e) {
    Ember.Logger.warn(e.message);
  }
}
