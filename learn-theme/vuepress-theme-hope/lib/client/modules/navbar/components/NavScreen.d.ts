import { type SlotsType, type VNode } from "vue";
import "../styles/nav-screen.scss";
declare const _default: import("vue").DefineComponent<{
    /**
     * Whether to show the screen
     *
     * 是否显示
     */
    show: BooleanConstructor;
}, () => VNode, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "close"[], "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Whether to show the screen
     *
     * 是否显示
     */
    show: BooleanConstructor;
}>> & {
    onClose?: (...args: any[]) => any;
}, {
    show: boolean;
}, SlotsType<{
    before?: () => VNode | VNode[];
    after?: () => VNode | VNode[];
}>>;
export default _default;
