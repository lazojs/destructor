[![Build Status](https://travis-ci.org/lazojs/destructor.svg?branch=master)](https://travis-ci.org/lazojs/destructor)

# destructor

> I am Destructor! Nya-a-a-a-a-a-a-a-a-a-a-a-a

Gets an application list of modules for a RequireJS configuration based on Lazo app.json meta data and a directory scan.

## Usage

```javascript
var destructor = require('destructor');

// arguments
// 1. application distribution location
// 2. options
//    - inlcude: regex of files to include; default is /.js$/
//    - includeDir: regex to limit directories
//    - excludeDir: regex to exclude directories
//    - exclude: regex to exclude files
// 3. callback

destructor('app/dist', { include: /.js$|.hbs$/ }, function (err, list) {
    if (err) {
        throw err;
    }

    // all modules in application distribution
    console.log(list.modules);
    // modules listed in the app.json.js property
    console.log(list.application);
});
```