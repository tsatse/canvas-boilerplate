canvas-boiler-plate
===================

using
-----

sketch({
    ...
    properties
    ...    
})

properties:

fps: integer
width: integer
height: integer
state: object
canvas: <canvas> DOM element

resetState: function()
keydown: function(event)
keyup: function(event)
draw: function(ctx, images)