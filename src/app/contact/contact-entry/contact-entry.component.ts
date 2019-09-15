import { Component, OnInit, Input, HostBinding } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Contact } from '../contact';
import { ContactsService } from 'src/app/services/contacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-entry',
  templateUrl: './contact-entry.component.html',
  styleUrls: ['./contact-entry.component.scss'],
  host: {
    '(@contactStatus.done)': 'captureDoneEvent($event)',
  },
  animations: [
    trigger('contactStatus', [
      state('Normal', style({
        left: 'calc(100% - 16.5%)',
        top: '-100%',
        width: '16.5%',
      })),
      state('Deleting', style({
        left: 'calc(100% - 16.5%)',
        top: '0%',
        width: '16.5%',
      })),
      state('Deleted', style({
        left: '0%',
        top: '0%',
        width: '100%',
      })),
      transition('* => *', [animate('0.15s')])
    ]),
  ],

})
export class ContactEntryComponent {

  @Input() contact: Contact;


  contactStatus = 'Normal';

  constructor(private router: Router, private contactsService: ContactsService) { }

  deleteClicked(evt) {
    evt.stopPropagation();
    if (this.contactStatus != 'Normal') return;
    this.contactStatus = 'Deleting';
    this.contactsService.deleteContact(this.contact)
      .subscribe(() => {
        this.contactStatus = 'Deleted';
        setTimeout(() => this.removeContact(), 3000);
      });
  }

  editClicked(evt) {
    evt.stopPropagation();
    if (this.contactStatus != 'Normal') return;
    this.router.navigateByUrl(`/contacts/${this.contact.id}`);
  }

  removeContact() {
    const index = this.contactsService.contacts.indexOf(this.contact, 0);
    if (index > -1)
      this.contactsService.contacts.splice(index, 1);
  }

  onEntryClicked() {
    if (this.contactStatus != 'Normal') return;
    this.router.navigateByUrl(`/contacts/details/${this.contact.id}`);
  }

}
