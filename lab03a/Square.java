//Bayram Muradov
//lab03
//1 march, 2016

public class Square extends Rectangle {
  
  //properties
  double length;
  int x;
  int y;
  
  //constructors
  public Square(double length) {
   super (length, length);
   x = 0;
   y = 0;
  }
  
  //methods
  
  //gets Area
  @Override
  public double getArea() {
    return length*length;
  }
  
  //sets location
  @Override
  public void setLocation(int a, int b) {
    x = a;
    y = b;
  }
  
  //returns x coordinate
  @Override
  public int getX() {
    return x;
  }
 
  //returns y coordinate
  @Override 
  public int getY(){
    return y;
  }
  
  //retuns selected 
  public boolean getSelected() {
    return selected;
  }
  //sets selected
  public void setSelected(boolean in) {
    selected = in; 
  }
  //string representation of area& getSelected
  public String toString() { 
    String res = "square area: " + getArea() + "\t"; 
    if ( getSelected() == true) 
      res = res + "selected \n"; 
    else if(getSelected() == false)
      res = res + "non-selected\n"; 
     
    return res; 
  }
  
  
}

