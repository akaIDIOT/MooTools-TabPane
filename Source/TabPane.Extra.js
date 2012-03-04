/*
---
description: TabPane extensions 

license: MIT-style

authors: akaIDIOT

version: 0.4

requires: TabPane

provides: TabPane.Extras
...
*/

(function() {

var typeOf = this.typeOf;

if (!typeOf) {
	typeOf = $type;
}

this.TabPane.implement({
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

		this.fireEvent('add', this.indexOf(tab));

		if (showNow) {
			this.show(tab);
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
	}
});

})()
