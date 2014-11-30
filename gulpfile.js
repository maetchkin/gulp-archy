'use strict';

var garchy = require('./index.js'),
    gulp   = require('gulp');

gulp.task(
    'default',
    function(cb) {
        return gulp
            .src(
                ['**/index.js'],
                {base: process.cwd()}
            )
            .pipe(
                garchy(
                    {
                        options: 'options'
                    }
                )
            );
    }
);
