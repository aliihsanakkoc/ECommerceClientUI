import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { CategoryService } from '../../services/category-service';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Home {

  constructor(private categoryService:CategoryService){}

  startShopping(){
    this.categoryService.getAllCategories().subscribe(data=>{console.log(data)});
  }
}
