import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app-service/app.service';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss']
})
export class AllUsersComponent {
  allUsers: any =[];
  userValue: any =[];
  spinner:boolean = false;
  btnSpinner:boolean = false;
  modelBox: boolean = false;
  modelBoxForm: boolean = false;
  openModelFor: boolean = false;
  editMode: boolean = true;
  viewModelBox: boolean = false;
  userData!: any;

  constructor(
    private _appServ:AppService,
    private router: Router
  ){}

  ngOnInit(): void {
    this.getUser();
  }

  getUser(){
    this._appServ.getUser().subscribe(res => { 
        this.allUsers = res;
        this.spinner = true;
      },
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    )
  }

  closeModelBox(){
    this.modelBox = false;
    this.openModelFor = false;
    this.modelBoxForm = false;
    this.editMode = true;
    this.viewModelBox = false;
  }


  
  deleteModelOpen(data:any) {
    this.modelBox = true;
    this.openModelFor = true;
    this.userData = data;
  }

  deleteUser(){
    this.btnSpinner = true;
    this._appServ.deleteUser(this.userData._id).subscribe(res=>{
      console.log("This user is Deleted!")
      this.getUser();
      this.modelBox = false;
      this.btnSpinner = false;
    }, err => {
      console.log(err, "Something error!")
    })
    this.openModelFor = false;
    this.editMode = true;
  }


  viewUserModel(data:any){
    this.viewModelBox = true;
    this.userValue = data;
  }


  editUserModel(data:any){
    this.modelBox = true;
    this.editMode = false;
    this.openModelFor = true;
    this.userData = data;
  }

  editUser(){
    this.router.navigateByUrl(`/edit-user/${this.userData._id}`);
    // this._appServ._editUser.next(this.userData);
    this.modelBox = false;
    this.openModelFor = false;
    this.modelBoxForm = false;
    this.editMode = true;
  }

}
