import { Observable } from 'rxjs';
import { IProductEntry } from '@workspace/interfaces';
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
    return `${environment.apiUrl}/${id}/${entryId}`;
  }

  private createOne(id: string,data: IProductEntry): Observable<IProductEntry>{
    return this.http.post<IProductEntry>(this.getUrlForId(id),data);
  }

  private updateOne(id: string,entryId: string,data: IProductEntry): Observable<IProductEntry>{
    return this.http.put<IProductEntry>(this.getUrlForId(id,entryId),data);
  }

  private deleteOne(id: string,entryId: string,data: IProductEntry): Observable<IProductEntry>{
    return this.http.delete<IProductEntry>(this.getUrlForId(id,entryId));
  }
  
}
