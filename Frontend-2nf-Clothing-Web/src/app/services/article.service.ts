import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Article } from '../models/articles/article';
import { Observable } from 'rxjs';
import { ArticleType } from '../models/articles/article-type';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  url = "http://localhost:5260/api/articles";
  constructor(private http: HttpClient) { }

  getArticles(): Observable<Article[]>{
    return this.http.get<Article[]>(this.url);
  }
  getArticlesWithStock(): Observable<Article[]>{
    return this.http.get<Article[]>(this.url + '/stock');
  }
  getArticleTypes(): Observable<ArticleType[]>{
    return this.http.get<ArticleType[]>(this.url + '/types')
  }
  addArticle(article: Article): Observable<Article>{
    return this.http.post<Article>(this.url, article);
  }
  deleteArticle(id: number): Observable<boolean>{
    return this.http.delete<boolean>(this.url + '/' + id);
  }
  activateArticle(id: number): Observable<boolean>{
    return this.http.put<boolean>(this.url + '/activate/' + id, {})
  }
  updateArticle(article: Article): Observable<Article>{
    return this.http.put<Article>(this.url + '/' + article.id, article);
  }
  getArticleById(id: number):Observable<Article>{
    return this.http.get<Article>(this.url + '/' + id);
  }
  updateStock(id: number, stock: {size: number, amount: number}): Observable<Article>{
    return this.http.put<Article>(this.url + '/stock/' + id, stock)
  }
}
