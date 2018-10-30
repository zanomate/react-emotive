# react-emotive

[![version](https://badge.fury.io/js/react-emotive.svg)](https://badge.fury.io/js/emotive)
              
[![size](http://img.badgesize.io/https://unpkg.com/react-emotive/index.js?label=size)](http://img.badgesize.io/https://unpkg.com/react-emotive/index.js?label=size)

A wrapper module for React of the 'Emotive' css-in-js library.

```jsx
import Emotive from 'react-emotive';
import Css from 'emotive';

const MyComp = Emotive.div(
    Css.Position.ABSOLUTE,
    Css.Top.px(50),
    Css.Left.X(10),
    Css.FontSize.em(20),
    props => Css.BackgroundColor.set(props.bgColor)
);

const OtherComp = (props) => (
    <MyComp bgColor='red'>
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

