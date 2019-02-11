const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');

/*
  -- TOP LEVEL FUNCTIONS --
  gulp.task - Define tasks
  gulp.src - Point to files to use
  gulp.dest - Points to folder to output
  gulp.watch - Watch files and folders for changes
*/

// Logs Message
gulp.task('message', function(done) {
  console.log("Gulp is running...");
  done();
});

// Copy All HTML files
gulp.task('copyHtml', function(done){
  gulp.src('src/*.html')
      .pipe(gulp.dest('dist'));
      done();
});

// Optimize Images
gulp.task('imageMin', () =>
	gulp.src('src/img/*')
		.pipe(imagemin())
        .pipe(gulp.dest('dist/assets/img'))        
);

// Minify JS
gulp.task('minify', function(done){
  gulp.src('src/assets/js/*.js')
      .pipe(uglify())
      .pipe(gulp.dest('dist/assets/js'));
      done();
});

// Compile Sass
gulp.task('sass', function(done){
  gulp.src('src/assets/scss/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest('dist/assets/css'));
      done();
});

// Scripts
gulp.task('scripts', function(done){
  gulp.src('src/assets/js/*.js')
      .pipe(concat('app.js'))
      .pipe(uglify())
      .pipe(gulp.dest('dist/assets/js'));      
      done();
});

gulp.task('default', gulp.series('message', 'copyHtml', 'imageMin', 'sass', 'scripts'));

// gulp.task('watch', function(){
//   gulp.watch('src/assets/js/*.js', ['scripts']);
//   gulp.watch('src/assets/img/*', ['imageMin']);
//   gulp.watch('src/assets/scss/*.scss', ['sass']);
//   gulp.watch('src/*.html', ['copyHtml']);  
// });

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
});

