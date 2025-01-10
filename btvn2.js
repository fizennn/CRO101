


//Ôn tập if else

function testNum(a){
   let result;
   if (a > 0){
     result = "Số dương";
   } else{
     result = "Khong phai la so duong";
   }
   return result;
}

console.log(testNum(5)); // Số dương


//On tap toan tu 3 ngoi


function getFee(isMember){
    return isMember?'10.000vnd' : '200.000vnd';
}

console.log("Phi thanh vien la",getFee(true));

console.log("Phi thanh vien la",getFee(false));

console.log("Phi thanh vien la",getFee(null));


//On tap switch case

const expr = 'Cam';

switch (expr) {
    case 'Tao':
        console.log('Tao co gia 10.000vnd');
        break;
    case 'Cam':
    case 'Buoi':
        console.log('Cam va Buoi co gia 20.000vnd');
        break;
    default:
        console.log('Khong co gia');
}


//On tap vong lap

for (let step=0;step<5;step++){
    console.log('Step:',step+1);
}

// do
// console.log("Lam gi o day");
// while(condition)

const dumpProps = (obj,objName)=>{
    let result = "";
    for(const i in obj){
        result += `${objName}.${i} = ${obj[i]}\n`;
    }

    console.log(result);
}

const myCar = {make:"Ford",model:"Mustache"}

dumpProps(myCar,"myCar");


//On tap array

const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console.log(array3);


const words = ['spray','limit','elite','exuberant','destruction','present']

const result = words.filter(word => word.length > 6);

console.log(result);


const array11 = [5,!2,8,130,44]

const found = array11.find((Element)=>Element>10)
const found2 = array11.find((Element)=>Element>10000)

console.log(found); 
console.log(found2); 


const array111 = [1,4,9,16];

const map1 = array111.map((x)=>x*2)

console.log(map1);

const array1111 = [1,2,3,4,5,6,7,8]

array1111.forEach((e)=>console.log(e));

const userList = null;

userList?.map?.(user => console.log("Lam gi o do day"))

//On tap object

const object1 = {a:'Something',b:42};

for(const[key,value] of Object.entries(object1)){
    console.log(`${key}: ${value}`);
}

const object2 = {
    a:'somthing',
    b:42,
    c:false,
};

console.log(Object.keys(object2));

console.log(Object.values(object2));








