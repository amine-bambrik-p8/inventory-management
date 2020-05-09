import { sharedEnvironment as environment } from '@workspace/environments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


export abstract class CrudService<T> {
  

  constructor(
    protected http:HttpClient,
    protected model: string,
    protected baseUrl: string = environment.apiUrl
    ) { }

  private get url(): string{
    return `${this.baseUrl}/${this.model}`;
  }

  private getUrlForId(id: string): string{
    return `${this.url}/${id}`;
  }

  public createOne(data:T): Observable<T>{
    return this.http.post<T>(this.url,data);
  }

  public readOne(id: string): Observable<T>{
    return this.http.get<T>(this.getUrlForId(id));
  }

  public readMany(filter?:any): Observable<T[]>{
    return this.http.get<T[]>(this.url,{
      params:filter,
    });
  }

  public updateOne(id:string,data:T): Observable<T>{
    return this.http.put<T>(this.getUrlForId(id),data);
  }

  public deleteOne(id:string): Observable<T>{
    return this.http.delete<T>(this.getUrlForId(id));
  }
}
