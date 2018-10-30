import React from 'react';
import { Css } from 'emotive';
import filterInvalidDOMProps from 'filter-invalid-dom-props';

function isFunction(functionToCheck) {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}

export const Emotive = {

    component: (elementType, ...properties) => {
        return (props) => {

            let {style, ...otherProps} = props;

            let styleProps = [];
            styleProps.push(...properties.map(property => {
                if (isFunction(property)) {
                    return property(props)
                }
                return property;
            }));
            if (style) {
                styleProps.push(style)
            }

            const emotiveStyle = Css.sheet(...styleProps);
            const domProps = filterInvalidDOMProps(otherProps);
            return React.createElement(elementType, {style: emotiveStyle, ...domProps}, props.children)
        }
    },
    a: (...properties) => Emotive.component('a', ...properties),
    abbr: (...properties) => Emotive.component('abbr', ...properties),
    acronym: (...properties) => Emotive.component('acronym', ...properties),
    address: (...properties) => Emotive.component('address', ...properties),
    applet: (...properties) => Emotive.component('applet', ...properties),
    area: (...properties) => Emotive.component('area', ...properties),
    article: (...properties) => Emotive.component('article', ...properties),
    aside: (...properties) => Emotive.component('aside', ...properties),
    audio: (...properties) => Emotive.component('audio', ...properties),
    b: (...properties) => Emotive.component('b', ...properties),
    base: (...properties) => Emotive.component('base', ...properties),
    basefont: (...properties) => Emotive.component('basefont', ...properties),
    bdi: (...properties) => Emotive.component('bdi', ...properties),
    bdo: (...properties) => Emotive.component('bdo', ...properties),
    big: (...properties) => Emotive.component('big', ...properties),
    blockquote: (...properties) => Emotive.component('blockquote', ...properties),
    body: (...properties) => Emotive.component('body', ...properties),
    br: (...properties) => Emotive.component('br', ...properties),
    button: (...properties) => Emotive.component('button', ...properties),
    canvas: (...properties) => Emotive.component('canvas', ...properties),
    caption: (...properties) => Emotive.component('caption', ...properties),
    center: (...properties) => Emotive.component('center', ...properties),
    cite: (...properties) => Emotive.component('cite', ...properties),
    code: (...properties) => Emotive.component('code', ...properties),
    col: (...properties) => Emotive.component('col', ...properties),
    colgroup: (...properties) => Emotive.component('colgroup', ...properties),
    data: (...properties) => Emotive.component('data', ...properties),
    datalist: (...properties) => Emotive.component('datalist', ...properties),
    dd: (...properties) => Emotive.component('dd', ...properties),
    del: (...properties) => Emotive.component('del', ...properties),
    details: (...properties) => Emotive.component('details', ...properties),
    dfn: (...properties) => Emotive.component('dfn', ...properties),
    dialog: (...properties) => Emotive.component('dialog', ...properties),
    dir: (...properties) => Emotive.component('dir', ...properties),
    div: (...properties) => Emotive.component('div', ...properties),
    dl: (...properties) => Emotive.component('dl', ...properties),
    dt: (...properties) => Emotive.component('dt', ...properties),
    em: (...properties) => Emotive.component('em', ...properties),
    embed: (...properties) => Emotive.component('embed', ...properties),
    fieldset: (...properties) => Emotive.component('fieldset', ...properties),
    figcaption: (...properties) => Emotive.component('figcaption', ...properties),
    figure: (...properties) => Emotive.component('figure', ...properties),
    font: (...properties) => Emotive.component('font', ...properties),
    footer: (...properties) => Emotive.component('footer', ...properties),
    form: (...properties) => Emotive.component('form', ...properties),
    frame: (...properties) => Emotive.component('frame', ...properties),
    frameset: (...properties) => Emotive.component('frameset', ...properties),
    h1: (...properties) => Emotive.component('h1', ...properties),
    head: (...properties) => Emotive.component('head', ...properties),
    header: (...properties) => Emotive.component('header', ...properties),
    hr: (...properties) => Emotive.component('hr', ...properties),
    html: (...properties) => Emotive.component('html', ...properties),
    i: (...properties) => Emotive.component('i', ...properties),
    iframe: (...properties) => Emotive.component('iframe', ...properties),
    img: (...properties) => Emotive.component('img', ...properties),
    input: (...properties) => Emotive.component('input', ...properties),
    ins: (...properties) => Emotive.component('ins', ...properties),
    kbd: (...properties) => Emotive.component('kbd', ...properties),
    label: (...properties) => Emotive.component('label', ...properties),
    legend: (...properties) => Emotive.component('legend', ...properties),
    li: (...properties) => Emotive.component('li', ...properties),
    link: (...properties) => Emotive.component('link', ...properties),
    main: (...properties) => Emotive.component('main', ...properties),
    map: (...properties) => Emotive.component('map', ...properties),
    mark: (...properties) => Emotive.component('mark', ...properties),
    meta: (...properties) => Emotive.component('meter', ...properties),
    meter: (...properties) => Emotive.component('div', ...properties),
    nav: (...properties) => Emotive.component('nav', ...properties),
    noframes: (...properties) => Emotive.component('noframes', ...properties),
    noscript: (...properties) => Emotive.component('noscript', ...properties),
    object: (...properties) => Emotive.component('object', ...properties),
    ol: (...properties) => Emotive.component('ol', ...properties),
    optgroup: (...properties) => Emotive.component('optgroup', ...properties),
    option: (...properties) => Emotive.component('option', ...properties),
    output: (...properties) => Emotive.component('output', ...properties),
    p: (...properties) => Emotive.component('p', ...properties),
    param: (...properties) => Emotive.component('param', ...properties),
    picture: (...properties) => Emotive.component('picture', ...properties),
    pre: (...properties) => Emotive.component('pre', ...properties),
    progress: (...properties) => Emotive.component('progress', ...properties),
    q: (...properties) => Emotive.component('q', ...properties),
    rp: (...properties) => Emotive.component('rp', ...properties),
    rt: (...properties) => Emotive.component('rt', ...properties),
    ruby: (...properties) => Emotive.component('ruby', ...properties),
    s: (...properties) => Emotive.component('s', ...properties),
    samp: (...properties) => Emotive.component('samp', ...properties),
    script: (...properties) => Emotive.component('script', ...properties),
    section: (...properties) => Emotive.component('section', ...properties),
    select: (...properties) => Emotive.component('select', ...properties),
    small: (...properties) => Emotive.component('small', ...properties),
    source: (...properties) => Emotive.component('source', ...properties),
    span: (...properties) => Emotive.component('span', ...properties),
    strike: (...properties) => Emotive.component('strike', ...properties),
    strong: (...properties) => Emotive.component('strong', ...properties),
    style: (...properties) => Emotive.component('style', ...properties),
    sub: (...properties) => Emotive.component('sub', ...properties),
    summary: (...properties) => Emotive.component('summary', ...properties),
    sup: (...properties) => Emotive.component('sup', ...properties),
    svg: (...properties) => Emotive.component('svg', ...properties),
    table: (...properties) => Emotive.component('table', ...properties),
    tbody: (...properties) => Emotive.component('tbody', ...properties),
    td: (...properties) => Emotive.component('td', ...properties),
    template: (...properties) => Emotive.component('template', ...properties),
    textarea: (...properties) => Emotive.component('textarea', ...properties),
    tfoot: (...properties) => Emotive.component('tfoot', ...properties),
    th: (...properties) => Emotive.component('th', ...properties),
    thead: (...properties) => Emotive.component('thead', ...properties),
    time: (...properties) => Emotive.component('time', ...properties),
    title: (...properties) => Emotive.component('title', ...properties),
    tr: (...properties) => Emotive.component('tr', ...properties),
    track: (...properties) => Emotive.component('track', ...properties),
    tt: (...properties) => Emotive.component('tt', ...properties),
    u: (...properties) => Emotive.component('u', ...properties),
    ul: (...properties) => Emotive.component('ul', ...properties),
    var: (...properties) => Emotive.component('var', ...properties),
    video: (...properties) => Emotive.component('video', ...properties),
    wbr: (...properties) => Emotive.component('wbr', ...properties)
};

export default Emotive;
