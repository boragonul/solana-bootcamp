fn main() {
    let c = my_fn(12);
    println!("c is: {c}");
}

fn my_fn(a: i32) -> i32 {
    println!("a is: {a}");
    let b = 64;
    b
}
