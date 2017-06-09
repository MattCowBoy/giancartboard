@import 'common.js'
@import 'giancArtboard.js'

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
function saveInaccuracyIndex(value, name){
 //log("savePreference: " + value + ", " + name)
  var userDefaults = NSUserDefaults.standardUserDefaults()
  userDefaults.setObject_forKey(value, name);
  userDefaults.synchronize();
  //log("Valore salvato CAZZO: " + userDefaults.objectForKey(name))

}

function getInaccuracyIndex(key){
  var defaults = NSUserDefaults.standardUserDefaults();
  var value = defaults.objectForKey(key)
  //log("Valore recuperato: " + value)
  return value;
}


function getPreference(key){
  var defaults = NSUserDefaults.standardUserDefaults();
  var value = defaults.objectForKey(key)
  //log("Valore recuperato: " + value)
  return value;
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
  alert.setMessageText("Correct Inaccuracy");
  alert.setInformativeText("Find artboards that have a different width from that given and mark them with a red rectangle!Spot inaccuracy like an eagle!!");


  //CREATE THE VIEW
  var viewWidth = 300;
  var viewHeight = 250;
  var viewSpacer = 10;

    var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, viewWidth, viewHeight));
    alert.addAccessoryView(view);


    //DEVICES
    //you can specify up to 4 devices. Each device has a name and a width. Artboards will be saved in one of those folders, based on their
    //width (ex. if you have a folder named "Mobile" with a width of "320", if in your sketch file there is an artboard that has a width of 320
    //this will be saved in the Mobile folder.)

    var distance_title = 20;
    //Titolo risoluzioni
    titleLabel = createLabel('Define devices width',14,NSMakeRect(0, viewHeight - distance_title, (viewWidth) - viewSpacer, 20));
    titleLabel.setFont([NSFont systemFontOfSize:14 weight:NSFontWeightBold]);
    view.addSubview(titleLabel);

    var field_y = distance_title + 30;
    var distance_label = 20;
    var distance_field = 55;

    //FIRST DEVICE
  //First device label
    var firstDimLabel = createLabel('First device width (px)',12,NSMakeRect(0, viewHeight - field_y, viewWidth, 20));
    view.addSubview(firstDimLabel);


  // Create first device inputs
    deviceDim1 = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (field_y + distance_label), viewWidth, 20));
    deviceDim1.setStringValue(getPreference("deviceDim1"));
   
    view.addSubview(deviceDim1);
  
    field_y += distance_field;


  //SECOND DEVICE
  //Second device label
    var secondDimLabel = createLabel('Second device width (px)',12,NSMakeRect(0, viewHeight - field_y, viewWidth, 20));
  
    view.addSubview(secondDimLabel);

  // Create second device inputs
    deviceDim2 = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (field_y + distance_label), viewWidth, 20));
    deviceDim2.setStringValue(getPreference("deviceDim2"));

    view.addSubview(deviceDim2);

    field_y += distance_field;


    //THIRD DEVICE
  //third device label
    var thirdDimLabel = createLabel('Third device width (px)',12,NSMakeRect(0, viewHeight - field_y, viewWidth, 20));

    view.addSubview(thirdDimLabel);

  // Create second device inputs
    deviceDim3 = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (field_y + distance_label), viewWidth, 20));
    deviceDim3.setStringValue(getPreference("deviceDim3"));

    view.addSubview(deviceDim3);

    field_y += distance_field;


    //FOURTH DEVICE
  //fourth device label
    var secondDimLabel = createLabel('Fourth device width (px)',12,NSMakeRect(0, viewHeight - field_y, viewWidth, 20));
  ;
    view.addSubview(secondDimLabel);

  // Create fourth device inputs
    deviceDim4 = NSTextField.alloc().initWithFrame(NSMakeRect(0, viewHeight - (field_y + distance_label), viewWidth, 20));
    deviceDim4.setStringValue(getPreference("deviceDim4"));

    view.addSubview(deviceDim4);


  // Focus on first input
  alert.alert().window().setInitialFirstResponder(deviceDim1);
  deviceDim1.setNextKeyView(deviceDim2);
  deviceDim2.setNextKeyView(deviceDim3);
  deviceDim3.setNextKeyView(deviceDim4);

  // Actions buttons.
  alert.addButtonWithTitle('Check');
  alert.addButtonWithTitle('Cancel');

  return alert;
}


// Check which button has been clicked (1000 == "Export")
function handleAlertResponse(alert, responseCode) {
    if (responseCode == "1000") {
        
        return {

            firstDeviceDim: deviceDim1.stringValue(),
            secondDeviceDim: deviceDim2.stringValue(),
            thirdDeviceDim: deviceDim3.stringValue(),
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

  if(options == null){doc.showMessage("Cancelled"); return;}

  //Device name and widths
  var deviceDimension1 = options.firstDeviceDim;
  var deviceDimension2 = options.secondDeviceDim;
  var deviceDimension3 = options.thirdDeviceDim;
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
                   //rect.frame = MSRect.rectWithRect(NSMakeRect((incorrectArtboard.frame().width()/2)-((incorrectArtboard.frame().width()-60)/2), (incorrectArtboard.frame().height()/2)-((incorrectArtboard.frame().height()-60)/2), (incorrectArtboard.frame().width()-60), (incorrectArtboard.frame().height()-60)));
                   rect.frame = MSRect.rectWithRect(NSMakeRect(0, 0, incorrectArtboard.frame().width(), incorrectArtboard.frame().height()));
            
                      // Place it in the document
                   var rectangle = MSShapeGroup.shapeWithPath(rect);
                   var fill = rectangle.style().addStylePartOfType(0);
                   fill.color = MSColor.colorWithRed_green_blue_alpha(255/255,0/255,0/255,0.50);
                   rectangle.setName("Inesattezza");

                  // If an artboard is selected place it there otherwise put it in the page
   
                  incorrectArtboard.addLayers([rectangle]);
                  saveInaccuracyIndex(j,"ArtboardIndex");
                  saveInaccuracyIndex(i,"PageIndex");
                  log(getInaccuracyIndex("ArtboardIndex"));
                  log(getInaccuracyIndex("PageIndex"));
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

var nextInaccuracy = function(context){

    var doc = context.document

    var targetArtboard = getInaccuracyIndex("ArtboardIndex");
    var pages = [doc pages];

    //var currentPage = pages[getInaccuracyIndex("PageIndex")];
    artboardZoom(targetArtboard);

}

function artboardZoom(targetArtboard, page) {

  var padding = 0.025; // Relative to of artboard size, 0.025 = 2.5%

  var targetRect = targetArtboard.rect();
  targetRect.origin.x -= targetRect.size.width*padding;
  targetRect.origin.y -= targetRect.size.height*padding;
  targetRect.size.width *= 1+padding*2;
  targetRect.size.height *= 1+padding*2;


  var view = [doc currentView];
  [view zoomToFitRect:targetRect];

}