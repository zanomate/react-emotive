import * as Emotive from 'emotive';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import { Component, ComponentClass, createElement } from 'react';

let window = require('global/window');

// Emotive re-export
export type Param = Emotive.Param;
export const Css = Emotive.Css;
export const Method = Emotive.Method;
export const Length = Emotive.Length;
export const Angle = Emotive.Angle;
export const Time = Emotive.Time;
export const Frequency = Emotive.Frequency;
export const Resolution = Emotive.Resolution;
export const Keyword = Emotive.Keyword;
export const Color = Emotive.Color;
export const Unit = Emotive.Unit;
export const Property = Emotive.Property;
export const Query = Emotive.Query;

// Types
export type Props = { [name: string]: any };
export type State = { [id: string]: any };
export type StaticSheet = Emotive.Sheet;
export type SheetFromProps = (props: Props) => StaticSheet | StaticSheet[];
export type Sheet = StaticSheet | SheetFromProps | SheetFromMQ;

class SheetFromMQ {
    query: string;
    styles: Sheet[];

    constructor(query: string, styles: Sheet[]) {
        this.query = query;
        this.styles = styles;
    }
}

// Component
const component = (elementType: string | ComponentClass): any => {
    return (...styles: Sheet[]) => class extends Component<any> {

        state: State = {};
        mediaQueries: any[] = [];

        constructor(props: any) {
            super(props);
        }

        componentDidMount() {
            if (!window.matchMedia) return;
            extractMediaQueryStyles(styles).map(style => {
                const id = style.query;
                const mq = window.matchMedia(style.query);
                mq.addListener((mediaQuery: any) => this.onMatch(id, mediaQuery));
                this.mediaQueries.push(mq);
                this.onMatch(id, mq);
            });
        }

        componentWillUnmount() {
            this.mediaQueries && this.mediaQueries
                .map((mediaQuery: any) => mediaQuery.removeListener(this.onMatch));
        }

        onMatch(id: string, mediaQuery: any) {
            const newState: { [id: string]: any } = (<any>Object).assign({}, this.state);
            newState[id] = !!mediaQuery.matches;
            this.setState(newState);
        }

        render() {
            if (!this.props.children || typeof window === 'undefined') return false;

            let {style, ...otherProps} = this.props;

            let filteredStyles: StaticSheet[] = filterStyles(styles, this.props, this.state);
            if (style) {
                filteredStyles.push(style);
            }

            const emotiveStyle = Css.sheet(...filteredStyles);
            const domProps = filterInvalidDOMProps(otherProps);
            return createElement<any>(elementType, {style: emotiveStyle, ...domProps}, this.props.children);
        }
    };
};

// Utils
function extractMediaQueryStyles(stylesToExtract: Sheet[]): SheetFromMQ[] {
    let result: SheetFromMQ[] = stylesToExtract
        .filter(styleToExtract => styleToExtract instanceof SheetFromMQ)
        .map(styleToExtract => <SheetFromMQ>styleToExtract);

    let subResult: SheetFromMQ[] = [];
    result.map(extractedStyle => {
        subResult.push(...extractMediaQueryStyles(extractedStyle.styles));
    });
    result.push(...subResult);

    return result;
}

function filterStyles(stylesToFilter: Sheet[], props: Props, state: State): StaticSheet[] {
    let result: StaticSheet[] = [];
    stylesToFilter.map((style: Sheet) => {
        // From media query
        if (style instanceof SheetFromMQ) {
            if (state[style.query]) {
                result.push(...filterStyles(style.styles, props, state));
            }
        }
        // From props
        else if ({}.toString.call(style) === '[object Function]') {
            const computed = (<SheetFromProps>style)(props);
            const resolved = filterStyles(Array.isArray(computed) ? computed : [computed], props, state);
            result.push(...resolved);
        }
        // Static
        else {
            result.push(<StaticSheet>style);
        }
    });
    return result;
}


// Media
export const Media = (query: string) => {
    return (...styles: Sheet[]) => new SheetFromMQ(query, styles);
};


