/*
---
description: TabPane Class 

license: MIT-style

authors:
- akaIDIOT

requires:
    core/1.2.4
    - Class
    - Class.Extras 
    - Element 
    - Element.Event
    - Selectors 
    more/1.2.4
    - Element.Delegation

provides: TabPane

...
*/

var TabPane = new Class({
    
    Implements: [Events, Options],

    options: {
        tabSelector: '.tab',
        contentSelector: '.content',
        activeClass: 'active'
    },

    container: null,

    initialize: function(container, options) {
        this.setOptions(options);

        this.container = document.id(container);
        this.container.getElements(this.options.contentSelector).setStyle('display', 'none');

        var self = this;
        this.container.addEvent('click:relay(' + this.options.tabSelector + ')', function() {
            var index = self.container.getElements(self.options.tabSelector).indexOf(this);
            var content = self.container.getElements(self.options.contentSelector)[index];

            if (content) {
                self.container.getElements(self.options.tabSelector).removeClass(self.options.activeClass);
                self.container.getElements(self.options.contentSelector).setStyle('display', 'none');
                this.addClass(self.options.activeClass);
                content.setStyle('display', 'block');
                self.fireEvent('change', index);
            }
        });

        this.container.getElement(this.options.tabSelector).addClass(this.options.activeClass);
        this.container.getElement(this.options.contentSelector).setStyle('display', 'block');
    }

});
