import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Contact, ContactState } from '../contact/contact';

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
    contactsReq.subscribe((contacts) => {
      this.contacts = contacts;
      this.contacts.forEach(c => {
        c.state = ContactState.Normal;
      });
    })
    return contactsReq;
  }

  postContact(contact: Contact): Observable<Contact> {
    const contactReq = this.http.post(`${this.baseUrl}/contacts`, contact) as Observable<Contact>;
    contact.id = this.idCount--;
    this.contacts.push(contact);
    contactReq.subscribe(
      (newContact) => {
        contact.state = ContactState.Normal;
        contact.id = newContact.id;
      },
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
    contactToUpdate.state = ContactState.Updating;
    contactReq.subscribe(
      (updatedContact) => {
        contactToUpdate.state = ContactState.Normal;
        contactToUpdate.id = updatedContact.id
        contactToUpdate.firstname = updatedContact.firstname
        contactToUpdate.lastname = updatedContact.lastname
        contactToUpdate.phone = updatedContact.phone
        contactToUpdate.email = updatedContact.email
      },
      (error) => {
        contactToUpdate.state = ContactState.Normal;
      });
    return contactReq;
  }

  deleteContact(contact: Contact) {
    const contactReq = this.http.delete(`${this.baseUrl}/contacts/${contact.id}`);
    contact.state = ContactState.Deleting;
    contactReq.subscribe(
      () => {
        contact.state = ContactState.Deleted;
        setTimeout(() => this.removeContact(contact), 3000);
      },
      (error) => {
        contact.state = ContactState.Normal;
      });
    return contactReq;
  }


  private removeContact(contact: Contact) {
    const index = this.contacts.indexOf(contact);
    if (index > -1)
      this.contacts.splice(index, 1);
  }
}
