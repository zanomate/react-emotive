import {Css} from "core/emotive";

export type Props = { [propName: string]: any };
export type StaticSheet = { [propertyName: string]: any; };
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
    console.log(sheet);
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
