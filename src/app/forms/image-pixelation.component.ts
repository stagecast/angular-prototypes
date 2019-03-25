import { Component, ViewChild } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'formly-field-image-pixelation-input',
  templateUrl: `image-pixelation.component.html`,
})

export class FormlyFieldImagePixelationInput extends FieldType {
  
  @ViewChild('image_io') image_io : ElementRef;
  
  get type() {
    return this.to.type || 'file';
  }
  
	getImageData(image){
		
		var canvas = document.createElement("canvas");
		canvas.width = image.width;
		canvas.height = image.height;
		
		canvas.style.width = "px"
		
		var context = canvas.getContext("2d");
		context.drawImage(image, 0, 0);
		
		return context.getImageData(0,0,image.width, image.height);
	}
	
	getPixel(imageData, x, y){
		var position = (x + imageData.width * y)*4;
		return {
			r: imageData.data[position],
			g: imageData.data[position + 1],
			b: imageData.data[position + 2],
			a: imageData.data[position + 3],
		}
	}
	
	createImageObject(imageMatrix){
		var columns = imageMatrix.length;
		var rows = imageMatrix[0].length;
	
		var canvas = document.createElement("CANVAS");
		
		canvas.style.height = Math.floor(window.innerHeight*0.2)+"px";
		canvas.style.width = Math.floor((window.innerHeight*0.2)*columns/rows)+"px";
		
		canvas.width = columns;
		canvas.height = rows;
		
		var context = canvas.getContext("2d");
		
		for(var x = 0; x < columns; ++x){
			for(var y = 0; y < rows; ++y){
				if(imageMatrix[x][y] == 1){
					context.fillStyle = "#FFFFFF";
				}else{
					context.fillStyle = "#000000";
				}
					context.fillRect(x,y,1,1);
			}
		}
		
		return canvas.toDataURL();
	}
  
	imageTransformation(imageIn, subSampleFactor, cutoffFactor, invertFlag){
		var outputMatrix = [];
		var columns = Math.floor(imageIn.width/subSampleFactor);
		var rows = Math.floor(imageIn.height/subSampleFactor);
		
		for(var i = 0; i < columns; ++i){
			outputMatrix[i] = [];
			for(var j = 0; j < rows; ++j){
				outputMatrix[i][j] = 0;
			}
		}
		
		//console.log("Matrix:", outputMatrix);
		
		var imageData = this.getImageData(imageIn);
		
		//console.log(getPixel(imageData, imageIn.width/3, imageIn.height/2));
		
		var numEntries = subSampleFactor*subSampleFactor
		console.log(numEntries);
		
		var xCoord = 0;
		var yCoord = 0;
		for(var x = 0; x < imageIn.width && xCoord < columns; x+=subSampleFactor){
			for(var y = 0; y < imageIn.height && yCoord < rows; y+=subSampleFactor){
				var pixelValueR = 0;
				var pixelValueG = 0;
				var pixelValueB = 0;
				for(var i = 0; i < subSampleFactor; ++i){
					for(var j = 0; j < subSampleFactor; ++j){
						var pixel = this.getPixel(imageData, x+i, y+j);
						var alphaFactor = pixel.a/255;
						pixelValueR += pixel.r*alphaFactor;
						pixelValueG += pixel.g*alphaFactor;
						pixelValueB += pixel.b*alphaFactor;
					}
				}
				
				var meanVal = (pixelValueR+pixelValueG+pixelValueB)/(3*numEntries);
				
				try{
					outputMatrix[xCoord][yCoord] = (meanVal/255 > cutoffFactor ? 1^invertFlag : 0^invertFlag);
				}catch(error){
					console.log("columns", columns);
					console.log("rows", rows);
					console.log("xCoord",xCoord);
					console.log("yCoord",yCoord);
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
  
	transformImage(image){
		if(image == null)
			return;
		// Get transformation settings
		/*if(!subSampleFactor || subSampleFactor<0){
			subSampleFactor = 10;
		}*/
		//var cutoffFactor = document.getElementById("cutoffFactorSlider").value / 100;
		//var invertPixels = document.getElementById("invertCheckbox").checked;
		
		//Transform
		var outputMatrix = this.imageTransformation(image, Math.floor(50), 0.5, false);
		var imageOut = this.createImageObject(outputMatrix);
		console.log("ImageOut", imageOut);
		this.image_io.output_image = imageOut;
	}

  
	onInputLoaded($event:ImageData) {
		this.transformImage($event);
	}
}