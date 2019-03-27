import {Component, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig, FormlyFormOptions} from '@ngx-formly/core';

@Component({selector: 'app-forms', templateUrl: './forms.component.html', styleUrls: ['./forms.component.css']})
export class FormsComponent implements OnInit {

  form = new FormGroup({});
  model : any = {};
  options : FormlyFormOptions = {
    formState: {
      awesomeIsForced: false
    }
  };
  fields : FormlyFieldConfig[] = [
    {
      key: 'text',
      type: 'input',
      templateOptions: {
        label: 'Text',
        placeholder: 'Formly is terrific!',
        required: true
      }
    }, {
      key: 'nested.story',
      type: 'textarea',
      templateOptions: {
        label: 'Some sweet story',
        placeholder: 'It allows you to build and maintain your forms with the ease of JavaScript :-)',
        description: ''
      },
      expressionProperties: {
        'templateOptions.focus': 'formState.awesomeIsForced',
        'templateOptions.description': (model, formState) => {
          if (formState.awesomeIsForced) {
            return 'And look! This field magically got focus!';
          }
        }
      }
    }, {
      key: 'awesome',
      type: 'checkbox',
      templateOptions: {
        label: ''
      },
      expressionProperties: {
        'templateOptions.disabled': 'formState.awesomeIsForced',
        'templateOptions.label': (model, formState) => {
          if (formState.awesomeIsForced) {
            return 'Too bad, formly is really awesome...';
          } else {
            return 'Is formly totally awesome? (uncheck this and see what happens)';
          }
        }
      }
    }, {
      key: 'whyNot',
      type: 'textarea',
      expressionProperties: {
        'templateOptions.placeholder': (model, formState) => {
          if (formState.awesomeIsForced) {
            return 'Too bad... It really is awesome! Wasn\'t that cool?';
          } else {
            return 'Type in here... I dare you';
          }
        },
        'templateOptions.disabled': 'formState.awesomeIsForced',
        'templateOptions.onChange': (event) => {
          console.log(event);
          if (typeof(event.whyNot) != 'undefined') {
            this.options.formState.awesomeIsForced = true;
            this.model.awesome = true;
          }
        }
      },
      hideExpression: 'model.awesome',
      templateOptions: {
        label: 'Why Not?',
        placeholder: 'Type in here... I dare you'
      }
    }, {
      key: 'formly-field-custom-input',
      type: 'custom',
      templateOptions: {
        label: 'Custom inlined'
      }
    }, {
      key: 'pixelationField',
      type: 'image-pixelation'
    }, {
      key: 'pixelationField2',
      type: 'image-pixelation'
    }
  ];

  constructor() {}
  ngOnInit() {}

  submit(model) {
    console.log(model);
  }

}
