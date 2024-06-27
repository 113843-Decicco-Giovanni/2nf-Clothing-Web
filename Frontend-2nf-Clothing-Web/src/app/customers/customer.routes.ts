import { Routes } from "@angular/router";
import { ArticlesViewComponent } from "./articles-view/articles-view.component";
import { ArticleComponent } from './article/article.component';
import { ModifyClientComponent } from "./client/modify-client/modify-client.component";
import { LoginClientComponent } from "./client/login-client/login-client.component";
import { NewClientComponent } from "./client/new-client/new-client.component";
import { CartComponent } from "./cart/cart.component";
import { PaymentComponent } from "./payment/payment.component";
import { CheckoutComponent } from "./checkout/checkout.component";
import { PaymentButtonComponent } from "./payment-button/payment-button.component";
import { TermsAndConditionsComponent } from "./terms-and-conditions/terms-and-conditions.component";
import { FrecuentQuestionsComponent } from "./frecuent-questions/frecuent-questions.component";
import { MyShoppingComponent } from "./my-shopping/my-shopping.component";
import { MyShoppingDetailComponent } from "./my-shopping-detail/my-shopping-detail.component";
import { DevolutionComponent } from "./devolution/devolution.component";

export const CUSTOMER_ROUTES: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: ArticlesViewComponent
    },
    {
        path: 'article/:id',
        component: ArticleComponent
    },
    {
        path: 'account',
        component: ModifyClientComponent
    },
    {
        path: 'login',
        component: LoginClientComponent
    },
    {
        path: 'register',
        component: NewClientComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'payment-status',
        component: PaymentComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'payment',
        component: PaymentButtonComponent
    },
    {
        path: 'terms-and-conditions',
        component: TermsAndConditionsComponent
    },
    {
        path: 'frequently-asked-questions',
        component: FrecuentQuestionsComponent
    },
    {
        path: 'my-shopping',
        children:[
            {
                path:'',
                component: MyShoppingComponent
            },
            {
                path:':id',
                component: MyShoppingDetailComponent
            }
        ]
    },
    {
        path: 'devolution',
        component: DevolutionComponent
    }
]