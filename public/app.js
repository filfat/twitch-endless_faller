"use strict";

const scale = 0.5;
const width = 640;
const height = $(window).height();
let map, players = [];

$(document).ready(() => {
    function preload () {
        this.load.image("sky", "/public/assets/sky.png");
        this.load.image("player_1", "/public/assets/player.png");
        this.load.image("player_2", "/public/assets/player.png");
        this.load.image("player_3", "/public/assets/player.png");
        this.load.image("player_4", "/public/assets/player.png");
        this.load.image("ground", "/public/assets/ground.png");
    };
    function create () {
        this.add.image(width, height, "sky");
    
        map = this.physics.add.staticGroup();
    
        for(let i = 0; i < 10; i++) {
            map.create(0, -128, "ground").setScale(scale).refreshBody();
        }
    
        for (let i = 0; i < 4; i++) {
            if(i) return;
    
            players.push(new Player(this, i));
    
            const player = players[i];
            if(i === 0)
                player.set_keybinds({
                    left: "left",
                    right: "right",
                    action: "space",
                });
    
            
            player.base.x += (i * 128);
            this.physics.add.collider(player.base, map);
        }
    
        //this.cameras.main.setBounds(0, 0, width, height);
        this.cameras.main.startFollow(players[0].base);
    };
    function update () {
        for (let i = 0; i < players.length; i++) {
            players[i].do_tick(this);
        }
    
        for (let i = 0; i < map.children.entries.length; i++) {
            const object = map.children.entries[i];
            object.y -= 5;
    
            if ((object.y + 128) < 0) {
                const pos = random_tile_placement(i);
                object.y = (height + pos.y);
                object.x = pos.x;
            }
        }
    };
    
    const game = new Phaser.Game({
        type: Phaser.AUTO,
        width: width,
        height: height,
    
        physics: {
            default: "arcade",
            arcade: {
                gravity: { y: 0 },
                debug: false
            }
        },
    
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    });
});

let prev = {};
let random_tile_placement = (index) => {
    let y = 128 * index;
    let x = Math.floor(Math.random() * 3);

    if(x === prev[index - 1]) return random_tile_placement(index);
    prev[index] = x;

    switch (x) {
        case 0:
            x = 64;
            break;
        case 1:
            x = (width - 64);
            break;
        case 2:
            x = (width/2)
            break;
    }

    return {x: x, y: y};
}