import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ColorSliderModule } from "ngx-color/slider";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { FeaturesComponent } from './features/features.component';
import { FeatureDetailsComponent } from './feature-details/feature-details.component';
import { KeyfeaturesComponent } from './feature-details/keyfeatures/keyfeatures.component';
import { FaqComponent } from './faq/faq.component';
import { KeyfeaturesEditComponent } from './feature-details/keyfeatures/keyfeatures-edit/keyfeatures-edit.component';
import { FaqEditComponent } from './faq/faq-edit/faq-edit.component'
import { ExampleComponent } from './feature-details/example/example.component';
import { EditComponent } from './features/edit/edit.component';

@NgModule({
  declarations: [
    AppComponent,
    FeaturesComponent,
    FeatureDetailsComponent,
    KeyfeaturesComponent,
    EditComponent,
    FaqComponent,
    ExampleComponent,
    KeyfeaturesEditComponent,
    FaqEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ModalModule.forRoot(),
    AccordionModule.forRoot(),
    BrowserAnimationsModule,
    ColorSliderModule,

    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
