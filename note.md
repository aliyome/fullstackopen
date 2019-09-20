# Note

## Part0

教材には古典的な Web アプリケーションの仕組みと実装についての説明が書かれている。

## Part1

主に React について記されたパート。

`create-react-app`でプロジェクトを作って基本的な React アプリの作り方を学べる。
以下メモ

- JSX は「XML ライク」で全て閉じタグが必要
- コンポーネント名は 1 文字目を必ず大文字にする
- ルート要素は必ず一つにする必要があるが、`<>`(fragment: 空要素)にすることもできる(`ng-container`っぽい)

```js
setTimeout(arto.greet, 1000); // greet内のthisはTimeoutオブジェクトを指す
setTimeout(arto.greet.bind(arto), 1000); // thisをartoにバインドした関数を新しく作成する
```

```jsx
const [counter, setCounter] = useState(0);
setTimeout(() => setCounter(counter + 1), 1000); // setCounterの度に再描画するため1秒毎にカウントアップする
```

`useState()`はフックが常に同じ順番で実行されるように、**ループ中、条件分岐、コンポーネントを定義する関数以外で呼んではいけない**

```jsx
const App = (props) => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
```

> Beware the official React tutorial, it's not very good.

:sob:

## Part2

コレクションのレンダリング、フォームコントロール、API リクエストを学べる

- 再レンダリング時に要素を一意に識別するために、コレクションの一部等には`key`が必要な場合がある
  - [Reconciliation – React](https://reactjs.org/docs/reconciliation.html#recursing-on-children)

### 要調査

- `setState`を`App`内に全て詰め込んでいるのでどんどん Fat になるが良いのか？

## Part3

Express, MongoDB によるバックエンドサーバの実装と、ESLint による検証について学べる

`nodemon`を使うと、ファイルに修正が入る度に再実行してくれて便利。

Express で`response.status(404).end();`のように`end()`を使うと応答のみ返す

> All HTTP requests except POST should be idempotent:
>
> > Methods can also have the property of "idempotence" in that (aside from error or expiration issues) the side-effects of N > 0 identical requests is the same as for a single request. The methods GET, HEAD, PUT and DELETE share this property

これまでのプロジェクトで DELETE は冪等に作っていなかった（削除したら専用の応答が返ってくる）ので気をつけなければ…

package.json に`proxy`を設定すると相対パスの向き先を変更できる。
たとえば、`"proxy": "http://localhost:3001"`と記述すると、React アプリ側から`/api/hoge`にアクセスすると、`http://localhost:3001/api/hoge`にリダイレクトされる

node で web サーバを書く場合は、`node --inspect index.js`で実行すると、chrome のデバッガが利用出来て便利。でも vscode のデバッガでも良いかも。

Part3 の Heroku 利用あたりからは**学習時間短縮のため、実装はそこそこに読み物として学習する**

- MongoDB Atlas は無料でも 512MB のストレージを利用できる
- `prcess.env.HOGE_VAR`で環境変数を利用できる
- `dotenv`ライブラリを利用すると、`.env`ファイルに環境変数を定義できて便利(**.gitignore を忘れずに**)
  - `require('dotenv').config()`すると、`process.env.HOGEHOGE`が利用できる
- `mongoose`はスキーマに制約を付与できる、validation が可能

```js
// mongooseでスキーマを作った後、mongodbからデータを取得する際、不要なプロパティは削除する
hogeSchema.set('toJSON', {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString(); // mongodbに管理されたuidをidとして使う
    delete returnedObject._id; // mongodbが管理する不要なフィールドを削除する
    delete returnedObject.__v;
  },
});
```

Express はよくあるミドルウェアをリクエスト・レスポンスに挟むアーキテクチャなので、エラーは`next(err)`に実質リスローすると便利

```js
(req, res, next) => {
  try {
    // do something.
  } catch (err) {
    next(err);
  }
};

const errorHandler = (err, req, res, next) => {
  if (err.name === 'CastError' && error.kind === 'ObjectId') {
    return res.status(400).json({ error: 'malformatted id' });
  }
  next(error);
};

app.use(errorHandler);
```

**後で読む** [airbnb/javascript: JavaScript Style Guide](https://github.com/airbnb/javascript)
