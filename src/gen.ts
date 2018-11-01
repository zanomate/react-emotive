import * as ts from 'typescript';
import {
    AnyType, array, arrow, assign, block, call, constant, Expr, id, obj, param, ref, ret, spread, value
} from './base';
import { appendNode } from './print';

const htmlElements: string[] = [
    'a', 'abbr', 'acronym', 'address', 'applet', 'area', 'article', 'aside', 'audio', 'b', 'base', 'basefont', 'bdi', 'bdo', 'big', 'blockquote', 'body', 'br', 'button', 'canvas', 'caption', 'center', 'cite', 'code', 'col', 'colgroup', 'data', 'datalist', 'dd', 'del', 'details', 'dfn', 'dialog', 'dir', 'div', 'dl', 'dt', 'em', 'embed', 'fieldset', 'figcaption', 'figure', 'font', 'footer', 'form', 'frame', 'frameset', 'h1', 'head', 'header', 'hr', 'html', 'i', 'iframe', 'img', 'input', 'ins', 'kbd', 'label', 'legend', 'li', 'link', 'main', 'map', 'mark', 'meta', 'meter', 'nav', 'noframes', 'noscript', 'object', 'ol', 'optgroup', 'option', 'output', 'p', 'param', 'picture', 'pre', 'progress', 'q', 'rp', 'rt', 'ruby', 's', 'samp', 'script', 'section', 'select', 'small', 'source', 'span', 'strike', 'strong', 'style', 'sub', 'summary', 'sup', 'svg', 'table', 'tbody', 'td', 'template', 'textarea', 'tfoot', 'th', 'thead', 'time', 'title', 'tr', 'track', 'tt', 'u', 'ul', 'var', 'video', 'wbr'
];

const propertiesId = id('properties');

export function gen() {

    const emotiveId = id('Emotive');

    const methods: { [name: string]: Expr } = {};

    methods['component'] = id('component');

    htmlElements.map(htmlElement => {
        methods[htmlElement] = arrow(
            [param(propertiesId, array(ref(id('PropertyType'))), true)],
            AnyType,
            block(ret(call(id('component'), value(htmlElement), spread(propertiesId))))
        )
    });

    const emotive = constant(
        emotiveId,
        obj(
            Object.keys(methods).map(methodName => assign(
                methodName,
                methods[methodName]
            ))
        ),
        true
    );
    appendNode(emotive);

    const defaultExport = ts.createExportDefault(emotiveId);
    appendNode(defaultExport);
}
