import {Component, ViewChild, ElementRef} from '@angular/core';
import {FieldType} from '@ngx-formly/core';

@Component({selector: 'formly-field-image-pixelation-input', templateUrl: `image-pixelation.component.html`})
export class FormlyFieldImagePixelationInput extends FieldType {

  @ViewChild('image_io')image_io : any;

  get type() {
    return this.to.type || 'file';
  }

  getImageData(image) {

    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;

    canvas.style.width = 'px';

    const context = canvas.getContext('2d');
    context.drawImage(image, 0, 0);

    return context.getImageData(0, 0, image.width, image.height);
  }

  getPixel(imageData, x, y) {
    const position = (x + imageData.width * y) * 4;
    return {
      r: imageData.data[position],
      g: imageData.data[position + 1],
      b: imageData.data[position + 2],
      a: imageData.data[position + 3]
    };
  }

  createImageObject(imageMatrix) {
    const columns = imageMatrix.length;
    const rows = imageMatrix[0].length;

    const canvas : any = document.createElement('CANVAS');

    canvas.style.height = Math.floor(window.innerHeight * 0.2) + 'px';
    canvas.style.width = Math.floor((window.innerHeight * 0.2) * columns / rows) + 'px';

    canvas.width = columns;
    canvas.height = rows;

    const context = canvas.getContext('2d');

    for (let x = 0; x < columns; ++x) {
      for (let y = 0; y < rows; ++y) {
        if (imageMatrix[x][y] === 1) {
          context.fillStyle = '#FFFFFF';
        } else {
          context.fillStyle = '#000000';
        }
        context.fillRect(x, y, 1, 1);
      }
    }

    return canvas.toDataURL();
  }

  imageTransformation(imageIn, subSampleFactor, cutoffFactor, invertFlag) {
    const outputMatrix = [];
    const columns = Math.floor(imageIn.width / subSampleFactor);
    const rows = Math.floor(imageIn.height / subSampleFactor);

    for (let i = 0; i < columns; ++i) {
      outputMatrix[i] = [];
      for (let j = 0; j < rows; ++j) {
        outputMatrix[i][j] = 0;
      }
    }

    // console.log("Matrix:", outputMatrix);

    const imageData = this.getImageData(imageIn);

    // console.log(getPixel(imageData, imageIn.width/3, imageIn.height/2));

    const numEntries = subSampleFactor * subSampleFactor;
    console.log(numEntries);

    let xCoord = 0;
    let yCoord = 0;
    for (let x = 0; x < imageIn.width && xCoord < columns; x += subSampleFactor) {
      for (let y = 0; y < imageIn.height && yCoord < rows; y += subSampleFactor) {
        let pixelValueR = 0;
        let pixelValueG = 0;
        let pixelValueB = 0;
        for (let i = 0; i < subSampleFactor; ++i) {
          for (let j = 0; j < subSampleFactor; ++j) {
            const pixel = this.getPixel(imageData, x + i, y + j);
            const alphaFactor = pixel.a / 255;
            pixelValueR += pixel.r * alphaFactor;
            pixelValueG += pixel.g * alphaFactor;
            pixelValueB += pixel.b * alphaFactor;
          }
        }

        const meanVal = (pixelValueR + pixelValueG + pixelValueB) / (3 * numEntries);

        try {
          outputMatrix[xCoord][yCoord] = (meanVal / 255 > cutoffFactor
            ? 1 ^ invertFlag
            : 0 ^ invertFlag);
        } catch (error) {
          console.log('columns', columns);
          console.log('rows', rows);
          console.log('xCoord', xCoord);
          console.log('yCoord', yCoord);
          console.log(error);
          return null;
        }

        ++yCoord;
      }
      yCoord = 0;
      ++xCoord;
    }
    return outputMatrix;
  }

  transformImage(image) {
    if (image == null)
      return;

    // Get transformation settings
    /*if(!subSampleFactor || subSampleFactor<0){
			subSampleFactor = 10;
		}*/
    // var cutoffFactor = document.getElementById("cutoffFactorSlider").value / 100;
    // var invertPixels = document.getElementById("invertCheckbox").checked;
    // Transform
    const outputMatrix = this.imageTransformation(image, Math.floor(50), 0.5, false);
    const imageOut = this.createImageObject(outputMatrix);
    console.log('ImageOut', imageOut);
    this.image_io.output_image = imageOut;
  }

  onInputLoaded($event : ImageData) {
    this.transformImage($event);
  }
}
