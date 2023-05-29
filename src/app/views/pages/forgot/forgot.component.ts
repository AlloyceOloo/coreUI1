import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ForgotService } from '../../../services/forgot.service'; 

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss']
})
export class ForgotComponent implements OnInit {

  cls = '';

  message = '';

  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    //private router: Router,
    private forgotService: ForgotService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
   });
  }

submit() {
  this.forgotService.forgot(this.form.getRawValue()).subscribe({
    next: () => {
      this.cls = 'success';
      this.message = 'Email was sent';
    },
    error: () => {
      this.cls = 'danger';
      this.message = 'Error occurred';
    }
  });
}


}



