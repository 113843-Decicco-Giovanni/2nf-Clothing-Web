import { Stock } from "../stocks/stock";


export interface Article {
    id: number;
    name: string;
    description: string;
    price: number;
    type: number;
    images: string[];
    stocks: Stock[];
    discontinuedAt?: Date;
    createdAt: Date;
}
