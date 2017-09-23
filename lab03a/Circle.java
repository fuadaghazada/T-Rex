//Bayram Muradov
//Lab 03
//1 march, 2016

public class Circle extends NewShape {
    

    /**
     
                SALAM OLSUN MELLIME
     
     */
    
    
    //properties
    double radius;
    final double pi = Math.PI;
    int x;
    int y;
    boolean selected;
  
    //constructors
    public Circle(double radius) {
        this.radius = radius;
        x =0;
        y =0;
        selected =false;
    }

    //methods
    
    //computes area
    @Override
    public double getArea() {
        return pi * Math.pow(radius, 2);
    }
    
    //computes perimeter
    public double perimeter() {
        return 2 * pi * radius;
    }
    
    //sets location of the shape
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
    
    //shows the current state of the shape(selected or not)
    public boolean getSelected() {
      return selected;
    }
    
    //sets the selected value to true
    public void setSelected(boolean in) {
      selected = in; 
    }
     
    //uses Pythagorean theorem to check wheter the given value is within the borders
    @Override
    public Circle contains(int x, int y) {
      double a = Math.sqrt((x-this.x)*(x-this.x) +(y- this.y)*(y- this.y));
      if(radius <= a)
      return this;
      else
      return null;
    }
    //string representation of area& getSelected
    public String toString() 
    { 
      String res = " circle area: " + getArea() + "\t"; 
      if ( getSelected() == true) 
        res = res + "selected\n"; 
      else if(getSelected() == false)
        res = res + "non-selected\n"; 
      
      return res; 
    }

}
      
