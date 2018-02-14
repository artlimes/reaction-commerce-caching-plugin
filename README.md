# Reaction Commerce Caching Plugin
Allows for Meteor Spiderable caching of products through Chrome Headless

This plugin is used in conjunction with [Meteor Chrome Headless Spiderable](https://github.com/artlimes/meteor-chrome-headless-spiderable)

# Installation
1. Copy/Clone folder to `plugins/custom`.
2. Install [artlimes:meteor-chrome-headless-spiderable](https://github.com/artlimes/meteor-chrome-headless-spiderable) by running `meteor add artlimes:meteor-chrome-headless-spiderable`
3. to cache all your existing visible products open DevTools and run the following in the console: 
```js 
Meteor.call("caching/allProducts");
// OR
Meteor.call("caching/allProducts", productId);
// OR
Meteor.call("caching/allProducts", productSlug);
```

This is a convenience method to cache all your visible Product(s). Note that each visible product will get cached automatically after every publish.


