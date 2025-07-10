const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const webp = require('gulp-webp');
const svgSprite = require('gulp-svg-sprite');

gulp.task("css", function() {
    return gulp.src('./scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream())
});

gulp.task('html', function () {
    return gulp.src('*.html')
        .pipe(gulp.dest('./dist'))
        .pipe(browserSync.stream())
});

gulp.task('server', function() {
    browserSync.init({
        server: {baseDir: "./dist"}
    });
});

gulp.task('reload', function(done) {
    browserSync.reload();
    done();
});

gulp.task('webp', function () {
    return gulp.src('dist/img/*.{jpg,png}')
        .pipe(webp())
        .pipe(gulp.dest('./dist/img/webp'))
});

gulp.task('svg', function () {
    return gulp.src('dist/img/svg/*.svg')
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg"
                }
            }
        })
        )
        .pipe(gulp.dest('./dist/img/icons'));
});

gulp.task('copy-utils', function () {
    return gulp.src(['./node_modules/swiper/**/*', 
        './js/bootstrap.bundle.js',
        './css/bootstrap.css'
        /*файлы bootstrap, если их подключали локально*/
    ])
        .pipe(gulp.dest('./dist/utils'))
});

gulp.task('fonts-copy', function () {
    return gulp.src('./fonts/*.{woff,woff2}')
        .pipe(gulp.dest('./dist/fonts'))
});

gulp.task('js', function () {
    return gulp.src('./js/*.js')
        .pipe(gulp.dest('./dist/js'))
});

gulp.watch("scss/**/*.{scss,sass}", gulp.series('css', 'reload'));

gulp.watch("*.html}", gulp.series('html', 'reload'));

gulp.watch("js/*.js}", gulp.series('js', 'reload'));

// gulp.task('start', gulp.series('css', 'server'));

gulp.task('img', gulp.series('webp'));

gulp.task('build', gulp.series('css','html','webp','js','copy-utils','fonts-copy'))

// gulp.task('start', gulp.series('server'));

gulp.task('start', gulp.series('css','html','js','server'));