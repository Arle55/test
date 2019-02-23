"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sass = require("gulp-sass");
var pug = require("gulp-pug");
var htmlmin = require("gulp-htmlmin");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var csso = require("gulp-csso");
var server = require("browser-sync").create();

gulp.task("css", function () {
  return gulp.src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("source/css"))
    .pipe(server.stream());
});

gulp.task("pug", function(){
  return gulp.src("source/*.pug")
  .pipe(pug({ pretty: true }))
  .pipe(gulp.dest("source"))
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(server.reload({
    stream: true
  }))
});

gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css"));
  gulp.watch("source/*.pug", gulp.series("pug"));
});
gulp.task("start", gulp.series("pug", "css", "server"));
