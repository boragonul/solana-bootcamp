/*
 * Slice
 * -----
 * - is a reference to contigious sequence of elements in a collection
 * - contigious means elements are next to each other
 * - typically used to access a part of collection, instead of all elements
 */
fn main() {
    
    /*
     * String
     * - is a collection of UTF-8 encoded bytes
     * - 
     */
    // sample slice
    // lets get only first 10 characters
    let s = String::from("This is a very very long string believe me");
    let s1 = &s[..10]; // BE CAREFUL the type is '&str' -> this is called String slice
    println!("s is: {s}");
    println!("s1 is: {s1}");
    // some variants
    // -------------
    // 1) ..x  => start from beginning to x
    // 2) x..  => start from x to end
    // 3) x..y => get between
    // 4) ..   => all of it

    /*
     * Rust has two different type of String
     * 
     * 1) String type
     * 2) str slice
     * 
     * What is the difference ?
     * ------------------------
     * 
     * String = growable(mutable), allocated in heap, UTF-8 encoded
     * str = immutable sequence of UTF-8 bytes somewhere in memory (stack, heap or static)
     *       handled behind a ref '&str' because length of sequence is unknown at compile time
     * 
     * Memory model
     * ------------
     *  let m = String::from("growable");
     *  let m1 = &[4..]; // IS AN IMMUTABLE VIEW
     * 
     *   String                       Heap
     *   --------------               ---------------
     *  | address: xyz | points start | index | value |     
     *  | length: 8    | -----------> | 0     | g     |
     *  | capacity: 8  |              | 1     | r     |
     *   --------------               | 2     | o     |
     *                                | 3     | w     |
     *                         -----> | 4     | a     |
     *                         |      | 5     | b     |
     *   &str                  |      | 6     | l     |
     *   --------------  points|      | 7     | e     |
     *  | address: abc | -------       --------------- 
     *  | length: 4    |              
     *   --------------               
     */                          
    let m = String::from("growable");
    let m1 = &m[4..];
    println!("m is: {m}");
    println!("m1 is: {m1}");

   /*
    * When to use which one ?
    * ------------------------
    * String type = if you want ownership, to mutate it or pass to other threads 
    * str slice   = if you want an immutable view of string or a subset
    *
    * BE CAREFUL
    * When you create a string literal like
    *
    * let t = "Hello World"
    *
    * 1) this is a string slice
    * 2) it lives in 'static' memory, embedded into programs binary !
    */ 
    let t = "Hello world";
    println!("t is: {t}");

   /*
    * What happens when passed to a function ?
    * ----------------------------------------
    */
    let y = String::from("Another : this is a very very long string believe me"); 
    let y1 = my_trim(&y);
    println!("y is: {y}");
    println!("y1 is: {y1}");

    let z = "In binary : This is a very very long another string believe me";
    println!("z is: {z}");
    // THIS DOESN't WORK 
    //------------------
    let z1 = my_trim(&z);    
    println!("z1 is: {z1}");
    // 
    // BECAUSE my_trim accepts &String not &str
    // - Let's fix it
    // - How the other is working ? Rust :) automatically converts
    // - Always use '&str' if you dont need ownership: then pass &str or &String
 
    // DON'T FORGET
    // ------------
    // Slices works same for arrays and vectors !!
}

fn my_trim(s: &str) -> &str {
    &s[..10]
}
