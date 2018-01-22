const build = require("workbox-build");
const SRC_DIR = "./";
const BUILD_DIR = "dist";

const SW = 'sw.js';
const globPatterns = [
  '**/*.{js,png,ico,svg,html,css}',
  
];
const globIgnores = [
  'package.json',
  'index.js',
  'sw.js'
];
const input = {
  swSrc: `${SRC_DIR}/service-worker.js`,
  swDest: `${BUILD_DIR}/${SW}`,
  globDirectory: BUILD_DIR,
  globPatterns: globPatterns,
  globIgnores: globIgnores,
  maximumFileSizeToCacheInBytes: 4000000
};



build.injectManifest(input).then(() => {
  console.log("Generated service worker with static cache");
});