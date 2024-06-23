import { Article } from "../../articles/article";
import { Size } from "../../stocks/size";

export interface SaleDetailResponse{
    article: Article;
    size: Size;
    amount: number;
    unitPrice: number;
}