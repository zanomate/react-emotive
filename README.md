# react-emotive

[![version](https://badge.fury.io/js/react-emotive.svg)](https://badge.fury.io/js/emotive)
              
[![size](http://img.badgesize.io/https://unpkg.com/react-emotive/index.js?label=size)](http://img.badgesize.io/https://unpkg.com/react-emotive/index.js?label=size)

A wrapper for React of the 'Emotive' css-in-js library.

```js
import {Styled, Css, Color} from 'react-emotive';

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

## Styled

Use the `Styled` object to create custom styled React components.

Every HTML element is avaiable as a method

```js
const BasedOnDiv = Styled.div(
    ...
);
```

You can also extends another component using `Styled.component` method

```js
const BasedOnComponent = Styled.component(OtherComponent
    ...
);
```

## Emotive

Every `emotive` object is re-exported to be directly avaiable. For a complete list see the [Emotive npm package](https://www.npmjs.com/package/emotive)
