import * as Emotive from "emotive";
import * as React from "react";
import styled from "styled-components";

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
export const Selector = Emotive.Selector;

export type Props = { [propName: string]: any };
export type StaticSheet = { [propertyName: string]: any };
export type SheetFromProps = (props: Props) => StaticSheet | StaticSheet[];
export type Sheet = StaticSheet | SheetFromProps | Condition;

//Utils
class Condition {
    condition: string;
    styles: Sheet[];

    constructor(condition: string, styles: Sheet[]) {
        this.condition = condition;
        this.styles = styles;
    }
}

function isFunction(any: any) {
    return {}.toString.call(any) === "[object Function]";
}

function toArray(any: any) {
    return Array.isArray(any) ? any : [any];
}

// Component
const buildSheet = (styles: Sheet[], props: Props) => {
    const applyProps = (styles: Sheet | Sheet[]): StaticSheet[] => {
        const styleArray = toArray(styles);
        const resolvedArray: Sheet[] = [];

        // Apply props at this level
        styleArray.map(style => {
            if (isFunction(style)) {
                const computed = style(props);
                resolvedArray.push(...toArray(computed));
            } else {
                resolvedArray.push(style);
            }
        });

        // Apply recursively
        return resolvedArray.map(style => {
            if (style instanceof Condition) {
                return { [style.condition]: Css.sheet(...applyProps(style.styles)) };
            } else {
                return style;
            }
        });
    };

    const sheet = Css.sheet(...applyProps(styles));
    console.log(sheet);
    return sheet;
};

// &
export function _Selector(selector: string) {
    return (...styles: Sheet[]) => new Condition(selector, styles);
}

