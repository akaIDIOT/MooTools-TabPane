Simple Tab Pane
===============
Simple Tab Pane is a very simple MooTools class that allows you to create a tab pane from a single element. All it needs is a selector for the tabs (the headers, so to say) and a selector for the corresponding contents. 

Because all the tab switching is based on delegated events, no effort is needed to add tabs: simply add elements with the correct class names (or tag names if you specified your selector as such) and you're done! 

Styling is left completely up to the user. Whether you want an inline list as the tab headers or a series of links, you're the boss. 

How To Use
----------

All you'll need to create a tab pane on your page is instantiate a new TabPane and supply it the container (or its id) in which your tabs and corresponding contents reside:

    #JS
    var myTabPane = new TabPane('tabs');

Default, it uses the selector '.tab' for a the tab headers and '.content' for the corresponding content sections and adds the css class 'active' to the selected tab header. These values are customizable in the constructor. Should you for example want to select all li elements as tab headers with p elements as the contents, your call to the constructor would look as such:

    #JS
    var myTabPane = new TabPane('tabs', {
        tabSelector: 'li',
        contentSelector: 'p'
    });

### Syntax: 

    #JS
    var myTabPane = new TabPane(container[, options]);

### Arguments: 

1. container - (*string* or *element*) The element that contains the tab components (tab headers and contents). 
2. options - (*object*, optional) On options object, see below. 

### Options: 

- tabSelector - (*string*) CSS selector for the tab headers within the container. 
- contentSelector - (*string*) CSS selector for the tab contents within the container. 
- activeClass - (*string*) Class name for the active tab header. 

### Events: 

- change - (*function*) Function executed when a tab is selected. The index of the selected tab is passed as the only argument. 
