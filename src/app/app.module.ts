import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { AppComponent } from './app.component';
import { PageNotFoundComponent } from './static/not-found';
import { WelcomeComponent } from './static/welcome';
import { DynamicIframeComponent } from './dynamic-iframe/dynamic-iframe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { FormlyModule} from '@ngx-formly/core';
import { FormsComponent } from './forms/forms.component';
import { FormlyFieldImagePixelationInput } from './forms/image-pixelation.component';
import { ImageProcessingInputOutputComponent } from './forms/image-processing-io.component';
import { FormlyFieldCustomInput } from './forms/custom-input.component';

const appRoutes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'dynamic-test', component: DynamicIframeComponent },
  { path: 'forms', component: FormsComponent },
  { path: 'image-pixelation', component: FormlyFieldImagePixelationInput },
  { path: 'image-processing-io', component: ImageProcessingInputOutputComponent },
  { path: '**', component: PageNotFoundComponent }
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
  ],
  imports: [
    BrowserModule,
    FormsModule, 
    ReactiveFormsModule,
    FormlyModule.forRoot({
      validationMessages: [
        { name: 'required', message: 'This field is required' },
      ],
      types: [
        { name: 'custom', component: FormlyFieldCustomInput, wrappers: ['form-field'] },
		{ name: 'image-pixelation', component: FormlyFieldImagePixelationInput,
		defaultOptions: {label: 'test'}}
      ],
    }),
    FormlyBootstrapModule,
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
