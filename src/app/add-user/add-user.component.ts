import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AppService } from '../app-service/app.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  userForm: FormGroup | any;
  editUserImage:boolean = false;
  submitted:boolean = false;
  userData :any;
  imgUrl:any;
  imageName: any;
  // thumbnailurl:any = '../../assets/dummy-image-300x298.jpg';
  data: any = [];
  key = this.activatedRoute.snapshot.params['id'];
  

  constructor(
    private fb: FormBuilder,
    private _appServ:AppService,
    private activatedRoute: ActivatedRoute
  ){ }

  get f() : { [key: string]: AbstractControl }{ return this.userForm.controls; }

  ngOnInit(): void {

    if(this.key){
      this._appServ.getSingleUser(this.key).subscribe(res => {
        this.data = res;
        this.userForm.patchValue({
          firstName: this.data.firstName,
          middelName: this.data.middelName,
          lastName: this.data.lastName,
          candidateAge: this.data.candidateAge,
          gender: this.data.gender,
          emailId: this.data.emailId,
          contactNumber: this.data.contactNumber,
          jobLocation: this.data.jobLocation,
          skills: this.data.skills,
          street: this.data.street,
          city: this.data.city,
          state: this.data.state,
          zip: this.data.zip,
          content: this.data.content
        })
      })
    }

    this.userForm = this.fb.group({
      firstName: ['',[Validators.required, Validators.minLength(4)]],
      middelName: [''],
      lastName: ['',[Validators.required, Validators.minLength(4)]],
      candidateAge: ['',[Validators.required, Validators.minLength(10)]],
      gender: ['',[Validators.required]],
      emailId: ['',[Validators.required, Validators.email]],
      contactNumber: ['',[Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
      street: ['',[Validators.required, Validators.minLength(3)]],
      city: ['',[Validators.required, Validators.minLength(3)]],
      state: ['',[Validators.required]],
      zip: ['',[Validators.required, Validators.maxLength(6)]],
      skills: ['',[Validators.required]],
      jobLocation: ['',[Validators.required]],
      content: ['']
    })
  }

  resetForm(){
    this.userForm.reset();
  }

  submitForm(): void {
    this.submitted = true;
    if(this.userForm.valid) {
      if(!this.key){
        this._appServ.createUser(this.userForm.value).subscribe(() => {
          console.log("Created Successfully!");
          this.submitted = false; 
          this.resetForm();
        },
        err => {
          alert(err);
        })
      }
      else {
        this._appServ.editUser(this.key, this.userForm.value).subscribe(() => {
          console.log("Updated Successfully!");
          this.submitted = false; 
          this.resetForm();
        },
        err => {
          alert(err);
        })
      }
    }
  }

}

























  // patchForm(){
  //   const {
  //     id,
  //     userImg,
  //   } = this.userData;
  //   this.userForm.patchValue({
  //     id,
  //     userImg,
  //   })
  // }

  // onSelectFile(event:any) {
  //   if (event.target.files && event.target.files[0]) {
  //     var reader = new FileReader();
  //     // read file as data url
  //     reader.readAsDataURL(event.target.files[0]);
  //     // called once readAsDataURL is completed
  //     reader.onload = (event) => {
  //       this.imgUrl = event.target?.result;
  //     }
  //   }
  //   this.imageName = event.target.files[0].name;
  // }



    // this.userForm.get('editImage')?.disable();
    // this.userForm.value.userImg = this.imgUrl;





    // submitForm(): void {
    //   this.submitted = true;
    //   if(this.userForm.valid){
    //     this._appServ.editUser(this.userForm.value).subscribe(res=>{
    //     this.submitted = false;
    //     this.imgUrl = this.thumbnailurl;
    //     this.resetForm();
    //   },
    //   error => {
    //     alert(error);
    //   })
    //   } else if (this.userForm.valid) {
    //     this._appServ.createUser(this.userForm.value).subscribe(res=>{
    //       console.log("Created Successfully!");
    //       this.submitted = false; 
    //       this.imgUrl = this.thumbnailurl;
    //       this.resetForm();
    //     },
    //     error => {
    //       alert(error);
    //     })
    //   }
    // }














    // id: [],
    // editImage: [''],
    // userImg: ['',[Validators.required]],
    // Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')
    // Validators.maxLength(10), Validators.minLength(10)

    // this._appServ.getUserDataSubject.subscribe((res:any)=>{
    //   this.userData = res;
    //   this.patchForm();
    // })

    // this.imgUrl = this.thumbnailurl;
    // if(this.userData){
    //   this.imgUrl = this.userForm.value.userImg;
    // }