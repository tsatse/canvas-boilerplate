(function(global) {
    "use strict";

    function definitionFunction(PointerInput) {
        var defaults = {
            width: window.innerWidth,
            height: window.innerHeight,
            fps: 60,
            update: function() {},
            draw: function() {},
            resetState: function() {},
            loaded: function() {},
            progress: function() {}
        };
        var pointerCallbacks = [
            'down-left',
            'down-middle',
            'down-right',
            'up-left',
            'up-middle',
            'up-right',
            'up',
            'down',
            'drag-left',
            'drag-middle',
            'drag-right'
        ];

        var CanvasBoilerplate = function(setup){
            this.callbacks = {};
            if(setup) {
                this.init(setup);
            }
        };
        CanvasBoilerplate.prototype = {
            init: function init(setup) {
                this.initSettings(setup);
                this.registerCallbacks(setup);
                this.initImages(setup);
            },

            initSettings: function(setup) {
                this.canvas = setup.canvas || (function() {
                    return document.body.appendChild(document.createElement('canvas'));
                }());
                this.canvas.width = setup.width || defaults.width;
                this.canvas.height = setup.height || defaults.height;
                this.fps = setup.fps || defaults.fps;
                this.ctx = this.canvas.getContext('2d');
                this.lastDraw = null;
            },

            drawLoop: function(time) {
                if(this.lastDraw === null) {
                    this.lastDraw = time;
                }
                if(!time || (time - this.lastDraw) > (1000 / this.fps)) {
                    this.lastDraw = time;
                    this.update();
                    this.draw();
                }
                requestAnimationFrame(this.drawLoop.bind(this));
            },

            registerCallbacks: function(setup) {
                this.loaded = setup.loaded || defaults.loaded;
                this.progress = setup.progress || defaults.progress;
                this.update = setup.update || defaults.update;
                this.draw = setup.draw || defaults.draw;
                this.resetState = setup.resetState || defaults.resetState;
                if(PointerInput) {
                    this.pointerInput = new PointerInput();
                    this.pointerInput.attach(this.canvas);

                    pointerCallbacks.forEach(function(callbackName) {
                        if(setup[callbackName]) {
                            this.callbacks[callbackName] = setup[callbackName].bind(this);
                            this.pointerInput.addCallback(callbackName, this.callbacks[callbackName]);
                        }
                    }.bind(this));
                }
                else {
                    console.warn('PointerInput not defined');
                }
                if(setup.keydown) {
                    this.callbacks.keydown = setup.keydown.bind(this);
                    document.addEventListener('keydown', this.callbacks.keydown);
                }
                if(setup.keyup) {
                    this.callbacks.keyup = setup.keyup.bind(this);
                    document.addEventListener('keyup', this.callbacks.keyup);
                }
            },

            revokeCallbacks: function() {
                this.loaded = defaults.loaded;
                this.progress = defaults.progress;
                this.update = defaults.update;
                this.draw = defaults.draw;
                this.resetState = defaults.resetState;
                if(this.callbacks.keydown) {
                    document.removeEventListener('keydown', this.callbacks.keydown);
                }
                if(this.callbacks.keyup) {
                    document.removeEventListener('keyup', this.callbacks.keyup);
                }
                pointerCallbacks.forEach(function(callbackName) {
                    if(this.callbacks[callbackName]) {
                        this.pointerInput.removeCallback(callbackName, this.callbacks[callbackName]);
                    }
                }.bind(this));
            },

            initImages: function(setup) {
                this.images = {};
                if(setup.images) {
                    this.loadImages(setup.images, function() {
                        this.resetState();
                        if(this.loaded) {
                            this.loaded(this.images);
                        }
                        requestAnimationFrame(this.drawLoop.bind(this));
                    }.bind(this));
                }
                else {
                    this.resetState();
                    requestAnimationFrame(this.drawLoop.bind(this));
                }
            },

            loadImages: function loadImages(imagesPaths, done) {
                var loaded = 0;
                var total = Object.keys(imagesPaths).length;
                var load = function() {
                    loaded += 1;
                    if(loaded === total) {
                        done();
                    }
                    else {
                        if(this.progress) {
                            this.progress((loaded / total) * 100.0);
                        }
                    }
                }.bind(this);
                var error = function() {
                    console.error('error loading images');
                }.bind(this);
                for(var imageName in imagesPaths) {
                    this.images[imageName] = new Image();
                    this.images[imageName].onload = load;
                    this.images[imageName].onerror = error;
                    this.images[imageName].src = imagesPaths[imageName];
                }
            }
        };

        return CanvasBoilerplate;
    }

    if (typeof define === 'function' && define.amd) {
        define(['pointer-input'], definitionFunction);
    }
    else if (typeof module === 'object' && module.exports) {
        require('raf');
        var pointerInput = require('pointer-input');
        module.exports = definitionFunction(pointerInput);
    }
    else {
        global.CanvasBoilerplate = definitionFunction(global.pointerInput);
    }

})(this);
