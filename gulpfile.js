const { watch, src, dest, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const pug = require("gulp-pug");
const svgSprite = require('gulp-svg-sprite');
const browserSync = require("browser-sync").create();

const svgConfig = {
  mode: {
    css: { // Activate the «css» mode
      render: {
        css: true // Activate CSS output (with default options)
      }
    }
  }
};

const browserSyncJob = () => {
  browserSync.init({
    server: "./build"
  });

  watch('app/sass/**/*.scss', buildSass);
  watch('app/pages/**/*.pug', buildPug);
};

const buildSass = () => {
  return src('./app/sass/**/*.scss')
    .pipe(sass())
    .pipe(dest('./build/styles/'))
    .pipe(browserSync.stream());
};

const buildPug = () => {
  return src('app/pages/**/*.pug')
    .pipe(pug())
    .pipe(dest('./build'))
    .pipe(browserSync.stream());
};

const imagesOptimize = () => {
  return src('app/assets/icons/*.svg')
    .pipe(svgSprite(svgConfig))
    .pipe(dest('build/images'));
};

exports.server = browserSyncJob;
exports.build = parallel(buildPug, buildSass, imagesOptimize);