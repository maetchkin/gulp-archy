'use strict';

var garchy = require('./index.js'),
    gulp   = require('gulp');

gulp.task(
    'default',
    function(cb) {
        return gulp
            .src(
                ['test/**/*'],
                {base: process.cwd()}
            )

            .on(
                'data',
                function(file){
                    console.log( file.path.replace(process.cwd()+'/','') );
                }
            )
            .pipe(
                garchy(
                    {
                        options: 'options'
                    }
                )
            )
            ;
    }
);
