import { Injectable } from '@angular/core';
import { Pendiente } from './pendiente';
import { PENDIENTE } from './pendientes.json';
import { Observable,of,throwError} from 'rxjs';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import {map,catchError} from 'rxjs/operators';
import swal from 'sweetalert';



@Injectable({
  providedIn: 'root'
})
export class PendienteService {
  private urlEndPoint="https://restbackendpendiente.herokuapp.com/"
  private httpHeaders =new HttpHeaders ({'Content-Type': 'application/json'})
  constructor(private http:HttpClient) {
  }

 getPendienteAll(){
   return this.http.get(`${this.urlEndPoint}/pendiente`).pipe(
     map((response)=> response as Pendiente[])
   );
 }
 create(pendiente:Pendiente):Observable <any>{
   return this.http.post<any>(`${this.urlEndPoint}/pendiente/new`,pendiente,{headers:this.httpHeaders}).pipe(
     catchError(e => {
        console.error(e.error);
        swal("Error",`al crear ${e.error}`,"error");
        return throwError(e);
     })
   );
 }
 getPendiente(id): Observable<Pendiente>{
  return this.http.get<Pendiente>(`${this.urlEndPoint}/pendiente/${id}`).pipe(
    catchError(e => {
       console.error(e.error);
       swal("Error",`al Cargar ${e.error}--- ${e.statusText}`,"error");
       return throwError(e);
    })
  );
 }
 update(pendiente:Pendiente):Observable <any>{
   return this.http.put<any>(`${this.urlEndPoint}/pendiente/${pendiente.id}`,pendiente,{headers:this.httpHeaders}).pipe(
     catchError(e => {
        console.error(e.error);
        swal("Error",` al Actualizar ${e.error}--- ${e.statusText}`,"error");
        return throwError(e);
     })
   );
 }

 delete(id:number) :Observable<Pendiente>{
   return this.http.delete<Pendiente>(`${this.urlEndPoint}/pendiente/${id}`,{headers:this.httpHeaders}).pipe(
     catchError(e => {
        console.error(e.error);
        swal("Error",`al Eliminar${e.error}--- ${e.statusText}`,"error");
        return throwError(e);
     })
   );
 }
}
