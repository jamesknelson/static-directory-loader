var loaderUtils = require('loader-utils');
var path = require('path');
var glob = require('glob');

module.exports = async function(content) {
  this.async()

  const options = loaderUtils.getOptions(this) || {};
  
  var resourceDir = path.dirname(this.resourcePath);
  var patterns = content.split('\n').map(pattern => pattern.trim());
  var files = []

  this.addContextDependency(resourceDir)

  while (patterns.length) {
    var pattern = patterns.pop()
    var patternFiles = glob.sync(pattern, {
      cwd: resourceDir,
      nodir: true,
    }) || []
    files.push(...patternFiles);
  }

  if (!files.length) {
    this.emitWarning('Did not find anything for glob "' + pattern + '" in directory "' + resourceDir + '"');
  }

  try {
    for (let file of files) {
      let sourcePath = path.posix.join(resourceDir, file)
      let outputPath = file
      if (options.outputPath) {
        if (typeof options.outputPath === 'function') {
          outputPath = options.outputPath(file, this.resourcePath, resourceDir);
        } else {
          outputPath = path.posix.join(options.outputPath, file);
        }
      }

      let buffer = await new Promise((resolve, reject) =>
        this.fs.readFile(sourcePath, (err, buffer) => {
          if (err) reject(err)
          resolve(buffer)
        })
      )

      this.emitFile(outputPath, buffer)
    }

    this.callback(null, '')
  }
  catch (err) {
    this.emitError(err)
    this.callback(err)
  }
}