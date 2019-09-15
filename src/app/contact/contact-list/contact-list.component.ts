import { Component } from '@angular/core';
import { Contact } from '../contact';
import { ContactsService } from 'src/app/services/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent {
  contacts: Contact[] = [];

  constructor(private router: Router, private contactsService: ContactsService) {
    this.contactsService.getContacts().subscribe((contacts: any) => {
      this.contacts = contacts;
    });
  };

  addContact() {
    this.router.navigateByUrl(`/contacts/new`);
  }
}
