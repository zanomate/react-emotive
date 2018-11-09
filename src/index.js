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

function isFunction(obj) {
    return {}.toString.call(obj) === '[object Function]';
}

function toArray(obj) {
    return Array.isArray(obj) ? obj : [obj];
}

// Component
const component = (styledFunction) => {
    return (...styles) => class extends React.Component {

        constructor(props) {
            super(props);
        }

        applyProps(styles) {

            const toBeResolved = toArray(styles);
            const toBeFurtherAnalyze = [];

            // Apply props at this level
            toBeResolved.map(style => {
                if (isFunction(style)) {
                    const computed = style(this.props);
                    toBeFurtherAnalyze.push(...toArray(computed));
                }
                else {
                    toBeFurtherAnalyze.push(style);
                }
            });

            // Apply recursively
            toBeFurtherAnalyze.map(style => {
                Object.keys(style).map(key => {
                    style[key] = this.applyProps(style[key]);
                });
                return style;
            });

            return toBeFurtherAnalyze;
        }

        render() {
            const filteredStyles = this.applyProps(styles);
            return styledFunction(
                Css.sheet(...this.applyProps(styles))
            );
        }
    };
};

// Media
export const Media = (query) => {
    return (...styles) => {
        const mqStyle = {[query]: [styles]};
    };
};

// Pseudo
export const Pseudo = (selector) => {
    return (...styles) => {
        const mqStyle = {[selector]: [styles]};
    };
};

