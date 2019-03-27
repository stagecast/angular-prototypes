import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './static/not-found';
import {WelcomeComponent} from './static/welcome';
import {DynamicIframeComponent} from './dynamic-iframe/dynamic-iframe.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import {FormlyModule} from '@ngx-formly/core';
import {FormsComponent} from './forms/forms.component';
import {FormlyFieldImagePixelationInput} from './forms/image-pixelation.component';
import {ImageProcessingInputOutputComponent} from './forms/image-processing-io.component';
import {FormlyFieldCustomInput} from './forms/custom-input.component';
import {StoreModalComponent} from './store-modal/store-modal.component';

const appRoutes : Routes = [
  {
    path: 'welcome',
    component: WelcomeComponent,
    children: [// {   path: 'test',   loadChildren:
      // './moment-store/moment-store.module#MomentStoreModule',   outlet: 'modal' },
      {
        path: 'store',
        component: StoreModalComponent,
        outlet: 'modal',
        children: [
          {
            path: '',
            loadChildren: './moment-store/moment-store.module#MomentStoreModule'
          }
        ]
      }
    ]
  }, {
    path: 'dynamic-test',
    component: DynamicIframeComponent
  }, {
    path: 'forms',
    component: FormsComponent
  }, {
    path: 'image-pixelation',
    component: FormlyFieldImagePixelationInput
  }, {
    path: 'image-processing-io',
    component: ImageProcessingInputOutputComponent
  }, {
    path: 'moment-store',
    loadChildren: './moment-store/moment-store.module#MomentStoreModule'
  }, {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    WelcomeComponent,
    DynamicIframeComponent,
    FormlyFieldCustomInput,
    FormsComponent,
    FormlyFieldImagePixelationInput,
    ImageProcessingInputOutputComponent,
    StoreModalComponent
  ],
  imports: [
    BrowserModule, FormsModule, ReactiveFormsModule, FormlyModule.forRoot({
      validationMessages: [
        {
          name: 'required',
          message: 'This field is required'
        }
      ],
      types: [
        {
          name: 'custom',
          component: FormlyFieldCustomInput,
          wrappers: ['form-field']
        }, {
          name: 'image-pixelation',
          component: FormlyFieldImagePixelationInput,
          defaultOptions: {
            templateOptions: {
              label: 'test'
            }
          }
        }
      ]
    }),
    FormlyBootstrapModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
