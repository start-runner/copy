export default (outRootDir) => (input) => {
  return function write(log) {
    const path = require('path');
    const pify = require('pify');
    const fs = require('graceful-fs');
    const makeDir = pify(require('mkdirp'));

    return Promise.all(
      input.map((file) => {
        // /beep/boop/src/beep/index.js -> index.js
        const inFile = path.basename(file);
        // /beep/boop/src/beep/index.js -> src/beep/
        const inDir = path.relative(process.cwd(), path.dirname(file));
        // src/beep/ -> beep/
        const relativeInDir = path.join(...inDir.split(path.sep).slice(1));
        // beep/ -> /beep/boop/build/beep/
        const outDirPath = path.resolve(outRootDir, relativeInDir);
        // /beep/boop/build/beep/ -> /beep/boop/build/beep/index.js
        const outFilePath = path.join(outDirPath, inFile);

        return makeDir(outDirPath).then(() => {
          return new Promise((resolve, reject) => {
            const readStream = fs.createReadStream(file);
            const writeStream = fs.createWriteStream(outFilePath);

            readStream.on('error', reject);
            writeStream.on('error', reject);
            writeStream.on('finish', () => {
              log(outFilePath);
              resolve(file);
            });

            readStream.pipe(writeStream);
          });
        });
      })
    );
  };
};
