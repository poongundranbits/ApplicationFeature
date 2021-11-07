import { ExampleService } from './example/example.service';
import { FeaturesService } from './../features/features.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ApplicationFeature } from '../features/features.model';

@Component({
  selector: 'app-feature-details',
  templateUrl: './feature-details.component.html',
  styleUrls: ['./feature-details.component.css']
})
export class FeatureDetailsComponent implements OnInit {
  currentItem: ApplicationFeature[];
  oneAtATime = true;
  isFetching = true;
  receivedId: string;
  activeblock = 'One';

  imageList: any[];
  // rowIndexArray: any[];

  isActive = (name: string) => this.activeblock === name;
  setActive = (name: string) => this.activeblock = name;

  constructor(private ser: ExampleService, private router: Router, private featuresService: FeaturesService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.receivedId = this.route.snapshot.params['id'];

    this.ser.getImageDetailList();
    this.ser.imageDetailList.snapshotChanges().subscribe(
      list => {
        this.imageList = list.map(item => { return item.payload.val(); });
        // this.rowIndexArray = Array.from(Array(Math.ceil(this.imageList.length / 3)).keys());
      }
    );

    this.isFetching = true;
    this.featuresService.onFetchbyId(this.receivedId)
      .subscribe(data => {
        this.currentItem = data as Array<ApplicationFeature>;
        console.log("appfeature", this.currentItem);
        this.isFetching = false;
      })
  }

  goOnFeatues() {
    this.router.navigateByUrl('');
  }

}
