# react-emotive

[![version](https://badge.fury.io/js/react-emotive.svg)](https://badge.fury.io/js/emotive)
              
[![size](http://img.badgesize.io/https://unpkg.com/react-emotive/index.js?label=size)](http://img.badgesize.io/https://unpkg.com/react-emotive/index.js?label=size)

A wrapper module for React of the 'Emotive' css-in-js library.

```js
import Emotive from 'react-emotive';
import Css from 'emotive';

const MyComp = Emotive.div(
    props => [
        Css.BackgroundColor.set(props.bgColor || Color.GREEN),
        Css.Border.set(Length.px(1), Keyword.SOLID, props.borderColor)
    ],
    Css.Height.px(200),
    Css.Color.BLUE,
    Css.FontSize.px(50)
);

const OtherComp = (props) => (
    <MyComp bgColor={Color.RED} borderColor={Color.GREEN}>
        Emotive is cool with React
    </MyComp>
);

```

## Install

Install with [Npm](https://www.npmjs.com/package/react-emotive)
```sh
npm install --save react-emotive
```

or [Yarn](https://yarnpkg.com/en/package/react-emotive)
```sh
yarn add react-emotive
```

