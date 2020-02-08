import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['../../../themes/user.scss']
})
export class ForgotPasswordComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private UserService: UserService,
    private toastr: ToastrService
  ) {
    this.form = this.fb.group({
      email: ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  forgotPassword(){
    const val = this.form.value;
    console.log(val);
    this.UserService.ForgotPassword(val.email)
    .then(res => {
      this.router.navigate(['/signin']);
    })
  }

}
