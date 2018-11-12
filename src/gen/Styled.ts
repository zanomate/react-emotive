import { access, array, arrow, assign, block, call, constant, id, obj, param, ref, ret } from 'gen/base';
import { HtmlElements } from 'gen/data';
import { appendNode } from 'gen/print';
import { ComponentType } from 'react';

export function genStyled() {

    const propsId = id('props');
    const propertiesId = id('properties');
    const componentId = id('component');

    const genComponent = () => {

        const styledComponent = arrow(
            [param(propertiesId, array(ref(id('Sheet'))), true)],
            ref(id('React.Component')),
            call(
                call(id('styled'), componentId),
                arrow(
                    [param(propsId, undefined)],
                    undefined,
                    call(id('buildSheet'), propertiesId, propsId)
                )
            )
        );

        return arrow(
            [param(componentId, ref(id('React.ComponentType')))],
            undefined,
            block(ret(styledComponent))
        );
    };

    const genStyledElement = (element: string) => {
        return arrow(
            [param(propertiesId, array(ref(id('Sheet'))), true)],
            ref(id('React.Component')),
            call(
                access(id('styled'), element),
                arrow(
                    [param(propsId, undefined)],
                    undefined,
                    call(id('buildSheet'), propertiesId, propsId)
                )
            )
        )
    };

    const styledId = id('Styled');
    const styled = constant(
        styledId,
        obj([
            assign('component', genComponent()),
            assign('Selector', id('_Selector')),
            assign('Media', id('_Media')),
            ...HtmlElements.map(element => assign(element, genStyledElement(element)))
        ]),
        true
    );
    appendNode(styled);
}
