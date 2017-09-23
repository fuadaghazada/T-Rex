//Bayram Muradov
//Lab 03
//1 march, 2016

public class Rectangle extends NewShape {
   // loloagagauygskagdfhgasdavfoiasfh≈
    //properties
     double width;
     double length; 
     int x;
     int y;
     boolean selected;
    
    //constructors
    public Rectangle(double width, double length) {
        this.width = width;
        this.length = length;
        x = 0;
        y = 0;
        selected = false;
    }
    
    //methods
    
    //gets area
    public double getArea() {
        return width * length;
    }

    //gets perimeter
    public double perimeter() {
        return 2 * (width + length);
    }
    
    //sets the location of a shape
    @Override
    public void setLocation(int a, int b) {
      x = a;
      y = b;
    }
    
    //returns x coordinate
    @Override
    public int getX(){
      return x;
    }
    
    //returns y coordinate
    @Override 
    public int getY(){
      return y;
    }
    
    //returns true if the shape is selected
    public boolean getSelected() {
      return selected;
    }
    //makes the shape selected
    public void setSelected(boolean in) {
      selected = in; 
    }
    //checks whether the shape contains given value within its borders 
    public Shape contains(int x, int y) {
        if ( (width / 2) <= (x - this.x) && (length / 2) <= (y - this.y))
            return this;
        else
            return null;
    }
    //string representation of area& gives info about whether the shape is selected
    public String toString() 
    { 
      String res = " rectangle area: " + getArea() + "\t"; 
      if ( getSelected() == true) 
        res = res + "selected\n"; 
      else if(getSelected() == false)
        res = res + "non-selected\n"; 
      
      return res; 
    }
}
    
    

