'use strict';
let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
sass.compiler = require('node-sass');
let exec = require('child_process').exec;

let scssSrcFiles = './dist/assets/scss/**/*.scss';
let scssDistFiles = './dist/assets/css';
let templateSrc = './src/templates/**/*.php';


 
gulp.task('sass', function () {
  return gulp.src(scssSrcFiles)
    .pipe(sass().on('error', sass.logError))
	  	.pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
.pipe(gulp.dest(scssDistFiles));
});

gulp.task('template', async function () {	
    return exec('php generate.php')
})

gulp.task('watch', function() {
    gulp.watch('./dist/assets/scss/**/*.scss',gulp.series('sass'));
    gulp.watch(templateSrc, gulp.series('template'));

  });

gulp.task('serve', gulp.series('template'), async function() {
    gulp.watch(templateSrc, ['template']);
});
