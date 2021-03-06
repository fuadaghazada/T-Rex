function Game(birthday_mode = 0)
{
    // Properties
    canvas = document.getElementById('gc');
    context = canvas.getContext('2d');

    // Sound
    var point_sfx = new sound("sounds/sfx_point.wav");

    var bg_color;
    var font_color;

    var dino_update_interval;
    var obstacle_update_interval;
    var render_interval;
    var animation_interval;
    var score_update_interval
    var speed;

    // Game components
    ground_y = canvas.height - 50;

    // Game States
    high_score = getCookie('t_rex') ? getCookie('t_rex') : 0;
    is_high_score = false;
    is_game_start = false;
    is_game_over = false;

    game = this;


    /* METHDOS */

    // Key Listener for dino acitons
    document.addEventListener('keydown', function(event)
    {
        if((event.keyCode === 32 || event.keyCode === 38) && !dino.is_down)
        {
            if(event.keyCode !== 38 && is_game_over)
            {
                game.init();
            }
            else if(event.keyCode !== 38 && !is_game_start)
            {
                is_game_start = true;
            }
            else
            {
                dino.jump();
            }
        }
        else if(event.keyCode === 40)
        {
            dino.is_down = true;
            dino.gravity = 5.5;
        }
    });

    document.addEventListener('keyup', function(event)
    {
        if(event.keyCode === 40)
        {
            dino.is_down = false;
            dino.gravity = 2.5;
        }
    });

    // For mobile - touch screen
    document.addEventListener('touchstart', function(event)
    {
        if(is_game_over)
        {
            game.init();
        }
        else if(!is_game_start)
        {
            is_game_start = true;
        }
        else
        {
            if(event.changedTouches[0].pageX > window.innerWidth / 2 && !dino.is_down)
            {
                dino.jump();
            }
            else
            {
                dino.is_down = true;
                dino.gravity = 5.5;
            }
        }
    });

    document.addEventListener('touchend', function(event)
    {
        dino.is_down = false;
        dino.gravity = 2.5;
    });

    // Initialize elements
    this.init = function()
    {
        clearInterval(dino_update_interval);
        clearInterval(obstacle_update_interval);
        clearInterval(render_interval);
        clearInterval(animation_interval);
        clearInterval(score_update_interval);

        is_game_start = false;
        is_game_over = false;
        is_high_score = false;

        obstacles = new ObstacleGenerator(ground_y, birthday_mode);
        dino = new Dino(ground_y, birthday_mode);

        bg_color = (Math.floor(Math.random() * 2) == 0) ? 'skyblue' : 'black';
        font_color = (bg_color === 'skyblue') ? "black" : "white";
        speed = 1.5;

        // Intervals
        dino_update_interval = setInterval(this.update_dino, 850/30);
        obstacle_update_interval = setInterval(this.update, 100/30);
        render_interval = setInterval(this.render, 100/35);
        animation_interval = setInterval(this.animate, 100);
        score_update_interval = setInterval(this.update_score, 400);
    };

    // Update movements / actions
    this.update = function()
    {
        if(is_game_start && !is_game_over)
        {
            // Obstacles
            obstacles.generate_obstacles(speed);
            obstacles.update();
        }
    };

    // Updating the dino properties
    this.update_dino = function()
    {
        if(is_game_start && !is_game_over)
        {
            // Dino
            dino.update(obstacles.obstacles);
            is_game_over = dino.check_collision(obstacles.obstacles);
        }
        else if(is_high_score)
        {
            setCookie('t_rex', high_score, 10);
            is_high_score = false;
        }
    }

    // Updating the score
    this.update_score = function()
    {
        if(is_game_start && !is_game_over)
        {
            dino.score++;

            // High Score
            if(high_score <= dino.score)
            {
                is_high_score = true;
                high_score = dino.score;
            }

            if(dino.score != 0 && dino.score % 100 === 0)
            {
                bg_color = (bg_color === 'skyblue') ? "black" : "skyblue";
                font_color = (bg_color === 'skyblue') ? "black" : "white";
            }

            if(dino.score != 0 && dino.score % 10 === 0)
            {
                point_sfx.play();
                speed += 0.1;
                obstacles.update_speed(speed);
            }
        }
    }

    // Render graphics
    this.render = function()
    {
        // Background
        context.fillStyle = bg_color;
        context.fillRect(0, 0, canvas.width, canvas.height);

        // ground
        context.fillStyle = '#f4ce42';
        context.fillRect(0, ground_y, canvas.width, canvas.height - ground_y);

        // Dino
        dino.render(context);

        // Obstacles
        obstacles.render(context);

        // Game States
        render_game_states(font_color);
    };

    this.animate = function()
    {
        if(is_game_start && !is_game_over)
        {
            dino.animate();
            obstacles.animate_all();
        }
    };

    // Render the game states in texts
    var render_game_states = function(color)
    {
        context.textAlign = "center";
        context.fillStyle = color;
        context.font = "20px 'Press Start 2P'";

        var start_text;

        if(!is_game_start)
        {
            if(detectmob())
                start_text = "Touch to start";
            else
                start_text = "Press space to start";

            context.fillText(start_text, canvas.width/2, canvas.height/2);
        }
        else if(is_game_over)
        {
            if(dino.score >= high_score)
                context.fillText("New High Score!", canvas.width/2, canvas.height/2 + 30);

            context.fillText("Game Over!", canvas.width/2, canvas.height/2);
        }

        context.textAlign = "right";
        context.font = "10px 'Press Start 2P'";
        context.fillText("Score: " + dino.score, canvas.width - 50, 50);
        context.fillText("High Score: " + high_score, canvas.width - 50, 70);
    };
}

function detectmob()
{
    return ( navigator.userAgent.match(/Android/i)
            || navigator.userAgent.match(/webOS/i)
            || navigator.userAgent.match(/iPhone/i)
            || navigator.userAgent.match(/iPad/i)
            || navigator.userAgent.match(/iPod/i)
            || navigator.userAgent.match(/BlackBerry/i)
            || navigator.userAgent.match(/Windows Phone/i));
}

function setCookie(cname, cvalue, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";expires=" + expires + ";";
}

function getCookie(cname)
{
    var name = cname + "=";
    var ca = document.cookie.split(';');

    for(var i = 0; i < ca.length; i++)
    {
        var c = ca[i];
        while (c.charAt(0) == ' ')
        {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

window.onload
{
    var dates = [new Date("9/10/2019"), new Date("9/9/2019"), new Date("8/1/2019"), new Date("09/20/2019"), new Date("4/30/2019")];

    function check_special_date()
    {
        for(var i = 0; i < dates.length; i++)
        {
            if(dates[i].getMonth() === new Date().getMonth() && dates[i].getDate() === new Date().getDate())
            {
                return true;
            }

        }
        return false;
    }

    var game = (check_special_date()) ? new Game(1) : new Game();
    game.init();
}
