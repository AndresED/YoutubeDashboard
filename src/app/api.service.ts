import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  urlApi: string;
  routeBroadcast: string;
  routeLiveStream: string;
  constructor(private http: HttpClient) {
    this.urlApi = 'http://localhost:3000/api/v1/youtube';
    this.routeBroadcast = this.urlApi + '/broadcast';
    this.routeLiveStream = this.urlApi + '/livestream';
   }
   /*************** BROADCAST ********/
   createBroadcast(credenciales){
     const url = this.routeBroadcast;
     console.log(url);
    return this.http.post<any>(url, credenciales).toPromise();
   }
   listBroadcast(status: string, type: string){
    const url = `${this.routeBroadcast}/${status}/${type}`;
   return this.http.get<any>(url).toPromise();
  }
  detailBroadcast(id: string){
    const url = `${this.routeBroadcast}/${id}`;
   return this.http.get<any>(url).toPromise();
  }
  updateBroadcast(id: string, credenciales){
    const url = `${this.routeBroadcast}/${id}`;
   return this.http.put<any>(url,credenciales).toPromise();
  }
  deleteBroadcast(id: string){
    const url = `${this.routeBroadcast}/${id}`;
   return this.http.delete<any>(url).toPromise();
  }
  /*************** LIVESTREAM ********/
  createLiveStream(credenciales){
    const url = this.routeLiveStream;
   return this.http.post<any>(url, credenciales).toPromise();
  }
  listLiveStream(){
   const url = this.routeLiveStream;
  return this.http.get<any>(url).toPromise();
 }
 detailLiveStream(id: string){
   const url = `${this.routeLiveStream}/${id}`;
  return this.http.get<any>(url).toPromise();
 }
 updateLiveStream(id: string, credenciales){
   const url = `${this.routeLiveStream}/${id}`;
  return this.http.put<any>(url,credenciales).toPromise();
 }
 deleteLiveStream(id: string){
   const url = `${this.routeLiveStream}/${id}`;
  return this.http.delete<any>(url).toPromise();
 }
}
