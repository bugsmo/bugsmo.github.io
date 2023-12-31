import { setupArticles } from "./articles.js";
import { setupCategoryMap } from "./categoryMap.js";
import { setupStars } from "./stars.js";
import { setupTagMap } from "./tagMap.js";
import { setupTimelines } from "./timelines.js";
export const setupBlog = () => {
    setupArticles();
    setupCategoryMap();
    setupStars();
    setupTagMap();
    setupTimelines();
};
//# sourceMappingURL=setup.js.map