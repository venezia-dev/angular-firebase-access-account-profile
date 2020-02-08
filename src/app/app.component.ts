import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'accessaccountprofile';
  constructor(
    public UserService: UserService,
    private router: Router,
    private toastr: ToastrService,
    private translate: TranslateService
    ){
      this.translate.setDefaultLang(this.activeLang);
    }

  isLoggedIn: boolean;
  nameUser: string;
  emailConfirm: boolean;
  imageName: any;
  otherTheme: boolean = false;
  activeLang = 'es';

  ngOnInit() {
    this.UserService.getAuth().subscribe( auth => {
      if(auth){
        this.isLoggedIn = true;
        this.nameUser = auth.displayName;
        console.log(auth.emailVerified);
        if (!auth.emailVerified){
          this.emailConfirm = true;
        } else {
          this.emailConfirm = false;
        }
      }
      else {
        this.isLoggedIn = false;
      }
    });
  }

  changeTheme(){
    this.otherTheme = !this.otherTheme;
  }

  logout(){
    this.UserService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/signin']);
  }

  cambiarLenguaje(lang) {
    this.activeLang = lang;
    this.translate.use(lang);
  }
}
