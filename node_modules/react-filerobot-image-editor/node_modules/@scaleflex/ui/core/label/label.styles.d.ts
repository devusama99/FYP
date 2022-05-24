import type { LabelProps } from './label.props';
declare const Styled: {
    Label: import("styled-components").StyledComponent<"label", import("styled-components").DefaultTheme, {
        className: string;
    } & LabelProps, "className">;
    Icon: import("styled-components").StyledComponent<"span", import("styled-components").DefaultTheme, {
        className: string;
    } & {
        error: boolean;
        $end: boolean;
    }, "className">;
};
export default Styled;
