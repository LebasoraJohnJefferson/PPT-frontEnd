import { Component, OnInit,Output,EventEmitter,Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ToDosService } from 'src/app/service/to-dos.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.css']
})
export class UploadFilesComponent implements OnInit {
  @Output() isUploadClose:EventEmitter<any> = new EventEmitter()
  @Input() activityID:any;

  private _uploadFiles:Subscription = new Subscription()
  private _getUploadFiles:Subscription = new Subscription()
  
  fileName:string = ''
  uploadFile:any=[];
  allFiles = []
  isSubmitting:boolean = false

  constructor(
    private _toDosService:ToDosService,
    public toastr:ToastrService
  ) { 
  }
  
  ngOnChanges(){
    this.getAllUploadedFile()
  }

  getAllUploadedFile(){
    this._getUploadFiles = this._toDosService.getAllUploadedFile(this.activityID).subscribe((res)=>{
      this.allFiles = res
    })
  }


  ngOnInit(): void {

  }

  closeUpload(){
    this.isUploadClose.emit()
  }

  onChange(event:any){
    if(event.target.files[0]){
      this.uploadFile = event.target.files[0]
      this.fileName = this.uploadFile.name
    }
  }


  SubmitFiles(){
    this.isSubmitting = true
    if(this.fileName.length != 0 ){
      this._uploadFiles = this._toDosService.uploadFiles(this.activityID,this.uploadFile,{
        'activityId':this.activityID,
        'fileName':this.fileName}
      ).subscribe(()=>{
        this.getAllUploadedFile()
        this.fileName = ''
        this.toastr.success("Successfully Uploaded")
        this.isSubmitting = false
      },(err)=>{
        this.toastr.warning(err.error.detail)
        this.fileName = ''
        this.isSubmitting = false
      })
    }else{
      this.toastr.warning("No Files Found")
      this.isSubmitting = false
    }
  }

  ngOnDestroy(){
    this._uploadFiles.unsubscribe()
    this._getUploadFiles.unsubscribe()
  }

}
