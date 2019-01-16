# static-directory-loader

[![npm][npm]][npm-url]

The `static-directory-loader` resolves `import`/`require()` on a file containing a list of globs, and copies the matched files into the build directory.

## Getting Started

To begin, you'll need to install `static-directory-loader`:

```console
$ npm install static-directory-loader --save-dev
```

Assuming you have a `public` directory and you'd like to copy its images, you can specify this by creating a `public/index.static` file with the following [glob](https://www.npmjs.com/package/glob#glob-primer):

**public/index.static**

```
**/*.{png,jpg}
```

Then, import the `.static` file from within a script:

**file.js**

```js
import './public/index.static'
```

You'll also need to add the loader to your `webpack` config. For example:

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.static$/,
        use: [
          'static-directory-loader',
        ],
      },
    ],
  },
};
```

Now run `webpack` via your preferred method. This will emit any images in the `public` directory to the build directory.

Keep in mind that you can also include multiple `.static` files, and all of the files will be merged into the same public directory.

You may also want to add `.static` as a default extension, so that you can `require()` or `import` directories that contain an `index.static` file:

**webpack.config.js**

```js
module.exports = {
  resolve: {
    extensions: ['.js', '.json', '.static'],
  },

  module: {
    rules: [
      {
        test: /\.static$/,
        use: [
          'static-directory-loader',
        ],
      },
    ],
  },
};
```

## Options

### `outputPath`

Type: `String|Function`
Default: `undefined`

Specify a filesystem path where the target file(s) will be placed.

#### `String`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.static$/,
        use: [
          {
            loader: 'static-directory-loader',
            options: {
              outputPath: 'assets',
            },
          },
        ],
      },
    ],
  },
};
```

#### `Function`

**webpack.config.js**

```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'static-directory-loader',
            options: {
              outputPath: (pathname, staticFilePath, staticFileDirectory) => {
                return `output_path/${pathname}`;
              },
            },
          },
        ],
      },
    ],
  },
};
```

## License

[MIT](./LICENSE.md)

[npm]: https://img.shields.io/npm/v/static-directory-loader.svg
[npm-url]: https://npmjs.com/package/static-directory-loader