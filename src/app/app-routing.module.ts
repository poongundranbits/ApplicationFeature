import { FaqComponent } from './faq/faq.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeaturesComponent } from './features/features.component';
import { FeatureDetailsComponent } from './feature-details/feature-details.component';

const routes: Routes = [
  { path: '', component: FeaturesComponent },
  // {path: 'features', component: FeaturesComponent},
  { path: 'feature-details/:id', component: FeatureDetailsComponent },
  { path: 'faq', component: FaqComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
