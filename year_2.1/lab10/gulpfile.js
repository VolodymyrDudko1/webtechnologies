var gulp = require('gulp'),
    pug = require('gulp-pug');
const { src, dest, watch} = require('gulp');  
var rename = require('gulp-rename');
const sass = require('gulp-sass')(require('sass'))  
gulp.task('build', function() {
    return src('./preCompile/*/index.pug')
      .pipe(
        pug()
      ).pipe(gulp.dest("./dist/"));
  });
  function generateCSS(cb) {
      src('./preCompile/*/main.scss')
      .pipe(
        sass()
      )
      .pipe(gulp.dest("./dist/"));
      cb();
};  
exports.css = generateCSS;