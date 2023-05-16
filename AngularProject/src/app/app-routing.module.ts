import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcceuilComponent } from './component/accueil/acceuil.component';
import { ProductsComponent } from './component/products/products.component';
import { LoginComponent } from './component/login/login.component';
import { AdminProductsComponent } from './component/adminProducts/adminProducts.component';
import { IsSignedInGuard } from './is-signed-in.guard';
import { ContactComponent } from './component/contact/contact.component';
import { AdminMessagesComponent } from './component/admin-messages/admin-messages.component';

const routes: Routes = [
  {
    path: '',
    component: AcceuilComponent
  },
  {
    path: 'produits',
    component: ProductsComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'contact',
    component: ContactComponent
  },
  {
    path: 'adminProducts',
    component: AdminProductsComponent,
    canActivate: [IsSignedInGuard]
  },
  {
      path: 'adminMessages',
    component  : AdminMessagesComponent,
    canActivate: [IsSignedInGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
