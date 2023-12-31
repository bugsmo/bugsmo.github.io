import { type SlotsType, type VNode } from "vue";
import "../styles/blog-hero.scss";
export interface HeroInfo {
    text: string | null;
    image: string | null;
    imageDark: string | null;
    heroStyle: string | Record<string, string> | undefined;
    alt: string;
    tagline: string | null;
    isFullScreen: boolean;
}
export interface BackgroundInfo {
    image: string | null;
    bgStyle: string | Record<string, string> | undefined;
    isFullScreen: boolean;
}
declare const _default: import("vue").DefineComponent<{}, () => VNode | null, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}, SlotsType<{
    heroBg?: (props: BackgroundInfo) => VNode | VNode[];
    heroInfo?: (props: HeroInfo) => VNode | VNode[];
}>>;
export default _default;
