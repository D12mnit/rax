global.rootPath=process.cwd();var _slash=require("slash");var _slash2=_interopRequireDefault(_slash);var _path=require("path");var _path2=_interopRequireDefault(_path);function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}var root=(0,_slash2.default)(global.rootPath||process.cwd());var hasRootPathPrefixInString=function e(r){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"~";var a=false;if(typeof r==="string"){if(r.substring(0,1)===t){a=true}var n=r.substring(0,2);if(n===t+"/"){a=true}}return a};var transformRelativeToRootPath=function e(r,t,a){var n=arguments.length>3&&arguments[3]!==undefined?arguments[3]:"";n=n.replace(/\\/g,"/");var o="";if(hasRootPathPrefixInString(r,a)){if(r.substring(0,1)==="/"){o=r.substring(1,r.length)}else{o=r.substring(2,r.length)}var i=_path2.default.resolve((t?t:"./")+"/"+o);var f=n.substring(0,n.lastIndexOf("/"));if(f.indexOf("/")===0||f.indexOf(":/")===1||f.indexOf(":\\")===1){f=f.substring(root.length+1)}f=_path2.default.resolve(f);var s=(0,_slash2.default)(_path2.default.relative(f,i));if(s.indexOf("../")!==0){s="./"+s}if(r[r.length-1]==="/"){s+="/"}return s}if(typeof r==="string"){return r}throw new Error("ERROR: No path passed")};var replacePrefix=function e(r){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:[];var a=arguments[2];var n=[].concat(t);for(var o=0;o<n.length;o++){var i="";var f="";var s=n[o];if(s.rootPathSuffix&&typeof s.rootPathSuffix==="string"){i=s.rootPathSuffix}if(s.rootPathPrefix&&typeof s.rootPathPrefix==="string"){f=s.rootPathPrefix}else{f="~"}if((0,hasRootPathPrefixInString)(r,f)){return(0,transformRelativeToRootPath)(r,i,f,a)}}return r};var traverseExpression=function e(r,t){if(r.isStringLiteral(t)){return t}if(r.isBinaryExpression(t)){return e(r,t.left)}return null};module.exports=function(e){var o=e["types"];var a={CallExpression:function e(r,t){if(r.node.callee.name!=="require"){return}var a=r.node.arguments;if(!a.length){return}var n=traverseExpression(o,a[0]);if(n){n.value=replacePrefix(n.value,t.opts,t.file.opts.filename)}},ImportDeclaration:function e(r,t){r.node.source.value=replacePrefix(r.node.source.value,t.opts,t.file.opts.filename)},ExportNamedDeclaration:function e(r,t){if(r.node.source){r.node.source.value=replacePrefix(r.node.source.value,t.opts,t.file.opts.filename)}},ExportAllDeclaration:function e(r,t){if(r.node.source){r.node.source.value=replacePrefix(r.node.source.value,t.opts,t.file.opts.filename)}}};return{visitor:{Program:function e(r,t){r.traverse(a,t)}}}};