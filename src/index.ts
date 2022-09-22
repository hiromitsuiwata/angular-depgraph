import * as ts from 'typescript';

export class Parser {
  public main(): void {
    console.log('Hello.');

    const sourceCode = `var foo = 123;.trim();`;

    const sourceFile = ts.createSourceFile(
      'foo.ts',
      sourceCode,
      ts.ScriptTarget.ES5,
      true
    );
    this.printAllChildren(sourceFile);
  }

  private printAllChildren(node: ts.Node, depth = 0) {
    if (ts.canHaveModifiers(node)) {
      console.log(ts.getModifiers(node));
    }

    console.log(new Array(depth + 1).join('----'), node.pos, node.end);
    depth++;
    node.getChildren().forEach((c) => this.printAllChildren(c, depth));
  }
}
