'use strict';

var autoprefixer = require('gulp-autoprefixer');
var del = require('del');
var csso = require('gulp-csso');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify-es').default;

// Gulp task to minify CSS files
function styles(cb) {
  gulp.src('css/*.css')
    // Auto-prefix css styles for cross browser compatibility
    .pipe(autoprefixer())
    // Minify the file
    .pipe(csso())
    // Output
    .pipe(gulp.dest('dist/css'));
  cb();
}

// Gulp task to minify JavaScript files
function scripts(cb) {
  gulp.src('scripts/*.js')
    // Minify the file
    .pipe(uglify())
    // Output
    .pipe(gulp.dest('dist/scripts'));
  cb();
}

// Gulp task to minify index HTML file
function pages(cb) {
  gulp.src('index.html')
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('dist'));
  cb();
}

// Gulp task to move all assets
function assets(cb) {
  gulp.src('assets/*')
    .pipe(gulp.dest('dist/assets'));
  cb();
}

// Clean output directory
function clean(cb) {
  del(['dist']);
  cb();
}

// Gulp task to minify all files
exports.clean = clean;
exports.build = gulp.series(clean, assets, styles, scripts, pages);
exports.default = gulp.series(clean, assets, styles, scripts, pages);