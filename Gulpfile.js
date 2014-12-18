// Requiring Gulp and all of it's dependencies (plug-ins).
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-ruby-sass'),
    plumber = require('gulp-plumber'),
    connect = require('gulp-connect'),
    imagemin = require('gulp-imagemin');
 
// Defining local web server task.
gulp.task('connect', function() {
  connect.server({
    root: 'build',
    livereload: true
  });
});
 
// Defining HTML livereload task.
gulp.task('html', function () {
  gulp.src('dev/*.html')
    .pipe(connect.reload())
    .pipe(gulp.dest('build'));
    console.log("build, success!");
});
 
// Defining Image Compression task.
gulp.task('image', function(){
    gulp.src('dev/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'));
    console.log('image, success!');
});
 
// Defining JavaScript Uglify and Error catching (Plumber) task.
gulp.task('scripts', function(){
    gulp.src('dev/js/*.js')
        .pipe(connect.reload())
        .pipe(plumber())
        .pipe(uglify())
        .pipe(gulp.dest('build/js'));
    console.log('scripts, success!');
});
 
// Defining SASS (SCSS) compilation and compression task.
gulp.task('styles', function(){
    gulp.src('dev/scss/*.scss')
        .pipe(connect.reload())
        .pipe(sass({
            style: 'compressed'
        }))
        .pipe(gulp.dest('build/css'));
    console.log('styles, success!');
});
 
// Defining Watch task.
//// Watches changes to any JavaScript file.
//// Watches changes to any file in the image folder.
//// Watches changes in any SCSS file.
//// Watches changes in any HTML file.
gulp.task('watch', function(){
    gulp.watch('dev/js/*.js', ['scripts']);
    gulp.watch('dev/img/*', ['image']);
    gulp.watch('dev/scss/**/*.scss', ['styles']);
    gulp.watch('dev/*.html', ['html']);
});
 
// Defining default task with decencies being ran after.
gulp.task('default', ['html', 'scripts', 'styles', 'image', 'connect', 'watch']);