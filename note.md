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
