# Babel Inline Dynamic Import

Babel plugin to add the opportunity to use `import()` with raw/literal content<br>
It is good e.g. for importing `*.html` or `*.css` files into your code.

## Install
```
npm install babel-plugin-inline-dynamic-import --save-dev
```

## Use
Add a `.babelrc` file and write:
```javascript
{
  "plugins": [
    "babel-plugin-inline-dynamic-import"
  ]
}
```
or pass the plugin with the plugins-flag on CLI
```
babel-node myfile.js --plugins babel-plugin-inline-dynamic-import
```

By default, Babel-Inline-Dynamic-Import is compatible with the following file extensions:

* .html
* .css


## Customize
If you want to enable different file extensions, you can define them in your `.babelrc` file
```javascript
{
  "plugins": [
    ["babel-plugin-inline-dynamic-import", {
      "extensions": [
        ".html",
        ".txt",
        ".svg",
      ]
    }]
  ]
}
```

## How it works
Let's say `template.html` contains:
```html
<b>Hello</b>
```

Source:
```js
let template = await import('template.html')
```

Compiles to:
```js
let template = await Promise.resolve('<b>Hello</b>')
```

## Caveats

Babel does not track dependency between _imported_ and _importing_ files after the transformation is made. Therefore, you need to change the _importing file_ in order to see your changes in the _imported file_ spread. To overcome this:

* If you are using `babel-node` or `babel-register`, you can [disable babel cache (`BABEL_DISABLE_CACHE=1`)](https://babeljs.io/docs/usage/babel-register/#environment-variables-babel-disable-cache).

Also make sure that your task runner is watching for changes in the _imported file_ as well. You can see it working [here](https://github.com/Quadric/perfect-graphql-starter/blob/master/nodemon.json).


## Motivate
If you like this project just give it a star :) I like stars.