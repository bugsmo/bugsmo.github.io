import { type SlotsType, type VNode } from "vue";
import "../styles/common.scss";
declare const _default: import("vue").DefineComponent<{
    /**
     * Extra class of container
     *
     * 容器额外类名
     */
    containerClass: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Whether disable navbar
     *
     * 是否禁用导航栏
     */
    noNavbar: BooleanConstructor;
    /**
     * Whether disable sidebar
     *
     * 是否禁用侧边栏
     */
    noSidebar: BooleanConstructor;
    /**
     * Whether disable toc
     */
    noToc: BooleanConstructor;
}, () => VNode, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Extra class of container
     *
     * 容器额外类名
     */
    containerClass: {
        type: StringConstructor;
        default: string;
    };
    /**
     * Whether disable navbar
     *
     * 是否禁用导航栏
     */
    noNavbar: BooleanConstructor;
    /**
     * Whether disable sidebar
     *
     * 是否禁用侧边栏
     */
    noSidebar: BooleanConstructor;
    /**
     * Whether disable toc
     */
    noToc: BooleanConstructor;
}>>, {
    containerClass: string;
    noNavbar: boolean;
    noSidebar: boolean;
    noToc: boolean;
}, SlotsType<{
    default: () => VNode | VNode[];
    navbarStartBefore?: () => VNode | VNode[];
    navbarStartAfter?: () => VNode | VNode[];
    navbarCenterBefore?: () => VNode | VNode[];
    navbarCenterAfter?: () => VNode | VNode[];
    navbarEndBefore?: () => VNode | VNode[];
    navbarEndAfter?: () => VNode | VNode[];
    navScreenTop?: () => VNode | VNode[];
    navScreenBottom?: () => VNode | VNode[];
    sidebar?: () => VNode | VNode[];
    sidebarTop?: () => VNode | VNode[];
    sidebarBottom?: () => VNode | VNode[];
}>>;
export default _default;
