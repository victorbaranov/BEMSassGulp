const gulp = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCss = require('gulp-clean-css');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const gulpIf = require('gulp-if');
const del = require('del');
const browserSync = require('browser-sync').create();

const config = {
    paths:{
        scss: './src/scss/**/*.scss',
        html: './public/index.html'
    },
    output:{
        cssName: 'bundle.min.css',
        path: './public'
    },
    isDevelop: false
}

function scss(){
    return gulp.src(config.paths.scss)
    .pipe(gulpIf(config.isDevelop, sourcemaps.init()))
    .pipe(sass())
    .pipe(concat(config.output.cssName))
    .pipe(autoprefixer())
    .pipe(gulpIf(!config.isDevelop, cleanCss()))
    .pipe(gulpIf(config.isDevelop, sourcemaps.write()))
    .pipe(gulp.dest(config.output.path))
    .pipe(browserSync.stream());
}

function watch(){
    browserSync.init({
        server: {

            baseDir: config.output.path
        }
    });

    gulp.watch(config.paths.scss, scss);
    gulp.watch(config.paths.html).on('change', browserSync.reload);
}

function clean(){
    return del(['public/*']);
}


gulp.task('scss',  scss);
gulp.task('watch',  watch);

gulp.task('public', gulp.series(clean, gulp.parallel(scss)));
gulp.task('dev', gulp.series('public', 'watch'));



// const gulp = require('gulp');
// const sass = require('gulp-sass');
// const sourcemaps = require('gulp-sourcemaps');
// const autoprefixer = require('gulp-autoprefixer');
// // const cleanCss = require('gulp-clean-css');
// const concat = require('gulp-concat');
// // const gulpIf = require('gulp-if');
// const del = require('del');
// const browserSync = require('browser-sync').create();

// const config = {
//     paths:{
//         scss: './src/scss/**/*.scss',
//         html: './public/index.html'
//     },
//     output:{
//         cssName: 'bundle.min.css',
//         path: './public'
//     },
//     isDevelop: true
// }

// function scss(){
//     return gulp.src(config.paths.scss)
//     .pipe(sourcemaps.init())
//     .pipe(sass())
//     .pipe(concat(config.output.cssName))
//     .pipe(autoprefixer())
//     .pipe(sourcemaps.write())
//     // .pipe(gulpIf(config.isDevelop, cleanCss()))
//     .pipe(gulp.dest(config.output.path))
//     .pipe(browserSync.stream());
// }

// function watch(){
//     browserSync.init({
//         server: {
            
//             baseDir: config.output.path
//         }
//     });

//     gulp.watch(config.paths.scss, scss);
//     gulp.watch(config.paths.html).on('change', browserSync.reload);
// }

// function clean(){
//     return del(['public/*']);
// }


// gulp.task('scss',  scss);
// gulp.task('watch',  watch);

// gulp.task('public', gulp.series(clean, gulp.parallel(scss)));
// gulp.task('dev', gulp.series('public', 'watch'));
