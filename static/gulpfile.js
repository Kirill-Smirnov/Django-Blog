const gulp    = require('gulp');
// const jade 		= require('gulp-jade');
const sass    = require('gulp-sass');
const concat  = require('gulp-concat')

// gulp.task('jade', () => {
// 	return gulp.src('templates/*.jade')
// 		.pipe(jade())
// 		.pipe(gulp.dest('views'));
// });

gulp.task('sass', () => {
	return gulp.src('src/sass/*.sass')
		.pipe(sass())
		.pipe(concat('main.css'))
		.pipe(gulp.dest('dist'));
});

gulp.task('js', () => {
	return gulp.src('src/**/*.js')
		.pipe(concat('all.js'))
		.pipe(gulp.dest('dist'))
});

gulp.task('watch', () => {
	// gulp.watch('**/*.jade', ['jade']);
	gulp.watch('src/sass/*.sass', ['sass']);
	gulp.watch('src/**/*.js', ['js']);
});

gulp.task('default', ['sass', 'js', 'watch']);
