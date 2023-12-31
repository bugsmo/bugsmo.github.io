import { type PropType, type VNode } from "vue";
import { type ResolvedSidebarGroupItem } from "../utils/index.js";
import "../styles/sidebar-group.scss";
declare const _default: import("vue").DefineComponent<{
    /**
     * Sidebar group item config
     *
     * 侧边栏分组配置
     */
    config: {
        type: PropType<ResolvedSidebarGroupItem>;
        required: true;
    };
    /**
     * Whether current group is open
     *
     * 当前分组是否展开
     */
    open: {
        type: BooleanConstructor;
        required: true;
    };
}, () => VNode, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "toggle"[], "toggle", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Sidebar group item config
     *
     * 侧边栏分组配置
     */
    config: {
        type: PropType<ResolvedSidebarGroupItem>;
        required: true;
    };
    /**
     * Whether current group is open
     *
     * 当前分组是否展开
     */
    open: {
        type: BooleanConstructor;
        required: true;
    };
}>> & {
    onToggle?: (...args: any[]) => any;
}, {}, {}>;
export default _default;
