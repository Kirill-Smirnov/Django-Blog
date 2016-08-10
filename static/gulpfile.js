const gulp    = require('gulp');
// const jade 		= require('gulp-jade');
const sass    = require('gulp-sass');
// const ts      = require('gulp-typescript');
const concat  = require('gulp-concat')

// gulp.task('jade', () => {
// 	return gulp.src('templates/*.jade')
// 		.pipe(jade())
// 		.pipe(gulp.dest('views'));
// });

gulp.task('sass', () => {
	return gulp.src('css/sass/*.sass')
		.pipe(sass())
		.pipe(concat('main.css'))
		.pipe(gulp.dest('css'));
});

// gulp.task('ts', () => {
// 	return gulp.src('**/*.ts')
// 		.pipe(ts({
// 			noImplicitAny: true,
// 			out: 'all.js'
// 		}))
// 		.pipe(gulp.dest('js'));
// });

gulp.task('watch', () => {
	// gulp.watch('**/*.jade', ['jade']);
	gulp.watch('css/sass/*.sass', ['sass']);
	// gulp.watch('**/*.ts', ['ts']);
});

gulp.task('default', ['sass', 'watch']);
