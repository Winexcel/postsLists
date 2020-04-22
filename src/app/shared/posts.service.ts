import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {Post} from './interfaces';
import {environment} from '../../environments/environment';
import {delay, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  posts: Post[];

  constructor(private http: HttpClient) {
  }

  // получение списка всех постов
  public getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${environment.dbUrl}/posts/`);
  }

  // получение постов с пагинацией
  public getPosts(page: number, limit: number): Observable<Post[]> {
    let params = new HttpParams();
    params = params.append('_page', page.toString());
    params = params.append('_limit', limit.toString());

    return this.http.get<Post[]>(`${environment.dbUrl}/posts`, {params});
  }
}
