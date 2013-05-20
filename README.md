# D3 Presentation Demo

Demo code for D3 presentation delivered at Fronteers meetup.


## Get started

In project root do:

    npm install
    grunt build
    grunt

This will run a [server on port 8080](http://localhost:8080),
_automatically compile_ jade/sass to html/css and _watch_
any changes to jade/sass/js to _livereload_ the server.


## Prerequisites

Need to have _nodejs_, _npm_ and _grunt-cli_ installed.


## Useful commands

    // Compile all jade/sass to html/css, optimizes js files
    grunt build

    // Spin up server
    grunt


## Tips

Add new packages do

    npm install <module> --save-dev



## Resources

* [grunt getting started](http://gruntjs.com/getting-started)
* [grunt plugins](http://gruntjs.com/plugins)
* [grunt-contrib-connect usage](https://github.com/gruntjs/grunt-contrib-connect/blob/master/README.md)
* [grunt-jade usage](https://github.com/phated/grunt-jade/blob/master/README.md)
* [jade syntax](https://github.com/visionmedia/jade/blob/master/Readme.md)
* [jade syntax](http://naltatis.github.com/jade-syntax-docs)
* [grunt-regarde usage](https://github.com/yeoman/grunt-regarde/blob/master/readme.md)
  We use grunt-regarde instead of grunt-contrib-watch because we want
  it to be used together with livereload
* [grunt-contrib-livereload usage](https://github.com/gruntjs/grunt-contrib-livereload/blob/master/README.md)
* [grunt-contrib-compass usage](https://github.com/gruntjs/grunt-contrib-compass/blob/master/README.md)
* [sass syntax](http://sass-lang.com)