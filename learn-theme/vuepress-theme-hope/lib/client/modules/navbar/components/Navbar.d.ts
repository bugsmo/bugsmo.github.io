import { type SlotsType, type VNode } from "vue";
import "../styles/navbar.scss";
declare const _default: import("vue").DefineComponent<{}, () => VNode[], {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "toggleSidebar"[], "toggleSidebar", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onToggleSidebar?: (...args: any[]) => any;
}, {}, SlotsType<{
    default: () => VNode | VNode[];
    startBefore?: () => VNode | VNode[];
    startAfter?: () => VNode | VNode[];
    centerBefore?: () => VNode | VNode[];
    centerAfter?: () => VNode | VNode[];
    endBefore?: () => VNode | VNode[];
    endAfter?: () => VNode | VNode[];
    screenTop?: () => VNode | VNode[];
    screenBottom?: () => VNode | VNode[];
}>>;
export default _default;
