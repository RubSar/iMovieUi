var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    less = require('gulp-less'),
    minifyCSS = require('gulp-minify-css'),

    gp_concat = require('gulp-concat'),
    gp_rename = require('gulp-rename'),
    gp_uglify = require('gulp-uglify');



var jsFiles = ['*.js', 'src/**/*.js'];

gulp.task('serve', function () {
    var options = {
        script: 'app.js',
        delayTime: 1,
        env: {
            'PORT': 3000
        },
        watch: jsFiles
    };

    return nodemon(options)
        .on('restart', function (ev) {
            console.log('Restarting....');
        });
});


gulp.task('watch', function () {
    gulp.watch('./*.less', ['less']);
});

gulp.task('less', function () {

    return gulp.src('./public/css/style.less')
        .pipe(less().on('error', function (err) {
            console.log(err);
        }))
        .pipe(cssmin().on('error', function (err) {
            console.log(err);
        }))
        .pipe(gp_rename({suffix: '.min'}))
        .pipe(gulp.dest('./public/css'));
});

gulp.task('css-concat' , function(){
    return gulp.src('src/css/**/*.css')
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('style.min.css'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('js-uglify', function(){
    return gulp.src([
        './public/angular/app.js',
        './public/angular/services/authToken.js',
        './public/angular/services/authInterceptor.js',
        './public/angular/services/helperSvc.js',
        './public/angular/services/movieCharacterSvc.js',
        './public/angular/services/comicsCharacterSvc.js',
        './public/angular/services/rateSvc.js',
        './public/angular/services/voteSvc.js',
        './public/angular/services/userSvc.js',
        './public/angular/directives/dropdown/dropdown.js',
        './public/angular/directives/starRating/rating.js',
        './public/angular/directives/character/character.js',
        './public/angular/directives/modal/modal.js',
        './public/angular/directives/paging/paging.js',
        './public/angular/controllers/headerCtrl.js',
        './public/angular/controllers/homeCtrl.js',
        './public/angular/controllers/movieCharactersListCtrl.js',
        './public/angular/controllers/movieCharacterCtrl.js',
        './public/angular/controllers/comicsCharacterCtrl.js',
        './public/angular/controllers/userRatesCtrl.js'
    ])
        .pipe(gp_concat('bundle.js'))
        .pipe(gulp.dest('./public/js'))
        .pipe(gp_rename('ng-app-uglify.js'))
        .pipe(gp_uglify())
        .pipe(gulp.dest('./public/js'));
});



gulp.task('default', ['js-uglify'], function(){});
gulp.task('default', ['less', 'watch']);