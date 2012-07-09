// Using a function in order to create an object.
function instructionBox(instructionString){
	// Define class-wide variables
	this.instructionString=instructionString;
	// currentInstruction will hold which step of the instructions the student is at.
	this.currentInstruction=0;
	// The array of strings which are used for each instruction.
	this.style="position: absolute; border:1; z-index:5; background-color:#ffffff; border-color:#000000; width:400px; padding:5px 10px;";
	// using the this keyword will not work in functions called by events.  The event object will be the this calling the function.
	// Due to this, it is needed to create a variable to hold the this, to use it in functions.
	var self=this;
	
	this.hidden=false;
	//define class-wide functions
	
	function addButton(title, parent, onClickFunction){
		var button=document.createElement("button");
		button.textContent=title;
		button.onclick=onClickFunction;
		button.setAttribute("id", title);
		parent.appendChild(button);
		return button;
	}
	
	// Moves the top left corner of the instructionBox to the given location.
	this.moveTo=function(x, y){
		var newStyle=self.style + " left:" + x + "px; top:" + y + "px;";
		self.parent.setAttribute('style', newStyle);
		console.log(newStyle);
	}
	// This function is called when the next button is pushed by the user.
	instructionBox.prototype.next=function(){
		// Now that everything involving the previous currentInstruction value is done, we increment it.
		self.currentInstruction++;
		// If the user landed on an instruction that does not exist, we want to get rid of the instruction box.
		if(self.currentInstruction>self.instructionString.length) return this.hide();
		// If there are no more instructions, don't allow the user to click next.
		if(self.currentInstruction+1>=self.instructionString.length) this.disabled=true;
		if(self.currentInstruction==1) document.getElementById("previous").disabled=false;
		self.text.innerHTML=self.instructionString[self.currentInstruction];
	}

	// Is called when an event is completed.  Enables the next button.
	this.eventFinished=function(){
		console.log("event successfully finished");
		document.getElementById("next").disabled=false;
	}
	// This function is called then the previous button is pushed by the user.
	this.previous=function(){
		// If the user is somehow on a negative instruction, 
		if(this.currentInstruction<=0) return self.hide();
		
		self.currentInstruction--;
		//If the first instruction is selected, we want to hide the previous button.
		if(self.currentInstruction==0) this.disabled=true;
		if(self.currentInstruction<self.instructionString.length) document.getElementById("next").disabled=false;
		self.text.innerHTML=self.instructionString[self.currentInstruction];
	}
	
	this.hide=function(calledByError){
	self.parent.parentNode.removeChild(self.parent);
	self.hidden=true;
	document.getElementById("showTutorial").disabled=false;
	}
	this.show=function(){
	document.getElementById("container").appendChild(self.parent);
	document.getElementById("showTutorial").disabled=true;
	}
	
	
	// now do the intialize code here.
	// Reason for initializing here is so that we can use the functions created above in onClickListeners
	this.parent=document.createElement("div");
	
	// I didn't know if I could use document.getElementById().innerHTML because
	// I'm not sure if that would just return a string or a pointer to the string.
	// Currently, I'm assuming that it would just return a string of the inner html.
	// This is something I want to look at just for the readability of the code when I have the time to.
	
	// The element within the document that will be used to display the strings.
	this.text=document.createElement("p");

	this.text.textContent=this.instructionString[0];
	this.parent.appendChild(this.text);
	document.getElementById("container").appendChild(this.parent);
	// Now we got the text to show, lets add buttons to the bottom of the element.
	
	var previous=addButton("previous", this.parent, this.previous);
	previous.disabled=true;
	addButton("hide", this.parent, this.hide);
	addButton("next", this.parent, this.next);
	this.moveTo(400, 50);
}