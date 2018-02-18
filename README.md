[![npm version](https://badge.fury.io/js/clappr-flvjs-playback.svg)](https://badge.fury.io/js/clappr-flvjs-playback)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# FLVJSPlayback

A [clappr](https://github.com/clappr/clappr) FLV playback based on [flv.js](https://github.com/Bilibili/flv.js)

## Usage

Add Clappr and the plugin scripts to your HTML:

```html
<head>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js"></script>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/clappr-flvjs-playback@latest/dist/clappr-flvjs-playback.min.js"></script>
</head>
```

Then just add `FLVJSPlayback` into the list of plugins of your player instance, and the options for the plugin go in the `flvjsConfig` property as shown below.

```javascript
var player = new Clappr.Player({
  source: "http://your.flv.video",
  mimeType: 'video/flv',
  plugins: [
    FLVJSPlayback
  ],
  playback: {
    flvjsConfig: {
      // Params from flv.js
    }
  }
});
```

## Configuration

The parameters of `flvjsConfig` are completely equal to the parameters of [flv.js](https://github.com/Bilibili/flv.js/blob/master/docs/api.md#config)

## Development

Install dependencies:

```shell
  yarn install
```

Start HTTP dev server `http://0.0.0.0:8080`:

```shell
  yarn run start
```

Upgrade packages to latest version:

```shell
  yarn upgrade --latest
```

## Release

Minified version of plugin will be placed at `dist/clappr-flvjs-playback.min.js`

```shell
  yarn run release
```

## Lint

Run linter:

```shell
  yarn run lint
```

Fix lint errors:

```shell
  yarn run fix
```

## Issues

Feel free to submit issues and enhancement requests.
