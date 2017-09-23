//Bayram Muradov
//Lab03
//28 feburary 2016

public abstract class Shape implements Locatable {
  
  //properties
  double area;
  double perimeter;
  //locatable
  int x;
  int y;
  //selected
  boolean selected = false;
  
  //methods
  public double getArea() {
    return area;
  }
  
  public int getX() {
    return x;
  }
  
  public int getY() {
    return y;
  }   
}