var gulp        = require('gulp');
var clean = require('gulp-clean');
var handlebars = require('gulp-compile-handlebars');
var browserSync = require('browser-sync').create();
var theme = require("./index.js");
var fs = require('fs');
var resumeObject = JSON.parse(fs.readFileSync('resume.json', 'utf8'));


// Static server
gulp.task('start', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch(['./*.hbs']).on('change', function(){
    fs.writeFile("./index.html", render(), function(err) {
        if(err) {
            console.log(err);
        } else {
            console.log("index.html written to build folder.");
        }
    }); 
  });
  gulp.watch(['./*.html']).on('change', browserSync.reload)
});

function render() {
    try {
        return theme.render(resumeObject);
    } catch (e) {
        console.log(e.message);
        return "";
    }
}

