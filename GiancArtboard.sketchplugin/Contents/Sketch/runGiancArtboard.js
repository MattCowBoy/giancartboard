@import 'common.js'

function savePreference(value, name){
  var userDefaults = NSUserDefaults.standardUserDefaults()
  userDefaults.setObject_forKey(value, name);
  userDefaults.synchronize();
  log("Saved value: " + userDefaults.objectForKey(name))

}

function getPreference(key){
  var defaults = NSUserDefaults.standardUserDefaults();
  var value = defaults.objectForKey(key)
  log("Retrieved value: " + value)
  return value;
}

var onRun = function(context) {

  var sketch = context.api();
  var doc = context.document
  var artboard_is_present = 0;
  //reference all the pages in the document in an array
  var pages = [doc pages];

  var docName = context.document.displayName();
  var savedName = getPreference("nome");

  //this is the folder where the sketch file is located
  var root = doc.fileURL().path().split(doc.displayName())[0];
  var fileFolder = root + savedName +"/";
  var rootFolder = getPreference("fileFolder");

  log("path originale" + fileFolder + " - " + "Path recuperato:" + rootFolder);
  log("Nome originale" + docName + " - " + "Nome Recuperato:" + savedName);


  if(docName.substring(0,8) == "Untitled") doc.showMessage("Save the file with a name other than Untitled before exporting it");

  // Check if there are artboards in each page of the document
  for(var p=0; p < pages.count(); p++)
  {
    if (pages[p].artboards().length == 0 && artboard_is_present == 0) 
    {
       artboard_is_present = 0;
    }
    else artboard_is_present = 1;
  }

  //If there aren't artboard show a message
  if(artboard_is_present == 0)
  {
    doc.showMessage("You must create at least one artboard to export");
      return;
  }

    //Flag used to keep track of artboards' number in the document
    var totalArtboards = 0;
    
   	var deviceName1 = getPreference("deviceNome1");
  	var deviceDimension1 = getPreference("deviceDim1");
  	
  	var deviceName2 = getPreference("deviceNome2");
  	var deviceDimension2 = getPreference("deviceDim2");
  	
  	var deviceName3 = getPreference("deviceNome3");
  	var deviceDimension3 = getPreference("deviceDim3");
  	
  	var deviceName4 = getPreference("deviceNome4");
  	var deviceDimension4 = getPreference("deviceDim4");

  	var format = getPreference("format");
  	var path = getPreference("path");
  	var scale = getPreference("scale");
  	var symbol = getPreference("symbol_exported");

  	var rootFolder = getPreference("rootFolder");



	 //Loop through the pages of the document
  for (var i = 0; i < pages.count(); i++)
  {
    //reference each page
    var currentPage = pages[i];

    
  	if(path == 'Device/Page/Artboard')
  		{
  			var folderPathFirstDevice = rootFolder + "/" + deviceName1 + "/" + (i+1) + "-" + currentPage.name() + "/";
    		var folderPathSecondDevice = rootFolder + "/" + deviceName2 + "/" + (i+1) + "-" + currentPage.name() + "/";
    		var folderPathThirdDevice = rootFolder + "/" + deviceName3 + "/" + (i+1) + "-" + currentPage.name() + "/";
    		var folderPathFourthDevice = rootFolder + "/" + deviceName4 + "/" + (i+1) + "-" + currentPage.name() + "/";
    		var folderSymbols = rootFolder + "/Symbols/";
    		var folderPathUnknown = rootFolder + "/Other dimensions/" + (i+1) + "-" + currentPage.name() + "/";
  		}
  	else
  		{

  			var folderPathFirstDevice = rootFolder + (i+1) + "-" + currentPage.name() + "/" + deviceName1 + "/";
    		var folderPathSecondDevice = rootFolder + (i+1) + "-" + currentPage.name() +"/" + deviceName2 + "/";
    		var folderPathThirdDevice = rootFolder + (i+1) + "-" + currentPage.name() +"/" + deviceName3 + "/";
    		var folderPathFourthDevice = rootFolder + (i+1) + "-" + currentPage.name() +"/" + deviceName4 + "/";
    		var folderPathUnknown = rootFolder + (i+1) + "-" + currentPage.name() + "/Other dimensions/";
    		var folderSymbols = rootFolder + "/Symbols/";
  		}
  	

  	//those counter are used to set the correct number in the artboard's name
    var firstDeviceCounter = 1;
    var secondDeviceCounter = 1;
    var thirdDeviceCounter = 1;
    var fourthDeviceCounter = 1;

    doc.setCurrentPage(currentPage);
    
    var artboards = currentPage.artboards();
    totalArtboards += artboards.count();
    var j = 0;

		if(currentPage.name() != "Symbols")
		{

			for (j = artboards.count(); j > 0; j--) 
			{

				if(artboards[j-1].frame().width() == deviceDimension1 && deviceDimension1 != 0)
				{

					var s = artboards[j-1];
		
					//scale images based on the given value
					var c = s.duplicate();
					c.exportOptions().removeAllExportFormats();
        			var exportOption = c.exportOptions().addExportFormat();
        			exportOption.setScale(scale.replace('x',''));
					
        			//set export path
					var artboardPath = folderPathFirstDevice + (i+1) + "." + firstDeviceCounter + "-" + currentPage.name() + " - " + artboards[j-1].name() + format.toString();

					var slices = MSExportRequest.exportRequestsFromExportableLayer(c);

        			 for (var k=0; k < slices.count(); k++) {
            			[doc saveArtboardOrSlice:slices[k] toFile:artboardPath];
        			}
        			
        			c.removeFromParent();
        			doc.currentPage().deselectAllLayers();

					firstDeviceCounter = firstDeviceCounter + 1;
					
				}
				else if(artboards[j-1].frame().width() == deviceDimension2 && deviceDimension2 != 0)
				{

					var s = artboards[j-1];
		
					//scale images based on the given value
					var c = s.duplicate();
					c.exportOptions().removeAllExportFormats();
        			var exportOption = c.exportOptions().addExportFormat();
        			exportOption.setScale(scale.replace('x',''));

        			//set export path
					var artboardPath = folderPathSecondDevice + (i+1) + "." + secondDeviceCounter + "-" + currentPage.name() + " - " + artboards[j-1].name() + format.toString();
					
					var slices = MSExportRequest.exportRequestsFromExportableLayer(c);

        			 for (var k=0; k < slices.count(); k++) {
            			[doc saveArtboardOrSlice:slices[k] toFile:artboardPath];
        			}
        			
        			c.removeFromParent();
        			doc.currentPage().deselectAllLayers();

					secondDeviceCounter = secondDeviceCounter + 1;
					
				}
				else if(artboards[j-1].frame().width() == deviceDimension3 && deviceDimension3 != 0)
				{

					var s = artboards[j-1];
		
					//scale images based on the given value
					var c = s.duplicate();
					c.exportOptions().removeAllExportFormats();
        			var exportOption = c.exportOptions().addExportFormat();
        			exportOption.setScale(scale.replace('x',''));

        			//set export path
					var artboardPath = folderPathThirdDevice + (i+1) + "." + thirdDeviceCounter + "-" + currentPage.name() + " - " + artboards[j-1].name() + format.toString();
					
					var slices = MSExportRequest.exportRequestsFromExportableLayer(c);

        			 for (var k=0; k < slices.count(); k++) {
            			[doc saveArtboardOrSlice:slices[k] toFile:artboardPath];
        			}
        			
        			c.removeFromParent();
        			doc.currentPage().deselectAllLayers();

					thirdDeviceCounter = thirdDeviceCounter + 1;
					
				}
				else if(artboards[j-1].frame().width() == deviceDimension4 && deviceDimension4 != 0)
				{

					var s = artboards[j-1];
					
					//scale images based on the given value
					var c = s.duplicate();
					c.exportOptions().removeAllExportFormats();
        			var exportOption = c.exportOptions().addExportFormat();
        			exportOption.setScale(scale.replace('x',''));

        			//set export path
					var artboardPath = folderPathFourthDevice + (i+1) + "." + fourthDeviceCounter + "-" + currentPage.name() + " - " + artboards[j-1].name() + format.toString();
					
					var slices = MSExportRequest.exportRequestsFromExportableLayer(c);

        			 for (var k=0; k < slices.count(); k++) {
            			[doc saveArtboardOrSlice:slices[k] toFile:artboardPath];
        			}
        			
        			c.removeFromParent();
        			doc.currentPage().deselectAllLayers();

					fourthDeviceCounter = fourthDeviceCounter + 1;
					
				}
				else if(deviceDimension1 != 0 || deviceDimension2 != 0 || deviceDimension3 != 0 || deviceDimension4 != 0)
				{

						var s = artboards[j-1];
		
						//scale images based on the given value
						var c = s.duplicate();
						c.exportOptions().removeAllExportFormats();
        				var exportOption = c.exportOptions().addExportFormat();
        				exportOption.setScale(scale.replace('x',''));


        				//set export path
						var artboardPath = folderPathUnknown + (i+1) + "." + (j) + "-" + currentPage.name() + " - " + artboards[j-1].name() + format.toString();
						
						var slices = MSExportRequest.exportRequestsFromExportableLayer(c);

        			 	for (var k=0; k < slices.count(); k++) {
            				[doc saveArtboardOrSlice:slices[k] toFile:artboardPath];
        				}
        			
        				c.removeFromParent();
        				doc.currentPage().deselectAllLayers();
				}

			}
		}
		else if(currentPage.name() == "Symbols" && symbol == 1)
		{

				for (j = artboards.count(); j > 0; j--)
				{

					var s = artboards[j-1];
					
					//scale images based on the given value
					var c = s.duplicate();
					c.exportOptions().removeAllExportFormats();
        			var exportOption = c.exportOptions().addExportFormat();
        			exportOption.setScale(scale.replace('x',''));
					
					//set export path
					var artboardPath = folderSymbols + artboards[j-1].name() + format.toString();
					
					var slices = MSExportRequest.exportRequestsFromExportableLayer(c);

        			 	for (var k=0; k < slices.count(); k++) 
        			 	{
            				[doc saveArtboardOrSlice:slices[k] toFile:artboardPath];
        				}
        			
        			c.removeFromParent();
        			doc.currentPage().deselectAllLayers();
				}

		}else continue;

    // Success message
       doc.showMessage(totalArtboards.toString() + "have been exported in " + rootFolder.toString());
  }
}