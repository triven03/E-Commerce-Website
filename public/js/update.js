const userModel = require("./database/models/user");

let old = document.getElementById('oldpassword');


let hide=document.getElementById('hidden');
let idv = hide.value;
// console.log(id);

let data = await userModel.find({ _id:idv})

