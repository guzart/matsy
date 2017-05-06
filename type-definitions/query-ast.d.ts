declare module 'query-ast' {
  import { Node, StyleSheetNode } from 'scss-parser';

  interface INodeWrapper {
    children: INodeWrapper[];
    node: Node;
    parent: INodeWrapper;
  }

  type ISelectorFn = (node: INodeWrapper) => boolean;
  type ISelector = string | RegExp | ISelectorFn;

  interface IQueryWrapper {
    (selectors: ISelector): IQueryWrapper;
    children(selector?: ISelector): IQueryWrapper;
    first(): undefined | IQueryWrapper;
    map<T>(callback: (node: INodeWrapper) => T): T[];
    value(): string;
  }

  function createQueryWrapper(ast: Node): IQueryWrapper;
  namespace createQueryWrapper {
    type NodeWrapper = INodeWrapper;
    type QueryWrapper = IQueryWrapper;
    type Selector = ISelector;
  }

  export = createQueryWrapper;
}
