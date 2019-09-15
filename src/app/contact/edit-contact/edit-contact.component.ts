import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';
import { Contact } from '../contact';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.component.html',
  styleUrls: ['./edit-contact.component.scss']
})
export class EditContactComponent implements OnInit {

  isEditing = false;
  loading = true;
  contact: Contact = new Contact();

  constructor(private router: Router, private route: ActivatedRoute, private contactsService: ContactsService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];

      this.contactsService.getContacts().subscribe((contacts: Contact[]) => {
        const contact = contacts.find((contact) => contact.id == id);
        if (contact) {
          this.isEditing = true;
          this.contact.id = contact.id;
          this.contact.firstname = contact.firstname;
          this.contact.lastname = contact.lastname;
        }

        this.loading = false;
      });
    });
  }

  onSubmit() {
    if (this.isEditing) {
      this.contactsService.patchContact(this.contact);
    } else {
      this.contactsService.postContact(this.contact);
    }
    this.backToList();
  }

  backToList() {
    this.router.navigateByUrl('/contacts');
  }

}
