import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TermsComponent } from '../../dialog/terms/terms.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../../themes/user.scss']
})
export class SignupComponent implements OnInit {

  form: FormGroup;


  user = {}


  constructor(
    private fb: FormBuilder, public UserService: UserService,
    private router: Router, public dialog: MatDialog, private toastr: ToastrService
    ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      check: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.UserService.getAuth().subscribe(auth => {
      if (auth) {
        this.router.navigate(['/']);
      }
    })
  }

  termsDialog() {
    this.dialog.open(TermsComponent);
  }

  signUp() {
    const val = this.form.value;
    this.UserService.SignUp(val.email, val.password, val.name);
  }
}