import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  id_discussion: string = ""
  id_user: string = ""
  constructor( private route:Router) {
    
  }

  ngOnInit() {
  }

  save()
  {
    sessionStorage.setItem("discussion",this.id_discussion)
    sessionStorage.setItem("user",this.id_user)
    if (this.id_discussion && this.id_user) {
      this.route.navigate(['/home'])
    }
  }

}
