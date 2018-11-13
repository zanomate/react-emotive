import { Css } from 'core/emotive';
import * as Emotive from 'emotive';

export type Props = { [propName: string]: any };
export type StaticSheet = Emotive.Sheet;
export type DynamicSheet = { [propertyName: string]: any; };
export type SheetFromProps = (props: Props) => Sheet | Sheet[];
export type Sheet = StaticSheet | DynamicSheet | SheetFromProps | Condition;

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
    return {}.toString.call(any) === '[object Function]';
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
            }
            else {
                resolvedArray.push(style);
            }
        });

        // Apply recursively
        return resolvedArray.map(style => {
            if (style instanceof Condition) {
                return {[style.condition]: Css.sheet(...applyProps(style.styles))};
            }
            else {
                return style;
            }
        });
    };

    const sheet = Css.sheet(...applyProps(styles));
    return sheet;
};

// &
export function _Selector(selector: string) {
    return (...styles: Sheet[]) => new Condition(selector, styles);
}

// @media
export function _Media(query: string) {
    return (...styles: Sheet[]) => new Condition('@media ' + query, styles);
}
