import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from '../models/contact.interface';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(contacts: Contact[], arg: string): Contact[] {
    if(!arg || arg?.length < 1) return contacts;
    let results: Contact[] = [];

    for(const contact of contacts){
      if(contact.name.toLowerCase().indexOf(arg.toLowerCase()) > -1 || contact.entity.toLowerCase().indexOf(arg.toLowerCase())>-1 || contact.email.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        results = [...results, contact];
      }
    }
    return results;
  }

}
