import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';      

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['../../../themes/user.scss']
})
export class SigninComponent implements OnInit {

  form: FormGroup;
  user = {}

  constructor(private fb: FormBuilder, public UserService: UserService,
    private router: Router,
    private toastr: ToastrService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.UserService.getAuth().subscribe(auth => {
      if(auth){
        this.router.navigate(['/']);
      }
    })
  }

  signIn(){
    const val = this.form.value;
    this.UserService.SignIn(val.email, val.password)
  }   

}
