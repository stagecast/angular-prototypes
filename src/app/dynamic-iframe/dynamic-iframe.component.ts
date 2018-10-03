import { Component, OnInit } from '@angular/core';
import { preview } from "./preview";
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder } from "@angular/forms";

import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-dynamic-iframe',
  templateUrl: './dynamic-iframe.component.html',
  styleUrls: ['./dynamic-iframe.component.css']
})
export class DynamicIframeComponent implements OnInit {
  public dynamicForm: FormGroup; 
  public injectedView; 

  constructor(private sanitizer: DomSanitizer, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.dynamicForm = this.formBuilder.group({
      formTitle: [''], 
      firstname: [''],
      lastname: [''],
      text: ['']
    });

    this.dynamicForm
      .valueChanges
      .pipe(debounceTime(700))
      .subscribe(value => {
      this.updatePreview(value);
    });

    this.injectedView = this.sanitizer.bypassSecurityTrustHtml(preview);
  }

  updatePreview(values) {
    console.log(values);
    let newPreview = preview; 
    for(let key in values) {
      console.log(key, values);
      var regex = new RegExp("\\$" + key);
      console.log(regex);
      newPreview = newPreview.replace(regex, values[key]);
    }
    this.injectedView = this.sanitizer.bypassSecurityTrustHtml(newPreview);
  }
}
