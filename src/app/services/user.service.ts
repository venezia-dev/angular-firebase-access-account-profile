import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { User } from '../model/user.model';
import { auth } from 'firebase';
import { ToastrService } from 'ngx-toastr';

@Injectable()

export class UserService {

    userData: any;

    constructor(
        private authService: AngularFireAuth,
        private afs: AngularFirestore,
        private toastr: ToastrService,
        private router: Router,
        private ngZone: NgZone) { }

    // Login
    SignIn(email: string, password: string) {
        return this.authService.auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['/']);
                    this.toastr.success('Perfect!', 'Login')
                });
                this.SetUserData(result.user);
            }).catch((error) => {
                this.toastr.warning(error);
            })
    }

    // SignUp
    SignUp(email: string, password: string, name: string) {
        return this.authService.auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                this.SendVerificationMail();
                result.user.updateProfile({
                    displayName: name,
                    photoURL: ''
                })
                setTimeout(() => {
                    this.SetUserData(result.user);
                }, 1000);
            }).catch((error) => {
                this.toastr.warning(error);
            })
    }

    // Send confirmation mail to new users
    SendVerificationMail() {
        return this.authService.auth.currentUser.sendEmailVerification()
            .then(() => {
                this.toastr.success('Sent!', 'Confirmation email')
            }).catch((error) => {
                this.toastr.warning(error)
            })
    }

    // Password reset, forget password or change.
    ForgotPassword(passwordResetEmail) {
        return this.authService.auth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                this.toastr.success('Sent!', 'Password reset email');
            }).catch((error) => {
                this.toastr.warning(error)
            })
    }

    // Signin con google
    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    //  Authentication logic to run authentication providers.
    AuthLogin(provider) {
        return this.authService.auth.signInWithPopup(provider)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['dashboard']);
                })
                this.SetUserData(result.user);
            }).catch((error) => {
                window.alert(error)
            })
    }

    // User status
    getAuth() {
        return this.authService.authState.pipe(
            map(auth => auth)
        )
    }

    // Save in database firebase the data of the registered user or control the initiated.
    SetUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        }
        return userRef.set(userData, {
            merge: true
        })
    }

    // Logout
    logout() {
        return this.authService.auth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['/signin']);
        })
    }

}