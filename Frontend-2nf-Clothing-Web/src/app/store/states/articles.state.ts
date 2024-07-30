import { Article } from "../../models/articles/article";
import { ArticleType } from "../../models/articles/article-type";
import { Size } from "../../models/stocks/size";

export interface ArticlesState{
    loading: boolean;
    articlesWithStock: ReadonlyArray<Article> | null;
    articles: ReadonlyArray<Article>;
    article: any;
    added: boolean;
    deleted: boolean;
    updated: boolean;
    sizes: ReadonlyArray<Size>;
    articleTypes: ReadonlyArray<ArticleType>;
}