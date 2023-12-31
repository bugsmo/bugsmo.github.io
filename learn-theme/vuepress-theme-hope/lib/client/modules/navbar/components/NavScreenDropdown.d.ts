import { type PropType, type VNode } from "vue";
import { type AutoLinkOptions as AutoLinkType, type NavGroup } from "../../../../shared/index.js";
import "../styles/nav-screen-dropdown.scss";
declare const _default: import("vue").DefineComponent<{
    /**
     * Navbar Screen Dropdown list config
     *
     * 导航栏下拉列表配置
     */
    config: {
        type: PropType<NavGroup<AutoLinkType | NavGroup<AutoLinkType>>>;
        required: true;
    };
}, () => VNode[], unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Navbar Screen Dropdown list config
     *
     * 导航栏下拉列表配置
     */
    config: {
        type: PropType<NavGroup<AutoLinkType | NavGroup<AutoLinkType>>>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
