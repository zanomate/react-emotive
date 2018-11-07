# react-emotive

[![version](https://badge.fury.io/js/react-emotive.svg)](https://badge.fury.io/js/emotive)
              
[![size](http://img.badgesize.io/https://unpkg.com/react-emotive/index.js?label=size)](http://img.badgesize.io/https://unpkg.com/react-emotive/index.js?label=size)

A wrapper for React of the 'Emotive' css-in-js library.

```js
import {Styled, Css, Color} from 'react-emotive';

const MyComp = Styled.div(
    Css.Display.BLOCK,
    Css.Position.ABSOLUTE,
    Css.Height.px(200),
    Css.FontSize.px(50),
    props => [
        Css.Color.set(props.textColor),
        Css.BackgroundColor.set(props.bgcolor)
    ]
);

const OtherComp = (props) => (
    <MyComp textColor={Color.WHITE} bgColor={Color.BLUE}>
        Emotive is cool with React
    </MyComp>
);
```

Using Media Queries:

```js
import {Styled, Css, Media, Query} from 'react-emotive';

const mobile = Media(Query.MaxWidth.px(576));

const tablet = Media(Query.and(
    Query.MinWidth.px(577),
    Query.MaxWidth.px(992)
));

const MyComp = Styled.div(
    Css.Color.WHITE,
    Css.BackgroundColor.BLUE,
    Css.Height.px(200),
    Css.FontSize.px(50),
    mobile(
        Css.Color.BLACK,
        Css.BackgroundColor.RED
    ),
    tablet(
        Css.Color.GRAY,
        Css.BackgroundColor.GREEN
    )
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

## Styled components

Use the `Styled` object to create custom styled React components.

Every HTML element is avaiable as a method

```js
const BasedOnTable = Styled.table(
    ...
);
```

You can also extends another component using `Styled.component` method

```js
const BasedOnComponent = Styled.component(OtherComponent
    ...
);
```

## Props

You can easily create dynamic styled components based on component props:

```js
const MyComp = Styled.div(
    Css.FontSize.px(15),
    
    // single line
    props => Css.Display.set(props.display),
    
    // multi-line
    props => [
        Css.BackgroundColor.set(props.bgColor),
        Css.Color.set(props.textColor)
    ]
);
```

## Media Query

Using the `Media` function it is possible to create custom wrappers based on media queries:

```js
import {Styled, Css, Media, Query} from 'react-emotive';

const printer = Media(Query.PRINT);
const mobile = Media(Query.MaxWidth.px(576));
const tablet = Media(Query.and(
    Query.MinWidth.px(577),
    Query.MaxWidth.px(992)
));

const MyComp = Styled.div(
    Css.Color.WHITE,
    Css.BackgroundColor.BLUE,
    Css.Height.px(200),
    Css.FontSize.px(50),
    mobile(
        Css.Color.BLACK,
        Css.BackgroundColor.RED
    ),
    tablet(
        Css.Color.GRAY,
        Css.BackgroundColor.GREEN
    )
);

```

## Emotive

Every `emotive` object is re-exported to be directly avaiable. For a complete list see the [Emotive npm package](https://www.npmjs.com/package/emotive)
