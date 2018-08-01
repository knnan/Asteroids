function star()
{
    this.x = random(width);
    this.y = random(height);
    this.r = random(4);
    this.show = function()
    {
        ellipse(this.x,this.y,this.r,this.r);
    }
}
