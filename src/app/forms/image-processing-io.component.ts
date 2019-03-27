import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({selector: 'image-processing-io', templateUrl: `image-processing-io.component.html`})

export class ImageProcessingInputOutputComponent extends FieldType {

  @ViewChild('input_canvas')input_canvas : any;
  @ViewChild('output_canvas')output_canvas : any;

  imageInputDescription = 'process image:';
  showInput = true;

  @Input('output_image')set output_image(value : ImageData) {
    console.log('Output image value', value);
    this.displayOutputImage(this, value);
  }

  @Output()input_image : EventEmitter < ImageData > = new EventEmitter();

  @Input()canvas_max_height = 100;
  @Input()canvas_max_width = 100;

  displayOutputImage(context, imageData) {
    if (!imageData) {
      return;
    }

    const image : any = document.createElement('IMG');

    image.onload = function () {
      let canvasWidth = 0;
      let canvasHeight = 0;

      const imageRatio = image.width / image.height;
      const canvasMaxRatio = context.canvas_max_width / context.canvas_max_height;

      if (imageRatio > canvasMaxRatio) {
        canvasWidth = context.canvas_max_width;
        canvasHeight = context.canvas_max_width / imageRatio;
      } else {
        canvasHeight = context.canvas_max_height;
        canvasWidth = context.canvas_max_height * imageRatio;
      }

      context.output_canvas.nativeElement.style.width = canvasWidth + 'px';
      context.output_canvas.nativeElement.style.height = canvasHeight + 'px';

      context.output_canvas.nativeElement.width = image.width;
      context.output_canvas.nativeElement.height = image.height;
      const ctx = context
        .output_canvas
        .nativeElement
        .getContext('2d');

      ctx.drawImage(image, 0, 0);
    };

    image.src = imageData;
  }

  loadImageDataFromInputField(input : any, callback : Function) {
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = function (event : any) {
        console.log('Reader onload:', event);
        const image = new Image();
        image.onload = function () {
          console.log('Image in', image);
          callback(image);
        };
        image.src = event.target.result;
      };
      console.log('Reading url...');
      reader.readAsDataURL(input.files[0]);
    }
  }

  displayPreview(context, image) : void {
    let canvasWidth = 0;
    let canvasHeight = 0;

    const imageRatio = image.width / image.height;
    const canvasMaxRatio = context.canvas_max_width / context.canvas_max_height;

    if (imageRatio > canvasMaxRatio) {
      canvasWidth = context.canvas_max_width;
      canvasHeight = context.canvas_max_width / imageRatio;
    } else {
      canvasHeight = context.canvas_max_height;
      canvasWidth = context.canvas_max_height * imageRatio;
    }

    context.input_canvas.nativeElement.style.width = canvasWidth + 'px';
    context.input_canvas.nativeElement.style.height = canvasHeight + 'px';

    context.input_canvas.nativeElement.width = image.width;
    context.input_canvas.nativeElement.height = image.height;
    const ctx = context
      .input_canvas
      .nativeElement
      .getContext('2d');
    ctx.drawImage(image, 0, 0);
  }

  onImageFileChanged(event : any) {

    const context = this;
    this.loadImageDataFromInputField(event.srcElement, function (imageData) {
      console.log('Sending data');
      context
        .input_image
        .emit(imageData);
      context.displayPreview(context, imageData);
    });
    console.log(event);
  }
}
