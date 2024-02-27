import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contact } from 'src/app/models/contact.interface';

@Component({
  selector: 'app-resgiter',
  templateUrl: './resgiter.component.html',
  styleUrls: ['./resgiter.component.scss']
})
export class ResgiterComponent {

  @Output() contactEvent = new EventEmitter<Contact>();
  @Input() contactEdit!: Contact | null;
  @Output() contactEditEvent = new EventEmitter<Contact>();

  contactForm! : FormGroup;
  contactField = new FormControl();

  constructor(private readonly fv: FormBuilder){

  }

  ngOnInit(): void {
    this.contactForm = this.initForm();
  }

  onSubmit(){
    //console.log("form", this.contactForm.value)
    this.contactEvent.emit(this.contactForm.value);
    this.contactForm.reset()
  }

  onEditContact(){
    this.contactEditEvent.emit(this.contactForm.value);
  }
  initForm(): FormGroup{
    return this.fv.group({
      name: ['',[Validators.required, Validators.minLength(5)],],
      entity: ['',[Validators.required],],
      email: ['',[Validators.required],]
    })
  }


}
