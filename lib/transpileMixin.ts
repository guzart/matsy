import { flatten } from 'lodash';
import * as postcss from 'postcss';
import * as query from 'query-ast';
import * as scss from 'scss-parser';
import * as ts from 'typescript';

import debug from './debug';
import { IOptions } from './transpile';
import * as tsUtils from './tsUtils';
import * as utils from './utils';

interface IMixinArgument {
  name: string;
}

type InterpolationPiece = scss.Node | string;

function convertNode(options: IOptions, node: scss.Node) {
  if (node.type === 'variable') {
    const value = node.value.toString();
    const libName = utils.getLibraryName(options, value);
    const varName = utils.getVariableName(value, libName);
    return ts.createPropertyAccess(
      ts.createIdentifier(libName),
      ts.createIdentifier(varName),
    );
  }

  return undefined;
}

function createStatement(options: IOptions, node: scss.Node): ts.Statement {
  // const $ = query(node);
  return ts.createStatement(ts.createLiteral(`Cannot create statement for ${node}`));
}

interface ITaggedTemplateDataItem {
  node: scss.Node;
  literal: string;
}

interface ITaggedTemplateData {
  head: string;
  other: ITaggedTemplateDataItem[];
}

function groupPieces(pieces: InterpolationPiece[]) {
  // 1. First group must be a string, the HEAD is always a string
  // 2. The last group musb be a string, the Tail is always a string
  // 3. Group in { head: string, others: [{node, string}, {node, string}] }

  const out: ITaggedTemplateData = { head: '', other: [] };
  const items = pieces;

  while (items.length > 0) {
    if (typeof pieces[0] !== 'string') {
      out.head = '';
    } else {
    }
  }

  // const groups: InterpolationPiece[][] = [];
  // let stringPieces = [];
  // pieces.forEach((p) => {
  //   if (typeof p === 'string') {
  //     stringPieces.push(p);
  //   } else {
  //     groups.push(stringPieces, [p]);
  //     stringPieces = [];
  //   }
  // });
  // return groups.filter((g) => g.length > 0);
}

function createTemplateSpan(options: IOptions, pieces: InterpolationPiece[]): ts.TemplateSpan {
  return convertNode(options, pieces[0] as scss.Node);
}

function createTemplateExpression(options: IOptions, pieces: InterpolationPiece[]) {
  const hasSpans = pieces.find((n) => typeof n !== 'string') !== null;
  if (!hasSpans) {
    // one big string, still wrapped in a css template literal for consistency
    return ts.createTaggedTemplate(
      ts.createIdentifier('css'),
      tsUtils.createNoSubstitutionTemplateLiteral(pieces.join('\n')),
    );
  }

  const groups = groupPieces(pieces);

  // let head = [];
  // if (typeof groups[0] === 'string') {
  //   // The template head is always a string, so use the first pieces if they are strings
  //   head = groups.splice(0, 1);
  // }

  return ts.createTaggedTemplate(
    ts.createIdentifier('css'),
    ts.createTemplateExpression(
      tsUtils.createTemplateHead(head.join('\n  ')),
      // groups.reduce((acc, group, index) => {
      //   const isLast =
      //   createTemplateSpan(options, g, i === (groups.length - 1))),
      // }, []),
    ),
  );
}

function convertDeclaration(options: IOptions, declaration: query.NodeWrapper) {
  const out: InterpolationPiece[] = [];
  const $ = query(declaration.node);

  const propertyNode = $.find('property').nodes[0].node;
  if (propertyNode.type === 'interpolation') {
    out.push(propertyNode.value[0], ': ');
  } else {
    out.push(propertyNode.value.toString());
  }

  // const valueNode = $.find('value').nodes[0].node;

  return out;
}

function createReturnStatement(options: IOptions, declarationsQuery: query.QueryWrapper): ts.ReturnStatement {
  const pieces = flatten(declarationsQuery.map((n) => convertDeclaration(options, n)));
  return ts.createReturn(createTemplateExpression(options, pieces));
}

function createBody(options: IOptions, mixinQuery: query.QueryWrapper) {
  const mixinBody = mixinQuery.children('block').first();

  const nonDeclarations = mixinBody.children((n) => n.node.type !== 'selector');
  const bodyStatements = nonDeclarations.map((n) => createStatement(options, n.node));

  // Declarations are not statements, so I assume they will always be the return type
  const declarations = mixinBody.children('declaration');
  const returnStatement = createReturnStatement(options, declarations);

  return ts.createBlock(bodyStatements.concat([returnStatement]));
}

function getArguments(mixinNode: query.QueryWrapper): IMixinArgument[] {
  const mixinArgs = mixinNode.children('arguments');
  const mixinArgsVars = mixinArgs.children('variable');
  // TODO: missing arguments with a default
  return mixinArgsVars.map((node) => ({ name: utils.getVariableName(node.node.value.toString()) }));
}

function createParameterDeclarations(mixinNode: query.QueryWrapper) {
  const mixinArgs = getArguments(mixinNode);
  return mixinArgs.map(
    (arg) =>
      ts.createParameter(
        undefined,
        undefined,
        undefined,
        ts.createIdentifier(arg.name),
        undefined,
        // TODO: improve argument type by analizing internal mixin conditions
        // first generate the body, then insert extracted insight to this function
        ts.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
      ),
  );
}

function transpileMixin(options: IOptions, node: postcss.Node) {
  const ast = scss.parse(node.toString());
  const $ = query(ast);

  const mixinNode = $('stylesheet').children('atrule');
  const mixinName = utils.getVariableName(mixinNode.children('identifier').value(), options.name);
  const bodyBlock = createBody(options, mixinNode);

  options.imp.styled.push('css');
  return ts.createVariableStatement(
    [ts.createToken(ts.SyntaxKind.ExportKeyword)],
    ts.createVariableDeclarationList(
      [
        ts.createVariableDeclaration(
          ts.createIdentifier(mixinName),
          undefined,
          ts.createArrowFunction(
            undefined,
            undefined,
            createParameterDeclarations(mixinNode),
            undefined,
            ts.createToken(ts.SyntaxKind.EqualsGreaterThanToken),
            bodyBlock,
          ),
        ),
      ],
      ts.NodeFlags.Const,
    ),
  );
}

export default transpileMixin;
