import Css, { Sheet } from 'emotive';
import filterInvalidDOMProps from 'filter-invalid-dom-props';
import { ComponentClass, createElement } from 'react';

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

        const emotiveStyle = Css.sheet(...styleProps);
        const domProps = filterInvalidDOMProps(otherProps);
        return createElement<any>(elementType, {style: emotiveStyle, ...domProps}, props.children);
    }
}
