var gulp = require('gulp');
var pump = require('pump');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var gzip = require('gulp-gzip');

gulp.task('default', function() {
	console.log('default task');
});

gulp.task('prod', [
	'prod_html',
	'prod_css',
	'prod_js_root',
	'prod_js',
	'prod_img',
	'prod_icons',
	'prod_manifest'
	]
);

gulp.task('prod_img', function(cb) {
	pump([
			gulp.src('img/*'),
			//gzip({ skipGrowingFiles : true }),
			gulp.dest('prod/img')
		], 
		cb
	);
});

gulp.task('prod_css', function(cb) {
	pump([
			gulp.src('css/*'),
			//gzip( { skipGrowingFiles : true } ),
			gulp.dest('prod/css')
		], 
		cb
	);
});

gulp.task('prod_html', function(cb) {
	pump([
			gulp.src('*.html'),
			//gzip( { skipGrowingFiles : true } ),
			gulp.dest('./prod')
		], 
		cb
	);
});

gulp.task('prod_js_root', function(cb) {
	pump([
			gulp.src('sw.js'),
			sourcemaps.init(),
			babel( { presets : ['env'] } ),
			uglify(),
			sourcemaps.write(),
			//gzip( { skipGrowingFiles : true } ),
			gulp.dest('./prod')
		], 
		cb
	);
});

gulp.task('prod_js', function(cb) {
	pump([
			gulp.src('js/*'),
			sourcemaps.init(),
			babel( { presets : ['env'] } ),
			uglify(),
			sourcemaps.write(),
			//gzip({ skipGrowingFiles : true }),
			gulp.dest('prod/js')
		], 
		cb
	);
});

gulp.task('prod_icons', function(cb) {
	pump([
			gulp.src('icons/*'),
			gzip({ skipGrowingFiles : true }),
			gulp.dest('prod/icons')
		], 
		cb
	);
});

gulp.task('prod_manifest', function(cb) {
	pump([
			gulp.src('manifest.json'),
			//gzip({ skipGrowingFiles : true }),
			gulp.dest('./prod')
		], 
		cb
	);
});