// Styled
export const Styled = {
    component: component,
    a: (...properties: Sheet[]): any => component('a')(...properties),
    abbr: (...properties: Sheet[]): any => component('abbr')(...properties),
    acronym: (...properties: Sheet[]): any => component('acronym')(...properties),
    address: (...properties: Sheet[]): any => component('address')(...properties),
    applet: (...properties: Sheet[]): any => component('applet')(...properties),
    area: (...properties: Sheet[]): any => component('area')(...properties),
    article: (...properties: Sheet[]): any => component('article')(...properties),
    aside: (...properties: Sheet[]): any => component('aside')(...properties),
    audio: (...properties: Sheet[]): any => component('audio')(...properties),
    b: (...properties: Sheet[]): any => component('b')(...properties),
    base: (...properties: Sheet[]): any => component('base')(...properties),
    basefont: (...properties: Sheet[]): any => component('basefont')(...properties),
    bdi: (...properties: Sheet[]): any => component('bdi')(...properties),
    bdo: (...properties: Sheet[]): any => component('bdo')(...properties),
    big: (...properties: Sheet[]): any => component('big')(...properties),
    blockquote: (...properties: Sheet[]): any => component('blockquote')(...properties),
    body: (...properties: Sheet[]): any => component('body')(...properties),
    br: (...properties: Sheet[]): any => component('br')(...properties),
    button: (...properties: Sheet[]): any => component('button')(...properties),
    canvas: (...properties: Sheet[]): any => component('canvas')(...properties),
    caption: (...properties: Sheet[]): any => component('caption')(...properties),
    center: (...properties: Sheet[]): any => component('center')(...properties),
    cite: (...properties: Sheet[]): any => component('cite')(...properties),
    code: (...properties: Sheet[]): any => component('code')(...properties),
    col: (...properties: Sheet[]): any => component('col')(...properties),
    colgroup: (...properties: Sheet[]): any => component('colgroup')(...properties),
    data: (...properties: Sheet[]): any => component('data')(...properties),
    datalist: (...properties: Sheet[]): any => component('datalist')(...properties),
    dd: (...properties: Sheet[]): any => component('dd')(...properties),
    del: (...properties: Sheet[]): any => component('del')(...properties),
    details: (...properties: Sheet[]): any => component('details')(...properties),
    dfn: (...properties: Sheet[]): any => component('dfn')(...properties),
    dialog: (...properties: Sheet[]): any => component('dialog')(...properties),
    dir: (...properties: Sheet[]): any => component('dir')(...properties),
    div: (...properties: Sheet[]): any => component('div')(...properties),
    dl: (...properties: Sheet[]): any => component('dl')(...properties),
    dt: (...properties: Sheet[]): any => component('dt')(...properties),
    em: (...properties: Sheet[]): any => component('em')(...properties),
    embed: (...properties: Sheet[]): any => component('embed')(...properties),
    fieldset: (...properties: Sheet[]): any => component('fieldset')(...properties),
    figcaption: (...properties: Sheet[]): any => component('figcaption')(...properties),
    figure: (...properties: Sheet[]): any => component('figure')(...properties),
    font: (...properties: Sheet[]): any => component('font')(...properties),
    footer: (...properties: Sheet[]): any => component('footer')(...properties),
    form: (...properties: Sheet[]): any => component('form')(...properties),
    frame: (...properties: Sheet[]): any => component('frame')(...properties),
    frameset: (...properties: Sheet[]): any => component('frameset')(...properties),
    h1: (...properties: Sheet[]): any => component('h1')(...properties),
    head: (...properties: Sheet[]): any => component('head')(...properties),
    header: (...properties: Sheet[]): any => component('header')(...properties),
    hr: (...properties: Sheet[]): any => component('hr')(...properties),
    html: (...properties: Sheet[]): any => component('html')(...properties),
    i: (...properties: Sheet[]): any => component('i')(...properties),
    iframe: (...properties: Sheet[]): any => component('iframe')(...properties),
    img: (...properties: Sheet[]): any => component('img')(...properties),
    input: (...properties: Sheet[]): any => component('input')(...properties),
    ins: (...properties: Sheet[]): any => component('ins')(...properties),
    kbd: (...properties: Sheet[]): any => component('kbd')(...properties),
    label: (...properties: Sheet[]): any => component('label')(...properties),
    legend: (...properties: Sheet[]): any => component('legend')(...properties),
    li: (...properties: Sheet[]): any => component('li')(...properties),
    link: (...properties: Sheet[]): any => component('link')(...properties),
    main: (...properties: Sheet[]): any => component('main')(...properties),
    map: (...properties: Sheet[]): any => component('map')(...properties),
    mark: (...properties: Sheet[]): any => component('mark')(...properties),
    meta: (...properties: Sheet[]): any => component('meta')(...properties),
    meter: (...properties: Sheet[]): any => component('meter')(...properties),
    nav: (...properties: Sheet[]): any => component('nav')(...properties),
    noframes: (...properties: Sheet[]): any => component('noframes')(...properties),
    noscript: (...properties: Sheet[]): any => component('noscript')(...properties),
    object: (...properties: Sheet[]): any => component('object')(...properties),
    ol: (...properties: Sheet[]): any => component('ol')(...properties),
    optgroup: (...properties: Sheet[]): any => component('optgroup')(...properties),
    option: (...properties: Sheet[]): any => component('option')(...properties),
    output: (...properties: Sheet[]): any => component('output')(...properties),
    p: (...properties: Sheet[]): any => component('p')(...properties),
    param: (...properties: Sheet[]): any => component('param')(...properties),
    picture: (...properties: Sheet[]): any => component('picture')(...properties),
    pre: (...properties: Sheet[]): any => component('pre')(...properties),
    progress: (...properties: Sheet[]): any => component('progress')(...properties),
    q: (...properties: Sheet[]): any => component('q')(...properties),
    rp: (...properties: Sheet[]): any => component('rp')(...properties),
    rt: (...properties: Sheet[]): any => component('rt')(...properties),
    ruby: (...properties: Sheet[]): any => component('ruby')(...properties),
    s: (...properties: Sheet[]): any => component('s')(...properties),
    samp: (...properties: Sheet[]): any => component('samp')(...properties),
    script: (...properties: Sheet[]): any => component('script')(...properties),
    section: (...properties: Sheet[]): any => component('section')(...properties),
    select: (...properties: Sheet[]): any => component('select')(...properties),
    small: (...properties: Sheet[]): any => component('small')(...properties),
    source: (...properties: Sheet[]): any => component('source')(...properties),
    span: (...properties: Sheet[]): any => component('span')(...properties),
    strike: (...properties: Sheet[]): any => component('strike')(...properties),
    strong: (...properties: Sheet[]): any => component('strong')(...properties),
    style: (...properties: Sheet[]): any => component('style')(...properties),
    sub: (...properties: Sheet[]): any => component('sub')(...properties),
    summary: (...properties: Sheet[]): any => component('summary')(...properties),
    sup: (...properties: Sheet[]): any => component('sup')(...properties),
    svg: (...properties: Sheet[]): any => component('svg')(...properties),
    table: (...properties: Sheet[]): any => component('table')(...properties),
    tbody: (...properties: Sheet[]): any => component('tbody')(...properties),
    td: (...properties: Sheet[]): any => component('td')(...properties),
    template: (...properties: Sheet[]): any => component('template')(...properties),
    textarea: (...properties: Sheet[]): any => component('textarea')(...properties),
    tfoot: (...properties: Sheet[]): any => component('tfoot')(...properties),
    th: (...properties: Sheet[]): any => component('th')(...properties),
    thead: (...properties: Sheet[]): any => component('thead')(...properties),
    time: (...properties: Sheet[]): any => component('time')(...properties),
    title: (...properties: Sheet[]): any => component('title')(...properties),
    tr: (...properties: Sheet[]): any => component('tr')(...properties),
    track: (...properties: Sheet[]): any => component('track')(...properties),
    tt: (...properties: Sheet[]): any => component('tt')(...properties),
    u: (...properties: Sheet[]): any => component('u')(...properties),
    ul: (...properties: Sheet[]): any => component('ul')(...properties),
    var: (...properties: Sheet[]): any => component('var')(...properties),
    video: (...properties: Sheet[]): any => component('video')(...properties),
    wbr: (...properties: Sheet[]): any => component('wbr')(...properties)
};
