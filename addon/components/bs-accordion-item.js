import Ember from 'ember';
import TypeClass from 'ember-bootstrap/mixins/type-class';
import SubComponent from 'ember-bootstrap/mixins/sub-component';

/**
 A collapsible/expandable item within an accordion

 See {{#crossLink "Components.Accordion"}}{{/crossLink}} for examples.


 @class AccordionItem
 @namespace Components
 @extends Ember.Component
 @uses Mixins.TypeClass
 @uses Mixins.SubComponent
 */
export default Ember.Component.extend(TypeClass, SubComponent, {
  classNames: ['panel'],

  /**
   * @property classTypePrefix
   * @type String
   * @default 'panel'
   * @protected
   */
  classTypePrefix: 'panel',

  /**
   * The title of the accordion item, displayed as a .panel-title element
   *
   * @property title
   * @type string
   * @public
   */
  title: null,

  /**
   * The value of the accordion item, which is used as the value of the `selected` property of the parent {{#crossLink "Components.Accordion"}}{{/crossLink}} component
   *
   * @property value
   * @public
   */
  value: Ember.computed.oneWay('elementId'),

  selected: Ember.computed.alias('parentView.selected'),

  collapsed: Ember.computed('value','selected', function() {
    return this.get('value') !== this.get('selected');
  }),
  active: Ember.computed.not('collapsed'),

  action: 'selected',

  actions: {
    toggleActive () {
      var value = this.get('value'),
        previous = this.get('selected'),
        active = this.get('active');
      if (!active) {
        this.set('selected', value);
        this.sendAction('action', value, previous);
      }
      else {
        this.set('selected', null);
        this.sendAction('action', null, previous);
      }
    }
  }

});
