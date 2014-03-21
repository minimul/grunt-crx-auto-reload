# grunt-crx-auto-reload

> Pure Javascript solution for automatically reloading a Chrome extension.

## WARNING: 
:warning: This solution will spike your processor so disable the extension when you have stopped development. Moreover, remove the reload.js reference on the manifest.json production version.

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-crx-auto-reload --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-crx-auto-reload');
```

## The "crx_auto_reload" task

### Overview and Quickstart Guide
In your project's Gruntfile, add a section named `crx_auto_reload` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  crx_auto_reload: {
    options: {
      extensionDir: 'app/'
    },
    default: {}
  },
})
```

Next, add `reload.js` as a background script in `manifest.json`.
```
{
  // omitted.
  "default_locale": "en",
  "background": {
  "scripts": [
      "reload.js" // The reload.js file will be created on the first run of crx_auto_reload
    ]
  }
  // omitted.
}
```

This plugin is meant to be used in conjunction with `grunt watch` e.g.
```

grunt.initConfig({

    watch: {
        crx_auto_reload: {
          files: ['app/scripts/{,*/}*.js', 'app/manifest.json', 'app/templates/{,*/}*.html'],
          tasks: ['crx_auto_reload']
        }
    },
    crx_auto_reload: {
        options: {
          extensionDir: 'app/'
        },
        default: {}
    }
});
```
In the above example, whenever there are changes to the project's Javascript or HTML files the `crx_auto_reload` task kicks off creating a `reload.html` in the designated `extensionDir` with just a simple timestamp. Here would be the sample contents of `reload.html`.
```
1393936558108
```

On the first run of `crx_auto_reload` the `reload.js` will be created in the designated `extensionDir`. Its job is to check the `reload.html` file every second to see if the timestamp has changed. If the timestamp has changed a `chrome.runtime.reload()` will be executed on `reload.html`. This eliminates the need to go to `chrome://extensions` and perform a manual refresh.

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Credits
Inspiration came from the [bootstrap-chrome-extension](https://github.com/websecurify/bootstrap-chrome-extension) project.

## License
Copyright (c) 2014 Christian Pelczarski. Licensed under the MIT license.
