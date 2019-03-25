import { Component, Input, Output, EventEmitter, ViewChild, OnChanges } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
  selector: 'image-processing-io',
  templateUrl: `image-processing-io.component.html`,
})

export class ImageProcessingInputOutputComponent extends FieldType {
  
  @ViewChild('input_canvas') input_canvas : ElementRef;
  @ViewChild('output_canvas') output_canvas : ElementRef;
  
  imageInputDescription: string = "process image:";
  showInput: boolean = true;
  
  @Input('output_image') set output_image(value : ImageData){
	console.log("Output image value",value);
	this.displayOutputImage(this, value);
  }
  
  @Output() input_image : EventEmitter<ImageData> = new EventEmitter();
  
  @Input('canvas_max_height') canvas_max_height : int = 100;
  @Input('canvas_max_width')  canvas_max_width : int = 100;
  
  displayOutputImage(context, imageData){
	if(!imageData){
		return;
	}
	
	var image = document.createElement("IMG")
	
	image.onload = function(){	
		var canvasWidth = 0;
		var canvasHeight = 0;

		var imageRatio = image.width / image.height;
		var canvasMaxRatio = context.canvas_max_width/context.canvas_max_height;

		if(imageRatio > canvasMaxRatio){
			canvasWidth = context.canvas_max_width;
			canvasHeight = context.canvas_max_width / imageRatio;
		}else{
			canvasHeight = context.canvas_max_height;
			canvasWidth = context.canvas_max_height * imageRatio;
		}

		context.output_canvas.nativeElement.style.width = canvasWidth + "px";
		context.output_canvas.nativeElement.style.height = canvasHeight + "px";

		context.output_canvas.nativeElement.width = image.width;
		context.output_canvas.nativeElement.height = image.height;
		var ctx = context.output_canvas.nativeElement.getContext("2d");

		ctx.drawImage(image, 0, 0);
	}
	
	image.src=imageData;
  }
  
  loadImageDataFromInputField(input: any, callback : function){
	if(input.files && input.files[0]){
		var reader = new FileReader();
		reader.onload = function (event){
			console.log("Reader onload:",event);
			var image = new Image();
			image.onload = function(){
				console.log("Image in",image);
				callback(image);
			}
			image.src = event.target.result;
		}
		console.log("Reading url...");
		reader.readAsDataURL(input.files[0]);
	}
  }
  
  displayPreview(context, image) : void{
	var canvasWidth = 0;
	var canvasHeight = 0;
	
	var imageRatio = image.width / image.height;
	var canvasMaxRatio = context.canvas_max_width/context.canvas_max_height;
	
	if(imageRatio > canvasMaxRatio){
		canvasWidth = context.canvas_max_width;
		canvasHeight = context.canvas_max_width / imageRatio;
	}else{
		canvasHeight = context.canvas_max_height;
		canvasWidth = context.canvas_max_height * imageRatio;
	}
	
	context.input_canvas.nativeElement.style.width = canvasWidth + "px";
	context.input_canvas.nativeElement.style.height = canvasHeight + "px";
	
	context.input_canvas.nativeElement.width = image.width;
	context.input_canvas.nativeElement.height = image.height;
	var ctx = context.input_canvas.nativeElement.getContext("2d");
	ctx.drawImage(image, 0, 0);
  }
  
  onImageFileChanged(event: any){

   var context = this; 
	this.loadImageDataFromInputField(event.srcElement, function(imageData){
		console.log("Sending data");
		context.input_image.emit(imageData);
		context.displayPreview(context, imageData);
	});
	
	console.log(event);
  }
}