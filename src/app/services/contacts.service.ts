import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Contact } from '../contact/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  idCount = -1;
  contacts: Contact[];

  private baseUrl = "http://localhost:8000";
  // private baseUrl = "http://34.77.163.147:8000";
  constructor(private http: HttpClient) { }

  getContacts(): Observable<Contact[]> {
    if (this.contacts) return of(this.contacts);
    const contactsReq = this.http.get(`${this.baseUrl}/contacts`) as Observable<Contact[]>;
    contactsReq.subscribe((contacts) => this.contacts = contacts)
    return contactsReq;
  }

  postContact(contact: Contact): Observable<Contact> {
    const contactReq = this.http.post(`${this.baseUrl}/contacts`, contact) as Observable<Contact>;
    contact.id = this.idCount--;
    this.contacts.push(contact);
    contactReq.subscribe(
      (newContact) => contact.id = newContact.id,
      (error) => {
        const index = this.contacts.indexOf(contact, 0);
        if (index > -1)
          this.contacts.splice(index, 1);
      });
    return contactReq;
  }

  patchContact(contact: Contact): Observable<Contact> {
    const contactReq = this.http.patch(`${this.baseUrl}/contacts/${contact.id}`, contact) as Observable<Contact>;
    const contactToUpdate = this.contacts.find((c) => c.id == contact.id);
    contactToUpdate.isPatching = true;
    contactReq.subscribe(
      (updatedContact) => {
        contactToUpdate.isPatching = false;
        contactToUpdate.id = updatedContact.id
        contactToUpdate.firstname = updatedContact.firstname
        contactToUpdate.lastname = updatedContact.lastname
      });
    return contactReq;
  }

  deleteContact(contact: Contact) {
    return this.http.delete(`${this.baseUrl}/contacts/${contact.id}`);
  }
}
