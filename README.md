# canvas-boilerplate

This boiler-plate is handy to quickly test a game/demo/vfx idea.


## How to use it

Load it in your page before your script or require it from a commonjs module, instanciate a boilerplate object and call the init method on it with an object that describes your demo :
    var boilerplate = new CanvasBoilerplate();
    boilerplate.init({
        ...
        propertyName: value
        propertyName: value
        propertyName: value
        ...    
    })

The object you pass to the init method can contain any method that you wish, in addition to the following properties :

## Scalar properties:

**canvas** canvas element *(required)*  
The canvas DOM element for your main viewport. For example :  

    ...
    canvas: document.getElementById('my-canvas')
    ...

**fps**:integer  
(defaults to 60)  
The framerate you want your demo to run at

**width**:integer  
(defaults to 1024)  
The width of the main viewport

**height**:integer  
(defaults to 768)  
The height of the main viewport

**images**:object  
Dictionary associating image names to image urls that should be loaded before starting the demo. For example :  

    {
        image1: 'http://url/to/image1.png',
        image2: 'http://url/to/image2.png'
    }

These images will then be accessed as Image objects with :  

    this.images[imageName]


## Callback properties:

**resetState**: function()  
Called at the begining of the demo

**keydown**: function(event)  
Called whenever the keydown event is fired on the viewport

**keyup**: function(event)  
Called whenever the keyup event is fired on the viewport

**update**: function()  
Called before rendering to update your simulation

**draw**: function()  
The rendering function for your demo

**pointer events**
* down-left
* down-middle
* down-right
* up-left
* up-middle
* up-right
* up
* down
* drag-left
* drag-middle
* drag-right
