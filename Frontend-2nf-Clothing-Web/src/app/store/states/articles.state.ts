import { Article } from "../../models/articles/article";
import { ArticleType } from "../../models/articles/article-type";

export interface ArticlesState{
    loading: boolean;
    articles: ReadonlyArray<Article>;
    article: any;
    added: boolean;
    deleted: boolean;
    updated: boolean;
    articleTypes: ReadonlyArray<ArticleType>;
}