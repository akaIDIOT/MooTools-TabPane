Simple Tab Pane
===============
![Screenshot](http://akaidiot.github.com/MooTools-TabPane/simple-tab-pane.png)

Simple Tab Pane is a very simple MooTools class that allows you to create a tab pane from a single element. All it needs is a selector for the tabs (the headers, so to say) and a selector for the corresponding contents.

Because all the tab switching is based on delegated events, no effort is needed to add tabs: simply add elements with the correct class names (or tag names if you specified your selector as such) and you're done!

Styling is left completely up to the user. Whether you want an inline list as the tab headers or a series of links, you're the boss.

Simple Tab Pane is compatible with all of MooTools 1.2, 1.3, 1.4 and 1.5 (even without the compatability layer).

As of version 0.5, functions that add and remove tabs have been moved to a separate file to save bytes and keep simple tab pane simple. Due to the use of event delegation, simply adding and removing elements to the container does the trick as well (and is the exact trick done by the functions in `TabPane.Extra.js`).

*Implementation note: because of [the way event delegation works](https://mootools.lighthouseapp.com/projects/24057/tickets/201-issue-with-event-propagation-in-mootools-event-delegation), event propagation doesn't work properly when dealing with delegations. Sadly, this handicaps the removing of tabs via items **inside** the tab header a bit. See the included demo for an implementation of this.*

A demo is included in the download package.

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

## Constructor

### Syntax:

    #JS
    var myTabPane = new TabPane(container[, options[, showNow]]);

### Arguments:

1. container - (*string* or *element*) The element that contains the tab components (tab headers and contents).
2. options - (*object*, optional) On options object, see below.
3. showNow - (*number* or *function*, optional) A number of function that returns a number, the index to focus initially.

### Options:

- tabSelector - (*string*) CSS selector for the tab headers within the container.
- contentSelector - (*string*) CSS selector for the tab contents within the container.
- activeClass - (*string*) Class name for the active tab header.

### Events:

- change - (*function*) Function executed when a tab is selected. The index of the selected tab is passed as the only argument.

## add (only available when TabPane.Extra is loaded)

Adds a tab header and corresponding content to the tab pane add the location specified (optional).

### Syntax:

	#JS
	myTabPane.add(tab, content[, location[, showNow]]);

### Arguments:

1. tab - (*element*) The element to be used as the new tab's header.
2. content - (*element*) The element to be used as the new tab's content.
3. location - (*number*, optional) Where to place the new tab (default: at the end).
4. showNow - (*boolean*, optional) Whether to focus the new tab (default: `false`;)

### Events:

- add (*function*) Function exectuted when a tab is added. The index of the added tab is passed as the only argument.
- change (*function*) Fired if `showNow` was specified by focusing the new tab.

## close (only available when TabPane.Extra is loaded)

Allows closing of a certain tab and its corresponding content element from the container.

### Syntax:

    #JS
    myTabPane.close(what);

### Arguments:

1. what - (*number* or *element*) The index of the tab or either a tab header or content element to remove.

### Events:

- close - (*function*) Function executed when a tab is removed. The index of the removed tab is passed as the only argument.
- change - (*function*) Fired inadvertedly by changing the tab (see the demo and source for this).

Changelog
---------

### 0.5.2

- update to MooTools 1.5 (functional code unchanged)

### 0.5.1

- **REMOVE** showTab and closeTab in favor of show and close

### 0.5

- **DEPRECATE** showTab and closeTab in favor of show and close (old ones will be removed in next version)
- add function add
- move add and close to TabPane.Extra

### 0.4

- add optional third parameter showNow to select tab on init

### 0.3

- update to MooTools 1.4 (functional code unchanged)

### 0.2

- add closeTab based on index

### 0.1

- initial release

Credits
-------
Credits where credits are due:

- [@shakaran](https://github.com/shakaran) for suggesting the optional `showNow` parameter in the constructor

