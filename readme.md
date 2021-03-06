# start-copy

[![npm](https://img.shields.io/npm/v/start-copy.svg?style=flat-square)](https://www.npmjs.com/package/start-copy)
[![linux build](https://img.shields.io/travis/start-runner/copy/master.svg?label=linux&style=flat-square)](https://travis-ci.org/start-runner/copy)
[![windows build](https://img.shields.io/appveyor/ci/start-runner/copy/master.svg?label=windows&style=flat-square)](https://ci.appveyor.com/project/start-runner/copy)
[![coverage](https://img.shields.io/codecov/c/github/start-runner/copy/master.svg?style=flat-square)](https://codecov.io/github/start-runner/copy)
[![deps](https://img.shields.io/gemnasium/start-runner/copy.svg?style=flat-square)](https://gemnasium.com/start-runner/copy)

Copy task for [Start](https://github.com/start-runner/start).

## Install

```sh
npm install --save-dev start-copy
# or
yarn add --dev start-copy
```

## Usage

```js
import start from 'start';
import reporter from 'start-pretty-reporter';
import files from 'start-files';
import copy from 'start-copy';

export const build = () => start(reporter())(
  files('src/**/*.png'),
  copy('build/')
);
```

is functionally the same as:

```js
import start from 'start';
import reporter from 'start-pretty-reporter';
import files from 'start-files';
import read from 'start-read';
import write from 'start-write';

export const build = () => start(reporter())(
  files('src/**/*.png'),
  read(),
  write('build/')
);
```

but it uses Streams and should be the preferred way to copy files, especially for large and/or binary formats like images.

This task relies on array of files and provides the same, see [documentation](https://github.com/start-runner/start#readme) for details.

## Arguments

`copy(dir)`

* `dir` – output directory, will be created automatically if it doesn't exists
