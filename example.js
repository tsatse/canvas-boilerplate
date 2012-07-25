window.onload = function() {
    sketch({
        width: 200,
        height: 300,
        canvas: document.getElementById('canvas'),

        resetState: function() {
            this.pos = {x: 50, y: 0};
            this.direction = {x: 0, y: 0};
        },

        keydown: function(event) {
            switch(event.keyCode) {
            case 'W'.charCodeAt():
            case 'Z'.charCodeAt():
                this.direction.y = -1;
                break;
            case 'A'.charCodeAt():
            case 'Q'.charCodeAt():
                this.direction.x = -1;
                break;
            case 'S'.charCodeAt():
                this.direction.y = 1;
                break;
            case 'D'.charCodeAt():
                this.direction.x = 1;
                break;
            }
        },

        keyup: function(event) {
            switch(event.keyCode) {
            case 'W'.charCodeAt():
            case 'Z'.charCodeAt():
            case 'S'.charCodeAt():
                this.direction.y = 0;
                break;
            case 'A'.charCodeAt():
            case 'Q'.charCodeAt():
            case 'D'.charCodeAt():
                this.direction.x = 0;
                break;
            }
        },

        update: function() {
            this.pos.x += this.direction.x;
            this.pos.y += this.direction.y;
        },

        draw: function(ctx, images) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = '#0f0';
            ctx.fillRect(this.pos.x, this.pos.y, 50, 50);
            ctx.strokeStyle = '#040';
            ctx.strokeRect(this.pos.x, this.pos.y, 50, 50);
        },

        events: {
        	progress: function(pct) { },
        	loaded: function(images) {}
        }
    });
}