import { usePageFrontmatter } from "@vuepress/client";
import { defineComponent, h } from "vue";
import { RouterLink } from "vue-router";
import { entries, generateIndexFromHash } from "vuepress-shared/client";
import { useTagMap } from "@theme-hope/modules/blog/composables/index";
import "../styles/tag-list.scss";
export default defineComponent({
    name: "TagList",
    setup() {
        const frontmatter = usePageFrontmatter();
        const tagMap = useTagMap();
        const isActive = (name) => name === frontmatter.value.blog?.name;
        return () => h("ul", { class: "tag-list-wrapper" }, entries(tagMap.value.map).map(([tag, { path, items }]) => h("li", {
            class: [
                "tag",
                // TODO: magic number 9 is tricky here
                `tag${generateIndexFromHash(tag, 9)}`,
                { active: isActive(tag) },
            ],
        }, h(RouterLink, { to: path }, () => [
            tag,
            h("span", { class: "tag-num" }, items.length),
        ]))));
    },
});
//# sourceMappingURL=TagList.js.map