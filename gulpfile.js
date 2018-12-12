const gulp = require("gulp");
const pkg = require("pkg");

gulp.task("build", async()=>{
    await pkg.exec(['.', '--target', 'node10-win-x86,node10-macos-x64', '--out-path', 'dist'])
});