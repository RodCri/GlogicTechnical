import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../models/contact.interface';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private baseURL = 'https://crudcrud.com/api/372df5dd1f5d4ceabce3b04b0a62d5f8/contacts'

  constructor(private readonly http: HttpClient) { }

  public getContacts(): Observable<Contact[]>{
    return this.http.get<Contact[]>(this.baseURL);
  }

  public addContact(contact: Contact): Observable<Contact>{
    const body = {
      name: contact.name,
      entity: contact.entity,
      email: contact.email
    }
    return this.http.post<Contact>(this.baseURL, body)
  }

  public updateContact(contact: Contact): Observable<void>{
    const body = {
      name: contact.name,
      entity: contact.entity,
      email: contact.email
    }
    return this.http.put<void>(`${this.baseURL}/${contact.email}`,body)
  }

  public deleteContact(email: string): Observable<void>{
    return this.http.delete<void>(`${this.baseURL}/${email}`);
  }

  public getContact(email: string): Observable<Contact>{
    return this.http.get<Contact>(this.baseURL);
  }
}
