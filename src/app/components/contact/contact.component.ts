import { Component, Input, OnInit } from '@angular/core';
import { Contact } from 'src/app/models/contact.interface';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit{
  contacts: Contact[] = [
    {name: "Andres", entity: "Admin", email: "andresg@gmail.com"},
    {name: "Ricardo",entity: "Dev", email: "Ricardo@gmail.com"},
    {name: "Javier", entity: "QA", email: "Javierg@gmail.com"}
  ]
  name!: string;
  selection!: Contact;
  criterio : string = '';
  contactE! : Contact;
  
  constructor(private ctService: ContactService){}

  ngOnInit(): void {
    this.ctService.getContacts().subscribe(res =>{
      res.map(ct =>{
        this.contacts = [...this.contacts,{
          name: ct.name,
          entity: ct.entity,
          email: ct.email
        }]        
      });
    })
  }

  addNewContacts(contact: Contact){
    this.ctService.addContact(contact).subscribe(res =>{
      this.contacts.push(res);
    });
    
  }
  addNewContact(contact: Contact): void{
    this.contacts.push(contact);
  }

  onContactSelected(contact: Contact): void{
    this.selection = contact;
  }

  
  updateContact(contact: Contact){
    this.contactE = contact;
    console.log(this.contactE)
    //this.ctService.updateContact(contact).subscribe(res =>{
    //  console.log(res);
    //})
  }

  editContact(contactNew: Contact){
    this.contactE = contactNew;
    const res = this.contacts.findIndex(contact => contact.email === contactNew.email);
    console.log(res)
    //this.contacts[res] = contactNew;
  }

  deleteContact(email: string){
    const res = this.contacts.findIndex(contact => contact.email === email);
    console.log(res)
    this.contacts.splice(res,1);
  }

  // deleteContact(email: string){
  //   this.ctService.deleteContact(email).subscribe(res =>{
  //     const temArr = this.contacts.filter(contact => contact.email !== email);
  //     this.contacts = [...temArr]
  //   })
  // }
}
