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
  firstPromptText: string = "Oh dear! I wonder who I should add first";
  secondPromptText: string = "Hmmm... Who should I add now?";
  loading: boolean = true;
  contacts: Contact[] = [];

  constructor(private router: Router, public contactsService: ContactsService) {
    this.contactsService.getContacts().subscribe((contacts: any) => {
      this.loading = false;
      this.contacts = contacts;
    });
  };

  addContact() {
    this.router.navigateByUrl(`/contacts/new`);
  }

}
