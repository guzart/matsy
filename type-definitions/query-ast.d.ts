declare module 'query-ast' {
  import { Node, NodeType, StyleSheetNode } from 'scss-parser';

  interface INodeWrapper {
    children: INodeWrapper[];
    hasChildren(): boolean;
    node: Node;
    parent: INodeWrapper;
  }

  type ISelectorFn = (node: INodeWrapper) => boolean;
  type ISelector = NodeType | RegExp | ISelectorFn;

  interface IQueryWrapper {
    (selectors: ISelector): IQueryWrapper;

    /**
     * Get the children of each node in the set of matched nodes, optionally filtered by a selector
     */
    children(selector?: ISelector): IQueryWrapper;

    /**
     * Reduce the set of matched nodes to those that match the selector
     */
    filter(selector?: ISelector): IQueryWrapper;

    /**
     * Get the descendants of each node in the set of matched nodes, optionally filtered by a selector
     */
    find(selector?: ISelector): IQueryWrapper;

    /**
     * Reduce the set of matched nodes to the first in the set.
     */
    first(): IQueryWrapper;

    /**
     * Reduce the set of matched nodes to those that have a descendant that matches the selector
     */
    has(selector?: ISelector): IQueryWrapper;

    /**
     * Reduce the set of matched nodes to the final one in the set
     */
    last(): IQueryWrapper;

    /**
     * Return the number of nodes in the wrapper
     */
    length(): number;

    /**
     * Map the set of matched nodes
     */
    map<T>(callback: (node: INodeWrapper) => T): T[];

    nodes: INodeWrapper[];

    /**
     * Get the combined string contents of each node in the set of matched nodes, including their descendants
     */
    value(): string;
  }

  /**
   * Create a new QueryWrapper
   * @param ast
   */
  function createQueryWrapper(ast: Node): IQueryWrapper;
  namespace createQueryWrapper {
    type NodeWrapper = INodeWrapper;
    type QueryWrapper = IQueryWrapper;
    type Selector = ISelector;
  }

  export = createQueryWrapper;
}
