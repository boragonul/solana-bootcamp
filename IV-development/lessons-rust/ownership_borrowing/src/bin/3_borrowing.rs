/*
 * ---------
 * Borrowing
 * ---------
 * is the act of creating a reference
 * - references are pointers with rules & restrictions
 * - references DON'T TAKE OWNERSHIP !
 * 
 * why borrow ?
 * - performance
 * - i don't want to be the owner (not needed / not desired)
 * 
 * rules
 * -----
 * - at any given time you can have either one mutable reference or many immutable references
 * - references must always be valid
 * 
 * solves
 * ------
 * - data races (2 threads trying to read and write same memory location)
 * - dangling references (referencing to invalid memory)
 */
fn main() {

    /*
     * Borrowing
     * 
     * COPIED FROM '2_ownership_functions.rs'
     */
    
    // 1
    let x = String::from("Hello World"); // this is allocated at heap    
    my_print_string_2(&x);
    println!("x is: {}", &x);

    // 2
    let z = String::from("Hello World"); // this is allocated at heap
    println!("z is: {}", z.clone()); // FIX-1: this works because we give a clone to function (NOT GOOD)
    println!("z is: {}", &z); // FIX-2: we pass the 'reference' now (GOOD)

    // 3
    let mut d = String::from("Hello");
    my_add_string_2(&mut d);
    println!("d is: {}", &d);

    // 4
    let e = my_create_string_2();
    println!("e is: {}", &e);

}

// ------------------------
// immutable ref
// ------------------------
fn my_print_string_2(s: &String) {
    println!("{s}");
} // i'm not the owner

// ------------------------
// mutable ref
// ------------------------
fn my_add_string_2(s: &mut String) {
    s.push_str(" World"); // automatic derefencing (*s).push_str(...)
} 

// ------------------------
// dangling ref
// ------------------------
// 1) inside the function we create a variable 's'
// 2) we return a reference
// 3) 's' will be dropped after returning
// RUST DOES NOT ALLOW US TO CREATE DANGLING REFERENCES :) THX :)
 
// fn my_create_string_2() -> &String {
//    let s = String::from("A New Hello World");
//     &s
// }
fn my_create_string_2() -> String {
    let b = String::from("A New Hello World");
    b
} // reference ownership is given (CORRECT)
