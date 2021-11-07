import { ActivatedRoute } from '@angular/router';
import { KeyFeatures } from './../keyfeatures.model';
import { KeyService } from './../keyfeatures.service';
import { NgForm } from '@angular/forms';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-keyfeatures-edit',
  templateUrl: './keyfeatures-edit.component.html',
  styleUrls: ['./keyfeatures-edit.component.css']
})
export class KeyfeaturesEditComponent implements OnInit {
  editMode: boolean = false;
  editFeatureId: string;
  afteredit: EventEmitter<boolean>;
  aFId: string;

  keyFeatures: KeyFeatures = {
    keyfeatures: '',
    appFeatureId: '',
    id: null,
    editMode: null,
  }

  constructor(public bsModalRef: BsModalRef, private keyservice: KeyService, private route: ActivatedRoute) {
    this.afteredit = new EventEmitter();
  }

  ngOnInit(): void {

  }

  onSubmit(form: NgForm) {
    let data: KeyFeatures = form.value;
    data.appFeatureId = this.aFId;

    if (this.editMode) {
      this.keyservice.Update(this.editFeatureId, data)
        .subscribe(res => {
          this.afteredit.emit(true);
        })
    }
    else {
      this.keyservice.Add(data)
        .subscribe(res => {
          this.afteredit.emit(true);
        }
        )
    }
    this.bsModalRef.hide();
    form.resetForm();
  }

  loadFeature(feature: KeyFeatures, mode: boolean) {
    this.keyFeatures = feature;
    this.editFeatureId = this.keyFeatures.id,
      this.editMode = mode;
  }
  
  loadwithFeatureId(appFeatureId: string) {
    this.aFId = appFeatureId;
    console.log("afid", this.aFId)
  }
  onCancel() {
    this.bsModalRef.hide();
  }
}
