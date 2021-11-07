import { ExampleService } from './example.service';
import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent implements OnInit {
  selectedImage:any = null;
  private basePath = '/images';
  // file: File;
  url = '';
  @ViewChild('fileupload', {static: false}) 
  Inputfile: ElementRef; 

  constructor(private af: AngularFireStorage, private ser: ExampleService) { }

  ngOnInit(): void {
  }
  onFileSelected(event){
  if(event.target.files && event.target.files[0]){
    this.selectedImage = event.target.files[0];
  } 
  else{
    this.selectedImage =null;
  }  
  }

onUpload(){
    console.log('onupload', this.selectedImage);

    if (this.selectedImage) {
      var filePath = `${this.basePath}/${this.selectedImage.name}_${new Date().getTime()}`; 
      const fileRef = this.af.ref(filePath);
      this.af.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(()=>{
          fileRef.getDownloadURL().subscribe((url)=>{
             this.url = url;  //store the URL
              this.ser.insertImageDetails(this.url);
             console.log("URL",this.url);
          })
        })
      ).subscribe();   
      // this.getUrl(snap);
      this.Inputfile.nativeElement.value = ""; 
    }
     else {alert('Please select an image'); 
    }
  }
}
