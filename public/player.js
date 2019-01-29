class Player {
    constructor (self, n) {
        this.state = {
            lives: 2,
            bullets: 5
        };
        
        this.id = n;
        this.default_y = height - 32;
        this.speed = 512;
        this.can_do_action = true;

        this.base = self.physics.add.sprite(64, this.default_y, "player_" + (n + 1));
        this.base.y = 0;

        this.base.setScale(scale);
        this.base.setBounce(0);
        this.base.setCollideWorldBounds(true);

        this.base.setGravityY(256);

        setInterval(() => {
            if (this.state.bullets <= 5) this.state.bullets += 1;
        }, 5000);
    }

    set_keybinds (keybinds) {
        this.keybinds = keybinds;
    }

    do_action (self) {
        if(this.state.bullets <= 0) return;
        this.can_do_action = false;

        this.state.bullets -= 1;

        // TODO: spawn bullet
        this.base.setVelocityY(-512);
        this.base.setGravityY(512);
        setTimeout(() => {
            this.can_do_action = true;
            this.base.setGravityY(256);
        }, 1000);
    }

    do_tick (self) {
        // GUI
        this.draw_gui(self);

        // Input
        if(this.keybinds) {
            let input = self.input.keyboard.createCursorKeys();

            if (input[this.keybinds.left].isDown) {
                this.base.setVelocityX(this.speed * -1);
            } else if (input[this.keybinds.right].isDown) {
                this.base.setVelocityX(this.speed);
            } else {
                this.base.setVelocityX(0);
            }

            if(input[this.keybinds.action].isDown && this.can_do_action) {
                setTimeout(() => this.do_action(self), 0);
            }
        } else console.warn(`Player ${this.id}'s keybinds are undefined!`);
    }

    draw_gui (self) {
        setTimeout(() => {
            // Health
            for(let i = 0; i < 3; i++) {
                if((i + 1) > this.state.lives)
                    $(`.overlay .lives .life`).eq(i).addClass('lost');
                else
                    $(`.overlay .lives .life`).eq(i).removeClass('lost');
            }

            // Bullets
            for(let i = 0; i < 5; i++) {
                if((i + 1) > this.state.bullets)
                    $(`.overlay .bullets .bullet`).eq(i).addClass('lost');
                else
                    $(`.overlay .bullets .bullet`).eq(i).removeClass('lost');
            }
        }, 0);
    }
}