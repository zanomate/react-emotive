import * as Emotive from 'emotive';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import {ComponentClass, createElement, ReactDOM} from 'react';

export type Param = Emotive.Param;
export type Sheet = Emotive.Sheet;

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

type Props = { [name: string]: any };
type MQ = string;
type StyleParam = Sheet | SheetFromProps | SheetFromMQ;

type SheetFromProps = (props: Props) => Sheet | Sheet[];
type SheetFromMQ = (mq: MQ) => Sheet | Sheet[];

// export const Media = (query: string) => {
//     return (window: Window) => {
//         return (...props: StyleParam[]) => {
//             return render ? props : {};
//         }
//     };
// };

function component(elementType: string | ComponentClass, ...sheetProps: StyleParam[]) {
    return (props: Props) => {

        let {style, ...otherProps} = props;
        let styleProps: Sheet[] = [];

        sheetProps.map(sheet => {
            // function
            if (sheet && {}.toString.call(sheet) === '[object Function]') {
                const computedProperty = (<SheetFromProps>sheet)(props);
                if (Array.isArray(computedProperty)) {
                    styleProps.push(...<Sheet[]>computedProperty);
                }
                else {
                    styleProps.push(<Sheet>computedProperty);
                }
            }
            else if (sheet instanceof Media) {

            }
            // Sheet
            else {
                styleProps.push(<Sheet>sheet);
            }
        });
        if (style) {
            styleProps.push(style);
        }

        const emotiveStyle = Css.sheet(...styleProps);
        const domProps = filterInvalidDOMProps(otherProps);
        return createElement<any>(elementType, {style: emotiveStyle, ...domProps}, props.children);
    }
}
