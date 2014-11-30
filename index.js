/* jshint node: true */
'use strict';

var through = require('through2'),
    path = require('path'),
    archy = require('archy');

module.exports = function(opts) {

    var tree    = {},
        options = {},
        add = function(path){
            var arr = path.split("/"),
                i = 0,
                l = arr.length,
                ll = l-1,
                point = tree;
            for(;i<l;i++){
                point[arr[i]] = point[arr[i]] || ((i===(ll))?null:{});
                point=point[arr[i]];
            }
        },
        getArchTree = function(tree, dst, label){
            dst.label = label;
            for(var k in tree){
                dst.nodes = dst.nodes || [];
                dst.nodes.push(
                    tree[k] ? getArchTree(tree[k], {}, k) : k
                );
            }
            return dst;
        };

    options.label   = opts && opts.label    ? opts.label    : 'root';
    options.callback= opts && opts.callback ? opts.callback : function(res){console.log(res)};

    return through(
        {
            objectMode: true,
            allowHalfOpen: false
        },
        function (file, enc, cb) {
            this.push(file);
            add(
                path.join(
                    options.label,
                    file.path.replace(process.cwd(),'')
                )
            );
            cb();
        },
        function (cb) {
            var archytree = getArchTree(tree[options.label], {}, options.label),
                result = archy(archytree, options.prefix || '', options.opts || {});
            options.callback(result);
            cb();
        }
    );
};
