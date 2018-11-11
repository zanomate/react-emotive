import * as Emotive from 'emotive';
// import filterInvalidDOMProps from 'filter-invalid-dom-props';
import React from 'react';
import styled from 'styled-components';

// Emotive re-export
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
export const Pseudo = Emotive.Pseudo;
export const Element = Emotive.Element;

class Condition {
    constructor(condition, styles) {
        this.condition = condition;
        this.styles = styles;
    }
}

function isFunction(obj) {
    return {}.toString.call(obj) === '[object Function]';
}

function toArray(obj) {
    return Array.isArray(obj) ? obj : [obj];
}

// Component
const buildSheet = (styles, props) => {

    const applyProps = (styles) => {

        const toBeResolved = toArray(styles);
        const toBeFurtherAnalyze = [];

        // Apply props at this level
        toBeResolved.map(style => {
            if (isFunction(style)) {
                const computed = style(props);
                toBeFurtherAnalyze.push(...toArray(computed));
            }
            else {
                toBeFurtherAnalyze.push(style);
            }
        });

        // Apply recursively
        const resolvedStyles = toBeFurtherAnalyze.map(style => {

            if (style instanceof Condition) {
                return {[style.condition]: Css.sheet(...applyProps(style.styles))};
            }
            else {
                return style;
            }
        });

        return resolvedStyles;
    };

    const sheet = Css.sheet(...applyProps(styles));
    console.log(sheet);
    return sheet;
};

// &
export function Selector(selector) {
    return (...styles) => new Condition(selector, styles);
}

// @media
export function Media(query) {
    return (...styles) => new Condition('@media ' + query, styles);
}

