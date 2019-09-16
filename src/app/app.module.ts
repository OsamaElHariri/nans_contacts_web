import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatIconModule } from '@angular/material'
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RouterModule, Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactEntryComponent } from './contact/contact-entry/contact-entry.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { EditContactComponent } from './contact/edit-contact/edit-contact.component';
import { ViewContactComponent } from './contact/view-contact/view-contact.component';
import { GrannyLoaderComponent } from './loader/granny-loader/granny-loader.component';

const appRoutes: Routes = [
  { path: 'contacts/edit/:id', component: EditContactComponent },
  { path: 'contacts/new', component: EditContactComponent },
  { path: 'contacts/:id', component: ViewContactComponent },
  { path: 'contacts', component: ContactListComponent },
  { path: 'loader', component: GrannyLoaderComponent },
  {
    path: '',
    redirectTo: '/contacts',
    pathMatch: 'full'
  },
  { path: '**', redirectTo: '/contacts', }
];

@NgModule({
  declarations: [
    AppComponent,
    ContactEntryComponent,
    ContactListComponent,
    EditContactComponent,
    ViewContactComponent,
    GrannyLoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      { useHash: true }
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
