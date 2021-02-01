const gulp = require('gulp');
const taskListing = require('gulp-task-listing');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');
const concat = require('gulp-concat');
const gcmq = require('gulp-group-css-media-queries');


let paths = {
    less: 'assets/css/*.less'
};

gulp.task('default', taskListing);

gulp.task('build-css', () =>{
    return gulp.src('assets/css/style.css')
        .pipe(concat('style.min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest('./assets/css'));
});
gulp.task('build-js', () =>{
    return gulp.src('assets/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(terser())
        .pipe(gulp.dest('./assets/js'));
});

gulp.task('less', () =>{
    return gulp.src(paths.less,{base: "./"})
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gcmq())
        .pipe(gulp.dest('./'));

    // place code for your default task here
});

// Rerun the task when a file changes
gulp.task('watch', () => {
    gulp.watch(paths.less, gulp.series('less'));
});

gulp.task('build',gulp.parallel('build-css','build-js'),function(){});