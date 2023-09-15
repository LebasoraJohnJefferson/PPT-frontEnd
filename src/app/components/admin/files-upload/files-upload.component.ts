import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/service/admin.service';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { EventEmitterService } from 'src/app/service/event-emitter.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.css']
})
export class FilesUploadComponent implements OnInit {
  files:any=['','']
  fileId:number=-1;
  fileName:string='';
  isDelFile:boolean = false
  defaultImg:string = environment.default_profile
  private _getAllFilesSubscription:Subscription = new Subscription()
  private _deleteFilesSubscription:Subscription = new Subscription()


  constructor(
    private _adminService:AdminService,
    private toastr:ToastrService,
    private _eventEmitterService:EventEmitterService
  ) { }

  ngOnInit(): void {
    this.getAllFiles()
  }

  getAllFiles(){
    this._getAllFilesSubscription = this._adminService.getAllFiles().subscribe((res)=>{
      this.files = res
      console.log(this.files)
    })
  }

  deleteFile(fileId:number,fileName:string){
    this.fileName= fileName
    this.fileId = fileId
    this.isDelFile = true
  }

  closeDelFile(){
    this.isDelFile = false
  }

  commitDeleteFile(){
    this._deleteFilesSubscription = this._adminService.deleteFileById(this.fileId).subscribe(()=>{
      this.toastr.success(`Successfully deleted the file name ${this.fileName}`)
      this.isDelFile = false
      this.getAllFiles()
      this._eventEmitterService.getAllProjectInAdmin()
    },(err)=>{
      this.toastr.warning(err.error.detail)
    })
  }

  ngOnDestroy(){
    this._getAllFilesSubscription.unsubscribe()
    this._deleteFilesSubscription.unsubscribe()
  }

}
