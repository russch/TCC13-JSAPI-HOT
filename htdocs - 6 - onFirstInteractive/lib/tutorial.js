//6
$(document).ready(function() {

	//**********************  Step 1  ***********************//
	//***************** Instantiate the Viz *****************//
	//***** Don't forget to include the api js in the html **//
	var vizDiv = document.getElementById('visualization');
	vizURL = "http://localhost/views/TCCHOL/Visits";
	
	var options = {
		width: '880px',
		height: '640px',
		hideToolbar: true,
		hideTabs: true,
	//**********************  Step 6  ***********************//
	//*********** Put loadUI and setupInteractions **********//
	//************** in onFirstInteractive ******************//		
		onFirstInteractive: function() {
			loadUI();
			setupInteractions();
		}
	};
	viz = new tableauSoftware.Viz(vizDiv, vizURL, options);
	

	//**********************  Step 10  ***********************//
	//********** Call event listener function ****************//

});


var setupInteractions = function() {
	//**********************  Step 2  ***********************//
	//**************** View Switching Buttons ***************//
	$("#tree-map-btn").click(function() {
		workbook = viz.getWorkbook();
		workbook.activateSheetAsync('TreeMap');
		primeEventListeners(false);
	});
	$("#dashboard-btn").click(function() {
		workbook = viz.getWorkbook();
		workbook.activateSheetAsync('BigMap').then(function() {
		});
	});
	$("#scatter-btn").click(function() {
		workbook = viz.getWorkbook();
		workbook.activateSheetAsync('Visits').then(function() {
		});
	});

	//**********************  Step 3  ***********************//
	//******************** Map Filters **********************//
	//** First set up Americas Filter without if-then logic *//
	//
	//********************  Step 3.1  *********************//
	//**************** Clear Filter Logic *****************//
	//
	//********************  Step 4  ***********************//
	//**************** Clear Filter Logic *******************//
	//******* Add regionSelected var and if-then logic to ***//
	//****************** clear the filter *******************//


	var regionSelected = "none";
	$('#map-map area:eq(0)').click(function() {
		sheet = viz.getWorkbook().getActiveSheet();
		if(regionSelected === "Americas") {
			regionSelected = "none";
			if(sheet.getSheetType() === "worksheet") {
				sheet.clearFilterAsync('Region');
			} else {
				wksheets = sheet.getWorksheets();
				for(var i = 0; i < wksheets.length; i++) {
					wksheets[i].clearFilterAsync('Region');
				}
			}
		} else {
			regionSelected = "Americas";
			if(sheet.getSheetType() === "worksheet") {
				sheet.applyFilterAsync('Region', 'Americas', 'REPLACE');
			} else {
				wksheets = sheet.getWorksheets();
				for(var i = 0; i < wksheets.length; i++) {
					wksheets[i].applyFilterAsync('Region', 'Americas', 'REPLACE');
				}
			}
		}
	});
	//********************  Step 4.1  ***********************//
	//*********** Copy-paste 2 times and replace w/ *********//
	//************* appropriate region name *****************//
	//		
	
	$('#map-map area:eq(1)').click(function() {
		sheet = viz.getWorkbook().getActiveSheet();
		if(regionSelected === "EMEA") {
			regionSelected = "none";
			if(sheet.getSheetType() === "worksheet") {
				sheet.clearFilterAsync('Region');
			} else {
				wksheets = sheet.getWorksheets();
				for(var i = 0; i < wksheets.length; i++) {
					wksheets[i].clearFilterAsync('Region');
				}
			}
		} else {
			regionSelected = "EMEA";
			if(sheet.getSheetType() === "worksheet") {
				sheet.applyFilterAsync('Region', 'EMEA', 'REPLACE');
			} else {
				wksheets = sheet.getWorksheets();
				for(var i = 0; i < wksheets.length; i++) {
					wksheets[i].applyFilterAsync('Region', 'EMEA', 'REPLACE');
				}
			}
		}
	});
	$('#map-map area:eq(2)').click(function() {
		sheet = viz.getWorkbook().getActiveSheet();
		if(regionSelected === "Asia") {
			regionSelected = "none";
			if(sheet.getSheetType() === "worksheet") {
				sheet.clearFilterAsync('Region');
			} else {
				wksheets = sheet.getWorksheets();
				for(var i = 0; i < wksheets.length; i++) {
					wksheets[i].clearFilterAsync('Region');
				}
			}
		} else {
			regionSelected = "Asia";
			if(sheet.getSheetType() === "worksheet") {
				sheet.applyFilterAsync('Region', 'Asia', 'REPLACE');
			} else {
				wksheets = sheet.getWorksheets();
				for(var i = 0; i < wksheets.length; i++) {
					wksheets[i].applyFilterAsync('Region', 'Asia', 'REPLACE');
				}
			}
		}
	});

	//**********************  Step 5  ***********************//
	//***************** Calendar Filters ********************//
	$( "#datepicker-start" ).datepicker("option", {
		onSelect: function(date) {
			sheet = viz.getWorkbook().getActiveSheet();
			if(sheet.getSheetType() === "worksheet") {
				sheet.applyRangeFilterAsync('Date',{min: new Date(date)});
			} else {
				wksheets = sheet.getWorksheets();
				for(var i = 0; i < wksheets.length; i++) {
					wksheets[i].applyRangeFilterAsync('Date',{min: new Date(date)});
				}
			}
		}
	});
	$( "#datepicker-end" ).datepicker("option", {
		onSelect: function(date) {
			sheet = viz.getWorkbook().getActiveSheet();
			if(sheet.getSheetType() === "worksheet") {
				sheet.applyRangeFilterAsync('Date',{max: new Date(date)});
			} else {
				wksheets = sheet.getWorksheets();
				for(var i = 0; i < wksheets.length; i++) {
					wksheets[i].applyRangeFilterAsync('Date',{max: new Date(date)});
				}
			}
		}
	});

	//**********************  Step 8  ***********************//
	//************** Success, Error Handlers  ***************//
	
	//**********************  Step 7  ***********************//
	//******************** Combo Boxes  *********************//
	
};

function primeEventListeners(advancedPage) {
	//**********************  Step 9  ***********************//
	//** Add code to activate and de-activate event listeners **//


}

function onMarksSelection()
{
	//**********************  Step 11  ***********************//
	/**** Insert code to query and display selected marks *****/
   
	//**********************  Step 12  ***********************//
    /* Insert if statement to check to see which viz is active */

    //**********************  Step 13  ***********************//
	/* Insert mark selection code for a viz embedded in a dashboard */	
}
var loadUI = function loadUI(){
	$("#basic-btn").click(function() {
		window.location.href="index.html";
	});
	$("#advanced-btn").click(function() {
		window.location.href="advanced.html";
	});
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
		maxDate: "09/01/2013",
		defaultDate: "07/01/2012"
	})
	.prepend("<b>Start<b>");
	$( "#datepicker-end" ).datepicker({
		minDate: "07/01/2012",
		maxDate: "09/01/2013",
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

