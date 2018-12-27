import {Component, OnInit} from '@angular/core';
import { CREATE_USER_MUTATION, SIGNIN_USER_MUTATION, CreateUserMutationResponse, SignInMutationResponse } from "../graphql";
import { AuthService } from "../auth.service";
import { Apollo } from "apollo-angular";
import { Router } from "@angular/router";
import { GC_USER_ID, GC_AUTH_TOKEN } from "../constants";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  login: boolean = true; // switch between Login and SignUp
  email: string = '';
  password: string = '';
  name: string = '';

  constructor(private authService: AuthService, private apollo: Apollo, private router: Router) {
  }

  ngOnInit() {
  }

  confirm() {
    if (this.login) {
      this.apollo.mutate({
        mutation: SIGNIN_USER_MUTATION,
        variables: {
          email: this.email,
          password: this.password
        }
      }).subscribe((result) => {
        const id = result.data.login.user.id;
        const token = result.data.login.token;
        this.saveUserData(id, token);

        this.router.navigate(['/']);

      }, (error) => {
        alert(error)
      });
    } else {
      this.apollo.mutate({
        mutation: CREATE_USER_MUTATION,
        variables: {
          name: this.name,
          email: this.email,
          password: this.password
        }
      }).subscribe((result) => {
        const id = result.data.signup.user.id;
        const token = result.data.signup.token;
        this.saveUserData(id, token);

        this.router.navigate(['/']);

      }, (error) => {
        alert(error)
      })
    }
  }

  saveUserData(id, token) {
    localStorage.setItem(GC_USER_ID, id);
    localStorage.setItem(GC_AUTH_TOKEN, token);
    this.authService.setUserId(id);
  }
}
