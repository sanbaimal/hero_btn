var fs = require('fs'),
  gulp = require('gulp'),
  sass = require('gulp-sass'),
  ejs = require('gulp-ejs'),
  rename = require('gulp-rename');

//
// Sass
//
// SassとCssの保存先を指定
gulp.task('sass', function () {
  gulp.src('./_src/sass/**/*.scss')
    .pipe(sass({ outputStyle: 'expanded' }))
    .pipe(gulp.dest('./www/css/'));
});

//自動監視のタスクを作成(sass-watchと名付ける)
gulp.task('sass-watch', ['sass'], function () {
  var watcher = gulp.watch('./_src/sass/**/*.scss', ['sass']);
  watcher.on('change', function (event) {
  });
});

// タスク"task-watch"がgulpと入力しただけでdefaultで実行されるようになる
gulp.task('default', ['sass-watch', 'json-watch', 'html-watch']);


//
// json
//
gulp.task('ejs', function () {
  var jsonFile = './_src/data/data.json',
    tempFile = './_src/template/index.html',
    json = JSON.parse(fs.readFileSync(jsonFile, 'utf8'));

  gulp.src(tempFile)
    .pipe(ejs({
      jsonData: json
    }))
    .pipe(gulp.dest('./www/'));
});

//自動監視のタスクを作成
gulp.task('json-watch', ['ejs'], function () {
  var watcherjson = gulp.watch('./_src/data/**/*.json', ['ejs']);
  watcherjson.on('change', function (event) { });
});

//自動監視のタスクを作成
gulp.task('html-watch', ['ejs'], function () {
  var watcherhtml = gulp.watch('./_src/template/**/*.html', ['ejs']);
  watcherhtml.on('change', function (event) { });
});
