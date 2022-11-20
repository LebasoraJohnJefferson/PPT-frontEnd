import { Component, OnInit,Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { HeaderService } from 'src/app/service/header.service';
import { environment } from 'src/environments/environment';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() section:string = ''
  data:any=[]
  private _searchDataSubscription:Subscription = new Subscription()
  defaultProfile = environment.default_profile
  hostingName = environment.baseURL

  searchFormGroup: FormGroup = this._formBuilder.group({
    searchName:['',[Validators.required]],
  });


  constructor(
    private _headerService:HeaderService,
    private _formBuilder:FormBuilder
  ) { }

  ngOnInit(): void {
  }

  search(){
    if(this.searchFormGroup.valid){
      this._headerService.searchData(this.searchFormGroup.get('searchName')?.value).subscribe((res)=>{
        this.data=res
        console.log(res)
        if(res.projects.length == 0 && res.users.length == 0){
          this.data=[]
        }
      })
    }else{
      this.data = []
      this.searchFormGroup.reset()
    }
  }

  
  
  ngOnDestroy() {
    this._searchDataSubscription.unsubscribe()
  }



}
