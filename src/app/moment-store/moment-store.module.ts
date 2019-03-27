import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Routes, RouterModule} from '@angular/router';
import {MomentStoreComponent} from './home.component';
import {MomentStoreHomeComponent} from './moment-store-home/moment-store-home.component';
import {StoreSidebarComponent} from './store-sidebar/store-sidebar.component';
import {MomentStoreResultsComponent} from './moment-store-results/moment-store-results.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {StoreTemplateCardComponent} from './store-template-card/store-template-card.component';
import {MomentBundleComponent} from './moment-bundle/moment-bundle.component';
import {TemplateDescComponent} from './template-desc/template-desc.component';

const routes : Routes = [
  {
    path: '',
    component: MomentStoreComponent,
    data: {
      animation: 'HomePage'
    },
    children: [
      {
        path: '',
        component: MomentStoreHomeComponent
      }, {
        path: 'results',
        component: MomentStoreResultsComponent
      }, {
        path: 'bundles/:bid',
        component: MomentBundleComponent
      }
    ]
  }, {
    path: 'moment-info/:tid',
    component: TemplateDescComponent,
    data: {
      animation: 'AboutPage'
    }
  }
]

@NgModule({
  imports: [
    CommonModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)
  ],
  declarations: [
    MomentStoreComponent,
    MomentStoreHomeComponent,
    StoreSidebarComponent,
    MomentStoreResultsComponent,
    StoreTemplateCardComponent,
    MomentBundleComponent,
    TemplateDescComponent
  ]
})
export class MomentStoreModule {}
