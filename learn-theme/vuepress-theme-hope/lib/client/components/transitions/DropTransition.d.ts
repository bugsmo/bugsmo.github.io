import { type PropType, type SlotsType, type VNode } from "vue";
declare const _default: import("vue").DefineComponent<{
    /**
     * @description Transition type
     */
    type: {
        type: PropType<"group" | "single">;
        default: string;
    };
    /**
     * @description Transition delay
     */
    delay: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description Transition duration
     */
    duration: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description appear
     */
    appear: BooleanConstructor;
}, () => VNode, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    /**
     * @description Transition type
     */
    type: {
        type: PropType<"group" | "single">;
        default: string;
    };
    /**
     * @description Transition delay
     */
    delay: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description Transition duration
     */
    duration: {
        type: NumberConstructor;
        default: number;
    };
    /**
     * @description appear
     */
    appear: BooleanConstructor;
}>>, {
    type: "group" | "single";
    delay: number;
    duration: number;
    appear: boolean;
}, SlotsType<{
    default: () => VNode | VNode[];
}>>;
export default _default;
