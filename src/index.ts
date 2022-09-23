import * as ts from 'typescript';

export class Parser {
  public main(filePaths: string[]): void {
    console.log('Hello.');

    const compilerOptions: ts.CompilerOptions = {};

    const program = ts.createProgram(filePaths, compilerOptions);

    const sourceFiles = program.getSourceFiles();

    sourceFiles.forEach((sourceFile) => {
      if (sourceFile.fileName.includes('node_modules')) {
        return;
      }
      console.log('sourceFile:' + sourceFile.fileName);
      this.printAllChildren(sourceFile);
      console.log('#####################################');
    });
  }

  private printAllChildren(node: ts.Node, depth = 0) {
    console.log('[node] pos:', node.pos, node.end);
    console.log('[node] SyntaxKind:', ts.SyntaxKind[node.kind]);

    if (ts.canHaveModifiers(node) && ts.getModifiers(node)) {
      console.log('[node] modifiers:', ts.getModifiers(node));
    }
    if (ts.canHaveDecorators(node) && ts.getDecorators(node)) {
      console.log('[node] decorators:', ts.getDecorators(node));
      ts.getDecorators(node)?.forEach((decorator) => {
        console.log('[node] decorator:', decorator);
      });
    }

    if (ts.isImportDeclaration(node)) {
      if (node.importClause) {
        console.log('[import] importClause:', node.importClause);
      }
    }

    if (ts.isClassDeclaration(node)) {
      console.log('[class] name:', node.name);
      console.log('[class] members:', node.members);
    }

    if (node.getSourceFile()) {
      console.log('[node] text:', node.getText());
      console.log('-------------------------------------');
    } else {
      console.log('-------------------------------------');
      return;
    }

    depth++;

    try {
      node.getChildren().forEach((c) => {
        this.printAllChildren(c, depth);
      });
    } catch (e) {
      console.log(e);
    }
  }
}
