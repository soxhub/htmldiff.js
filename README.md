# htmldiff.js
### HTML Diffing in JavaScript (no, really, no more coffeescript!)


`htmldiff.js` is a js port of the coffeescript port at https://github.com/tnwinc/htmldiff.js

This is diffing that understands HTML. Best suited for cases when you
want to show a diff of user-generated HTML (like from a wysiwyg editor).

##Usage
You use it like this:

```
  var diffr = require('htmldiff');
  console.log(diffr.htmldiff('<p>this is some text</p>', '<p>this is some more text</p>'));
```
And you get:

```html
<p>this is some <ins>more </ins>text</p>
```
##Module

It should be multi-module aware. ie. it should work as a node.js module
or an AMD (RequireJS) module


Licensed under the MIT License. See the `LICENSE` file for details.
