import { Component, OnInit, Input, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Contact, ContactState } from '../contact';
import { ContactsService } from 'src/app/services/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-entry',
  templateUrl: './contact-entry.component.html',
  styleUrls: ['./contact-entry.component.scss'],
  animations: [
    trigger('contactStatus', [
      state('Normal', style({
        top: '-100%',
        width: '20%',
      })),
      state('Deleting', style({
        top: '0%',
        width: '20%',
      })),
      state('Deleted', style({
        top: '0%',
        width: '100%',
      })),
      transition('* => *', [animate('0.15s')])
    ]),
  ],

})
export class ContactEntryComponent {

  @Input() contact: Contact;

  constructor(private router: Router, private contactsService: ContactsService) { }

  deleteClicked(evt) {
    evt.stopPropagation();
    if (this.contact.state != ContactState.Normal) return;
    this.contactsService.deleteContact(this.contact);
  }

  editClicked(evt) {
    evt.stopPropagation();
    if (this.contact.state != ContactState.Normal) return;
    this.router.navigateByUrl(`/contacts/edit/${this.contact.id}`);
  }

  onEntryClicked() {
    if (this.contact.state != ContactState.Normal) return;
    this.router.navigateByUrl(`/contacts/${this.contact.id}`);
  }

}
