import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactsService } from 'src/app/services/contacts.service';

@Component({
  selector: 'app-view-contact',
  templateUrl: './view-contact.component.html',
  styleUrls: ['./view-contact.component.scss']
})
export class ViewContactComponent implements OnInit {

  loading = true;
  contact: Contact = new Contact();

  constructor(private router: Router, private route: ActivatedRoute, private contactsService: ContactsService) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const id = +params['id'];

      this.contactsService.getContacts().subscribe((contacts: Contact[]) => {
        this.contact = contacts.find((contact) => contact.id == id);
        if (!this.contact) {
          this.router.navigateByUrl('/contacts');
        }

        this.loading = false;
      });
    });
  }

  editClicked() {
    this.router.navigateByUrl(`/contacts/${this.contact.id}`);
  }

  deleteClicked() {
    this.contactsService.deleteContact(this.contact);
    this.backToList();
  }

  backToList() {
    this.router.navigateByUrl('/contacts');
  }
}
