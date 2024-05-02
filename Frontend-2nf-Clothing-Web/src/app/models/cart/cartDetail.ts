import { Article } from "../articles/article";
import { Size } from "../stocks/size";

export interface CartDetail{
    id: number;
    article: Article;
    size: Size;
    amount: number;
}