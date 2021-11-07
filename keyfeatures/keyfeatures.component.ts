import { ActivatedRoute } from '@angular/router';
import { KeyfeaturesEditComponent } from './keyfeatures-edit/keyfeatures-edit.component';
import { Component, OnInit, Input } from '@angular/core';
import { KeyFeatures } from './keyfeatures.model';
import { KeyService } from './keyfeatures.service';
import { map } from 'rxjs/operators';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-keyfeatures',
  templateUrl: './keyfeatures.component.html',
  styleUrls: ['./keyfeatures.component.css']
})
export class KeyfeaturesComponent implements OnInit {
  keyFeatures: KeyFeatures[] = [];
  bsModalRef: BsModalRef;
  isFetching = false;
  editMode: boolean = true;

  @Input() receivedId: string;

  constructor(private keyservice: KeyService, private modalService: BsModalService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.isFetching = true;
    this.onFetch();

    console.log("appid", this.receivedId)
  }

  openModalWithComponent(receivedId: string) {
    this.bsModalRef = this.modalService.show(KeyfeaturesEditComponent);
    const adddata = this.bsModalRef.content as KeyfeaturesEditComponent;

    adddata.afteredit.subscribe(res => {
      this.onFetch();
      console.log("appFeatureId", receivedId)
    })
    adddata.loadwithFeatureId(this.receivedId);
  }


  onEditKeyFeature(keyfeat : KeyFeatures)
  {
    const editModal = this.modalService.show(KeyfeaturesEditComponent);
    const feature = editModal.content as KeyfeaturesEditComponent;
    feature.loadFeature(keyfeat , this.editMode);
    feature.afteredit.subscribe((item) => {
      if (item) {
        this.onFetch();
      }
    });
    feature.loadwithFeatureId(this.receivedId);  
  }


  onFetch() {
    this.isFetching = true;
    this.keyservice.Fetch()
      .pipe(map(resData => {
        const keyfeatureArray = [];
        for (const key in resData) {
          if (resData.hasOwnProperty(key)) {
            keyfeatureArray.push({ id: key, ...resData[key] })
          }
        }
        console.log("key", keyfeatureArray)
        return keyfeatureArray
      }))
      .subscribe(data => {
        this.isFetching = false;
        this.keyFeatures = data as Array<KeyFeatures>;
      })
  }

  onDelete(id) {
    if (confirm('Do you want to delete it?')) {
      this.keyservice.Delete(id).subscribe(() => {
        this.onFetch();
      })
    }
  }

}
