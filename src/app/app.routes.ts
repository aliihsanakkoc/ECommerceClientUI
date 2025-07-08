import { Routes } from '@angular/router';

export const routes: Routes = [
    {path:"", loadComponent:()=> import("../app/components/home/home").then(cmp=>cmp.Home)},
    {path:"duyurular", loadComponent:()=> import("../app/components/announcements/announcements").then(cmp=>cmp.Announcements)},
    {path:"sss", loadComponent:()=> import("../app/components/faq/faq").then(cmp=>cmp.Faq)},
    {path:"products/:id", loadComponent:()=> import("../app/components/products/products").then(cmp=>cmp.Products)}
];
