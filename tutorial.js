var defaultTutorialBoxStyle="position: absolute; top: 0; left: 0; border:1; z-index:5; background-color:#ffffff"

function addButton(title, parent, onClickFunction){
	var button=document.createElement("button");
	button.textContent=title;
	button.onclick=onClickFunction;
	parent.appendChild(button);
}



// Using a function in order to create an object.
function instructionBox(){
	// Define class-wide variables
	
	// currentInstruction will hold which step of the instructions the student is at.
	this.currentInstruction=0;
	// The array of strings which are used for each instruction.
	this.instructionString=["Hello",  "World"];
	
	//define class-wide functions
	
	// This function is called when the next button is pushed by the user.
	this.next=function(){
		// Since there is now a previous instruction to show, we want the user to be able to hide the previous instruction.
//		if(currentInstruction==0) document.getElementById("previous").show();
		// Now that everything involving the previous currentInstruction value is done, we increment it.
		this.currentInstruction++;
		// If the user landed on an instruction that does not exist, we want to get rid of the instruction box.
		if(this.currentInstruction>this.instructionStrings.length) return this.hide(true);
		// If there are no more instructions, don't allow the user to click next.
//		if(currentInstruction+1>instructionStrings.length) document.getElementById("next").hide();
		
		this.text.innerHTML=this.instructionStrings[currentInstruction];
	}
	
	// This function is called then the previous button is pushed by the user.
	this.previous=function(){
		// If the user is somehow on a negative instruction, 
		if(this.currentInstruction<=0) return this.hide(true);
		
		this.currentInstruction++;
		//If the first instruction is selected, we want to hide the previous button.
//		if(currentInstruction==0) document.getElementById("previous").hide();
		this.text.innerHTML=this.instructionStrings[currentInstruction];
	}
	
	// FUNCTION STILL NEEDS FIXING.
	this.hide=function(calledByError){
	// The calledByError variable is so that way anything that might cause an error with the instructionBox
	// can be reset here to make it work again.
	if(calledByError) this.currentInstruction=0;
	
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

	this.text.textContent="Hello World";
	this.parent.appendChild(this.text);
//	document.getElementById("previous").hide();
	this.parent.setAttribute('style', defaultTutorialBoxStyle);
	document.getElementById("container").appendChild(this.parent);
	// Now we got the text to show, lets add buttons to the bottom of the element.
	
	addButton("previous", this.parent, this.previous());
	addButton("hide", this.parent, this.hide());
	addButton("next", this.parent, this.hide());
}

// Now we need to create an instance of this object
// We also need to catch the global function calls to interact with the object.
function previousInstruction(){ return  tutorial.previous(); }
function nextInstruction(){ return tutorial.next(); }
function hideTutorial(){ tutorial.hide(); }