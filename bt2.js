const oldData = [
    {code:'ab', name:'Son moi'},
    {code:'ac', name:'Sua rua mat'},
    {code:null, name:null},
    {code:null, name:''},
];

const cleanedData = oldData.filter(item => item.code && item.name);

const newData = Object.fromEntries(
    cleanedData.map(item => [
        item.code,
        { code: item.code,name: item.name}
    ])
);

console.log(newData);