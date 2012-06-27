var tutorial;
// Adds a button to the parent given.  Used by the instructionBox class.
function addButton(title, parent, onClickFunction){
	var button=document.createElement("button");
	button.textContent=title;
	button.onclick=onClickFunction;
	button.setAttribute("id", title);
	parent.appendChild(button);
}



// Using a function in order to create an object.
function instructionBox(){
	// Define class-wide variables
	
	// currentInstruction will hold which step of the instructions the student is at.
	this.currentInstruction=0;
	// The array of strings which are used for each instruction.
	this.instructionString=["Hello, and welcome to Earthquake Plots!",
							"The first step to plotting an earthquake is to decide which earthquake you want to plot.  Go ahead and select the first earthquake by clicking on the flashing row in the table.",
							"Final"];
	this.style="position: absolute; border:1; z-index:5; background-color:#ffffff; border-color:#000000;";
	// using the this keyword will not work in functions called by events.  The event object will be the this.
	// Due to this, it is needed to create a variable to hold the this, to use it in functions.
	var self=this;
	//define class-wide functions
	
	
	// Moves the top left corner of the instructionBox to the given location.
	this.moveTo=function(x, y){
		var newStyle=self.style + " left:" + x + "px; top:" + y + "px;";
		self.parent.setAttribute('style', newStyle);
		console.log(newStyle);
	}
	// This function is called when the next button is pushed by the user.
	this.next=function(){
		// Now that everything involving the previous currentInstruction value is done, we increment it.
		self.currentInstruction++;
		// If the user landed on an instruction that does not exist, we want to get rid of the instruction box.
		if(self.currentInstruction>self.instructionString.length) return this.hide(true);
		// If there are no more instructions, don't allow the user to click next.
		if(self.currentInstruction+1>=self.instructionString.length) this.disabled=true;
		if(self.currentInstruction==1) document.getElementById("previous").disabled=false;
		self.text.innerHTML=self.instructionString[self.currentInstruction];
		// tutorialInteractions deals with calling functions in listFunctions and map_functions to keep the next function simple.
		tutorialInteractions(self.currentInstruction);
	}

	// Is called when an event is completed.  Enables the next button.
	this.eventFinished=function(){
		document.getElementById("next").disabled=false;
	}
	// This function is called then the previous button is pushed by the user.
	this.previous=function(){
		// If the user is somehow on a negative instruction, 
		if(this.currentInstruction<=0) return self.hide(true);
		
		self.currentInstruction--;
		//If the first instruction is selected, we want to hide the previous button.
		if(self.currentInstruction==0) this.disabled=true;
		if(self.currentInstruction<self.instructionString.length) document.getElementById("next").disabled=false;
		self.text.innerHTML=self.instructionString[self.currentInstruction];
	}
	
	// FUNCTION NOT FINISHED
	this.hide=function(calledByError){
	// The calledByError variable is so that way anything that might cause an error with the instructionBox
	// can be reset here to make it work again.
	if(calledByError) self.currentInstruction=0;
	
	}
	
	
	
	// now do the intialize code here.
	// Reason for initializing here is so that we can use the functions created above in onClickListeners
		this.parent=document.createElement("div");
	
	
	// I didn't know if I could use document.getElementById().innerHTML because
	// I'm not sure if that would just return a string or a pointer to the string.
	// Currently, I'm assuming that it would just return a string of the inner html.
	// This is something I want to look at just for the readability for the code when I have the time to.
	
	// The element within the document that will be used to display the strings.
	this.text=document.createElement("p");

	this.text.textContent=this.instructionString[0];
	this.parent.appendChild(this.text);
//	document.getElementById("previous").hide();
	document.getElementById("container").appendChild(this.parent);
	// Now we got the text to show, lets add buttons to the bottom of the element.
	
	addButton("previous", this.parent, this.previous);
	addButton("hide", this.parent, this.hide);
	addButton("next", this.parent, this.next);
	this.moveTo(100, 50);
}


// Any special events which the tutorial might create.
function tutorialInteractions(instruction){
	if(instruction==1){
		flashFirstEarthquake();
		document.getElementById("next").disabled=true;
	}
}
// Now we need to create an instance of this object
// We also need to catch the global function calls to interact with the object.

function previousInstruction(){ return  tutorial.previous(); }
function nextInstruction(){ return tutorial.next(); }
function hideTutorial(){ tutorial.hide(); }