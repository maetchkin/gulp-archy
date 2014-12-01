gulp-archy
==========

render buffered files structure with archy

Usage
---
```javascript
gulp
    .src(['**/*'])
    .pipe(archy(options));
```

Options
---
* label - replace process.cwd() in paths with value (default 'root')
* callback - for futher result proccessing (default console.log)
* prefix - prefix for archy
* opts - options for archy

License
---
MIT
