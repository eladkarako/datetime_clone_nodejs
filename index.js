"use strict";

var fs      = require("fs")
   ,path    = require("path")
   ,FILES   = process.argv
                     .filter(function(s){return false === /node\.exe/i.test(s) && false === /index\.js/i.test(s);                                 })  //keep meaningful args.
                     .map(function(s){   return s.replace(/[\r\n]+/gm,"").replace(/^[\"\']*([^\"\']+)[\"\']*/m,"$1");                             })  //clean-up "/' wrapping.
                     .map(function(s){   return path.normalize(path.resolve(s.replace(/\\+/gm,"/")).replace(/\\+/gm,"/")).replace(/\\+/gm,"/");   })
   ,DATES   = FILES.map(function(file){
                          var stat = fs.lstatSync(file);
                          return {atime:                Math.floor(stat.atime.getTime() / 10000)*10
                                 ,mtime:                Math.floor(stat.mtime.getTime() / 10000)*10
                                 ,atime_iso:  (new Date(Math.floor(stat.atime.getTime() / 10000)*10000)).toISOString() + "+00:00 UTC"
                                 ,mtime_iso:  (new Date(Math.floor(stat.mtime.getTime() / 10000)*10000)).toISOString() + "+00:00 UTC"
                                 };
                   })
   ,source_date = DATES[0]
   ,target_file = FILES[1]
   ;

  console.error("");
  console.error("[INFO] Source: " + FILES[0]);
  console.error("[INFO] Source-Times:  \r\n" + JSON.stringify(DATES[0],null,2).replace(/,[\r\n]+ /gm, "\r\n ,").replace(/ *(,(\ +))/gm,"$2,"));
  console.error("");
  console.error("[INFO] Target: " + FILES[1]);
  console.error("[INFO] Target-Times:  \r\n" + JSON.stringify(DATES[1],null,2).replace(/,[\r\n]+ /gm, "\r\n ,").replace(/ *(,(\ +))/gm,"$2,"));
  
  console.error("");
  console.error("[INFO] Overwriting Target-Times...");
  fs.utimesSync(target_file, source_date.atime, source_date.mtime);
  console.error("[INFO] Done.");

  console.error("");