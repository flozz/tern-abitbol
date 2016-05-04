# Abitbol Tern Plugin

[![Build Status](https://travis-ci.org/flozz/tern-abitbol.svg?branch=master)](https://travis-ci.org/flozz/tern-abitbol)
[![NPM Version](http://img.shields.io/npm/v/tern-abitbol.svg?style=flat)](https://www.npmjs.com/package/tern-abitbol)
[![License](http://img.shields.io/npm/l/tern-abitbol.svg?style=flat)](https://github.com/flozz/tern-abitbol/blob/master/LICENSE)

> Tern.js plugin to autocomplete Abitbol classes

[Tern][tern] is a stand-alone code-analysis engine for JavaScript that can be used as
text editor plugin to provide Javascript autocompletion.

Tern Abitbol is a Tern plugin that allows it to work with the
[Abitbol][abitbol] inheritance model (so it makes the autocompletion working
with the Abitbol classes).


## How To Install Abitbol Tern Plugin

To install Abitbol Tern Plugin, you first have to install the Tern plugin for
your favorite editor. You can find instruction here:

* http://ternjs.net/doc/manual.html#editor

The go to the folder where your tern plugin is installed (it should contain a `node_modules` folder), then simply install the Abitbol Tern Plugin in it:

    npm install tern-abitbol


## How To Use Abitbol Tern Plugin In A Project

To use Abitbol Tern Plugin to autocomplete your project, you should create
a `.tern-project` file in the project's root folder, that should contain at
least the following lines:

```json
{
  "plugins": {
    "node": {},
    "abitbol": {}
  }
}
```

Please read the Tern documentation for more information about the
`.tern-project` file:

* http://ternjs.net/doc/manual.html#configuration

A more complete example:

```json
{
  "ecmaVersion": 6,
  "libs": [],
  "plugins": {
    "node": {},
    "abitbol": {}
  },
  "loadEagerly": [
    "./node_modules/photonui/src/photonui.js",
    "./app/js/**/*.js"
  ]
}
```


## Changelog

* **0.2.0:**
  * Supports static properties (`__classvars__`)
  * Supports mixins (`__include__`)
  * Supports constructors (`__init__`)
  * Support most of the Abitbol special properties (`$extend`, `$class`, `$map`
    (incomplete), `$data`, `$super`)
* **0.1.0:** Cleaned version
* **0.0.0:** Basic POC (support inheritance, property inheritance and prototype
  extension)


[tern]: http://ternjs.net/
[abitbol]: https://github.com/wanadev/abitbol/
