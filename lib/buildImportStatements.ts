import { uniq } from 'lodash';
import * as ts from 'typescript';

import { IImportMap } from './transpile';
import * as utils from './utils';

// const code = `
//   import { ComponentClass, StatelessComponent } from 'react';
//   import styled from 'styled-components';
//   type Component<P> = ComponentClass<P> | StatelessComponent<P>;
// `;

function reactImportStatements() {
  return ts.createImportDeclaration(
    [],
    [],
    ts.createImportClause(
      undefined,
      ts.createNamedImports([
        ts.createImportSpecifier(undefined, ts.createIdentifier('ComponentClass')),
        ts.createImportSpecifier(undefined, ts.createIdentifier('StatelessComponent')),
      ]),
    ),
    ts.createLiteral('react'),
  );
}

function styledComponentsStatement() {
  return ts.createImportDeclaration(
    [],
    [],
    ts.createImportClause(ts.createIdentifier('styled'), undefined),
    ts.createLiteral('styled-components'),
  );
}

function componentTypeAlias() {
  const typeAliasDecl = ts.createNode(ts.SyntaxKind.TypeAliasDeclaration) as ts.TypeAliasDeclaration;
  typeAliasDecl.name = ts.createIdentifier('Component');
  typeAliasDecl.typeParameters = ts.createNodeArray([
    ts.createTypeParameterDeclaration(ts.createIdentifier('P'), undefined, undefined),
  ]);

  typeAliasDecl.type = ts.createUnionOrIntersectionTypeNode(ts.SyntaxKind.UnionType, [
    ts.createTypeReferenceNode('ComponentClass', [ts.createTypeReferenceNode('P', [])]),
    ts.createTypeReferenceNode('StatelessComponent', [ts.createTypeReferenceNode('P', [])]),
  ]);

  return typeAliasDecl;
}

function buildImportStatements(imp: IImportMap) {
  const out = [];

  if (imp.react) {
    out.push(reactImportStatements());
    out.push(styledComponentsStatement());
  }

  if (imp.polished.length > 0) {
    out.push(
      ts.createImportDeclaration(
        [],
        [],
        ts.createImportClause(
          undefined,
          ts.createNamedImports(
            uniq(imp.polished)
              .map((name) => ts.createImportSpecifier(undefined, ts.createIdentifier(name))),
          ),
        ),
        ts.createLiteral('polished'),
      ),
    );
  }

  if (imp.material.length > 0) {
    imp.material.forEach((mlib) =>
      out.push(
        ts.createImportDeclaration(
          [],
          [],
          ts.createImportClause(
            undefined,
            ts.createNamespaceImport(ts.createIdentifier(utils.getLibraryImportName(mlib.library))),
          ),
          ts.createLiteral(`../${mlib.library}/${mlib.name}`),
        ),
      ),
    );
  }

  if (imp.react) {
    out.push(componentTypeAlias());
  }

  return out;
}

export default buildImportStatements;
