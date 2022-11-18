fn main() {
    
    // if/else
    let x = 12;
    if x > 10 {
        println!("x is bigger then 10");
    } else {
        println!("x is less then 10");
    }

    let y = if x > 10 { 12 } else { 24 };
    println!("y is: {y}");

    // loop
    loop {
        println!("me");
        break;
    }

    'first_label: loop {
        loop {
            break 'first_label;
        }
    }

    let t =  loop {
        break 14;
    };
    println!("t is: {t}");

    // while
    let mut z = 5;
    while z < 10 {
        println!("z is: {z}");
        z = z+1;
    }
    println!("z is: {z}");

    // for loop
    let arr = [5,6,7,8];
    for a in arr {
        println!("a is: {a}");
    }

}
