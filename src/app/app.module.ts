// Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { MaterialModule } from './material/material.module';

// Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Translate
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';

// Environment
import { environment } from '../environments/environment';

// Components
import { AppComponent } from './app.component';
import { TermsComponent } from './components/dialog/terms/terms.component';
import { FooterComponent } from './components/footer/footer.component';
import { SigninComponent } from './components/user/signin/signin.component';
import { SignupComponent } from './components/user/signup/signup.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';
import { AuthGuard } from './auth/auth.guard';
import { UserService } from './services/user.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    ProfileComponent,
    NotFoundComponent,
    //Dialogs
    TermsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firestore, 'angular-accesodecuenta-perfil'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MaterialModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    })
  ],
  providers: [UserService, AuthGuard, {provide: FirestoreSettingsToken, useValue:{}}],
  bootstrap: [AppComponent],
  entryComponents: [TermsComponent]
})
export class AppModule { }
