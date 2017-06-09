@import 'common.js'

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
function createDialog(context)
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

    var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
    alert.addAccessoryView(view);


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
  
    view.addSubview(deviceName4);
    view.addSubview(deviceDim4);


  // Focus on first input
  alert.alert().window().setInitialFirstResponder(deviceName1)
  deviceName1.setNextKeyView(deviceDim1)
  deviceDim1.setNextKeyView(deviceName2)
  deviceName2.setNextKeyView(deviceDim2)
  deviceDim2.setNextKeyView(deviceName3)
  deviceName3.setNextKeyView(deviceDim3)
  deviceDim3.setNextKeyView(deviceName4)
  deviceName4.setNextKeyView(deviceDim4)

  // Actions buttons.
  alert.addButtonWithTitle('Check');
  alert.addButtonWithTitle('Cancel');

  return alert;
}


// Check which button has been clicked (1000 == "Export")
function handleAlertResponse(alert, responseCode) {
    if (responseCode == "1000") {
        
        return {
            firstDeviceName: deviceName1.stringValue(),
            firstDeviceDim: deviceDim1.stringValue(),
            secondDeviceName: deviceName2.stringValue(),
            secondDeviceDim: deviceDim2.stringValue(),
            thirdDeviceName: deviceName3.stringValue(),
            thirdDeviceDim: deviceDim3.stringValue(),
            fourthDeviceName: deviceName4.stringValue(),
            fourthDeviceDim: deviceDim4.stringValue(),
        };
    }

    return null;
}

// Main
var onRun = function(context) {

  var sketch = context.api();
  var doc = context.document

  //reference all the pages in the document in an array
    var pages = [doc pages];

    //Flag used to keep track of artboards' number in the document
    var artboard_is_present = 0;
    var totalArtboards = 0;

  // Check if there are artboards in each page of the document
  for(var p=0; p < pages.count(); p++){
  if (pages[p].artboards().length == 0 && artboard_is_present == 0) {
       artboard_is_present = 0;
    }
   else artboard_is_present = 1;
  }

  //If there aren't artboard show a message
  if(artboard_is_present == 0){
    doc.showMessage("You must create at least one artboard to export");
      return;
  }


  //Run Dialog for user input
  var alert = createDialog(context);
  var options=handleAlertResponse(alert,alert.runModal());

  if(options == null) return;

  //Device name and widths
  var deviceName1 = options.firstDeviceName;
  var deviceDimension1 = options.firstDeviceDim;
  var deviceName2 = options.secondDeviceName;
  var deviceDimension2 = options.secondDeviceDim;
  var deviceName3 = options.thirdDeviceName;
  var deviceDimension3 = options.thirdDeviceDim;
  var deviceName4 = options.fourthDeviceName;
  var deviceDimension4 = options.fourthDeviceDim;

  var counter = 0;
  var artboardAlreadyMarked = false;

    
    if(deviceDimension1 == "") deviceDimension1 = 0;
    if(deviceDimension2 == "") deviceDimension2 = 0;
    if(deviceDimension3 == "") deviceDimension3 = 0;
    if(deviceDimension4 == "") deviceDimension4 = 0;


     //Loop through the pages of the document
  for (var i = 0; i < pages.count(); i++){
    //reference each page
    var currentPage = pages[i];

    //those counter are used to set the correct number in the artboard's name
    doc.setCurrentPage(currentPage);
    
    var artboards = currentPage.artboards();
    totalArtboards += artboards.count();
    var j = 0;

    if(currentPage.name() != "Symbols"){

      for (j = artboards.count(); j > 0; j--) {

        if(deviceDimension1 != 0 || deviceDimension2 != 0 || deviceDimension3 != 0 || deviceDimension4 != 0)
          {

            var incorrectArtboard = artboards[j-1];
            
                if((incorrectArtboard.frame().width() != deviceDimension1) && (incorrectArtboard.frame().width() != deviceDimension2) && (incorrectArtboard.frame().width() != deviceDimension3) && (incorrectArtboard.frame().width() != deviceDimension4))
                {// Draw the rectangle
               
                 var layers = incorrectArtboard.layers();
                  
           
                    var layer = layers.objectAtIndex(layers.length-1);

                    if (layer.name() == "Inesattezza") {
                        
                        artboardAlreadyMarked = true;
                    }

                   if(artboardAlreadyMarked == false)
                   {
                   var rect = MSRectangleShape.alloc().init();
                   rect.frame = MSRect.rectWithRect(NSMakeRect((incorrectArtboard.frame().width()/2)-((incorrectArtboard.frame().width()-60)/2), (incorrectArtboard.frame().height()/2)-((incorrectArtboard.frame().height()-60)/2), (incorrectArtboard.frame().width()-60), (incorrectArtboard.frame().height()-60)));
            
                      // Place it in the document
                   var rectangle = MSShapeGroup.shapeWithPath(rect);
                   var fill = rectangle.style().addStylePartOfType(0);
                    fill.color = MSImmutableColor.colorWithSVGString("#FF0000");
                   rectangle.setName("Inesattezza");

                  // If an artboard is selected place it there otherwise put it in the page
   
                  incorrectArtboard.addLayers([rectangle]);
                  counter++;

                  }else counter++;
            }
          }
      }

    }
    else continue;
  }

    // Success message
       doc.showMessage("Ho contrassegnato " + counter + " artboards inesatte") ;  
}