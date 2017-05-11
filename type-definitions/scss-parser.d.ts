
declare module 'scss-parser' {
  type NodeType =
    | 'arguments'
    | 'atrule'
    | 'block'
    | 'declaration'
    | 'function'
    | 'identifier'
    | 'interpolation'
    | 'property'
    | 'punctuation'
    | 'rule'
    | 'selector'
    | 'stylesheet'
    | 'variable'
    | 'value';

  interface InputStreamPosition {
    column: number;
    cursor: number;
    line: number;
  }

  interface Node {
    next: InputStreamPosition;
    start: InputStreamPosition;
    type: NodeType;
    value: string | Node[];
  }

  interface StyleSheetNode extends Node {
    type: 'stylesheet';
  }

  function parse(css: string): StyleSheetNode;
  function stringify(scss: string): string;
}
