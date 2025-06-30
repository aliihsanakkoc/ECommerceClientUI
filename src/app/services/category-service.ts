import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { ApiUri } from '../models/api-uri';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

  getAllCategories():Observable<Category[]>{
    return this.http.get<Category[]>(`${ApiUri}Categories/OData`);
  }
}
