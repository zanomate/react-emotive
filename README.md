# React Emotive

[![version](https://badge.fury.io/js/react-emotive.svg)](https://badge.fury.io/js/emotive)
              
[![size](http://img.badgesize.io/https://unpkg.com/react-emotive/react-emotive.js?label=package%20size)](http://img.badgesize.io/https://unpkg.com/react-emotive/react-emotive.js?label=package%20size)

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
    ],
    mobile(
        Css.Color.BLACK,
        Css.BackgroundColor.RED
    ),
);

const OtherComp = (props) => (
    <MyComp textColor={Color.WHITE} bgColor={Color.BLUE}>
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

## Index
- [React Emotive](#react-emotive)
	- [Install](#install)
- [Usage](#usage)
	- [Styled components](#styled-components)
	- [Emotive](#emotive)
	- [Props](#props)
	- [Media Query](#media-query)
	- [Nesting](#nesting)

# Usage

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


## Emotive

Every `emotive` object is re-exported to be directly available from `react-emotive`.

| Emotive object | Content |
| --- | --- |
| `Css` | Property objects |
| `Method` | Methods |
| `Length` | Length and percentage units methods |
| `Angle` | Angle units methods |
| `Time` | Time units methods |
| `Frequency` | Frequency units methods |
| `Resolution` | Resolution units methods |
| `Keyword` | Keywords constants |
| `Color` | Colors constants |
| `Unit` | Units constants |
| `Property` | Properties name constants |
| `Query` | Media Queries |

For a complete guide to these objects, see [Emotive User Guide](https://www.npmjs.com/package/emotive)


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

It is possible to create custom wrappers based on media queries. Properties specified inside them will be considered only when the corresponding conditions are satisfied. 

```js
import {Styled, Css, Media} from 'react-emotive';

const printer = Media('print');
const mobile = Media('(max-width: 576px)');

const MyComp = Styled.div(
    Css.Color.WHITE,
    Css.BackgroundColor.BLUE,
    printer(
        Css.BackgroundColor.WHITE
    ),
    mobile(
        Css.Color.BLACK,
        Css.BackgroundColor.RED
    )
);
```

Of corse, the Emotive's `Query` object is re-exported too. Use it to compose your media queries:

```js
import {Styled, Css, Media, Query} from 'react-emotive';

const printer = Media(Query.PRINT);
const tablet = Media(Query.and(
    Query.MinWidth.px(577),
    Query.MaxWidth.px(992)
));

const MyComp = Styled.div(
    Css.Color.WHITE,
    Css.BackgroundColor.BLUE,
    printer(
        Css.BackgroundColor.WHITE
    ),
    tablet(
        Css.Color.GRAY,
        Css.BackgroundColor.GREEN
    )
);
```

## Nesting

Yes, you can use nested media query wrappers, together with props based properties, with no limits.

```js
const MyComp = Styled.div(
    Css.Color.WHITE,
    Css.BackgroundColor.BLUE,
    printer(
        Css.BackgroundColor.WHITE,
        props => Css.FontFamily.set(props.printerFont)
    ),
    mobile(
        Css.Color.GRAY,
        Css.BackgroundColor.GREEN,
        hover(
            Css.Color.BLUE,
        )
    ),
    props => [
        Css.FontSize.set(props.font),
        mobile(
            Css.FontSize.set(props.fontMobile)
        )
    ]
);
```
