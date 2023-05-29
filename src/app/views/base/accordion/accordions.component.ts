import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-accordions',
  templateUrl: './accordions.component.html',
  styleUrls: ['./accordions.component.scss']
})

export class AccordionsComponent implements OnInit {

  myForm!: FormGroup;
  fileInput: number[] = [1]; 

  ngOnInit() {
    this.myForm = new FormGroup({
      fileName: new FormControl(''),
      fileInput: new FormControl('')
    });
  }

  onSubmit(form: FormGroup) {
    console.log('Valid?', form.valid); //true or false
    console.log('File Name', form.value.fileName);
    console.log('File Input', form.value.fileInput);
  }

  addFileInput() {
    const newInput = this.fileInput.length + 1;
    this.fileInput.push(newInput);
    const fileInput = this.myForm.get('fileInput')?.value;
    fileInput.push(null);
    this.myForm.patchValue({
      fileInput: fileInput
    });
    this.myForm.get('fileInput')?.updateValueAndValidity();
  }

  removeFileInput(index: number) {
    this.fileInput.splice(index, 1);
    const fileInput = this.myForm.get('fileInput')?.value;
    fileInput.splice(index, 1);
    this.myForm.patchValue({
      fileInput: fileInput
    });
    this.myForm.get('fileInput')?.updateValueAndValidity();
  }

  onFileChange(event: any, index: number) {
    const files = event.target.files;
    const fileInput = this.myForm.get('fileInput')?.value;
    fileInput[index - 1] = files;
    this.myForm.patchValue({
      fileInput: fileInput
    });
    this.myForm.get('fileInput')?.updateValueAndValidity();
  }

  items = [1, 2, 3, 4];

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  getAccordionBodyText(value: string) {
    const textSample = `
      <strong>This is the <mark>#${value}</mark> item accordion body.</strong> It is hidden by
      default, until the collapse plugin adds the appropriate classes that we use to
      style each element. These classes control the overall appearance, as well as
      the showing and hiding via CSS transitions. You can modify any of this with
      custom CSS or overriding our default variables. It&#39;s also worth noting
      that just about any HTML can go within the <code>.accordion-body</code>,
      though the transition does limit overflow.
    `;
    return this.sanitizer.bypassSecurityTrustHtml(textSample);
  }
}
