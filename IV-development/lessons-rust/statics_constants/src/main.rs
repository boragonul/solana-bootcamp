const MY_PI: i32 = 12345;
static MY_NAME: &str = "my name";

fn main() {
    // constants
    let pi = MY_PI;
    let pi2 = MY_PI;
    println!("pi is: {pi}");
    println!("pi2 is: {pi2}");

    // statics
    println!("name is: {MY_NAME}");


}
