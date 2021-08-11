import { Component, OnInit } from '@angular/core';
// import { Phonebook } from './phonebook';
import { PhonebookService } from './../../services/phonebook.service';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.css'],
})
export class PhonebookComponent implements OnInit {
  phonebookList: any;
  phonebookForm!: FormGroup;
  modelTitle = 'Add New Phonebook';
  phonebookOption = ['Home', 'Work', 'Cellular', 'Other'];

  isEdit: boolean = false;
  isAdd: boolean = true;

  phonebookObject = {
    firstName: '',
    lastName: '',
    mobile: '',
    phoneType: '',
    id: '',
  };

  constructor(private fb: FormBuilder, private pbServer: PhonebookService) {}

  ngOnInit(): void {
    // reactive Form
    this.phonebookForm = this.fb.group({
      firstName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      lastName: new FormControl(null, [
        Validators.required,
        Validators.minLength(3),
        Validators.pattern('[a-zA-Z ]*'),
      ]),
      mobile: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('[0-9]*'),
      ]),
      phoneType: new FormControl(this.phonebookOption[0]),
    });

    // get list of phonebook from our server
    this.pbServer.getPhonebook().subscribe((res) => {
      // console.log(res);
      this.phonebookList = res;
    });
  }

  // Add a new phonebook Methode
  addPhonebook() {
    this.isEdit = false;
    this.pbServer.postPhonebook(this.phonebookForm.value).subscribe((res) => {
      this.getLatestPhonebook();
      let cancel = document.getElementById('cancel');
      cancel?.click();
      this.phonebookForm.reset();
    });
  }

  // Get latest phone after Add or update
  getLatestPhonebook() {
    this.pbServer.getPhonebook().subscribe((res) => {
      this.phonebookList = res;
    });
  }

  // delete phonebook

  onDeletePhonebook(pbook: any) {
    this.pbServer.deletPhonebook(pbook).subscribe(() => {
      this.getLatestPhonebook();
    });
  }

  // get data from db and set on edit model from
  updatePhonebook(pbook: any) {
    this.modelTitle = 'Update Phonebook';
    this.isEdit = true;
    this.isAdd = false;
    this.phonebookForm.controls['firstName'].setValue(pbook.firstName);
    this.phonebookForm.controls['lastName'].setValue(pbook.lastName);
    this.phonebookForm.controls['mobile'].setValue(pbook.mobile);
    this.phonebookForm.controls['phoneType'].setValue(pbook.phoneType);
    this.phonebookObject = pbook;
  }

  // update phonebook
  updatePhonebookDetails() {
    this.phonebookObject.firstName = this.phonebookForm.value.firstName;
    this.phonebookObject.lastName = this.phonebookForm.value.lastName;
    this.phonebookObject.mobile = this.phonebookForm.value.mobile;
    this.phonebookObject.phoneType = this.phonebookForm.value.phoneType;

    this.pbServer.editPhonebook(this.phonebookObject).subscribe((res) => {
      let cancel = document.getElementById('cancel');
      cancel?.click();
      this.getLatestPhonebook();
      this.phonebookForm.reset();
    });
  }

  get f() {
    return this.phonebookForm.controls;
  }
}
