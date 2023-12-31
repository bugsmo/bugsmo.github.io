import { type PropType, type VNode } from "vue";
import { type ResolvedSidebarItem } from "../utils/index.js";
import "../styles/sidebar-links.scss";
declare const _default: import("vue").DefineComponent<{
    /**
     * Sidebar links config
     *
     * 侧边栏链接配置
     */
    config: {
        type: PropType<ResolvedSidebarItem[]>;
        required: true;
    };
}, () => VNode | null, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Sidebar links config
     *
     * 侧边栏链接配置
     */
    config: {
        type: PropType<ResolvedSidebarItem[]>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
