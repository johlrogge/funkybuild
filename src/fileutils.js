(function(){
	var fu = {};
	module.exports = fu;

	var path = require('path');
	var fs = require('fs');
	var us = require('./utils');

	var isDir = function(fsobj) {
		return fs.statSync(fsobj).isDirectory();
	}

	fu.walk = function(directory) {	
		var innerWalk = function(root, dir, res) {
			var stuff = fs.readdirSync(path.join(root, dir));
			if(stuff) {
				for(o in stuff) {
					var localPath = path.join(dir, stuff[o]);
					var fullPath = path.join(root, localPath);
					if(isDir(fullPath)) {
						innerWalk(root, localPath, res);
					} else {
						res.push(localPath);
					}
				}			
			}
			return res;
		}	
		return innerWalk(directory,"", []);
	};

	fu.mkdir = function(dire) {
		var dir = path.normalize(dire);
		console.log('making dir ' + dir);
		var dirs = dir.split('/');
		var currDir = us.startsWith(dire, '/')?'/':'./';
		
		for(var i=0;i<dirs.length;i++) {
			currDir = path.join(currDir, dirs[i]);
			if(!path.existsSync(currDir) && dirs[i].length>0) {
				console.log('Making ' + currDir);
				fs.mkdirSync(currDir);
			};
		}	
	}
}());