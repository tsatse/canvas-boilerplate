window.onload = function() {
    sketch({
        width: 200,
        height: 300,
        canvas: document.getElementById('canvas'),
        state: {
            pos: {x: 50, y: 0},
            direction: {x: 0, y: 0}
        },
        keydown: {
            'F': function(state) {
                state.direction.x = -1;
            },
            'G': function(state) {
                state.direction.y = 1;
            },
            'H': function(state) {
                state.direction.x = 1;
            },
            'T': function(state) {
                state.direction.y = -1;
            }
        },
        update: function(state) {
            state.pos.x += state.direction.x;
            state.pos.y += state.direction.y;
        },
        draw: function(ctx, images, state) {
            ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
            ctx.fillStyle = '#0f0';
            ctx.fillRect(state.pos.x, state.pos.y, 50, 50);
            if(state.draw) {
            	state.draw(ctx);
            }
        },
        events: {
        	progress: function(pct) { },
        	loaded: function(images) {}
        }
    });
}