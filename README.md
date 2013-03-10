canvas-boiler-plate
===================
    This boiler-plate is handy to quickly test a game/demo/vfx idea.


# how to use it

load it in your page before your script and then call the sketch function with an object that describes your demo :

sketch({
    ...
    propertyName: value
    propertyName: value
    propertyName: value
    ...    
})

## available properties:

*fps*: integer (default 60)
    The framerate you want your demo to run at
*width*: integer (default 1024)
    The width of the main viewport
*height*: integer (default 768)
    The height of the main viewport
*canvas*: canvas DOM element
    The canvas DOM element for your main viewport


*resetState*: function()
    Called at the begining of the demo

*keydown*: function(event)
    Called whenever the keydown event is fired on the viewport

*keyup*: function(event)
    Called whenever the keyup event is fired on the viewport

*update*: function()

*draw*: function()
    The rendering function for your demo