// @media
export function _Media(query: string) {
    return (...styles: Sheet[]) => new Condition("@media " + query, styles);
}
export const Styled = {
    Selector: _Selector,
    Media: _Media,
    a: (...properties: Sheet[]): React.Component => styled.a(props => buildSheet(properties, props)),
    abbr: (...properties: Sheet[]): React.Component => styled.abbr(props => buildSheet(properties, props)),
    address: (...properties: Sheet[]): React.Component => styled.address(props => buildSheet(properties, props)),
    area: (...properties: Sheet[]): React.Component => styled.area(props => buildSheet(properties, props)),
    article: (...properties: Sheet[]): React.Component => styled.article(props => buildSheet(properties, props)),
    aside: (...properties: Sheet[]): React.Component => styled.aside(props => buildSheet(properties, props)),
    audio: (...properties: Sheet[]): React.Component => styled.audio(props => buildSheet(properties, props)),
    b: (...properties: Sheet[]): React.Component => styled.b(props => buildSheet(properties, props)),
    base: (...properties: Sheet[]): React.Component => styled.base(props => buildSheet(properties, props)),
    bdi: (...properties: Sheet[]): React.Component => styled.bdi(props => buildSheet(properties, props)),
    bdo: (...properties: Sheet[]): React.Component => styled.bdo(props => buildSheet(properties, props)),
    big: (...properties: Sheet[]): React.Component => styled.big(props => buildSheet(properties, props)),
    blockquote: (...properties: Sheet[]): React.Component => styled.blockquote(props => buildSheet(properties, props)),
    body: (...properties: Sheet[]): React.Component => styled.body(props => buildSheet(properties, props)),
    br: (...properties: Sheet[]): React.Component => styled.br(props => buildSheet(properties, props)),
    button: (...properties: Sheet[]): React.Component => styled.button(props => buildSheet(properties, props)),
    canvas: (...properties: Sheet[]): React.Component => styled.canvas(props => buildSheet(properties, props)),
    caption: (...properties: Sheet[]): React.Component => styled.caption(props => buildSheet(properties, props)),
    cite: (...properties: Sheet[]): React.Component => styled.cite(props => buildSheet(properties, props)),
    code: (...properties: Sheet[]): React.Component => styled.code(props => buildSheet(properties, props)),
    col: (...properties: Sheet[]): React.Component => styled.col(props => buildSheet(properties, props)),
    colgroup: (...properties: Sheet[]): React.Component => styled.colgroup(props => buildSheet(properties, props)),
    data: (...properties: Sheet[]): React.Component => styled.data(props => buildSheet(properties, props)),
    datalist: (...properties: Sheet[]): React.Component => styled.datalist(props => buildSheet(properties, props)),
    dd: (...properties: Sheet[]): React.Component => styled.dd(props => buildSheet(properties, props)),
    del: (...properties: Sheet[]): React.Component => styled.del(props => buildSheet(properties, props)),
    details: (...properties: Sheet[]): React.Component => styled.details(props => buildSheet(properties, props)),
    dfn: (...properties: Sheet[]): React.Component => styled.dfn(props => buildSheet(properties, props)),
    dialog: (...properties: Sheet[]): React.Component => styled.dialog(props => buildSheet(properties, props)),
    div: (...properties: Sheet[]): React.Component => styled.div(props => buildSheet(properties, props)),
    dl: (...properties: Sheet[]): React.Component => styled.dl(props => buildSheet(properties, props)),
    dt: (...properties: Sheet[]): React.Component => styled.dt(props => buildSheet(properties, props)),
    em: (...properties: Sheet[]): React.Component => styled.em(props => buildSheet(properties, props)),
    embed: (...properties: Sheet[]): React.Component => styled.embed(props => buildSheet(properties, props)),
    fieldset: (...properties: Sheet[]): React.Component => styled.fieldset(props => buildSheet(properties, props)),
    figcaption: (...properties: Sheet[]): React.Component => styled.figcaption(props => buildSheet(properties, props)),
    figure: (...properties: Sheet[]): React.Component => styled.figure(props => buildSheet(properties, props)),
    footer: (...properties: Sheet[]): React.Component => styled.footer(props => buildSheet(properties, props)),
    form: (...properties: Sheet[]): React.Component => styled.form(props => buildSheet(properties, props)),
    h1: (...properties: Sheet[]): React.Component => styled.h1(props => buildSheet(properties, props)),
    h2: (...properties: Sheet[]): React.Component => styled.h2(props => buildSheet(properties, props)),
    h3: (...properties: Sheet[]): React.Component => styled.h3(props => buildSheet(properties, props)),
    h4: (...properties: Sheet[]): React.Component => styled.h4(props => buildSheet(properties, props)),
    h5: (...properties: Sheet[]): React.Component => styled.h5(props => buildSheet(properties, props)),
    h6: (...properties: Sheet[]): React.Component => styled.h6(props => buildSheet(properties, props)),
    head: (...properties: Sheet[]): React.Component => styled.head(props => buildSheet(properties, props)),
    header: (...properties: Sheet[]): React.Component => styled.header(props => buildSheet(properties, props)),
    hgroup: (...properties: Sheet[]): React.Component => styled.hgroup(props => buildSheet(properties, props)),
    hr: (...properties: Sheet[]): React.Component => styled.hr(props => buildSheet(properties, props)),
    html: (...properties: Sheet[]): React.Component => styled.html(props => buildSheet(properties, props)),
    i: (...properties: Sheet[]): React.Component => styled.i(props => buildSheet(properties, props)),
    iframe: (...properties: Sheet[]): React.Component => styled.iframe(props => buildSheet(properties, props)),
    img: (...properties: Sheet[]): React.Component => styled.img(props => buildSheet(properties, props)),
    input: (...properties: Sheet[]): React.Component => styled.input(props => buildSheet(properties, props)),
    ins: (...properties: Sheet[]): React.Component => styled.ins(props => buildSheet(properties, props)),
    kbd: (...properties: Sheet[]): React.Component => styled.kbd(props => buildSheet(properties, props)),
    keygen: (...properties: Sheet[]): React.Component => styled.keygen(props => buildSheet(properties, props)),
    label: (...properties: Sheet[]): React.Component => styled.label(props => buildSheet(properties, props)),
    legend: (...properties: Sheet[]): React.Component => styled.legend(props => buildSheet(properties, props)),
    li: (...properties: Sheet[]): React.Component => styled.li(props => buildSheet(properties, props)),
    link: (...properties: Sheet[]): React.Component => styled.link(props => buildSheet(properties, props)),
    main: (...properties: Sheet[]): React.Component => styled.main(props => buildSheet(properties, props)),
    map: (...properties: Sheet[]): React.Component => styled.map(props => buildSheet(properties, props)),
    mark: (...properties: Sheet[]): React.Component => styled.mark(props => buildSheet(properties, props)),
    menu: (...properties: Sheet[]): React.Component => styled.menu(props => buildSheet(properties, props)),
    menuitem: (...properties: Sheet[]): React.Component => styled.menuitem(props => buildSheet(properties, props)),
    meta: (...properties: Sheet[]): React.Component => styled.meta(props => buildSheet(properties, props)),
    meter: (...properties: Sheet[]): React.Component => styled.meter(props => buildSheet(properties, props)),
    nav: (...properties: Sheet[]): React.Component => styled.nav(props => buildSheet(properties, props)),
    noindex: (...properties: Sheet[]): React.Component => styled.noindex(props => buildSheet(properties, props)),
    noscript: (...properties: Sheet[]): React.Component => styled.noscript(props => buildSheet(properties, props)),
    object: (...properties: Sheet[]): React.Component => styled.object(props => buildSheet(properties, props)),
    ol: (...properties: Sheet[]): React.Component => styled.ol(props => buildSheet(properties, props)),
    optgroup: (...properties: Sheet[]): React.Component => styled.optgroup(props => buildSheet(properties, props)),
    option: (...properties: Sheet[]): React.Component => styled.option(props => buildSheet(properties, props)),
    output: (...properties: Sheet[]): React.Component => styled.output(props => buildSheet(properties, props)),
    p: (...properties: Sheet[]): React.Component => styled.p(props => buildSheet(properties, props)),
    param: (...properties: Sheet[]): React.Component => styled.param(props => buildSheet(properties, props)),
    picture: (...properties: Sheet[]): React.Component => styled.picture(props => buildSheet(properties, props)),
    pre: (...properties: Sheet[]): React.Component => styled.pre(props => buildSheet(properties, props)),
    progress: (...properties: Sheet[]): React.Component => styled.progress(props => buildSheet(properties, props)),
    q: (...properties: Sheet[]): React.Component => styled.q(props => buildSheet(properties, props)),
    rp: (...properties: Sheet[]): React.Component => styled.rp(props => buildSheet(properties, props)),
    rt: (...properties: Sheet[]): React.Component => styled.rt(props => buildSheet(properties, props)),
    ruby: (...properties: Sheet[]): React.Component => styled.ruby(props => buildSheet(properties, props)),
    s: (...properties: Sheet[]): React.Component => styled.s(props => buildSheet(properties, props)),
    samp: (...properties: Sheet[]): React.Component => styled.samp(props => buildSheet(properties, props)),
    script: (...properties: Sheet[]): React.Component => styled.script(props => buildSheet(properties, props)),
    section: (...properties: Sheet[]): React.Component => styled.section(props => buildSheet(properties, props)),
    select: (...properties: Sheet[]): React.Component => styled.select(props => buildSheet(properties, props)),
    small: (...properties: Sheet[]): React.Component => styled.small(props => buildSheet(properties, props)),
    source: (...properties: Sheet[]): React.Component => styled.source(props => buildSheet(properties, props)),
    span: (...properties: Sheet[]): React.Component => styled.span(props => buildSheet(properties, props)),
    strong: (...properties: Sheet[]): React.Component => styled.strong(props => buildSheet(properties, props)),
    style: (...properties: Sheet[]): React.Component => styled.style(props => buildSheet(properties, props)),
    sub: (...properties: Sheet[]): React.Component => styled.sub(props => buildSheet(properties, props)),
    summary: (...properties: Sheet[]): React.Component => styled.summary(props => buildSheet(properties, props)),
    sup: (...properties: Sheet[]): React.Component => styled.sup(props => buildSheet(properties, props)),
    table: (...properties: Sheet[]): React.Component => styled.table(props => buildSheet(properties, props)),
    tbody: (...properties: Sheet[]): React.Component => styled.tbody(props => buildSheet(properties, props)),
    td: (...properties: Sheet[]): React.Component => styled.td(props => buildSheet(properties, props)),
    textarea: (...properties: Sheet[]): React.Component => styled.textarea(props => buildSheet(properties, props)),
    tfoot: (...properties: Sheet[]): React.Component => styled.tfoot(props => buildSheet(properties, props)),
    th: (...properties: Sheet[]): React.Component => styled.th(props => buildSheet(properties, props)),
    thead: (...properties: Sheet[]): React.Component => styled.thead(props => buildSheet(properties, props)),
    time: (...properties: Sheet[]): React.Component => styled.time(props => buildSheet(properties, props)),
    title: (...properties: Sheet[]): React.Component => styled.title(props => buildSheet(properties, props)),
    tr: (...properties: Sheet[]): React.Component => styled.tr(props => buildSheet(properties, props)),
    track: (...properties: Sheet[]): React.Component => styled.track(props => buildSheet(properties, props)),
    u: (...properties: Sheet[]): React.Component => styled.u(props => buildSheet(properties, props)),
    ul: (...properties: Sheet[]): React.Component => styled.ul(props => buildSheet(properties, props)),
    var: (...properties: Sheet[]): React.Component => styled.var(props => buildSheet(properties, props)),
    video: (...properties: Sheet[]): React.Component => styled.video(props => buildSheet(properties, props)),
    wbr: (...properties: Sheet[]): React.Component => styled.wbr(props => buildSheet(properties, props)),
    webview: (...properties: Sheet[]): React.Component => styled.webview(props => buildSheet(properties, props)),
    svg: (...properties: Sheet[]): React.Component => styled.svg(props => buildSheet(properties, props)),
    animate: (...properties: Sheet[]): React.Component => styled.animate(props => buildSheet(properties, props)),
    animateTransform: (...properties: Sheet[]): React.Component =>
        styled.animateTransform(props => buildSheet(properties, props)),
    circle: (...properties: Sheet[]): React.Component => styled.circle(props => buildSheet(properties, props)),
    clipPath: (...properties: Sheet[]): React.Component => styled.clipPath(props => buildSheet(properties, props)),
    defs: (...properties: Sheet[]): React.Component => styled.defs(props => buildSheet(properties, props)),
    desc: (...properties: Sheet[]): React.Component => styled.desc(props => buildSheet(properties, props)),
    ellipse: (...properties: Sheet[]): React.Component => styled.ellipse(props => buildSheet(properties, props)),
    feBlend: (...properties: Sheet[]): React.Component => styled.feBlend(props => buildSheet(properties, props)),
    feColorMatrix: (...properties: Sheet[]): React.Component =>
        styled.feColorMatrix(props => buildSheet(properties, props)),
    feComponentTransfer: (...properties: Sheet[]): React.Component =>
        styled.feComponentTransfer(props => buildSheet(properties, props)),
    feComposite: (...properties: Sheet[]): React.Component =>
        styled.feComposite(props => buildSheet(properties, props)),
    feConvolveMatrix: (...properties: Sheet[]): React.Component =>
        styled.feConvolveMatrix(props => buildSheet(properties, props)),
    feDiffuseLighting: (...properties: Sheet[]): React.Component =>
        styled.feDiffuseLighting(props => buildSheet(properties, props)),
    feDisplacementMap: (...properties: Sheet[]): React.Component =>
        styled.feDisplacementMap(props => buildSheet(properties, props)),
    feDistantLight: (...properties: Sheet[]): React.Component =>
        styled.feDistantLight(props => buildSheet(properties, props)),
    feFlood: (...properties: Sheet[]): React.Component => styled.feFlood(props => buildSheet(properties, props)),
    feFuncA: (...properties: Sheet[]): React.Component => styled.feFuncA(props => buildSheet(properties, props)),
    feFuncB: (...properties: Sheet[]): React.Component => styled.feFuncB(props => buildSheet(properties, props)),
    feFuncG: (...properties: Sheet[]): React.Component => styled.feFuncG(props => buildSheet(properties, props)),
    feFuncR: (...properties: Sheet[]): React.Component => styled.feFuncR(props => buildSheet(properties, props)),
    feGaussianBlur: (...properties: Sheet[]): React.Component =>
        styled.feGaussianBlur(props => buildSheet(properties, props)),
    feImage: (...properties: Sheet[]): React.Component => styled.feImage(props => buildSheet(properties, props)),
    feMerge: (...properties: Sheet[]): React.Component => styled.feMerge(props => buildSheet(properties, props)),
    feMergeNode: (...properties: Sheet[]): React.Component =>
        styled.feMergeNode(props => buildSheet(properties, props)),
    feMorphology: (...properties: Sheet[]): React.Component =>
        styled.feMorphology(props => buildSheet(properties, props)),
    feOffset: (...properties: Sheet[]): React.Component => styled.feOffset(props => buildSheet(properties, props)),
    fePointLight: (...properties: Sheet[]): React.Component =>
        styled.fePointLight(props => buildSheet(properties, props)),
    feSpecularLighting: (...properties: Sheet[]): React.Component =>
        styled.feSpecularLighting(props => buildSheet(properties, props)),
    feSpotLight: (...properties: Sheet[]): React.Component =>
        styled.feSpotLight(props => buildSheet(properties, props)),
    feTile: (...properties: Sheet[]): React.Component => styled.feTile(props => buildSheet(properties, props)),
    feTurbulence: (...properties: Sheet[]): React.Component =>
        styled.feTurbulence(props => buildSheet(properties, props)),
    filter: (...properties: Sheet[]): React.Component => styled.filter(props => buildSheet(properties, props)),
    foreignObject: (...properties: Sheet[]): React.Component =>
        styled.foreignObject(props => buildSheet(properties, props)),
    g: (...properties: Sheet[]): React.Component => styled.g(props => buildSheet(properties, props)),
    image: (...properties: Sheet[]): React.Component => styled.image(props => buildSheet(properties, props)),
    line: (...properties: Sheet[]): React.Component => styled.line(props => buildSheet(properties, props)),
    linearGradient: (...properties: Sheet[]): React.Component =>
        styled.linearGradient(props => buildSheet(properties, props)),
    marker: (...properties: Sheet[]): React.Component => styled.marker(props => buildSheet(properties, props)),
    mask: (...properties: Sheet[]): React.Component => styled.mask(props => buildSheet(properties, props)),
    metadata: (...properties: Sheet[]): React.Component => styled.metadata(props => buildSheet(properties, props)),
    path: (...properties: Sheet[]): React.Component => styled.path(props => buildSheet(properties, props)),
    pattern: (...properties: Sheet[]): React.Component => styled.pattern(props => buildSheet(properties, props)),
    polygon: (...properties: Sheet[]): React.Component => styled.polygon(props => buildSheet(properties, props)),
    polyline: (...properties: Sheet[]): React.Component => styled.polyline(props => buildSheet(properties, props)),
    radialGradient: (...properties: Sheet[]): React.Component =>
        styled.radialGradient(props => buildSheet(properties, props)),
    rect: (...properties: Sheet[]): React.Component => styled.rect(props => buildSheet(properties, props)),
    stop: (...properties: Sheet[]): React.Component => styled.stop(props => buildSheet(properties, props)),
    switch: (...properties: Sheet[]): React.Component => styled.switch(props => buildSheet(properties, props)),
    symbol: (...properties: Sheet[]): React.Component => styled.symbol(props => buildSheet(properties, props)),
    text: (...properties: Sheet[]): React.Component => styled.text(props => buildSheet(properties, props)),
    textPath: (...properties: Sheet[]): React.Component => styled.textPath(props => buildSheet(properties, props)),
    tspan: (...properties: Sheet[]): React.Component => styled.tspan(props => buildSheet(properties, props)),
    use: (...properties: Sheet[]): React.Component => styled.use(props => buildSheet(properties, props)),
    view: (...properties: Sheet[]): React.Component => styled.view(props => buildSheet(properties, props))
};
