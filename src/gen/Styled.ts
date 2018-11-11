import {appendNode} from "gen/print";
import {access, array, arrow, assign, call, constant, id, obj, param, ref} from "gen/base";
import {HtmlElements} from "gen/data";

export function genStyled() {

    const propsId = id('props');
    const propertiesId = id('properties');
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
            assign('Selector', id('_Selector')),
            assign('Media', id('_Media')),
            ...HtmlElements.map(element => assign(element, genStyledElement(element)))
        ]),
        true
    );
    appendNode(styled);
}
