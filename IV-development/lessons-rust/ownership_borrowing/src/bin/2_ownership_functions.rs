/*
 * ------------------------
 * Ownership with Functions
 * ------------------------
 */
fn main() {

    /*
     *  Ownership (in-to)
     */
    let x = String::from("Hello World"); // this is allocated at heap
    
    my_print_string(x);
    // THIS WILL NOT WORK: println!("x is: {x}");
    
    /*
     * =======
     * BECAUSE
     * =======
     * - passing a variable into a function has the same effect of assigning one variable to another 
     * - ownserhsip of x is moved into 'my_print_string' function (to parameter s)
     * - 's' will be dropped at the end of 'my_print_string'
     * - and "Hello World" will be cleaned up from 'heap'
     */
    let z = String::from("Hello World"); // this is allocated at heap
    println!("z is: {}", z.clone()); // FIX-1: this works because we give a clone to function (NOT GOOD)
    println!("z is: {}", &z); // FIX-2: we pass the 'reference' now (GOOD)

    /*
     *  Ownership (out-to)
     */
    let a = my_create_string();
    println!("a is: {a}"); // a is the new owner,  b created at 'my_create_string' will be dropped at the end of main

    /*
     *  Ownership (in-to + out-to)
     * 1) ownership of 'd' is transferred to 'my_append_string' as 'e'
     * 2) ownership of 'e' is returned back to 'f'
     */
    let d = String::from("Hello");
    let f = my_append_string(d);
    println!("f is: {f}");

    /* 
     * ==========
     * BE CAREFUL
     * ==========
     * same rules apply for primitives, they are cloned by default as it's cheap
     */



}

// ------------------------
// ownership => in
// ------------------------
fn my_print_string(s: String) {
    println!("{s}");
} // s is dropped

// ------------------------
// ownership => out
// ------------------------
fn my_create_string() -> String {
    let b = String::from("A New Hello World");
    b
} // b will be dropped at the place it's used

// ------------------------
// ownership => in + out
// ------------------------
// BE CAREFUL: 
// - while passing the c we defined it mutable !!
// - this is different then defining a mutable and passing to here !!
fn my_append_string(mut c: String) -> String {
    c.push_str(" World");
    c
}
