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


function createLabel(text,size,frame) {
  var label = [[NSTextField alloc] initWithFrame:frame];
  [label setStringValue:text];
  [label setFont:[NSFont systemFontOfSize:size]];
  [label setBezeled:false];
  [label setDrawsBackground:false];
  [label setEditable:false];
  [label setSelectable:false];

  return label;
}

function createField(value,frame) {
  var field = [[NSTextField alloc] initWithFrame:frame];
  [field setStringValue:value];

  return field;
}

//Create Dialog for user Input
function createDialog(context, rootPath)
{

  var documentName = context.document.displayName();

  var alert = COSAlertWindow.new();

  function createTextFieldWithLabel(label,defaultValue) {
      alert.addTextLabelWithValue(label);
      alert.addTextFieldWithValue(defaultValue);
  }

  //var iconImage = NSImage.alloc().initByReferencingFile(context.plugin.urlForResourceNamed("icon.png").path())
    //alert.setIcon(iconImage);
  alert.setMessageText("GiancArtboard");
  alert.setInformativeText("Export all artboards, grouped in folders by page name and automatically numbered, with no inaccuracy! Pages and artboards will be numbered based on their order in the page and layer list.");


  //CREATE THE VIEW
  var viewWidth = 300;
    var viewHeight = 330;
    var viewSpacer = 10;

    var PREVIEW_SIZES = [".png", ".jpg", ".pdf"]
    this.PREVIEW_SIZES_LABELS = PREVIEW_SIZES.map(function(size) { return size})


    var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
    alert.addAccessoryView(view);


    //MAIN FOLDER NAME
    //this is the main folder where you will find exported pages.
  var projectLabel = createLabel('Project name',12,NSMakeRect(0, viewHeight - 20, (viewWidth) - viewSpacer, 20));
  projectLabel.setFont([NSFont systemFontOfSize:14 weight:NSFontWeightBold]);
  view.addSubview(projectLabel);

  // TEXT FIELD FOR MAIN FOLDER
    documentName = documentName.replace('.sketch','');
    projectName = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - 50, (viewWidth) - viewSpacer, 20));
    projectName.setStringValue(documentName + " export");
    view.addSubview(projectName);


    //DEVICES
    //you can specify up to 4 devices. Each device has a name and a width. Artboards will be saved in one of those folders, based on their
    //width (ex. if you have a folder named "Mobile" with a width of "320", if in your sketch file there is an artboard that has a width of 320
    //this will be saved in the Mobile folder.)

    var distance_title = 100;
    //Titolo risoluzioni
    titleLabel = createLabel('Define devices',14,NSMakeRect(0, viewHeight - distance_title, (viewWidth) - viewSpacer, 20));
    titleLabel.setFont([NSFont systemFontOfSize:14 weight:NSFontWeightBold]);
    view.addSubview(titleLabel);

    var field_y = distance_title + 30;
  var distance_label = 20;
  var distance_field = 55;

    //FIRST DEVICE
  //First device label
  var firstDeviceLabel = createLabel('First device name',12,NSMakeRect(0, viewHeight - field_y, (viewWidth) - viewSpacer, 20));
    var firstDimLabel = createLabel('Width (px)',12,NSMakeRect(210, viewHeight - field_y, 90, 20));
  
    view.addSubview(firstDeviceLabel);
    view.addSubview(firstDimLabel);


  // Create first device inputs
    deviceName1 = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (field_y + distance_label), 200, 20));
    deviceDim1 = NSTextField.alloc().initWithFrame(NSMakeRect(210, viewHeight - (field_y + distance_label), 90, 20));
    deviceName1.setStringValue(getPreference("deviceNome1"));
    deviceDim1.setStringValue(getPreference("deviceDim1"));

    view.addSubview(deviceName1);
    view.addSubview(deviceDim1);

  
    field_y += distance_field;


  //SECOND DEVICE
  //Second device label
  var secondDeviceLabel = createLabel('Second device name',12,NSMakeRect(0, viewHeight - field_y, (viewWidth) - viewSpacer, 20));
    var secondDimLabel = createLabel('Width (px)',12,NSMakeRect(210, viewHeight - field_y, 90, 20));
  
    view.addSubview(secondDeviceLabel);
    view.addSubview(secondDimLabel);

  // Create second device inputs
    deviceName2 = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (field_y + distance_label), 200, 20));
    deviceDim2 = NSTextField.alloc().initWithFrame(NSMakeRect(210, viewHeight - (field_y + distance_label), 90, 20));
    deviceName2.setStringValue(getPreference("deviceNome2"));
    deviceDim2.setStringValue(getPreference("deviceDim2"));

    view.addSubview(deviceName2);
    view.addSubview(deviceDim2);

    field_y += distance_field;


    //THIRD DEVICE
  //third device label
  var thirdDeviceLabel = createLabel('Third device name',12,NSMakeRect(0, viewHeight - field_y, (viewWidth) - viewSpacer, 20));
    var thirdDimLabel = createLabel('Width (px)',12,NSMakeRect(210, viewHeight - field_y, 90, 20));
  
    view.addSubview(thirdDeviceLabel);
    view.addSubview(thirdDimLabel);

  // Create second device inputs
    deviceName3 = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (field_y + distance_label), 200, 20));
    deviceDim3 = NSTextField.alloc().initWithFrame(NSMakeRect(210, viewHeight - (field_y + distance_label), 90, 20));
    deviceName3.setStringValue(getPreference("deviceNome3"));
    deviceDim3.setStringValue(getPreference("deviceDim3"));


    view.addSubview(deviceName3);
    view.addSubview(deviceDim3);

    field_y += distance_field;


    //FOURTH DEVICE
  //fourth device label
  var secondDeviceLabel = createLabel('Fourth device name',12,NSMakeRect(0, viewHeight - field_y, (viewWidth) - viewSpacer, 20));
    var secondDimLabel = createLabel('Width (px)',12,NSMakeRect(210, viewHeight - field_y, 90, 20));
  
    view.addSubview(secondDeviceLabel);
    view.addSubview(secondDimLabel);

  // Create fourth device inputs
    deviceName4 = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (field_y + distance_label), 200, 20));
    deviceDim4 = NSTextField.alloc().initWithFrame(NSMakeRect(210, viewHeight - (field_y + distance_label), 90, 20));
    deviceName4.setStringValue(getPreference("deviceNome4"));
    deviceDim4.setStringValue(getPreference("deviceDim4"));

  
    view.addSubview(deviceName4);
    view.addSubview(deviceDim4);
  
  //EXPORT OPTIONS

  //Title label
    exportTitleLabel = createLabel('Export options',14,NSMakeRect(0, 0, 300, 20));
    exportTitleLabel.setFont([NSFont systemFontOfSize:14 weight:NSFontWeightBold]);
    alert.addAccessoryView(exportTitleLabel);


    //Path
    //you can select two types of path:
    //1. Device/Page/Artboard: inside the main folder you will find up to 4 folders with the name you previously entered.
    //Inside each folder you will find the relative folders with page name, according to names of pages you give in Sketch. Artboard will be saved there.
    //2. Page/Device/Artboard: inside the main folder you will find as folders as pages you have in Sketch. Inside each of them, there will be up to 4 folders 
    //one for each device. Artboards will be save here.

  alert.addTextLabelWithValue("Path:");
  var folderOptions = ['Device name/Page name/Artboard', 'Page name/Device name/Artboard'];
  var optionCached = getPreference("path");
  var folderSelect;
  if(optionCached == "Device name/Page name/Artboard"){
    folderSelect  = createSelect(folderOptions, 0);
    alert.addAccessoryView(folderSelect);
  }
  else  if(optionCached == "Page name/Device name/Artboard"){
    folderSelect  = createSelect(folderOptions, 1);
    alert.addAccessoryView(folderSelect);
  }
  else{
    folderSelect  = createSelect(folderOptions, 0);
    alert.addAccessoryView(folderSelect);
  }

  //Format
  //choose the format of the file you are exporting
  alert.addTextLabelWithValue("Export format");
  var exportOptions = ['.png', '.jpg', '.pdf'];
  var exportCached = getPreference("format");
  var exportSelect;
  
  if(exportCached == ".png"){
    exportSelect  = createSelect(exportOptions, 0);
    alert.addAccessoryView(exportSelect);
  }
  else  if(exportCached == ".jpg"){
    exportSelect  = createSelect(exportOptions, 1);
    alert.addAccessoryView(exportSelect);
  }
  else  if(exportCached == ".pdf"){
    exportSelect  = createSelect(exportOptions, 2);
    alert.addAccessoryView(exportSelect);
  }
  else
  {
    exportSelect  = createSelect(exportOptions, 0);
    alert.addAccessoryView(exportSelect);
  }

  
  //Scale
  //scale images @0.5x - @1x - @2x - @3x
  alert.addTextLabelWithValue("Scale factor:");
  var scaleOption = ['0.5x', '1x', '2x', '3x'];
  var scaleCached = getPreference("scale");
  var scaleSelect;
  if(scaleCached == "0.5x"){
    scaleSelect  = createSelect(scaleOption, 0);
    alert.addAccessoryView(scaleSelect);
  }
  else  if(scaleCached == "1x"){
    scaleSelect  = createSelect(scaleOption, 1);
    alert.addAccessoryView(scaleSelect);
  }
  else  if(scaleCached == "2x"){
    scaleSelect  = createSelect(scaleOption, 2);
    alert.addAccessoryView(scaleSelect);
  }
  else  if(scaleCached == "3x"){
    scaleSelect  = createSelect(scaleOption, 3);
    alert.addAccessoryView(scaleSelect);
  }
  else{
    scaleSelect  = createSelect(scaleOption, 1);
    alert.addAccessoryView(scaleSelect);
  }

  //Export Symbol
  //choose if you want to export the "Symbols" page in a separate folder named "Symbols"
  var symbolCached = getPreference("symbol_exported");
  //if(symbolCached != "0" && symbolCached != "1") symbolCached = 0;

  var exportSymbol = [[NSButton alloc] initWithFrame:NSMakeRect(0, 0, 250, 25)];
    [exportSymbol setButtonType:NSSwitchButton]
    [exportSymbol setTitle:"Export \"Symbols\" page"]
    [exportSymbol setState:symbolCached]
    alert.addAccessoryView(exportSymbol);

  // Actions buttons.
  alert.addButtonWithTitle('Export');
  alert.addButtonWithTitle('Cancel');

  return alert;
}


