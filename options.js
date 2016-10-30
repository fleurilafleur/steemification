// Copyright (c) 2011 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/*
  Grays out or [whatever the opposite of graying out is called] the option
  field.
*/
function ghost(isDeactivated) {
  options.style.color = isDeactivated ? 'graytext' : 'black';
                                              // The label color.
  options.frequency.disabled = isDeactivated; 
  options.username.disabled = isDeactivated; 
  options.notifyUpvotes.disabled = isDeactivated;
  options.notifyDownvotes.disabled =isDeactivated;
  options.notifyComments.disabled = isDeactivated;
}

window.addEventListener('load', function() {
  // Initialize the option controls.
  options.isActivated.checked = JSON.parse(localStorage.isActivated);
                                         // The display activation.
  options.frequency.value = localStorage.frequency;
                                         // The display frequency, in minutes.
										 
  options.username.value = localStorage.username;
  
  options.notifyUpvotes.checked = JSON.parse(localStorage.notifyUpvotes);
  options.notifyDownvotes.checked = JSON.parse(localStorage.notifyDownvotes);
  options.notifyComments.checked = JSON.parse(localStorage.notifyComments);

  if (!options.isActivated.checked) { ghost(true); }

  // Set the display activation and frequency.
  options.isActivated.onchange = function() {
    localStorage.isActivated = options.isActivated.checked;
	localStorage.settingsChanged = true;
    ghost(!options.isActivated.checked);
  };
  
  options.notifyUpvotes.onchange = function() {
    localStorage.notifyUpvotes = options.notifyUpvotes.checked;
	localStorage.settingsChanged = true;
  };
  
  options.notifyDownvotes.onchange = function() {
    localStorage.notifyDownvotes = options.notifyDownvotes.checked;
	localStorage.settingsChanged = true;
  };
  
  options.notifyComments.onchange = function() {
    localStorage.notifyComments = options.notifyComments.checked;
	localStorage.settingsChanged = true;
  };

  options.frequency.onchange = function() {
    localStorage.frequency = options.frequency.value;
	localStorage.settingsChanged = true;
	
	console.log("Frquency changed: " +  localStorage.frequency  + " seconds");
  };
  
   options.username.onkeyup = function() {
    localStorage.username = options.username.value;
	
	if (localStorage.username.startsWith("@"))
        localStorage.username = localStorage.username.substring(1);
	
	localStorage.settingsChanged = true;
	
	document.getElementById("nameChanged").style.display = "inline";
	
	console.log("Username changed: " , localStorage.username);
  };
});
