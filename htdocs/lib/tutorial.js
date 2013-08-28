$(document).ready(function() {

	loadUI();
	setupInteractions();

	//**********************  Step 1  ***********************//
	//***************** Instantiate the Viz *****************//
	//***** Don't forget to include the api js in the html **//
	
	//**********************  Step 6  ***********************//
	//*********** Put loadUI and setupInteractions **********//
	//************** in onFirstInteractive ******************//
	
	//**********************  Step 11  ***********************//
	//********** Call event listener function ****************//


});


var setupInteractions = function() {
	//**********************  Step 2  ***********************//
	//**************** View Switching Buttons ***************//
	

	//**********************  Step 3  ***********************//
	//******************** Map Filters **********************//
	//****** First set up Filters without if-then logic *****//
	//
	//********************  Step 3.1  ***********************//
	//**************** Clear Filter Logic *******************//
	//******* Add regionSelected var and if-then logic to ***//
	//****************** clear the filter *******************//

		
	//**********************  Step 4  ***********************//
	//*****************  Slider Filters *********************//
	

	//**********************  Step 5  ***********************//
	//***************** Calendar Filters ********************//
	
	//**********************  Step 9  ***********************//
	//************** Success, Error Handlers  ***************//

	//**********************  Step 8  ***********************//
	//******************** Combo Boxes  *********************//

	
};

function primeEventListeners(advancedPage) {
	//**********************  Step 10  ***********************//
	/** Add code to activate and de-activate event listeners **/


}

function onMarksSelection()
{
	//**********************  Step 12  ***********************//
	/**** Insert code to query and display selected marks *****/
   
	//**********************  Step 13  ***********************//
    /* Insert if statement to check to see which viz is active */

    //**********************  Step 14  ***********************//
	/* Insert mark selection code for a viz embedded in a dashboard */	
}

var loadUI = function loadUI(){

	// Toast config
	$.toast.config.width = 400;
	$.toast.config.align = 'right';
	$.toast.config.closeForStickyOnly = false;
	//*********** Map     ************//
	$("#mapDiv").html("<img src='img/MapFilter.jpg' style='margin:0 35px' usemap='#map-map' style='float:left;'>")
		.append("<map id='map-map' name='map-map'></map>");
	$("#map-map").append("<area shape='rect' coords='10,10,65,114' href='#'/>")
		.append("<area shape='rect' coords='66,31,105,107' href='#'/>")
		.append("<area shape='rect' coords='105,21,163,105' href='#'/>");
	//*********** Calendars **************//
	$( "#datepicker-start" ).datepicker({
		minDate: "07/01/2012",
		maxDate: "07/01/2013",
		defaultDate: "07/01/2012"
	})
	.prepend("<b>Start<b>");
	$( "#datepicker-end" ).datepicker({
		minDate: "07/01/2012",
		maxDate: "07/01/2013",
		defaultDate: "06/30/2013"
	})
	.prepend("<b>End</b>");
	//********** End Calendars *********//
	
	//************* Combo Boxes *************//

	$("#show-label").append(function() {
		return $("<select id='comboboxShowLabel'>")
			.append("<option value=''>Hide or show labels?</option>")
			.append("<option value='Show Labels'>Show Label</option>")
			.append("<option value='Hide Labels'>Hide Label</option>");
	});
	
	$("#which-label").append(function() {
		return $("<select id='comboboxWhichLabel'>")
			.append("<option value=''>Select which label to show...</option>")
			.append("<option value='Country Name'>Country Name</option>")
			.append("<option value='Page Title'>Page Title</option>");
	});
		


	
	var snapper = new Snap({
		element: document.getElementById('content')
	});
	snapper.settings({maxPosition: 295});
	openButton = document.getElementById('open-left');
	if(openButton.addEventListener) {
		openButton.addEventListener('click', function() {
			if(snapper.state().state === "left") {
				snapper.close();
			} else {
				snapper.open('left');
			}
		}, false);
	} else if(openButton.attachEvent) {
		openButton.attachEvent("onclick", function() {
			if(snapper.state().state === "left") {
				snapper.close();
			} else {
				snapper.open('left');
			}
		});
	}
		
	
};

