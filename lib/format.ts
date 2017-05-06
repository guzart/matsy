import * as fs from 'fs';
import * as tempy from 'tempy';
import * as through from 'through2';
import * as tslint from 'tslint';
import * as vinyl from 'vinyl';

function preFormat(input: string) {
  return input
    .replace(/\\n/g, '\n') // replace newlines inside template literals
    .replace(/\) `/g, ')`') // remove space between parenthesis and template literal start
    .replace(/^(?=type)/mg, '\n') // add new lines on type declarations
    .replace(/^(?=export const)/mg, '\n'); // ad new lines on export declarations
}

function formatPlugin() {
  const config = tslint.Configuration.findConfiguration(undefined, __dirname).results;

  return through.obj(function(chunk: vinyl, enc, callback) {
    // prepare input
    const input = preFormat(chunk.contents.toString());
    const filename = tempy.file({ extension: 'ts' });
    fs.writeFileSync(filename, input);

    // lint
    const linter = new tslint.Linter({ fix: true });
    linter.lint(filename, input, config);

    // set output
    chunk.contents = fs.readFileSync(filename);
    this.push(chunk);

    callback();
  });
}

export default formatPlugin;
