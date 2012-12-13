/*
---
description: TabPane Class

license: MIT-style

authors: akaIDIOT

version: 0.5.1

requires:
  core/1.4:
  - Class
  - Class.Extras
  - Event
  - Element
  - Element.Event
  - Element.Delegation

provides: TabPane
...
*/

(function() {

// make typeOf usable for MooTools 1.2 through 1.4
var typeOf = this.typeOf || this.$type;

var TabPane = this.TabPane = new Class({

	Implements: [Events, Options],

	options: {
		tabSelector: '.tab',
		contentSelector: '.content',
		activeClass: 'active'
	},

	container: null,

	initialize: function(container, options, showNow) {
		this.setOptions(options);

		this.container = document.id(container);
		// hide all the content parts by default
		this.container.getElements(this.options.contentSelector).setStyle('display', 'none');

		// add a relayed click event to handle switching tabs
		this.container.addEvent('click:relay(' + this.options.tabSelector + ')', function(event, tab) {
			this.show(tab);
		}.bind(this));

		// determine what tab to show right now (default to the 'leftmost' one)
		if (typeOf(showNow) == 'function') {
			showNow = showNow();
		} else {
			showNow = showNow || 0;
		}

		this.show(showNow);
	},

	get: function(index) {
		if (typeOf(index) == 'element') {
			// call get with the index of the supplied element (NB: will break if indexOf returns -1)
			return this.get(this.indexOf(index));
		} else {
			var tab = this.container.getElements(this.options.tabSelector)[index];
			var content = this.container.getElements(this.options.contentSelector)[index];
			return [tab, content];
		}
	},

	indexOf: function(element) {
		if (element.match(this.options.tabSelector)) {
			return this.container.getElements(this.options.tabSelector).indexOf(element);
		} else if (element.match(this.options.contentSelector)) {
			return this.container.getElements(this.options.contentSelector).indexOf(element);
		} else {
			// element is neither tab nor content, return -1 per convention
			return -1;
		}
	},

	show: function(what) {
		if (typeOf(what) != 'number') {
			// turn the argument into its usable form: a number
			what = this.indexOf(what);
		}

		// if only JavaScript had tuple unpacking...
		var items = this.get(what);
		var tab = items[0];
		var content = items[1];

		if (tab) {
			this.container.getElements(this.options.tabSelector).removeClass(this.options.activeClass);
			this.container.getElements(this.options.contentSelector).setStyle('display', 'none');
			tab.addClass(this.options.activeClass);
			content.setStyle('display', 'block');
			this.fireEvent('change', what);
		}
		// no else, not clear what to do
	}

});

})();
