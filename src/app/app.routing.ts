import {ModuleWithProviders, NgModule} from "@angular/core";
import {Routes,RouterModule} from "@angular/router";

import { PendientesComponent } from './pendientes/pendientes.component';

const appRouters: Routes =[
  {path:'',redirectTo:'/pendiente',pathMatch:'full'},
  {path:'**',component:PendientesComponent},
  {path:'pendiente', component:PendientesComponent},
  {path:'pendiente/:id', component:PendientesComponent}

];

export const appRoutingProviders: any[]=[];
export const routing:ModuleWithProviders =RouterModule.forRoot(appRouters);
@NgModule({
  imports: [RouterModule.forRoot(appRouters)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
