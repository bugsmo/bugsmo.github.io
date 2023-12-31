import { type PropType, type VNode } from "vue";
import { type ResolvedSidebarHeaderItem, type ResolvedSidebarPageItem } from "../utils/index.js";
import "../styles/sidebar-child.scss";
declare const _default: import("vue").DefineComponent<{
    /**
     * Sidebar item config
     *
     * 侧边栏项目配置
     */
    config: {
        type: PropType<ResolvedSidebarHeaderItem | ResolvedSidebarPageItem>;
        required: true;
    };
}, () => (VNode | null)[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Sidebar item config
     *
     * 侧边栏项目配置
     */
    config: {
        type: PropType<ResolvedSidebarHeaderItem | ResolvedSidebarPageItem>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
