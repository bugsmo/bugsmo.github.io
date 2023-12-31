import { type PropType, type VNode } from "vue";
import "../styles/theme-color-picker.scss";
declare const _default: import("vue").DefineComponent<{
    /**
     * Theme color picker config
     *
     * 主题色选择器配置
     */
    themeColor: {
        type: PropType<Record<string, string>>;
        required: true;
    };
}, () => VNode, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * Theme color picker config
     *
     * 主题色选择器配置
     */
    themeColor: {
        type: PropType<Record<string, string>>;
        required: true;
    };
}>>, {}, {}>;
export default _default;
