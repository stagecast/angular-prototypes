# CustomFormTest

start as usual

go to `localhost:4200/forms` and you should now see two pixelation form elements.

The data of the forms are not store in a good way yet, but serves as a proof of concept for now.

The pixelation component is in two parts: 
1. The image input output component that serves as a reader and displays the results.
2. The pixelation component that communicates the input image and result image to the I/O component. The input image is read and pixelated and then sent back to the output of the I/O component.

# MyApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
