import { Article } from "../../models/article";

export interface ArticlesState{
    loading: boolean;
    articles: ReadonlyArray<Article>;
    added: boolean;
    deleted: boolean;
}