import * as ts from 'typescript';

function createTemplateMiddle(text: string): ts.TemplateMiddle {
  const node = ts.createNode(ts.SyntaxKind.TemplateMiddle) as ts.TemplateMiddle;
  node.text = text;
  return node;
}

function createTemplateHead(text: string): ts.TemplateHead {
  const node = ts.createNode(ts.SyntaxKind.TemplateHead) as ts.TemplateHead;
  node.text = text;
  return node;
}

function createNoSubstitutionTemplateLiteral(text: string): ts.NoSubstitutionTemplateLiteral {
  const tempLiteral = ts.createNode(ts.SyntaxKind.FirstTemplateToken) as ts.NoSubstitutionTemplateLiteral;
  tempLiteral.text = '\n  ' + text + '\n';
  return tempLiteral;
}

export {
  createNoSubstitutionTemplateLiteral,
  createTemplateHead,
  createTemplateMiddle,
};
