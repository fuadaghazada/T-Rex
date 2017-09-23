import java.util.*;
//Bayram Muradov
//Lab 03
//1 march, 2016

public class ShapeTest {
  public static void main(String[] args){
    
    Scanner scan = new Scanner(System.in);
    //constants& variables
    
    //menu inputs
    int input;
    int input2;
    int exit;
    int input4;
    int input6;
    //rectangle
    double inputRleng;
    double inputWidth;
    //square
    double squareL;
    //circle
    double circRus;
    //set
    int setx;
    int sety;
    
    ShapeContainer list = new ShapeContainer();
    
    //program code
    do {
      //printing main menu
      System.out.println("::choose an option::");
      System.out.println("<1> add shape ");
      System.out.println("<2> print areas");
      System.out.println("<3> show shapes");
      System.out.println("<4> select shapes");
      System.out.println("<5> delete shapes");
      System.out.println("<6> set shapes ");
      System.out.println("<0> quit");
      System.out.println();
      //asking user's input
      input = scan.nextInt();
      
      //checks users input& operates
      
      
      if(input == 1) {
        //opens a sub-menu in which the user chooses the shape
        System.out.println("<enter shape>");
        System.out.println("1.rectangle");
        System.out.println("2.square");
        System.out.println("3.circle");
        System.out.println();
        //gets user's response
        input2 = scan.nextInt();
        
        if(input2 == 1) {
          //asks& gets the parameters of rectangle
          System.out.println("enter length");
          inputRleng = scan.nextDouble();
          System.out.println("enter width");
          inputWidth = scan.nextDouble();
          list.add(new Rectangle(inputRleng, inputWidth));
        }
        if(input2 == 2) {
          //asks& gets the parameters of square
          System.out.println("enter length of a side");
          squareL = scan.nextDouble();
          list.add(new Square(squareL));
        }
        if(input2 == 3) {
          //asks& gets the parameters of circle
          System.out.println("enter the radius");
          circRus = scan.nextDouble();
          list.add(new Circle(circRus));
        }
      }
      
      if(input == 2) {
        //prints the areas of shapes in list
        for(int i =0; i<list.size(); i++) {
          System.out.println(list.get(i).getArea());
        }
      }
      
      if(input == 3) {
        //shows the list
        System.out.println( list.toString());
      }
      
      if(input == 4) {
        do { 
          //prints the list& asks user input
          System.out.println( list.toString()); 
          System.out.println( "select shape. -1 to quit"); 
          input4 = scan.nextInt(); 
          if ( input4 >= 0) 
          list.get(input4).setSelected(true); 
        } while ( input4 != -1); 
      }
      
      if ( input == 5) { 
        //uses remove2() method to delete the selected shapes
        list.remove2(); 
        System.out.println( "removed"); 
      }
      
      if( input == 6) {
        //shows the list& asks user for index of shape
        System.out.println( list.toString()); 
        do 
        { 
          System.out.println( " enter shape index. -1 to quit"); 
          input6 = scan.nextInt(); 
           
          if (input6 >= 0) //checks the input
          { 
            System.out.println( "enter x coordinate"); 
            setx = scan.nextInt(); //asks for x
            System.out.println( "enter y coordinate"); 
            sety = scan.nextInt(); //asks for y
             
            list.get( input6).setLocation( setx, sety); //sets
             
            System.out.println( list.toString()); //shows the list 
          } 
        } while ( input6 != -1);//exits
      
    }
   }
    while(input != 0); //exits
    
    if(input == 0) {
      System.out.println("bye."); //prints bye message
    }   
  }
}
