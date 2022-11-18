fn main() {
    // variables
    let x  =10;
    println!("x is: {x}");

    // mutability
    let mut y = 11;
    y = 12;
    println!("y is: {y}");

    // shadowing
    let z = 13;
    let z = 14;

    println!("z is: {z}");


    // scope
    let u = 14;
    {
        let u = 15;
        println!("u is: {u}");
    }
    println!("u is: {u}");
}
