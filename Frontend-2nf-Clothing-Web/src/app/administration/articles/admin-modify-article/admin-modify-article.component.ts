import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleType } from '../../../models/articles/article-type';
import { Observable, map } from 'rxjs';
import { AppState } from '../../../store/states/app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Article } from '../../../models/articles/article';
import { loadArticleTypes, addArticle, loadArticles, updateArticle } from '../../../store/actions/article.actions';
import { selectArticleTypes, selectArticleAdded, selectArticles, selectArticleUpdated } from '../../../store/selectors/articles.selector';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-modify-article',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './admin-modify-article.component.html',
  styleUrl: './admin-modify-article.component.css'
})
export class AdminModifyArticleComponent implements OnInit {
  formArticulo: FormGroup = new FormGroup({});
  inputImages: FormControl = new FormControl();
  listImages: string[] = [];
  articleTypes$: Observable<ReadonlyArray<ArticleType>> = new Observable();
  added$: Observable<boolean> = new Observable();
  article: Article = {
    id: 0,
    name: '',
    type: 0,
    description: '',
    price: 0,
    images: [],
    stocks: [],
    createdAt: new Date()
  };
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder) {

    this.formArticulo = this.fb.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      description: ['', [Validators.required]],
      price: ['', [Validators.required, Validators.min(0)]],
    })
  }

  ngOnInit() {
    this.store.dispatch(loadArticleTypes());
    this.store.dispatch(loadArticles());
    this.articleTypes$ = this.store.select(selectArticleTypes);
    this.store.select(selectArticles).subscribe(
      articles => {
        if (articles.length !== 0) {
          this.article = articles.find(predicate => predicate.id == this.activatedRoute.snapshot.params['id'])!;
          console.log(this.article);
          this.formArticulo.patchValue(this.article);
          this.listImages = this.article.images
        }
      }
    )
  }

  addImage() {
    if (this.inputImages.value === '') return
    if (this.listImages.find(predicate => predicate === this.inputImages.value)) return
    this.listImages.push(this.inputImages.value);
    this.inputImages.reset();
  }

  submit() {
    if (this.formArticulo.valid) {
      if (this.listImages.length !== 0) {
        Swal.fire({
          title: '¿Desea modificar el articulo?',
          showCancelButton: true,
          confirmButtonColor: '#006912',
          background: '#262626',
          color: '#a7a7a7',
          cancelButtonColor: '#4a4a4a',
          confirmButtonText: 'Si, modificar!'
        }).then((resultado) => {
          if (resultado.isConfirmed) {
            var result = this.formArticulo.value as Article;
            result.images = this.listImages;
            this.store.dispatch(updateArticle({ article: result }));
            this.store.select(selectArticleUpdated).subscribe(
              updated => {
                if (updated) {
                  Swal.fire({
                    title: 'Artículo modificado',
                    icon: 'success',
                    background: '#262626',
                    color: '#a7a7a7',
                    confirmButtonColor: '#4a4a4a',
                    confirmButtonText: 'Ok',
                  });
                  this.router.navigate(['administration', 'articles']);
                }
              }
            )
          }
        })
      }
    }
  }
  deleteImage(url: string) {
    this.listImages = this.listImages.filter(image => image !== url);
  }
  deleteAllImages() {
    this.listImages = [];
  }
}
