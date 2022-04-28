import { error } from '@angular/compiler/src/util';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup
  aSub: Subscription

  constructor(private auth:AuthService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      user: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required, Validators.minLength(2)]),
    })
  

  this.route.queryParams.subscribe((params:Params)=>{
    if (params['registered']){
      //can pass
    } else if(params['accessDenied']){
      //cant't pass
    }
  })

}

  ngOnDestroy(): void {
    if(this.aSub){
    this.aSub.unsubscribe}
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.login(this.form.value).subscribe(
      () =>  this.router.navigate(['/']),
      error => {
        this.form.enable()
      }
    )
  }
}
