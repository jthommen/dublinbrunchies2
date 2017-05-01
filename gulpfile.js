// General gulp file for front-end automation

// Loading all the gulp add-ons into configuration file
var gulp = require ('gulp');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var cache = require('gulp-cache');
var uglify = require('gulp-uglify');
var cleanCSS = require('gulp-clean-css');
var imagemin = require('gulp-imagemin');
var responsive = require('gulp-responsive');


// Specifying variables used in task runner
var imgInputPath = 'images_src/*.+(png|jpg|jpeg|gif|svg)';
var imgOutputPath = 'images';


// Minifies js files, renames and and
// moves them into production folder
gulp.task('scripts', function() {
    return gulp.src('scripts/*.js')
    .pipe(uglify())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('scripts/min'))
    .pipe(browserSync.stream())
});


// Minifies css files, renames and
// moves them into production folder
gulp.task('styles', function() {
    return gulp.src('styles/*.css')
    .pipe(cleanCSS())
    .pipe(rename({
        suffix: '.min'
    }))
    .pipe(gulp.dest('styles/min'))
    .pipe(browserSync.reload({
        stream: true
    }))
});


// Configures browser-sync reload function
gulp.task('htmlreload', function() {
    return gulp.src('*.html')
    .pipe(browserSync.stream())
});


// Initializes browserSync watch task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './',
        },
        port: 8000
    })
});


// Compresses images with imagemin and puts them into
// different folder
gulp.task('imgCompress', function() {
    return gulp.src(imgInputPath)
        .pipe(imagemin())
        .pipe(gulp.dest(imgOutputPath))
});

// Specifies large images for resizing
gulp.task('imgLarge', function() {
    return gulp.src('images_src/*')
    .pipe(responsive({
        '*': {
            width: 1200,
            rename: {suffix: '-large'},
        },
    }, {
      quality: 70,
      progressive: true,
      compressionLevel: 6,
      withMetadata: false,
      withoutEnlargement: false,
    }))
        .pipe(gulp.dest(imgOutputPath));
});

// Specifies medium images for resizing
gulp.task('imgMedium', function() {
    return gulp.src('images_src/*')
    .pipe(responsive({
        '*': {
            width: 800,
            rename: {suffix: '-medium'},
        },
    }, {
      quality: 70,
      progressive: true,
      compressionLevel: 6,
      withMetadata: false,
      withoutEnlargement: false,
    }))
        .pipe(gulp.dest(imgOutputPath));
});

// Specifies small images for resizing
gulp.task('imgSmall', function() {
    return gulp.src('images_src/*')
    .pipe(responsive({
        '*': {
            width: 400,
            rename: {suffix: '-small'},
        },
    }, {
      quality: 70,
      progressive: true,
      compressionLevel: 6,
      withMetadata: false,
      withoutEnlargement: false,
    }))
        .pipe(gulp.dest(imgOutputPath));
});

// Connects gulp tasks and sets overarching handle
// for responsive images
gulp.task('imgResponsive', ['imgLarge', 'imgMedium', 'imgSmall']);

// Sets up watch tasks and connects them minify tasks on change
// sets handle to start watch task
gulp.task ('watch', ['browserSync', 'styles'], function() {
    gulp.watch('scripts/*.js', ['htmlreload']);
    gulp.watch('styles/*.css', ['styles']);
    gulp.watch('*.html', ['htmlreload']);
});