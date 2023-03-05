import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: [ './welcome.component.scss' ]
})
export class WelcomeComponent {
  public env: string = 'Unknown';

  constructor(private router: Router) {
    this.env = environment.env;
  }

  public login(): void {
    this.router.navigate([ '/pages/user-profile' ]).then();
  }

}
