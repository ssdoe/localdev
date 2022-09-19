let mix = require("laravel-mix");

mix.disableNotifications()

mix.js("src/js/app.js", "dist/")
    .js("src/js/grid_debug.js", "dist/")
    .sass("src/scss/app.scss", "dist/")
    .sass("src/scss/index.scss", "dist/");

// Autoprefixer is enabled by default, see:
// https://laravel-mix.com/docs/6.0/autoprefixer
