// 名前付きでインポートします
import { Parser } from '../src';

describe('hello() のテスト', () => {
  it('Hello. と出力', () => {
    // コンソールのログ出力を監視し、その文字列を返します
    const log = jest.spyOn(console, 'log').mockReturnValue();

    // hello メソッドの実行
    let parser = new Parser();
    parser.main();

    // 1番目のログ出力が 'Hello.' と一致するかチェック
    expect(log).toHaveBeenNthCalledWith(1, 'Hello.');

    // 'jest.spyOn()' によって作成されたモックをリセットします
    log.mockRestore();
  });
});
