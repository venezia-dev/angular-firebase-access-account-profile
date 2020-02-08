import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['../../../themes/card.scss']
})
export class ProfileComponent implements OnInit {

  isLoggedIn: boolean;
  email: string;
  dateCreation: string;
  lastSignin: string;
  imageUrl: string;
  name: string;

  constructor(
    public UserService: UserService,
    private toastr: ToastrService
  ) { }


  ngOnInit() {
    this.UserService.getAuth().subscribe(auth => {
      if (auth) {
        this.isLoggedIn = true;
        this.name = auth.displayName;
        this.email = auth.email;
        this.dateCreation = auth.metadata.creationTime;
        this.lastSignin = auth.metadata.lastSignInTime;
        this.imageUrl = auth.photoURL;
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }

}