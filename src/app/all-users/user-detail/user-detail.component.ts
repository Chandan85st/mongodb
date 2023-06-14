import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppService } from 'src/app/app-service/app.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  key = this.activatedRoute.snapshot.params['id'];
  userData: any = [];

  constructor(
    private _appServ:AppService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){}

  ngOnInit(): void {
    console.log()
    this._appServ.getSingleUser(this.key).subscribe(res => { 
      this.userData = res
    },
    err => console.log('HTTP Error', err),
    () => console.log('HTTP request completed.')
    )
  }


}
