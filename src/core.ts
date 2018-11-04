import * as Emotive from 'emotive';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import {ComponentClass, createElement} from 'react';

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
type SheetAsArrow = (name: PropsType) => Sheet | Sheet[]
export type PropertyType = Sheet | SheetAsArrow;

function component(elementType: string | ComponentClass, ...properties: PropertyType[]) {
    return (props: { [name: string]: any }) => {

        let {style, ...otherProps} = props;

        let styleProps: Sheet[] = [];
        properties.map(property => {
            const isFunction = property && {}.toString.call(property) === '[object Function]';
            if (isFunction) {
                const computedProperty = (<SheetAsArrow>property)(props);
                if (Array.isArray(computedProperty)) {
                    styleProps.push(...<Sheet[]>computedProperty);
                }
                else {
                    styleProps.push(<Sheet>computedProperty);
                }
            }
            else {
                styleProps.push(<Sheet>property);
            }
        });
        if (style) {
            styleProps.push(style);
        }

        const emotiveStyle = sheet(...styleProps);
        const domProps = filterInvalidDOMProps(otherProps);
        return createElement<any>(elementType, {style: emotiveStyle, ...domProps}, props.children);
    }
}
