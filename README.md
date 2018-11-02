# react-emotive

[![version](https://badge.fury.io/js/react-emotive.svg)](https://badge.fury.io/js/emotive)
              
[![size](http://img.badgesize.io/https://unpkg.com/react-emotive/index.js?label=size)](http://img.badgesize.io/https://unpkg.com/react-emotive/index.js?label=size)

A wrapper for React of the 'Emotive' css-in-js library.

```js
import Styled from 'react-emotive';
import Css, {Color} from 'emotive';

const MyComp = Styled.div(
    Css.Height.px(200),
    Css.Color.BLUE,
    Css.FontSize.px(50),
    props => Css.BackgroundColor.set(props.bgColor)
);

const OtherComp = (props) => (
    <MyComp bgColor={Color.RED}>
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

