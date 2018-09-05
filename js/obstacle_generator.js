function ObstacleGenerator(ground_y)
{
    // Canvas
    canvas = document.getElementById('gc');

    // Max number of obstacles on the screen
    this.max = 5;

    // Properties
    this.obstacles = [];

    this.max_distance = 500;  // temporary value
    this.min_distance = 300;  // temporary value

    /* METHODS */

    // Generates obstacles with random distances
    this.generate_obstacles = function(speed)
    {
        if(this.obstacles.length === 0)
        {
            var obstacle = new Obstacle(canvas.width, ground_y);
            obstacle.speed = speed;
            this.obstacles.push(obstacle);
        }
        else
        {
            if(this.obstacles.length < this.max)
            {
                var random_distance = Math.random() * (this.max_distance - this.min_distance) + this.min_distance;
                var obstacle = new Obstacle(this.obstacles[this.obstacles.length - 1].x + random_distance, ground_y);
                obstacle.speed = speed;
                this.obstacles.push(obstacle);
            }
        }
    };

    // Change speeds of the obstacles
    this.update_speed = function(speed)
    {
        for(var i = 0; i < this.obstacles.length; i++)
        {
            this.obstacles[i].speed = speed;
        }
    };

    // Update all the obstacles
    this.update = function()
    {
        for(var i = 0; i < this.obstacles.length; i++)
        {
            this.obstacles[i].update();

            // If obstacle is out of bound
            if(this.obstacles[i].x + this.obstacles[i].width <= 0)
            {
                this.obstacles.splice(i, 1);
            }
        }
    };

    // Renders all the obstacles
    this.render = function(context)
    {
        for(var i = 0; i < this.obstacles.length; i++)
        {
            this.obstacles[i].render(context);
        }
    };

    this.animate_all = function()
    {
        for(var i = 0; i < this.obstacles.length; i++)
        {
            this.obstacles[i].animate();
        }
    }
}
