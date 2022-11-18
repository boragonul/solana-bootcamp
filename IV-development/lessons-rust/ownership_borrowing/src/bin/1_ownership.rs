/*
 * ---------
 * Ownership
 * ---------
 * is a strategy for managing memory (and some other resources)
 * through a set of rules checked at compile time
 * 
 * rules:
 * ------
 * - every value in Rust has a variable that's called it's owner
 * - there can be only one owner at a time
 * - when the owner goes out of scope the value will be dropped 
 * 
 * solves:
 * -------
 * - memory leaks (or resource leaks)
 * - double free
 * - use after free
 */

fn main() {


    /*
     *  Ownership
     */
    let x = String::from("Hello World"); // this is allocated at heap
    println!("x is: {x}");

    /* ===== */
    /*  (I)  */
    /* ===== */
    /*  stack                     heap
     *  ------                    ------
     * |      |  is a pointer    |      |
     * |  x   | -------------->  | Rust |
     * |      |                  |      |
     *  ------                    ------
     * 
     * x is the owner of "Rust" string
     */
    

    let y = x;
    // THIS WILL NOT WORK: println!("x is: {x}"); 
    println!("y is: {y}");
    /* ====== */
    /*  (II)  */
    /* ====== */
    /*  stack                     heap
     *  ------                    ------
     * |      |                  |      |
     * |  x   |  invalidated     | Rust |
     * |      |                  |      |
     *  ------                    ------
     *                              ^
     *  ------                      |
     * |      |  is the new pointer |
     * |  y   | --------------------
     * |      |
     *  ------
     * y is the new owner of "Rust" string
     */

     let z = y.clone();
     println!("y is: {y}");
     println!("z is: {z}");
    /* ======= */
    /*  (III)  */
    /* ======= */
    /*  stack                     heap
     *  ------                    ------
     * |      |                  |      |
     * |  y   |  ------------->  | Rust |
     * |      |                  |      |
     *  ------                    ------
     *                              
     *  ------                    ------
     * |      |                  |      |
     * |  z   |  ------------->  | Rust |
     * |      |                  |      |
     *  ------                    ------
     * y and z point to different "Rust" strings
     */


    /* 
     * ==========
     * BE CAREFUL
     * ==========
     * - these rules are not valid for primitives !! (try with i32, f32, bool, chars)
     * - primitives are stored on stack and cloned by default
     * - they are cheap to clone: no difference cloning or moving
     * 
     * but it might be expensive for something big in heap :)
     * that's why not everything is cloned by default
     */

} // x is dropped
