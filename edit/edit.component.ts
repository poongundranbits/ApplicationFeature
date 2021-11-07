import { NgForm } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FeaturesService } from '../features.service';
import { ApplicationFeature } from '../features.model';
import { ColorEvent } from 'ngx-color';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  title: string = 'Application Feature';
  editMode: boolean = false;
  editFeatureId: string;
  afteredit: EventEmitter<boolean>;
  titleColor: string;

  applicationFeatures: ApplicationFeature = {
    title: '',
    heading: '',
    subject: '',
    description: '',
    featureType: '',
    expectedRelease: '',
    titleColor: '',
    id: null,
    editMode: null,
  }

  public constructor(public bsModalRef: BsModalRef, private featureService: FeaturesService) {
    this.afteredit = new EventEmitter();
  }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    let data: ApplicationFeature = form.value;
    data.titleColor = this.titleColor;

    if (this.editMode) {
      this.featureService.onUpdate(this.editFeatureId, data)
        .subscribe(res => {
          this.afteredit.emit(true);
        })
    }
    else {
      this.featureService.onAdd(data)
        .subscribe(res => {
          this.afteredit.emit(true);
          console.log("afteradd", data);
        }
        )
    }
    this.bsModalRef.hide();
    form.resetForm();
  }

  loadFeature(feature: ApplicationFeature, mode: boolean) {
    this.applicationFeatures = feature;
    this.editFeatureId = feature.id,
    this.editMode = mode;
  }

  onCancel() {
    this.bsModalRef.hide();
  }
  handleChangeComplete($event: ColorEvent) {
    // console.log($event.color);
    this.titleColor = $event.color.hex;
    console.log("colorafterpicked:", this.titleColor)
  }
}
