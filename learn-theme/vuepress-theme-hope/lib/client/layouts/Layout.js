import { usePageData, usePageFrontmatter } from "@vuepress/client";
import { computed, defineComponent, h, resolveComponent, } from "vue";
import CommonWrapper from "@theme-hope/components/CommonWrapper";
import HomePage from "@theme-hope/components/HomePage";
import NormalPage from "@theme-hope/components/NormalPage";
import SkipLink from "@theme-hope/components/SkipLink";
import FadeSlideY from "@theme-hope/components/transitions/FadeSlideY";
import { useThemeData, useThemeLocaleData, useWindowSize, } from "@theme-hope/composables/index";
export default defineComponent({
    // eslint-disable-next-line vue/multi-word-component-names
    name: "Layout",
    setup() {
        const themeData = useThemeData();
        const themeLocale = useThemeLocaleData();
        const page = usePageData();
        const frontmatter = usePageFrontmatter();
        const { isMobile } = useWindowSize();
        const sidebarDisplay = computed(() => ENABLE_BLOG
            ? themeLocale.value.blog?.sidebarDisplay ||
                themeData.value.blog?.sidebarDisplay ||
                "mobile"
            : "none");
        return () => [
            h(SkipLink),
            h(CommonWrapper, {}, {
                default: () => frontmatter.value.home
                    ? h(HomePage)
                    : h(FadeSlideY, () => h(NormalPage, { key: page.value.path })),
                ...(sidebarDisplay.value !== "none"
                    ? { navScreenBottom: () => h(resolveComponent("BloggerInfo")) }
                    : {}),
                ...(!isMobile.value && sidebarDisplay.value === "always"
                    ? { sidebar: () => h(resolveComponent("BloggerInfo")) }
                    : {}),
            }),
        ];
    },
});
//# sourceMappingURL=Layout.js.map