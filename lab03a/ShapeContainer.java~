import java.util.*;
//Bayram Muradov
//Lab 03
//1 march, 2016
public class ShapeContainer {
  
  //properties
  ArrayList <NewShape> container;
  
  //constructors
  public ShapeContainer() {
    container = new ArrayList<NewShape>();
  }
  
  //methods
  
  //adds to list
  public void add(NewShape x) { 
    container.add(x);  
  }
  //returns area
  public double getArea(int i) {   
    return container.get( i).getArea();
  }
  //turns to string
  public String toString(){
    String res = "";
    for(int i =0; i<container.size(); i++){
      res = res + container.get(i); 
    }
    return res;
  }
  //size
  public int size() {
    return container.size();
  }
  //returns shape in list
  public NewShape get(int i) {
    return container.get(i);
  }
  //removes indexed
  public void remove(int i) {
    container.remove(i);
  }
  //removes selected
  public void remove2() { 
    for(int i =0; i<container.size(); i++) {
      if(container.get(i).getSelected() == true) {
        container.remove(i);
      }
    }
  }
            
}

