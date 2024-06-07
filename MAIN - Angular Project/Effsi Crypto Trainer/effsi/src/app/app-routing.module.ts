import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard] },
  { path: 'wallet', loadChildren: () => import('./wallet/wallet.module').then(m => m.WalletModule), canActivate: [AuthGuard] },
  { path: 'market', loadChildren: () => import('./market/market.module').then(m => m.MarketModule), canActivate: [AuthGuard] },
  { path: 'todos', loadChildren: () => import('./todos/todos.module').then(m => m.TodosModule), canActivate: [AuthGuard] },
  { path: 'data', loadChildren: () => import('./data/data.module').then(m => m.DataModule), canActivate: [AuthGuard] },
  { path: 'user', loadChildren: () => import('./user/user.module').then(m => m.UserModule), canActivate: [AuthGuard] },
  { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule), canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
