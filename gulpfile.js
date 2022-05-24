const { watch, src, dest, series, parallel } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const pug = require("gulp-pug");
const svgSprite = require('gulp-svg-sprite');
const concat = require('gulp-concat');
const browserSync = require("browser-sync").create();
const del = require("del");

const clear = (cb) => {
  return del(["./build"])
}

const buildSass = () => {
  return src("./app/scss/*.scss")
    .pipe(sass())
    .pipe(dest("./build/styles/"))
    .pipe(browserSync.stream());
};

const buildPug = () => {
  return src("./app/pug/*.pug")
    .pipe(pug())
    .pipe(dest("./build"))
    .pipe(browserSync.stream());
};

const imagesOptimize = () => {
  return src("./app/assets/images/*.{png,svg,jpg,jpeg}")
    .pipe(dest("./build/images"));
};

const spriteOptimize = () => {
  const config = {
    mode: {
      symbol: {
        sprite: "../sprite.svg"
      }
    }
  };
  return src("./app/assets/sprites/*.svg")
  .pipe(svgSprite(config))
  .pipe(dest("./build/images"));
};

const buildJs = () =>{
  return src("./node_modules/bootstrap/dist/js/bootstrap.min.js")
  .pipe(concat("script.js"))
  .pipe(dest("./build/js/"))
}

const build = series(clear, parallel(
  buildSass, buildPug, buildJs, imagesOptimize, spriteOptimize,
));

const runServer = () => {
  browserSync.init({
    open: false,
    server: "./build"
  });

  watch("./app/scss/**/*.scss", buildSass);
  watch("./app/pug/**/*.pug", buildPug);
};

exports.develop = series(build, runServer);