//Create combobox
function createSelect(options, selectedItemIndex) {
    selectedItemIndex = selectedItemIndex || 0;

    var select = NSComboBox.alloc().initWithFrame(NSMakeRect(0,0,300,25));
    select.addItemsWithObjectValues(options);
    select.selectItemAtIndex(selectedItemIndex);

    return select;
  }


// Check which button has been clicked (1000 == "Export")
function handleAlertResponse(alert, responseCode) {
    if (responseCode == "1000") {
        
        return {
            prjName: projectName.stringValue(),
            firstDeviceName: deviceName1.stringValue(),
            firstDeviceDim: deviceDim1.stringValue(),
            secondDeviceName: deviceName2.stringValue(),
            secondDeviceDim: deviceDim2.stringValue(),
            thirdDeviceName: deviceName3.stringValue(),
            thirdDeviceDim: deviceDim3.stringValue(),
            fourthDeviceName: deviceName4.stringValue(),
            fourthDeviceDim: deviceDim4.stringValue(),
            path: alert.viewAtIndex(3).stringValue(),
            format: alert.viewAtIndex(5).stringValue(),
            scale: alert.viewAtIndex(7).stringValue(),
            symbol: alert.viewAtIndex(8).stringValue(),
        };
    }

    return null;
}

//MAINS
var onRun = function(context) {

  var sketch = context.api();
  var doc = context.document
  var artboard_is_present = 0;
  //reference all the pages in the document in an array
    var pages = [doc pages];

    docName = context.document.displayName();

    if(docName.substring(0,8) == "Untitled") doc.showMessage("Save the file with a name other than Untitled before exporting it");
  
    //this is the folder where the sketch file is located
    var fileFolder = doc.fileURL().path().split(doc.displayName())[0];

  //Check if there are artboards in each page of the document
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


  //Run Dialog for user input
  var alert = createDialog(context, fileFolder);
  var options=handleAlertResponse(alert,alert.runModal());

  if(options == null){doc.showMessage("Cancelled"); return;}

  //Device name and widths
  var project = options.prjName;
  var deviceN1 = options.firstDeviceName;
  var deviceD1 = options.firstDeviceDim;
  var deviceN2 = options.secondDeviceName;
  var deviceD2 = options.secondDeviceDim;
  var deviceN3 = options.thirdDeviceName;
  var deviceD3 = options.thirdDeviceDim;
  var deviceN4 = options.fourthDeviceName;
  var deviceD4 = options.fourthDeviceDim;

  //Main folders
    var rootFolder = fileFolder + project +"/";
    
    if(deviceD1 == "") deviceD1 = 0;
    if(deviceD2 == "") deviceD2 = 0;
    if(deviceD3 == "") deviceD3 = 0;
    if(deviceD4 == "") deviceD4 = 0;

  //Save entered value in cache
    savePreference(project, "nome");
    savePreference(deviceN1, "deviceNome1");
    savePreference(deviceD1, "deviceDim1");
    savePreference(deviceN2, "deviceNome2");
    savePreference(deviceD2, "deviceDim2");
    savePreference(deviceN3, "deviceNome3");
    savePreference(deviceD3, "deviceDim3");
    savePreference(deviceN4, "deviceNome4");
    savePreference(deviceD4, "deviceDim4");
    savePreference(options.format, "format");
    savePreference(options.path, "path");
    savePreference(options.scale, "scale");
    savePreference(options.symbol, "symbol_exported");
    savePreference(rootFolder, "rootFolder");


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

    log("formato:" + format + "  - " + "path: " + path + " - " + "scale: " + scale + " - " + "symbol:" + symbol);

  //Loop through the pages of the document
  for (var i = 0; i < pages.count(); i++)
  {
    //reference each page
    var currentPage = pages[i];

    
    if(path == 'Device name/Page name/Artboard')
      {
        var folderPathFirstDevice = rootFolder + "/Devices/" + deviceName1 + "/" + (i+1) + "-" + currentPage.name() + "/";
        var folderPathSecondDevice = rootFolder + "/Devices/" + deviceName2 + "/" + (i+1) + "-" + currentPage.name() + "/";
        var folderPathThirdDevice = rootFolder + "/Devices/" + deviceName3 + "/" + (i+1) + "-" + currentPage.name() + "/";
        var folderPathFourthDevice = rootFolder + "/Devices/" + deviceName4 + "/" + (i+1) + "-" + currentPage.name() + "/";
        var folderSymbols = rootFolder + "Devices/Symbols/";
        var folderPathUnknown = rootFolder + "Devices/**Other dimensions/" + (i+1) + "-" + currentPage.name() + "/";
      }
    else
      {

        var folderPathFirstDevice = rootFolder + "/Pages/" + (i+1) + "-" + currentPage.name() + "/" + deviceName1 + "/";
        var folderPathSecondDevice = rootFolder + "/Pages/" + (i+1) + "-" + currentPage.name() +"/" + deviceName2 + "/";
        var folderPathThirdDevice = rootFolder + "/Pages/" + (i+1) + "-" + currentPage.name() +"/" + deviceName3 + "/";
        var folderPathFourthDevice = rootFolder + "/Pages/" + (i+1) + "-" + currentPage.name() +"/" + deviceName4 + "/";
        var folderPathUnknown = rootFolder + "/Pages/" + (i+1) + "-" + currentPage.name() + "/**Other dimensions/";
        var folderSymbols = rootFolder + "/Pages/Symbols/";
      }
    

    //those counter are used to set the correct number in the artboard's name
    var firstDeviceCounter = 1;
    var secondDeviceCounter = 1;
    var thirdDeviceCounter = 1;
    var fourthDeviceCounter = 1;
    var otherDimensionCounter = 1;

    doc.setCurrentPage(currentPage);
    
    var artboards = currentPage.artboards();
    totalArtboards += artboards.count();
    var j = 0;

    if((currentPage.name() != "Symbols") && (currentPage.name().charAt(0) != "-"))
    {

      for (j = artboards.count(); j > 0; j--) 
      {
        //If the width of the current artboard is equal to the width of the first device given
        if(artboards[j-1].frame().width() == deviceDimension1 && deviceDimension1 != 0)
        {


          if(artboards[j-1].name().charAt(0) != "-")
          {

             var s = artboards[j-1];
    
             //scale images based on the given value
             var c = s.duplicate();
             c.exportOptions().removeAllExportFormats();
             var exportOption = c.exportOptions().addExportFormat();
             exportOption.setScale(scale.replace('x',''));
          
              //set export path
             var artboardPath = folderPathFirstDevice + (i+1) + "." + firstDeviceCounter + " - " + currentPage.name() + " - " + artboards[j-1].name() + format.toString();
          
             var slices = MSExportRequest.exportRequestsFromExportableLayer(c);

               for (var k=0; k < slices.count(); k++) {
                  [doc saveArtboardOrSlice:slices[k] toFile:artboardPath];
              }
              
              c.removeFromParent();
              //doc.currentPage().deselectAllLayers();
          }

          firstDeviceCounter = firstDeviceCounter + 1;
          
        }
        //If the width of the current artboard is equal to the width of the second device given
        else if(artboards[j-1].frame().width() == deviceDimension2 && deviceDimension2 != 0)
        {

          if(artboards[j-1].name().charAt(0) != "-")
          {
              var s = artboards[j-1];
    
              //scale images based on the given value
              var c = s.duplicate();
              c.exportOptions().removeAllExportFormats();
              var exportOption = c.exportOptions().addExportFormat();
              exportOption.setScale(scale.replace('x',''));

              //set export path
              var artboardPath = folderPathSecondDevice + (i+1) + "." + secondDeviceCounter + " - " + currentPage.name() + " - " + artboards[j-1].name() + format.toString();
          
              var slices = MSExportRequest.exportRequestsFromExportableLayer(c);

               for (var k=0; k < slices.count(); k++) {
                  [doc saveArtboardOrSlice:slices[k] toFile:artboardPath];
              }
              
              c.removeFromParent();
              //doc.currentPage().deselectAllLayers();

          }
          
          secondDeviceCounter = secondDeviceCounter + 1;
          
        }
        //If the width of the current artboard is equal to the width of the third device given
        else if(artboards[j-1].frame().width() == deviceDimension3 && deviceDimension3 != 0)
        {

          if(artboards[j-1].name().charAt(0) != "-")
          {

               var s = artboards[j-1];
    
               //scale images based on the given value
               var c = s.duplicate();
               c.exportOptions().removeAllExportFormats();
               var exportOption = c.exportOptions().addExportFormat();
               exportOption.setScale(scale.replace('x',''));

               //set export path
               var artboardPath = folderPathThirdDevice + (i+1) + "." + thirdDeviceCounter + " - " + currentPage.name() + " - " + artboards[j-1].name() + format.toString();
          
               var slices = MSExportRequest.exportRequestsFromExportableLayer(c);

               for (var k=0; k < slices.count(); k++) {
                  [doc saveArtboardOrSlice:slices[k] toFile:artboardPath];
               }
              
              c.removeFromParent();
              //doc.currentPage().deselectAllLayers();
          }

          thirdDeviceCounter = thirdDeviceCounter + 1;
          
        }
        //If the width of the current artboard is equal to the width of the fourth device given
        else if(artboards[j-1].frame().width() == deviceDimension4 && deviceDimension4 != 0)
        {

          if(artboards[j-1].name().charAt(0) != "-")
          {
             var s = artboards[j-1];
          
             //scale images based on the given value
             var c = s.duplicate();
             c.exportOptions().removeAllExportFormats();
             var exportOption = c.exportOptions().addExportFormat();
             exportOption.setScale(scale.replace('x',''));

              //set export path
             var artboardPath = folderPathFourthDevice + (i+1) + "." + fourthDeviceCounter + " - " + currentPage.name() + " - " + artboards[j-1].name() + format.toString();
          
             var slices = MSExportRequest.exportRequestsFromExportableLayer(c);

               for (var k=0; k < slices.count(); k++) {
                  [doc saveArtboardOrSlice:slices[k] toFile:artboardPath];
              }
              
              c.removeFromParent();
              //doc.currentPage().deselectAllLayers();
          }
          fourthDeviceCounter = fourthDeviceCounter + 1;
          
        }
        //If the width of the current artboard is not equal to any width given
        else if(deviceDimension1 != 0 || deviceDimension2 != 0 || deviceDimension3 != 0 || deviceDimension4 != 0)
        {


          if(artboards[j-1].name().charAt(0) != "-")
          {
              var s = artboards[j-1];
    
              //scale images based on the given value
              var c = s.duplicate();
              c.exportOptions().removeAllExportFormats();
              var exportOption = c.exportOptions().addExportFormat();
              exportOption.setScale(scale.replace('x',''));


              //set export path
              var artboardPath = folderPathUnknown + (i+1) + "." + otherDimensionCounter + " - " + currentPage.name() + " - " + artboards[j-1].name() + format.toString();
              log("Prima j:" + j);
            
              var slices = MSExportRequest.exportRequestsFromExportableLayer(c);

                for (var k=0; k < slices.count(); k++) {
                    [doc saveArtboardOrSlice:slices[k] toFile:artboardPath];
                }
              
                c.removeFromParent();
                //doc.currentPage().deselectAllLayers();
          }
          otherDimensionCounter = otherDimensionCounter +1;
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
              //doc.currentPage().deselectAllLayers();
        }

    }else continue;

    // Success message
       doc.showMessage(totalArtboards.toString() + "have been exported in " + rootFolder.toString());
 }
}