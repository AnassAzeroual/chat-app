import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';


const routes: Routes = [
  {
    path:'', redirectTo:'signIn', pathMatch:'full'
  },
  {
    path:'home', component:HomeComponent
  },
  {
    path:'signIn', component:RegisterComponent
  },
  {
    path:'**', component:RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
