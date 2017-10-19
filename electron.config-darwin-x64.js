const packager = require("electron-packager");
const package = require("./package.json");

packager({
  name: package["name"]
  , dir: "."
  , out: "./dist"
  , icon: "./public/favicon.ico"
  , platform: "darwin"
  , arch: "x64"
  , version: "1.7.9"
  , overwrite: true
  , asar: true
  , ignore: "\.git|src|tmp|utils|dist|node_modules/(electron-packager|electron-built|\.bin)|\.girignore|npm-debug.log"
  , "app-version": package["version"]
  , "app-copyright": "Copyright (C) 2017 "
    + package["author"] + "."
  , "version-string": {
    CompanyName: "Hashi Design.,Inc."
    , FileDescription: package["name"]
    , OriginalFilename: package["name"] + ".exe
    , "ProductName": package["name"]
    , InternalName: package["name"]
  }
}, function (err, appPaths) {
  if (err) console.log(err);
  console.log("Done: " + appPaths);
});

