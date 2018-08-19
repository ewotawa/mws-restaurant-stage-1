var gulp = require('gulp');
var pump = require('pump');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var gzip = require('gulp-gzip');
var compress = require('compression');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var gm = require('gulp-gm');
var isProgressive = require('is-progressive');

gulp.task('default', function() {
	console.log('default task');
});

gulp.task('prod', [
	'prod_html',
	'prod_css',
	'prod_js_root',
	'prod_js_main',
	'prod_js_restaurant',
	'prod_js_other',
	'prod_img',
	'prod_icons',
	'prod_json'
	]
);

gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: "prod/",
			middleware: function(req,res,next) {
				var gzip = compress();
				gzip(req,res,next);
			}
		}
	});
				
	browserSync.stream();
});

gulp.task('prod_img', function(cb) {
	pump([
			gulp.src('img/*.jpg',),
			gm(function(gmfile, done) {
				gmfile.size(function(err, size) {
					done(null, gmfile
						.strip() //removes profiles, comments
						.interlace('Line') // line interlacing creates progressive buildup
						.quality('85')
						//.write('prod/img/1.jpg', (err) => {
						//	if(err) throw Error(err);
						//	console.log('image converted');
						//	isProgressive.file('prod/img/1.jpg')
						//		.then(progressive => console.log('Is progresssive: ', progressive));
						//})
					);
				});
			}),
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

gulp.task('prod_js_main', function(cb) {
	pump([
			gulp.src(['js/config.js', 'js/dbhelper.js', 'js/main.js']),
			sourcemaps.init(),
			concat('js_main.js'),
			babel( { presets : ['env'] } ),
			uglify(),
			sourcemaps.write(),
			//gzip({ skipGrowingFiles : true }),
			gulp.dest('prod/js')
		], 
		cb
	);
});

gulp.task('prod_js_restaurant', function(cb) {
	pump([
			gulp.src(['js/config.js', 'js/dbhelper.js', 'js/restaurant_info.js']),
			sourcemaps.init(),
			concat('js_restaurant.js'),
			babel( { presets : ['env'] } ),
			uglify(),
			sourcemaps.write(),
			//gzip({ skipGrowingFiles : true }),
			gulp.dest('prod/js')
		], 
		cb
	);
});

gulp.task('prod_js_other', function(cb) {
	pump([
			gulp.src(['js/idb.js', 'js/indexController.js', 'js/idb-test_index.js']),
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
			//gzip({ skipGrowingFiles : true }),
			gulp.dest('prod/icons')
		], 
		cb
	);
});

gulp.task('prod_json', function(cb) {
	pump([
			gulp.src(['manifest.json','package.json','package-lock.json']),
			//gzip({ skipGrowingFiles : true }),
			gulp.dest('./prod')
		], 
		cb
	);
});