// Styled
export const Styled = {
    component: (base) => ((...properties) => styled(base)(buildSheet(properties))),
    // HTML
    a: (...properties) => styled.a(props => buildSheet(properties, props)),
    abbr: (...properties) => styled.abbr(props => buildSheet(properties, props)),
    address: (...properties) => styled.address(props => buildSheet(properties, props)),
    area: (...properties) => styled.area(props => buildSheet(properties, props)),
    article: (...properties) => styled.article(props => buildSheet(properties, props)),
    aside: (...properties) => styled.aside(props => buildSheet(properties, props)),
    audio: (...properties) => styled.audio(props => buildSheet(properties, props)),
    b: (...properties) => styled.b(props => buildSheet(properties, props)),
    base: (...properties) => styled.base(props => buildSheet(properties, props)),
    bdi: (...properties) => styled.bdi(props => buildSheet(properties, props)),
    bdo: (...properties) => styled.bdo(props => buildSheet(properties, props)),
    big: (...properties) => styled.big(props => buildSheet(properties, props)),
    blockquote: (...properties) => styled.blockquote(props => buildSheet(properties, props)),
    body: (...properties) => styled.body(props => buildSheet(properties, props)),
    br: (...properties) => styled.br(props => buildSheet(properties, props)),
    button: (...properties) => styled.button(props => buildSheet(properties, props)),
    canvas: (...properties) => styled.canvas(props => buildSheet(properties, props)),
    caption: (...properties) => styled.caption(props => buildSheet(properties, props)),
    cite: (...properties) => styled.cite(props => buildSheet(properties, props)),
    code: (...properties) => styled.code(props => buildSheet(properties, props)),
    col: (...properties) => styled.col(props => buildSheet(properties, props)),
    colgroup: (...properties) => styled.colgroup(props => buildSheet(properties, props)),
    data: (...properties) => styled.data(props => buildSheet(properties, props)),
    datalist: (...properties) => styled.datalist(props => buildSheet(properties, props)),
    dd: (...properties) => styled.dd(props => buildSheet(properties, props)),
    del: (...properties) => styled.del(props => buildSheet(properties, props)),
    details: (...properties) => styled.details(props => buildSheet(properties, props)),
    dfn: (...properties) => styled.dfn(props => buildSheet(properties, props)),
    dialog: (...properties) => styled.dialog(props => buildSheet(properties, props)),
    div: (...properties) => styled.div(props => buildSheet(properties, props)),
    dl: (...properties) => styled.dl(props => buildSheet(properties, props)),
    dt: (...properties) => styled.dt(props => buildSheet(properties, props)),
    em: (...properties) => styled.em(props => buildSheet(properties, props)),
    embed: (...properties) => styled.embed(props => buildSheet(properties, props)),
    fieldset: (...properties) => styled.fieldset(props => buildSheet(properties, props)),
    figcaption: (...properties) => styled.figcaption(props => buildSheet(properties, props)),
    figure: (...properties) => styled.figure(props => buildSheet(properties, props)),
    footer: (...properties) => styled.footer(props => buildSheet(properties, props)),
    form: (...properties) => styled.form(props => buildSheet(properties, props)),
    h1: (...properties) => styled.h1(props => buildSheet(properties, props)),
    h2: (...properties) => styled.h2(props => buildSheet(properties, props)),
    h3: (...properties) => styled.h3(props => buildSheet(properties, props)),
    h4: (...properties) => styled.h4(props => buildSheet(properties, props)),
    h5: (...properties) => styled.h5(props => buildSheet(properties, props)),
    h6: (...properties) => styled.h6(props => buildSheet(properties, props)),
    head: (...properties) => styled.head(props => buildSheet(properties, props)),
    header: (...properties) => styled.header(props => buildSheet(properties, props)),
    hgroup: (...properties) => styled.hgroup(props => buildSheet(properties, props)),
    hr: (...properties) => styled.hr(props => buildSheet(properties, props)),
    html: (...properties) => styled.html(props => buildSheet(properties, props)),
    i: (...properties) => styled.i(props => buildSheet(properties, props)),
    iframe: (...properties) => styled.iframe(props => buildSheet(properties, props)),
    img: (...properties) => styled.img(props => buildSheet(properties, props)),
    input: (...properties) => styled.input(props => buildSheet(properties, props)),
    ins: (...properties) => styled.ins(props => buildSheet(properties, props)),
    kbd: (...properties) => styled.kbd(props => buildSheet(properties, props)),
    keygen: (...properties) => styled.keygen(props => buildSheet(properties, props)),
    label: (...properties) => styled.label(props => buildSheet(properties, props)),
    legend: (...properties) => styled.legend(props => buildSheet(properties, props)),
    li: (...properties) => styled.li(props => buildSheet(properties, props)),
    link: (...properties) => styled.link(props => buildSheet(properties, props)),
    main: (...properties) => styled.main(props => buildSheet(properties, props)),
    map: (...properties) => styled.map(props => buildSheet(properties, props)),
    mark: (...properties) => styled.mark(props => buildSheet(properties, props)),
    menu: (...properties) => styled.menu(props => buildSheet(properties, props)),
    menuitem: (...properties) => styled.menuitem(props => buildSheet(properties, props)),
    meta: (...properties) => styled.meta(props => buildSheet(properties, props)),
    meter: (...properties) => styled.meter(props => buildSheet(properties, props)),
    nav: (...properties) => styled.nav(props => buildSheet(properties, props)),
    noindex: (...properties) => styled.noindex(props => buildSheet(properties, props)),
    noscript: (...properties) => styled.noscript(props => buildSheet(properties, props)),
    object: (...properties) => styled.object(props => buildSheet(properties, props)),
    ol: (...properties) => styled.ol(props => buildSheet(properties, props)),
    optgroup: (...properties) => styled.optgroup(props => buildSheet(properties, props)),
    option: (...properties) => styled.option(props => buildSheet(properties, props)),
    output: (...properties) => styled.output(props => buildSheet(properties, props)),
    p: (...properties) => styled.p(props => buildSheet(properties, props)),
    param: (...properties) => styled.param(props => buildSheet(properties, props)),
    picture: (...properties) => styled.picture(props => buildSheet(properties, props)),
    pre: (...properties) => styled.pre(props => buildSheet(properties, props)),
    progress: (...properties) => styled.progress(props => buildSheet(properties, props)),
    q: (...properties) => styled.q(props => buildSheet(properties, props)),
    rp: (...properties) => styled.rp(props => buildSheet(properties, props)),
    rt: (...properties) => styled.rt(props => buildSheet(properties, props)),
    ruby: (...properties) => styled.ruby(props => buildSheet(properties, props)),
    s: (...properties) => styled.s(props => buildSheet(properties, props)),
    samp: (...properties) => styled.samp(props => buildSheet(properties, props)),
    script: (...properties) => styled.script(props => buildSheet(properties, props)),
    section: (...properties) => styled.section(props => buildSheet(properties, props)),
    select: (...properties) => styled.select(props => buildSheet(properties, props)),
    small: (...properties) => styled.small(props => buildSheet(properties, props)),
    source: (...properties) => styled.source(props => buildSheet(properties, props)),
    span: (...properties) => styled.span(props => buildSheet(properties, props)),
    strong: (...properties) => styled.strong(props => buildSheet(properties, props)),
    style: (...properties) => styled.style(props => buildSheet(properties, props)),
    sub: (...properties) => styled.sub(props => buildSheet(properties, props)),
    summary: (...properties) => styled.summary(props => buildSheet(properties, props)),
    sup: (...properties) => styled.sup(props => buildSheet(properties, props)),
    table: (...properties) => styled.table(props => buildSheet(properties, props)),
    tbody: (...properties) => styled.tbody(props => buildSheet(properties, props)),
    td: (...properties) => styled.td(props => buildSheet(properties, props)),
    textarea: (...properties) => styled.textarea(props => buildSheet(properties, props)),
    tfoot: (...properties) => styled.tfoot(props => buildSheet(properties, props)),
    th: (...properties) => styled.th(props => buildSheet(properties, props)),
    thead: (...properties) => styled.thead(props => buildSheet(properties, props)),
    time: (...properties) => styled.time(props => buildSheet(properties, props)),
    title: (...properties) => styled.title(props => buildSheet(properties, props)),
    tr: (...properties) => styled.tr(props => buildSheet(properties, props)),
    track: (...properties) => styled.track(props => buildSheet(properties, props)),
    u: (...properties) => styled.u(props => buildSheet(properties, props)),
    ul: (...properties) => styled.ul(props => buildSheet(properties, props)),
    var: (...properties) => styled.var(props => buildSheet(properties, props)),
    video: (...properties) => styled.video(props => buildSheet(properties, props)),
    wbr: (...properties) => styled.wbr(props => buildSheet(properties, props)),
    webview: (...properties) => styled.webview(props => buildSheet(properties, props)),

    //SVG
    svg: (...properties) => styled.svg(props => buildSheet(properties, props)),
    animate: (...properties) => styled.animate(props => buildSheet(properties, props)),
    animateTransform: (...properties) => styled.animateTransform(props => buildSheet(properties, props)),
    circle: (...properties) => styled.circle(props => buildSheet(properties, props)),
    clipPath: (...properties) => styled.clipPath(props => buildSheet(properties, props)),
    defs: (...properties) => styled.defs(props => buildSheet(properties, props)),
    desc: (...properties) => styled.desc(props => buildSheet(properties, props)),
    ellipse: (...properties) => styled.ellipse(props => buildSheet(properties, props)),
    feBlend: (...properties) => styled.feBlend(props => buildSheet(properties, props)),
    feColorMatrix: (...properties) => styled.feColorMatrix(props => buildSheet(properties, props)),
    feComponentTransfer: (...properties) => styled.feComponentTransfer(props => buildSheet(properties, props)),
    feComposite: (...properties) => styled.feComposite(props => buildSheet(properties, props)),
    feConvolveMatrix: (...properties) => styled.feConvolveMatrix(props => buildSheet(properties, props)),
    feDiffuseLighting: (...properties) => styled.feDiffuseLighting(props => buildSheet(properties, props)),
    feDisplacementMap: (...properties) => styled.feDisplacementMap(props => buildSheet(properties, props)),
    feDistantLight: (...properties) => styled.feDistantLight(props => buildSheet(properties, props)),
    feFlood: (...properties) => styled.feFlood(props => buildSheet(properties, props)),
    feFuncA: (...properties) => styled.feFuncA(props => buildSheet(properties, props)),
    feFuncB: (...properties) => styled.feFuncB(props => buildSheet(properties, props)),
    feFuncG: (...properties) => styled.feFuncG(props => buildSheet(properties, props)),
    feFuncR: (...properties) => styled.feFuncR(props => buildSheet(properties, props)),
    feGaussianBlur: (...properties) => styled.feGaussianBlur(props => buildSheet(properties, props)),
    feImage: (...properties) => styled.feImage(props => buildSheet(properties, props)),
    feMerge: (...properties) => styled.feMerge(props => buildSheet(properties, props)),
    feMergeNode: (...properties) => styled.feMergeNode(props => buildSheet(properties, props)),
    feMorphology: (...properties) => styled.feMorphology(props => buildSheet(properties, props)),
    feOffset: (...properties) => styled.feOffset(props => buildSheet(properties, props)),
    fePointLight: (...properties) => styled.fePointLight(props => buildSheet(properties, props)),
    feSpecularLighting: (...properties) => styled.feSpecularLighting(props => buildSheet(properties, props)),
    feSpotLight: (...properties) => styled.feSpotLight(props => buildSheet(properties, props)),
    feTile: (...properties) => styled.feTile(props => buildSheet(properties, props)),
    feTurbulence: (...properties) => styled.feTurbulence(props => buildSheet(properties, props)),
    filter: (...properties) => styled.filter(props => buildSheet(properties, props)),
    foreignObject: (...properties) => styled.foreignObject(props => buildSheet(properties, props)),
    g: (...properties) => styled.g(props => buildSheet(properties, props)),
    image: (...properties) => styled.image(props => buildSheet(properties, props)),
    line: (...properties) => styled.line(props => buildSheet(properties, props)),
    linearGradient: (...properties) => styled.linearGradient(props => buildSheet(properties, props)),
    marker: (...properties) => styled.marker(props => buildSheet(properties, props)),
    mask: (...properties) => styled.mask(props => buildSheet(properties, props)),
    metadata: (...properties) => styled.metadata(props => buildSheet(properties, props)),
    path: (...properties) => styled.path(props => buildSheet(properties, props)),
    pattern: (...properties) => styled.pattern(props => buildSheet(properties, props)),
    polygon: (...properties) => styled.polygon(props => buildSheet(properties, props)),
    polyline: (...properties) => styled.polyline(props => buildSheet(properties, props)),
    radialGradient: (...properties) => styled.radialGradient(props => buildSheet(properties, props)),
    rect: (...properties) => styled.rect(props => buildSheet(properties, props)),
    stop: (...properties) => styled.stop(props => buildSheet(properties, props)),
    switch: (...properties) => styled.switch(props => buildSheet(properties, props)),
    symbol: (...properties) => styled.symbol(props => buildSheet(properties, props)),
    text: (...properties) => styled.text(props => buildSheet(properties, props)),
    textPath: (...properties) => styled.textPath(props => buildSheet(properties, props)),
    tspan: (...properties) => styled.tspan(props => buildSheet(properties, props)),
    use: (...properties) => styled.use(props => buildSheet(properties, props)),
    view: (...properties) => styled.view(buildSheet(properties))
};
