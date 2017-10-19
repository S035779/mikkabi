const packager = require("electron-packager");
const package = require("./package.json");

packager({
  name: package["name"]
  , dir: "."
  , out: "./dist"
  , icon: "./public/favicon.ico"
  , platform: "win32"
  , arch: "ia32"
  , electronVersion: "1.7.9"
  , overwrite: true
  , asar: true
  , "app-version": package["version"]
  , "app-copyright": "Copyright (C) 2017 "
    + package["author"] + "."
  , "version-string": {
    CompanyName: "HashiDesign.,Inc."
    , FileDescription: package["name"]
    , OriginalFilename: package["name"] + ".exe"
    , "ProductName": package["name"]
    , InternalName: package["name"]
  }
  , prune: true
  , ignore: "\.git|\.gitignore|npm-debug.log|node_modules/(electron-packager|electron-prebuilt|\.bin)|public/(bundle\.js\.map|bundle\.css\.map)|src|utils|dist|tmp"
}, function (err, appPaths) {
  if (err) console.log(err);
  console.log("Done: " + appPaths);
});

