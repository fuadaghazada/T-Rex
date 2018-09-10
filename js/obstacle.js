function Obstacle(x, ground, b_mode = 0)
{
    // Canvas
    canvas = document.getElementById('gc');

    // Image
    var img = new Image();
    img.src = "images/sprite_sheet.png";

    // BIRTHDAY
    var birthday_img = new Image();
    birthday_img.src = "images/birthday_cake.png";



    var fly = [{x: 260, y: 0, width: 92, height: 82}, {x: 352, y: 0, width: 92, height: 82}];
    var current = 0;

    // Properties
    num_types = (b_mode === 0) ? 3 : 4;

    this.x = x;
    this.type = Math.floor(Math.random() * num_types);
    this.speed = 1.5;

    if(this.type === 0)
    {
        this.sprite_x = 446;
        this.sprite_y = 0;
        this.sprite_width = 34;
        this.sprite_height = 70;

        this.width = 25;
        this.height = 51;

        this.y = ground - this.height;
    }
    else if(this.type === 1)
    {
        this.sprite_x = 652;
        this.sprite_y = 0;
        this.sprite_width = 50;
        this.sprite_height = 100;

        this.width = 35;
        this.height = 68;

        this.y = ground - this.height + 5;
    }
    else if(this.type === 2)
    {
        this.sprite_x = fly[0].x;
        this.sprite_y = fly[0].y;
        this.sprite_width = fly[0].width;
        this.sprite_height = fly[0].height;

        this.width = 50;
        this.height = 54;

        this.y = Math.floor(Math.random() * (ground - 80) + 20);
    }
    else if(this.type === 3)
    {
        this.width = 50;
        this.height = 50;

        this.y = ground - this.height + 6;
    }


    /*  METHODS */

    // Update actions of obstacle
    this.update = function(context)
    {
        this.x -= this.speed;
    };

    // Rendering the graphics of Obstacle
    this.render = function(context)
    {
        // context.fillStyle = "black";
        // context.fillRect(this.x + 5, this.y + 5, this.width - 5, this.height - 5);

        if(this.type === 3)
        {
            context.drawImage(birthday_img, this.x, this.y, this.width, this.height);
        }
        else
        {
            context.drawImage(img, this.sprite_x, this.sprite_y, this.sprite_width, this.sprite_height, this.x, this.y, this.width, this.height);
        }

    };

    // Animate the graphics of type 2 obstacle ('Crow')
    this.animate = function()
    {
        if(this.type === 2)
        {
            this.sprite_x = fly[current].x;
            this.sprite_y = fly[current].y;
            this.sprite_width = fly[current].width;
            this.sprite_height = fly[current].height;

            current++;
            current = (current === fly.length) ? 0 : current;
        }
    }
}
