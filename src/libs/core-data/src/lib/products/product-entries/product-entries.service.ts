import { Observable } from 'rxjs';
import { IProductEntry, IProduct } from '@workspace/interfaces';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { sharedEnvironment as environment } from '@workspace/environments';
@Injectable({
  providedIn: 'root'
})
export class ProductEntriesService {
  private readonly model: string = 'products/';
  constructor(private http:HttpClient) {}

  private getUrlForId(id: string,entryId=""): string{
    return `${environment.url}/${id}/entries/${entryId}`;
  }
  public setMainEntry(id:string,data: IProductEntry): Observable<IProduct>{
    return this.http.post<IProduct>(this.getUrlForId(id,data._id),data);
  }
  public createOne(id: string,data: IProductEntry): Observable<IProduct>{
    return this.http.post<IProduct>(this.getUrlForId(id),data);
  }

  public updateOne(id: string,entryId: string,data: IProductEntry): Observable<IProduct>{
    return this.http.put<IProduct>(this.getUrlForId(id,entryId),data);
  }

  public deleteOne(id: string,entryId: string): Observable<IProduct>{
    return this.http.delete<IProduct>(this.getUrlForId(id,entryId));
  }
  
}
