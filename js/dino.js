function Dino(ground)
{
    // Canvas
    canvas = document.getElementById('gc');

    /* Graphics */

    // Image
    var img = new Image();
    img.src = "images/sprite_sheet.png";

    // Spites
    var run1 = [{x: 1514, y: 0, width: 88, height: 97}, {x: 1602, y: 0, width: 88, height: 97}];
    var run2 = [{x: 1866, y: 38, width: 119, height: 58}, {x: 1985, y: 38, width: 119, height: 58}];
    var run = run1;
    var dead = {x: 1690 ,y: 0, width: 88, height: 97};

    var current = 0;

    this.sprite_x = 1337;
    this.sprite_y = 0;
    this.sprite_width = 89;
    this.sprite_height = 97;

    // Score
    this.score = 0;
    this.is_dead = false;
    this.is_down = false;


    /* Physics */

    // Properties
    this.width = (!this.is_down) ? 70 : 90;
    this.height = (!this.is_down) ? 77 : 43.8;

    this.x = canvas.width * 0.08;
    this.y = ground - this.height;

    this.velocity_y = 0;
    this.jump_force = 30;
    this.gravity = 2.5;

    this.is_on_ground = true;

    /* METHODS  */

    // Jump
    this.jump = function()
    {
        if(this.is_on_ground)
        {
            this.velocity_y -= this.jump_force;
            this.is_on_ground = false;
        }
    };

    // Checking collision with the obstacles
    this.check_collision = function(obstacles)
    {
        for(var i = 0; i < obstacles.length; i++)
        {
            var obstacle = obstacles[i];

            var head_collision = this.x <= obstacle.x + obstacle.width && this.x + this.width >= obstacle.x &&
                                 this.y <= obstacle.y + obstacle.height && this.y + this.height / 3 >= obstacle.y;

            var body_collision = this.x + this.width/4 + 10 <= obstacle.x + obstacle.width && this.x + this.width/2 + 15 >= obstacle.x &&
                                 this.y <= obstacle.y + obstacle.height && this.y + this.height >= obstacle.y;

            if(head_collision || body_collision)
            {
                this.is_dead = true;
                return true;
            }
        }
        return false;
    }

    // Update actions / gravity
    this.update = function(obstacles)
    {
        this.velocity_y += this.gravity;
        this.y += this.velocity_y;

        if(this.y > ground - this.height)
        {
            this.y = ground - this.height;
            this.velocity_y = 0;

            this.is_on_ground = true;
        }
    };

    // Render the graphics of the dino
    this.render = function(context)
    {
        // context.fillStyle = 'black';
        // context.fillRect(this.x, this.y, this.width, this.height/3);
        // context.fillRect(this.x + this.width/4 - 5, this.y, this.width/2, this.height);

        if(this.is_dead)
        {
            this.sprite_x = dead.x;
            this.sprite_y = dead.y;
            this.sprite_width = dead.width;
            this.sprite_height = dead.height;
            this.width = 70;
            this.height = 77;
        }

        context.drawImage(img, this.sprite_x, this.sprite_y, this.sprite_width, this.sprite_height, this.x, this.y, this.width, this.height);
    };

    // Animate the dino
    this.animate = function()
    {
        if(this.is_on_ground && !this.is_dead)
        {
            this.width = (!this.is_down) ? 70 : 90;
            this.height = (!this.is_down) ? 77 : 43;

            run = (this.is_down) ? run2 : run1;

            this.sprite_x = run[current].x;
            this.sprite_y = run[current].y;
            this.sprite_width = run[current].width;
            this.sprite_height = run[current].height;

            current++;
            current = (current === run.length) ? 0 : current;
        }
        else
        {
            this.sprite_x = 1337;
            this.sprite_y = 0;
            this.sprite_width = 89;
            this.sprite_height = 97;

            current = 0;
        }
    };
}
