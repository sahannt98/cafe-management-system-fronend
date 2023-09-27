import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = 'http://localhost:8080/api/v1';

  constructor(private htttpClient:HttpClient) { }

  add(data:any){
    return this.htttpClient.post(this.url + '/category/add', data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }

  update(data:any){
    return this.htttpClient.put(this.url + '/category/update', data, {
      headers: new HttpHeaders().set('Content-Type', "application/json")
    });
  }

  getCategory(){
    return this.htttpClient.get(this.url + '/category/get');
  }
}
