import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private apiUrl = 'http://localhost:8083/api/v1/customer';

  private customers: any[] = [];

  constructor(private httpClient: HttpClient) { }

  getAllCustomers(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}/getall`);
  }

  getCustomers(): any[] {
    return this.customers;
  }

  setCustomers(customers: any[]): void {
    this.customers = customers;
  }

  deleteById(id: any): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/delete/${id}`, { responseType: 'text' });
  }
  addCustomer(customerData: any): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/save`, customerData, { responseType: 'text' });
  }
  
  UpdateCustomer(customerData:any):Observable<any>{
    return this.httpClient.put(`${this.apiUrl}/put/${customerData.customerid}`,customerData,{ responseType: 'text' })
  }
  DeleteAll():Observable<any>{
    return this.httpClient.delete(`${this.apiUrl}/deleteall`,{ responseType: 'text' })
  }
  
}
