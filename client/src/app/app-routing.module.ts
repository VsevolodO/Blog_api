import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginPageComponent } from "./login-page/login-page.component";
import { AuthlayOutComponent } from "./shared/layots/authlay-out/authlay-out.component";
import { BlogLayoutComponent } from "./shared/layots/blog-layout/blog-layout.component";
import {RegPageComponent} from "./reg-page/reg-page.component"
import { AuthGuard } from "./shared/classes/auth.guard";
const routes: Routes = [
    {path:'', component:AuthlayOutComponent, children:[
        {path:'login', component: LoginPageComponent},
        {path:'registration', component: RegPageComponent}
    ]},
    {path:'', component:BlogLayoutComponent, canActivate:[AuthGuard], children:[]}
]

@NgModule({
    imports:[
        RouterModule.forRoot(routes)
    ],
    exports:[
        RouterModule
    ]
})
export class AppRoutingModule {



}