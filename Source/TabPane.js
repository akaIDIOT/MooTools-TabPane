/*
---
description: TabPane Class 

license: MIT-style

authors: akaIDIOT

version: 0.4

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

var typeOf = this.typeOf;

if (!typeOf) {
	typeOf = $type;
}

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
		this.container.getElements(this.options.contentSelector).setStyle('display', 'none');

		this.container.addEvent('click:relay(' + this.options.tabSelector + ')', function(event, tab) {
			this.show(tab);
		}.bind(this));

		if (typeOf(showNow) == 'function') {
			showNow = showNow();
		} else {
			showNow = showNow || 0;
		}

		this.show(showNow);
	},

	get: function(index) {
		if (typeOf(index) == 'element') {
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
			return -1;
		}
	},

	add: function(tab, content, location, showNow) {
		if (typeOf(location) == 'number') {
			var before = this.get(location);
			tab.inject(before[0], 'before');
			content.inject(before[1], 'before');
		} else {
			tab.inject(this.container.getElements(this.options.tabSelector).getLast(), 'after');
			content.setStyle('display', 'none');
			content.inject(this.container.getElements(this.options.contentSelector).getLast(), 'after');
		}

		if (showNow) {
			this.show(tab);
		}
	},

	show: function(what) {
		if (typeOf(what) != 'number') {
			what = this.indexOf(what);
		}

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
	},

	close: function(what) {
		if (typeOf(what) != 'number') {
			what = this.indexOf(what);
		}

		var items = this.get(what);
		var tab = items[0]
		var content = items[1];

		if (tab) {
			var tabs = this.container.getElements(this.options.tabSelector);
			var selected = tabs.indexOf(this.container.getElement('.' + this.options.activeClass)); // will always be equal to index if the closing element matches tabSelector 

			tab.destroy();
			content.destroy();
			this.fireEvent('close', what);
			
			this.show(selected.limit(0, tabs.length - 2)); // a tab was removed, length is 1 less now 
		}
	},

	showTab: function(index, tab) {
		this.show(typeOf(index) == 'number' ? index : tab);
		if (console) {
			console.warn('showTab is deprecated, please use show instead');
		}
	},

	closeTab: function(index) {
		this.close(index);
		if (console) {
			console.warn('closeTab is deprecated, please use close instead');
		}
	}

});

})();
