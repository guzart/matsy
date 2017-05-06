import { camelize } from 'inflection';

import { IOptions } from './transpile';

function cleanValue(value: string) {
  return value.replace(/\s*!default\s*$/, '').replace(/^\s*\"?|\"?\s*$/g, '');
}

function parseValue(value: string) {
  const clean = cleanValue(value);
  if (/^\s*\d+\s*$/.test(clean)) {
    return parseInt(clean, 10);
  } else if (/^\s*\d*\.\d+\s*/.test(clean)) {
    return parseFloat(`0${clean}`);
  }

  return clean;
}

function getVariableName(value: string, libraryName?: string) {
  const name = camelize(value.replace(/\$?mdc-/, '').replace(/-/g, '_'), true);
  if (!libraryName) { return name; }

  const nameNoLib = name.replace(libraryName, '');
  if (nameNoLib !== '') { return camelize(nameNoLib, true); }

  // if the variable name is the same as the library name
  return name;
}

function getLibraryName(options: IOptions, value: string) {
  const name = value.replace('$mdc-', '');
  const imp = options.imp.material.find((i) => name.indexOf(i.library) === 0);
  return imp.library;
}

/**
 * Gets the local name used for the import of a library
 * e.g. import * as someLibraryName from 'some-library'
 * @param name The library name
 */
function getLibraryImportName(name: string) {
  return camelize(`${name}Lib`, true);
}

function extractArgs(value: string) {
  return value
    .replace(/^.+\(|\).*$/, '')
    .split(',')
    .map((v) => v.replace(/^\s|\s$/, ''))
    .map(parseValue);
}

export {
  cleanValue,
  extractArgs,
  getLibraryImportName,
  getLibraryName,
  getVariableName,
  parseValue,
};
