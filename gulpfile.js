'use strict';

var archy = require('./index.js'),
    gulp   = require('gulp');

gulp.task(
    'default',
    function(cb) {
        return gulp
            .src(
                ['test/**/*'],
                {base: process.cwd()}
            )
            .pipe(
                archy()
            );
    }
);