// Styled
export const Styled = {
    component: component,
    a: (...properties) => component(styled.a)(...properties),
    abbr: (...properties) => component(styled.abbr)(...properties),
    address: (...properties) => component(styled.address)(...properties),
    area: (...properties) => component(styled.area)(...properties),
    article: (...properties) => component(styled.article)(...properties),
    aside: (...properties) => component(styled.aside)(...properties),
    audio: (...properties) => component(styled.audio)(...properties),
    b: (...properties) => component(styled.b)(...properties),
    base: (...properties) => component(styled.base)(...properties),
    bdi: (...properties) => component(styled.bdi)(...properties),
    bdo: (...properties) => component(styled.bdo)(...properties),
    big: (...properties) => component(styled.big)(...properties),
    blockquote: (...properties) => component(styled.blockquote)(...properties),
    body: (...properties) => component(styled.body)(...properties),
    br: (...properties) => component(styled.br)(...properties),
    button: (...properties) => component(styled.button)(...properties),
    canvas: (...properties) => component(styled.canvas)(...properties),
    caption: (...properties) => component(styled.caption)(...properties),
    cite: (...properties) => component(styled.cite)(...properties),
    code: (...properties) => component(styled.code)(...properties),
    col: (...properties) => component(styled.col)(...properties),
    colgroup: (...properties) => component(styled.colgroup)(...properties),
    data: (...properties) => component(styled.data)(...properties),
    datalist: (...properties) => component(styled.datalist)(...properties),
    dd: (...properties) => component(styled.dd)(...properties),
    del: (...properties) => component(styled.del)(...properties),
    details: (...properties) => component(styled.details)(...properties),
    dfn: (...properties) => component(styled.dfn)(...properties),
    dialog: (...properties) => component(styled.dialog)(...properties),
    div: (...properties) => component(styled.div)(...properties),
    dl: (...properties) => component(styled.dl)(...properties),
    dt: (...properties) => component(styled.dt)(...properties),
    em: (...properties) => component(styled.em)(...properties),
    embed: (...properties) => component(styled.embed)(...properties),
    fieldset: (...properties) => component(styled.fieldset)(...properties),
    figcaption: (...properties) => component(styled.figcaption)(...properties),
    figure: (...properties) => component(styled.figure)(...properties),
    footer: (...properties) => component(styled.footer)(...properties),
    form: (...properties) => component(styled.form)(...properties),
    h1: (...properties) => component(styled.h1)(...properties),
    h2: (...properties) => component(styled.h2)(...properties),
    h3: (...properties) => component(styled.h3)(...properties),
    h4: (...properties) => component(styled.h4)(...properties),
    h5: (...properties) => component(styled.h5)(...properties),
    h6: (...properties) => component(styled.h6)(...properties),
    head: (...properties) => component(styled.head)(...properties),
    header: (...properties) => component(styled.header)(...properties),
    hgroup: (...properties) => component(styled.hgroup)(...properties),
    hr: (...properties) => component(styled.hr)(...properties),
    html: (...properties) => component(styled.html)(...properties),
    i: (...properties) => component(styled.i)(...properties),
    iframe: (...properties) => component(styled.iframe)(...properties),
    img: (...properties) => component(styled.img)(...properties),
    input: (...properties) => component(styled.input)(...properties),
    ins: (...properties) => component(styled.ins)(...properties),
    kbd: (...properties) => component(styled.kbd)(...properties),
    keygen: (...properties) => component(styled.keygen)(...properties),
    label: (...properties) => component(styled.label)(...properties),
    legend: (...properties) => component(styled.legend)(...properties),
    li: (...properties) => component(styled.li)(...properties),
    link: (...properties) => component(styled.link)(...properties),
    main: (...properties) => component(styled.main)(...properties),
    map: (...properties) => component(styled.map)(...properties),
    mark: (...properties) => component(styled.mark)(...properties),
    menu: (...properties) => component(styled.menu)(...properties),
    menuitem: (...properties) => component(styled.menuitem)(...properties),
    meta: (...properties) => component(styled.meta)(...properties),
    meter: (...properties) => component(styled.meter)(...properties),
    nav: (...properties) => component(styled.nav)(...properties),
    noindex: (...properties) => component(styled.noindex)(...properties),
    noscript: (...properties) => component(styled.noscript)(...properties),
    object: (...properties) => component(styled.object)(...properties),
    ol: (...properties) => component(styled.ol)(...properties),
    optgroup: (...properties) => component(styled.optgroup)(...properties),
    option: (...properties) => component(styled.option)(...properties),
    output: (...properties) => component(styled.output)(...properties),
    p: (...properties) => component(styled.p)(...properties),
    param: (...properties) => component(styled.param)(...properties),
    picture: (...properties) => component(styled.picture)(...properties),
    pre: (...properties) => component(styled.pre)(...properties),
    progress: (...properties) => component(styled.progress)(...properties),
    q: (...properties) => component(styled.q)(...properties),
    rp: (...properties) => component(styled.rp)(...properties),
    rt: (...properties) => component(styled.rt)(...properties),
    ruby: (...properties) => component(styled.ruby)(...properties),
    s: (...properties) => component(styled.s)(...properties),
    samp: (...properties) => component(styled.samp)(...properties),
    script: (...properties) => component(styled.script)(...properties),
    section: (...properties) => component(styled.section)(...properties),
    select: (...properties) => component(styled.select)(...properties),
    small: (...properties) => component(styled.small)(...properties),
    source: (...properties) => component(styled.source)(...properties),
    span: (...properties) => component(styled.span)(...properties),
    strong: (...properties) => component(styled.strong)(...properties),
    style: (...properties) => component(styled.style)(...properties),
    sub: (...properties) => component(styled.sub)(...properties),
    summary: (...properties) => component(styled.summary)(...properties),
    sup: (...properties) => component(styled.sup)(...properties),
    table: (...properties) => component(styled.table)(...properties),
    tbody: (...properties) => component(styled.tbody)(...properties),
    td: (...properties) => component(styled.td)(...properties),
    textarea: (...properties) => component(styled.textarea)(...properties),
    tfoot: (...properties) => component(styled.tfoot)(...properties),
    th: (...properties) => component(styled.th)(...properties),
    thead: (...properties) => component(styled.thead)(...properties),
    time: (...properties) => component(styled.time)(...properties),
    title: (...properties) => component(styled.title)(...properties),
    tr: (...properties) => component(styled.tr)(...properties),
    track: (...properties) => component(styled.track)(...properties),
    u: (...properties) => component(styled.u)(...properties),
    ul: (...properties) => component(styled.ul)(...properties),
    var: (...properties) => component(styled.var)(...properties),
    video: (...properties) => component(styled.video)(...properties),
    wbr: (...properties) => component(styled.wbr)(...properties),
    webview: (...properties) => component(styled.webview)(...properties),
    // SVG
    svg: (...properties) => component(styled.svg)(...properties),
    animate: (...properties) => component(styled.animate)(...properties),
    animateTransform: (...properties) => component(styled.animateTransform)(...properties),
    circle: (...properties) => component(styled.circle)(...properties),
    clipPath: (...properties) => component(styled.clipPath)(...properties),
    defs: (...properties) => component(styled.defs)(...properties),
    desc: (...properties) => component(styled.desc)(...properties),
    ellipse: (...properties) => component(styled.ellipse)(...properties),
    feBlend: (...properties) => component(styled.feBlend)(...properties),
    feColorMatrix: (...properties) => component(styled.feColorMatrix)(...properties),
    feComponentTransfer: (...properties) => component(styled.feComponentTransfer)(...properties),
    feComposite: (...properties) => component(styled.feComposite)(...properties),
    feConvolveMatrix: (...properties) => component(styled.feConvolveMatrix)(...properties),
    feDiffuseLighting: (...properties) => component(styled.feDiffuseLighting)(...properties),
    feDisplacementMap: (...properties) => component(styled.feDisplacementMap)(...properties),
    feDistantLight: (...properties) => component(styled.feDistantLight)(...properties),
    feFlood: (...properties) => component(styled.feFlood)(...properties),
    feFuncA: (...properties) => component(styled.feFuncA)(...properties),
    feFuncB: (...properties) => component(styled.feFuncB)(...properties),
    feFuncG: (...properties) => component(styled.feFuncG)(...properties),
    feFuncR: (...properties) => component(styled.feFuncR)(...properties),
    feGaussianBlur: (...properties) => component(styled.feGaussianBlur)(...properties),
    feImage: (...properties) => component(styled.feImage)(...properties),
    feMerge: (...properties) => component(styled.feMerge)(...properties),
    feMergeNode: (...properties) => component(styled.feMergeNode)(...properties),
    feMorphology: (...properties) => component(styled.feMorphology)(...properties),
    feOffset: (...properties) => component(styled.feOffset)(...properties),
    fePointLight: (...properties) => component(styled.fePointLight)(...properties),
    feSpecularLighting: (...properties) => component(styled.feSpecularLighting)(...properties),
    feSpotLight: (...properties) => component(styled.feSpotLight)(...properties),
    feTile: (...properties) => component(styled.feTile)(...properties),
    feTurbulence: (...properties) => component(styled.feTurbulence)(...properties),
    filter: (...properties) => component(styled.filter)(...properties),
    foreignObject: (...properties) => component(styled.foreignObject)(...properties),
    g: (...properties) => component(styled.g)(...properties),
    image: (...properties) => component(styled.image)(...properties),
    line: (...properties) => component(styled.line)(...properties),
    linearGradient: (...properties) => component(styled.linearGradient)(...properties),
    marker: (...properties) => component(styled.marker)(...properties),
    mask: (...properties) => component(styled.mask)(...properties),
    metadata: (...properties) => component(styled.metadata)(...properties),
    path: (...properties) => component(styled.path)(...properties),
    pattern: (...properties) => component(styled.pattern)(...properties),
    polygon: (...properties) => component(styled.polygon)(...properties),
    polyline: (...properties) => component(styled.polyline)(...properties),
    radialGradient: (...properties) => component(styled.radialGradient)(...properties),
    rect: (...properties) => component(styled.rect)(...properties),
    stop: (...properties) => component(styled.stop)(...properties),
    switch: (...properties) => component(styled.switch)(...properties),
    symbol: (...properties) => component(styled.symbol)(...properties),
    text: (...properties) => component(styled.text)(...properties),
    textPath: (...properties) => component(styled.textPath)(...properties),
    tspan: (...properties) => component(styled.tspan)(...properties),
    use: (...properties) => component(styled.use)(...properties),
    view: (...properties) => component(styled.view)(...properties)
};
