gulp-archy
==========
[![NPM](https://nodei.co/npm/gulp-archy.png?downloads=true&stars=true)](https://nodei.co/npm/gulp-archy/)

Gulp plugin to pretty print files list inside gulp stream in a tree-structure for better debug

It's just gulp wrapper for [archy](https://www.npmjs.org/package/archy)

The usual way to list files from the stream:
---
```javascript
gulp
    .src(['test/**/*'])
    .on(
        'data',
        function(file){
            console.log(file.path);
        }
    );
```
Ugly list

    test/a
    test/k
    test/a/b
    test/a/d
    test/a/e
    test/a/file.css
    test/a/file.html
    test/k/v
    test/a/b/c
    test/a/d/file.css
    test/a/e/file.html
    test/k/v/file-1.js
    test/k/v/file-2.js
    test/k/v/file-3.js
    test/k/v/file.js
    test/a/b/c/file.js


Pretty print
---
```javascript
gulp
    .src(['**/*'])
    .pipe(archy(options));
```

The tree

    root
    └─┬ test
      ├─┬ a
      │ ├─┬ b
      │ │ └─┬ c
      │ │   └── file.js
      │ ├─┬ d
      │ │ └── file.css
      │ ├─┬ e
      │ │ └── file.html
      │ ├── file.css
      │ └── file.html
      └─┬ k
        └─┬ v
          ├── file-1.js
          ├── file-2.js
          ├── file-3.js
          └── file.js


Options
---
* label - replace process.cwd() in paths with given value (default 'root')
* callback - for further results processing (default console.log)
* prefix - prefix for archy
* opts - options for archy

License
---
[MIT](https://github.com/maetchkin/gulp-archy/blob/master/LICENSE)
Copyright (c) 2014-2015 Yandex, LLC. http://yandex.com
Copyright (c) 2014-2015 Anton Kirshanov, maetchkin@yandex.ru

