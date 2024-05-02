import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/states/app.state';
import { Router } from '@angular/router';
import { addArticle, loadArticleTypes } from '../../../store/actions/article.actions';
import { Observable } from 'rxjs';
import { ArticleType } from '../../../models/articles/article-type';
import { selectArticleAdded, selectArticleTypes } from '../../../store/selectors/articles.selector';
import { Article } from '../../../models/articles/article';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-new-article',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-new-article.component.html',
  styleUrl: './admin-new-article.component.css'
})
export class AdminNewArticleComponent implements OnInit {
  formArticulo: FormGroup = new FormGroup({});
  inputImages: FormControl = new FormControl();
  listImages: string[] = [];
  articleTypes$: Observable<ReadonlyArray<ArticleType>> = new Observable();
  added$: Observable<boolean> = new Observable();
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private fb: FormBuilder){

      this.formArticulo = this.fb.group({
        name: ['', [Validators.required]],
        type: ['', [Validators.required]],
        description: ['', [Validators.required]],
        price: ['', [Validators.required, Validators.min(0)]],
      })
    }

  ngOnInit() {
    this.store.dispatch(loadArticleTypes());
    this.articleTypes$ = this.store.select(selectArticleTypes);
  }
  
  addImage() {
    if(this.inputImages.value === '') return
    if(this.listImages.find(predicate => predicate === this.inputImages.value)) return
    this.listImages.push(this.inputImages.value);
    this.inputImages.reset();
  }

  submit() {
      if (this.formArticulo.valid) {
        if (this.listImages.length !== 0) {
          Swal.fire({
            title: '¿Desea guardar el articulo?',
            showCancelButton: true,
            confirmButtonColor: '#006912',
            background: '#262626',
            color: '#a7a7a7',
            cancelButtonColor: '#4a4a4a',
            confirmButtonText: 'Si, crear!'
          }).then((resultado) => {
            if (resultado.isConfirmed) {
              var result = this.formArticulo.value as Article;
            result.images = this.listImages;
            this.store.dispatch(addArticle({ article: result }));
            this.store.select(selectArticleAdded).subscribe(
              added => {
                if (added) {
                  Swal.fire({
                    title: 'Artículo creado',
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
        } )
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
