const class1 = [
  {
    mssv: "PS0000",
    name: "Nguyen Van A",
    avgPoint: 8.9,
    avgTraningPoint: 7,
    status: "pass",
  },
  {
    mssv: "PS0001",
    name: "Nguyen Van B",
    avgPoint: 4.9,
    avgTraningPoint: 10,
    status: "pass",
  },
];
const class2 = [
  {
    mssv: "PS0002",
    name: "Nguyen Van C",
    avgPoint: 4.9,
    avgTraningPoint: 10,
    status: "failed",
  },
  {
    mssv: "PS0003",
    name: "Nguyen Van D",
    avgPoint: 10,
    avgTraningPoint: 10,
    status: "pass",
  },
  {
    mssv: "PS0004",
    name: "Nguyen Van E",
    avgPoint: 10,
    avgTraningPoint: 2,
    status: "pass",
  },
];


const allStudent = class1.concat(class2);

// console.log(allStudent);

const allStudentFilter = allStudent.filter(student => student?.status !== "failed");

// console.log(allStudentFilter);

const listAvgPoints = allStudentFilter.sort((a, b) => b.avgPoint - a.avgPoint);

console.log("Danh sach sinh vien co diem so cao nhat : ");
console.log(listAvgPoints);

const listAvgTraningPoints = allStudentFilter.sort((a, b) => b.avgTraningPoint - a.avgTraningPoint);

console.log("Danh sach sinh vien co diem ren luyen cao nhat : ");
console.log(listAvgTraningPoints);

console.log("Sinh vien dat ong vang : ");
console.log(listAvgPoints.at(0));

const max = listAvgPoints.at(0).avgPoint;


const studentsMaxAvgPoint = listAvgPoints.filter(student => student.avgPoint === max);

console.log("Sinh vien co diem so cao nhat cung la : ");
console.log(studentsMaxAvgPoint);



