import * as ts from 'typescript';

export class Parser {
  public main(filePaths: string[]): void {
    console.log('Hello.');

    const compilerOptions: ts.CompilerOptions = {};

    const program = ts.createProgram(filePaths, compilerOptions);

    const sourceFiles = program.getSourceFiles();
    sourceFiles.forEach((sourceFile) => {
      if (!filePaths.includes(sourceFile.fileName)) {
        return;
      }
      console.log('sourceFile:' + sourceFile.fileName);

      const hierarchy: string[] = [];

      this.printAllChildren(sourceFile, 0, hierarchy);
      console.log('=====================================');
    });
  }

  private printAllChildren(node: ts.Node, depth: number, hierarchy: string[]) {
    this.print(depth, '[Node] pos:', node.pos, node.end);
    this.print(depth, '[Node] kind:', this.getKind(node));
    if (hierarchy.length > depth) {
      hierarchy = hierarchy.slice(0, depth);
    }
    hierarchy[depth] = this.getKind(node);
    this.print(depth, '[Node] hierarchy:', hierarchy.join('.'));

    if (ts.isClassDeclaration(node)) {
      this.print(
        depth,
        '[ClassDeclaration] name?.escapedText:',
        node.name?.escapedText
      );
    }

    if (ts.isStringLiteral(node)) {
      this.print(depth, '[StringLiteral] text:', node.text);
    }

    if (ts.isIdentifier(node)) {
      this.print(depth, '[Identifier] escapedText:', node.escapedText);
    }

    this.print(depth, '#####################################');

    depth++;

    ts.forEachChild(node, (childNode: ts.Node) => {
      this.printAllChildren(childNode, depth, hierarchy);
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private print(depth: number, message: any, ...optional: any[]): void {
    let indent = '';
    for (let i = 0; i < depth; i++) {
      indent += '--';
    }
    console.log(indent, message, optional);
  }

  private getKind(node: ts.Node): string {
    return ts.SyntaxKind[node.kind].toString();
  }
}
