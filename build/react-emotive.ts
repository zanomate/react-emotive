import * as Emotive from "emotive";
import filterInvalidDOMProps from "filter-invalid-dom-props";
import { ComponentClass, createElement } from "react";

export type Param = Emotive.Param;
export type Sheet = Emotive.Sheet;

export const Css = Emotive.Css;
export const sheet = Css.sheet;
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

type PropsType = { [name: string]: any };
type SheetAsArrow = (name: PropsType) => Sheet | Sheet[];
export type PropertyType = Sheet | SheetAsArrow;

function component(elementType: string | ComponentClass, ...properties: PropertyType[]) {
    return (props: { [name: string]: any }) => {
        let { style, ...otherProps } = props;

        let styleProps: Sheet[] = [];
        properties.map(property => {
            const isFunction = property && {}.toString.call(property) === "[object Function]";
            if (isFunction) {
                const computedProperty = (<SheetAsArrow>property)(props);
                if (Array.isArray(computedProperty)) {
                    styleProps.push(...(<Sheet[]>computedProperty));
                } else {
                    styleProps.push(<Sheet>computedProperty);
                }
            } else {
                styleProps.push(<Sheet>property);
            }
        });
        if (style) {
            styleProps.push(style);
        }

        const emotiveStyle = sheet(...styleProps);
        const domProps = filterInvalidDOMProps(otherProps);
        return createElement<any>(elementType, { style: emotiveStyle, ...domProps }, props.children);
    };
}
export const Styled = {
    component: component,
    a: (...properties: PropertyType[]): any => {
        return component("a", ...properties);
    },
    abbr: (...properties: PropertyType[]): any => {
        return component("abbr", ...properties);
    },
    acronym: (...properties: PropertyType[]): any => {
        return component("acronym", ...properties);
    },
    address: (...properties: PropertyType[]): any => {
        return component("address", ...properties);
    },
    applet: (...properties: PropertyType[]): any => {
        return component("applet", ...properties);
    },
    area: (...properties: PropertyType[]): any => {
        return component("area", ...properties);
    },
    article: (...properties: PropertyType[]): any => {
        return component("article", ...properties);
    },
    aside: (...properties: PropertyType[]): any => {
        return component("aside", ...properties);
    },
    audio: (...properties: PropertyType[]): any => {
        return component("audio", ...properties);
    },
    b: (...properties: PropertyType[]): any => {
        return component("b", ...properties);
    },
    base: (...properties: PropertyType[]): any => {
        return component("base", ...properties);
    },
    basefont: (...properties: PropertyType[]): any => {
        return component("basefont", ...properties);
    },
    bdi: (...properties: PropertyType[]): any => {
        return component("bdi", ...properties);
    },
    bdo: (...properties: PropertyType[]): any => {
        return component("bdo", ...properties);
    },
    big: (...properties: PropertyType[]): any => {
        return component("big", ...properties);
    },
    blockquote: (...properties: PropertyType[]): any => {
        return component("blockquote", ...properties);
    },
    body: (...properties: PropertyType[]): any => {
        return component("body", ...properties);
    },
    br: (...properties: PropertyType[]): any => {
        return component("br", ...properties);
    },
    button: (...properties: PropertyType[]): any => {
        return component("button", ...properties);
    },
    canvas: (...properties: PropertyType[]): any => {
        return component("canvas", ...properties);
    },
    caption: (...properties: PropertyType[]): any => {
        return component("caption", ...properties);
    },
    center: (...properties: PropertyType[]): any => {
        return component("center", ...properties);
    },
    cite: (...properties: PropertyType[]): any => {
        return component("cite", ...properties);
    },
    code: (...properties: PropertyType[]): any => {
        return component("code", ...properties);
    },
    col: (...properties: PropertyType[]): any => {
        return component("col", ...properties);
    },
    colgroup: (...properties: PropertyType[]): any => {
        return component("colgroup", ...properties);
    },
    data: (...properties: PropertyType[]): any => {
        return component("data", ...properties);
    },
    datalist: (...properties: PropertyType[]): any => {
        return component("datalist", ...properties);
    },
    dd: (...properties: PropertyType[]): any => {
        return component("dd", ...properties);
    },
    del: (...properties: PropertyType[]): any => {
        return component("del", ...properties);
    },
    details: (...properties: PropertyType[]): any => {
        return component("details", ...properties);
    },
    dfn: (...properties: PropertyType[]): any => {
        return component("dfn", ...properties);
    },
    dialog: (...properties: PropertyType[]): any => {
        return component("dialog", ...properties);
    },
    dir: (...properties: PropertyType[]): any => {
        return component("dir", ...properties);
    },
    div: (...properties: PropertyType[]): any => {
        return component("div", ...properties);
    },
    dl: (...properties: PropertyType[]): any => {
        return component("dl", ...properties);
    },
    dt: (...properties: PropertyType[]): any => {
        return component("dt", ...properties);
    },
    em: (...properties: PropertyType[]): any => {
        return component("em", ...properties);
    },
    embed: (...properties: PropertyType[]): any => {
        return component("embed", ...properties);
    },
    fieldset: (...properties: PropertyType[]): any => {
        return component("fieldset", ...properties);
    },
    figcaption: (...properties: PropertyType[]): any => {
        return component("figcaption", ...properties);
    },
    figure: (...properties: PropertyType[]): any => {
        return component("figure", ...properties);
    },
    font: (...properties: PropertyType[]): any => {
        return component("font", ...properties);
    },
    footer: (...properties: PropertyType[]): any => {
        return component("footer", ...properties);
    },
    form: (...properties: PropertyType[]): any => {
        return component("form", ...properties);
    },
    frame: (...properties: PropertyType[]): any => {
        return component("frame", ...properties);
    },
    frameset: (...properties: PropertyType[]): any => {
        return component("frameset", ...properties);
    },
    h1: (...properties: PropertyType[]): any => {
        return component("h1", ...properties);
    },
    head: (...properties: PropertyType[]): any => {
        return component("head", ...properties);
    },
    header: (...properties: PropertyType[]): any => {
        return component("header", ...properties);
    },
    hr: (...properties: PropertyType[]): any => {
        return component("hr", ...properties);
    },
    html: (...properties: PropertyType[]): any => {
        return component("html", ...properties);
    },
    i: (...properties: PropertyType[]): any => {
        return component("i", ...properties);
    },
    iframe: (...properties: PropertyType[]): any => {
        return component("iframe", ...properties);
    },
    img: (...properties: PropertyType[]): any => {
        return component("img", ...properties);
    },
    input: (...properties: PropertyType[]): any => {
        return component("input", ...properties);
    },
    ins: (...properties: PropertyType[]): any => {
        return component("ins", ...properties);
    },
    kbd: (...properties: PropertyType[]): any => {
        return component("kbd", ...properties);
    },
    label: (...properties: PropertyType[]): any => {
        return component("label", ...properties);
    },
    legend: (...properties: PropertyType[]): any => {
        return component("legend", ...properties);
    },
    li: (...properties: PropertyType[]): any => {
        return component("li", ...properties);
    },
    link: (...properties: PropertyType[]): any => {
        return component("link", ...properties);
    },
    main: (...properties: PropertyType[]): any => {
        return component("main", ...properties);
    },
    map: (...properties: PropertyType[]): any => {
        return component("map", ...properties);
    },
    mark: (...properties: PropertyType[]): any => {
        return component("mark", ...properties);
    },
    meta: (...properties: PropertyType[]): any => {
        return component("meta", ...properties);
    },
    meter: (...properties: PropertyType[]): any => {
        return component("meter", ...properties);
    },
    nav: (...properties: PropertyType[]): any => {
        return component("nav", ...properties);
    },
    noframes: (...properties: PropertyType[]): any => {
        return component("noframes", ...properties);
    },
    noscript: (...properties: PropertyType[]): any => {
        return component("noscript", ...properties);
    },
    object: (...properties: PropertyType[]): any => {
        return component("object", ...properties);
    },
    ol: (...properties: PropertyType[]): any => {
        return component("ol", ...properties);
    },
    optgroup: (...properties: PropertyType[]): any => {
        return component("optgroup", ...properties);
    },
    option: (...properties: PropertyType[]): any => {
        return component("option", ...properties);
    },
    output: (...properties: PropertyType[]): any => {
        return component("output", ...properties);
    },
    p: (...properties: PropertyType[]): any => {
        return component("p", ...properties);
    },
    param: (...properties: PropertyType[]): any => {
        return component("param", ...properties);
    },
    picture: (...properties: PropertyType[]): any => {
        return component("picture", ...properties);
    },
    pre: (...properties: PropertyType[]): any => {
        return component("pre", ...properties);
    },
    progress: (...properties: PropertyType[]): any => {
        return component("progress", ...properties);
    },
    q: (...properties: PropertyType[]): any => {
        return component("q", ...properties);
    },
    rp: (...properties: PropertyType[]): any => {
        return component("rp", ...properties);
    },
    rt: (...properties: PropertyType[]): any => {
        return component("rt", ...properties);
    },
    ruby: (...properties: PropertyType[]): any => {
        return component("ruby", ...properties);
    },
    s: (...properties: PropertyType[]): any => {
        return component("s", ...properties);
    },
    samp: (...properties: PropertyType[]): any => {
        return component("samp", ...properties);
    },
    script: (...properties: PropertyType[]): any => {
        return component("script", ...properties);
    },
    section: (...properties: PropertyType[]): any => {
        return component("section", ...properties);
    },
    select: (...properties: PropertyType[]): any => {
        return component("select", ...properties);
    },
    small: (...properties: PropertyType[]): any => {
        return component("small", ...properties);
    },
    source: (...properties: PropertyType[]): any => {
        return component("source", ...properties);
    },
    span: (...properties: PropertyType[]): any => {
        return component("span", ...properties);
    },
    strike: (...properties: PropertyType[]): any => {
        return component("strike", ...properties);
    },
    strong: (...properties: PropertyType[]): any => {
        return component("strong", ...properties);
    },
    style: (...properties: PropertyType[]): any => {
        return component("style", ...properties);
    },
    sub: (...properties: PropertyType[]): any => {
        return component("sub", ...properties);
    },
    summary: (...properties: PropertyType[]): any => {
        return component("summary", ...properties);
    },
    sup: (...properties: PropertyType[]): any => {
        return component("sup", ...properties);
    },
    svg: (...properties: PropertyType[]): any => {
        return component("svg", ...properties);
    },
    table: (...properties: PropertyType[]): any => {
        return component("table", ...properties);
    },
    tbody: (...properties: PropertyType[]): any => {
        return component("tbody", ...properties);
    },
    td: (...properties: PropertyType[]): any => {
        return component("td", ...properties);
    },
    template: (...properties: PropertyType[]): any => {
        return component("template", ...properties);
    },
    textarea: (...properties: PropertyType[]): any => {
        return component("textarea", ...properties);
    },
    tfoot: (...properties: PropertyType[]): any => {
        return component("tfoot", ...properties);
    },
    th: (...properties: PropertyType[]): any => {
        return component("th", ...properties);
    },
    thead: (...properties: PropertyType[]): any => {
        return component("thead", ...properties);
    },
    time: (...properties: PropertyType[]): any => {
        return component("time", ...properties);
    },
    title: (...properties: PropertyType[]): any => {
        return component("title", ...properties);
    },
    tr: (...properties: PropertyType[]): any => {
        return component("tr", ...properties);
    },
    track: (...properties: PropertyType[]): any => {
        return component("track", ...properties);
    },
    tt: (...properties: PropertyType[]): any => {
        return component("tt", ...properties);
    },
    u: (...properties: PropertyType[]): any => {
        return component("u", ...properties);
    },
    ul: (...properties: PropertyType[]): any => {
        return component("ul", ...properties);
    },
    var: (...properties: PropertyType[]): any => {
        return component("var", ...properties);
    },
    video: (...properties: PropertyType[]): any => {
        return component("video", ...properties);
    },
    wbr: (...properties: PropertyType[]): any => {
        return component("wbr", ...properties);
    }
};
export default Styled;
