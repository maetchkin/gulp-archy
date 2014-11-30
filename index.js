/* jshint node: true */
'use strict';

var through = require('through2'),
    archy = require('archy');

var garchy = function(options) {
    var tree = {},
        label = options.label || 'root',
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

    return through(
        {
            objectMode: true,
            allowHalfOpen: false
        },
        function (file, enc, cb) {
            this.push(file);
            add(file.path.replace(process.cwd(),label));
            cb();
        },
        function (cb) {
            var archytree = getArchTree(tree[label], {}, label),
                result = archy(archytree, options.prefix || '', options.opts || {});
            if(options.callback){
                options.callback(result, cb);
            } else {
                console.log(result);
                cb();
            }
        }
    );
};

module.exports = garchy;
