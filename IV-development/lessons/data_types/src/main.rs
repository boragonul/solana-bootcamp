fn main() {
    // -------------------------------
    // scalar
    // -------------------------------
    // integers
    let x = 12;
    println!("x is: {x}");

    // floats
    let y = 13.0;
    println!("y is: {y}");

    // booleans
    let z = true;
    println!("z is: {z}");

    // character
    let a = '@';
    let b: char ='B';
    println!("a is: {a}");
    println!("b is: {b}");

    // &str
    let name = "Bora Gönül";
    let address = String::from("Istanbul/Turkey");

    println!("name is: {name}");
    println!("address is: {address}");

    // -------------------------------
    // compound
    // -------------------------------
    /*
     * - arrays allocates sequential memory blocks
     * - arrays static
     * - memory block represents array element
     * - arrays elements unique indexed
     * - arrays populating
     * - arrays elements can be updated, modified but cant be deleted
     */
    let arr: [i32; 4] = [1, 2, 3 ,4];
    println!("array is: {:?}", arr);
    println!("array size: {}", arr.len());

    /*
     * - vectors are resizable of a specific element types
     * - vectors are used when to store unknown number of elements
     * - vectors 'capacity' defines how much data can be stored without reallocation
     * - vectors 'capacity' can be specified at creation
     */
    let mut vec = Vec::with_capacity(5);
    vec.push(10);

    println!("vec is: {:?}", vec);
    println!("vec size: {}", vec.len());
    println!("vec capacitiy: {}", vec.capacity());

    /*
     * - tuples can store more then one value
     * - tuples can be different types
     * - tuples fixed length 
     * - tuple: () => Unit
     */
     let tuple: (i32, f32) = (1,2.0);
     println!("tuple[0] is: {}", tuple.0);
     println!("tuple[1] is: {}", tuple.1);

     /*
      * type alias
      */
    type Age = i32;
    let my_age: Age = 48;
    println!("my age is: {}", my_age); 


}
