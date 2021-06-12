
/**
 * Starts the application
 * This is the function that is run when the app starts
 * 
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *  
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 * 
 * For example, if the user entered 
 * ```
 * node tasks.js batata
 * ```
 * 
 * The text received would be "batata"
 * This function  then directs to other functions
 * 
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  let textTask = text.substr(4);


  if (text === 'quit\n' || text == 'exit\n') {
    quit();
  }
  else if(text.slice(0, 5) == 'hello'){
    hello(text);
  } 
  else if(text.match("help")) {
    help()
  }
  else if(text.split(" ", 1) == 'add'){
    add(textTask)
  }
  else if(text.trim() == 'add'){
    error()
  }
  else if(text == "list\n"){
    list()
  }
  else if(text.match(/remove/)){
    remove(text)
  }
  else if(text == "edit\n"){
    error()
  }
  else if(text.match(/edit\s+\d\s+\w+/)){
    edit(text)
  }
  else if(text.match(/edit\s+\w+/)){
    editTwo(text)
  }
  else if (text == "check\n"){
    error()
  }
  else if (text.slice(0,5) == "check"){
    check(text)
  }
  else if (text.slice(0,8) == "uncheck "){
    uncheck(text)
  }
  else if(text == "uncheck\n"){
    error()
  }
  else{
    unknownCommand(text);
  }
}


/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}

// error function
function error (){
  console.log("error")
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello(value){
  newValue = value.replace( /  /g , "")
  console.log(newValue.trim() + "!")
}

// help show commands to use 
function help(){
  console.log("lists of commands available: \n hello \n help \n unknown command \n exit \n quit \n node tasks.js \n Hello Batata \n edit \n add \n remove \n check \n uncheck ")
}
let tasks = [] 
const fs = require('fs');

let rawdata = fs.readFileSync('database.json');
let data = JSON.parse(rawdata);
let mappedData = data.map(myFunction)
 
 function myFunction(value, index, array){
     return tasks.push(value)
     
 }
 

// show list

function list(){



  for (i=0; i<tasks.length; i++){
    // let tasksUpdated = "[ ]" + tasks[i]
      console.log(i+1 + " " + tasks[i])
      
  }
} 

// remove task
function remove(text){
  let number = text.match(/\d+/)-1;
if (text === 'remove\n'){
  tasks.pop()
}
else if(text.match(/remove\s+\d+/) && number < tasks.length) {
tasks.splice(number, 1);
} else 
  error()
}

// object to get values from when tasks are checked or unchecked
  let whichOne = [
    {
      unchecked: "[ ]",
      checked: "[✓]"
    }
  ] 

// funcion check
function check(text){
  let number = text.match(/\d+/)-1;
  let text2 = tasks[number].slice(3)
  if (text.match(/check\s+\d+/)&& number < tasks.length){
    if(tasks[number].slice(0, 3)== "[ ]"){
       tasks[number]=tasks[number].replace(tasks[number], whichOne[0].checked.concat(text2));
    } 
    else if (tasks[number].slice(0,3)== "[✓]") {
      tasks[number]=tasks[number].replace(tasks[number], whichOne[0].checked.concat(text2));
    } 
    else
       tasks[number]=tasks[number].replace(tasks[number], whichOne[0].checked.concat(tasks[number]));
       
  }

}

// function uncheck

function uncheck(text){
  let number = text.match(/\d+/)-1;
  let text2 = tasks[number].slice(3)
  if (text.match(/check\s+\d+/)&& number < tasks.length){
    if(tasks[number].slice(0, 3)== "[✓]"){
       tasks[number]=tasks[number].replace(tasks[number], whichOne[0].unchecked.concat(text2));
    } 
    else if (tasks[number].slice(0,3)== "[ ]") {
      tasks[number]=tasks[number].replace(tasks[number], whichOne[0].unchecked.concat(text2));
    } 
    else
       tasks[number]=tasks[number].replace(tasks[number], whichOne[0].unchecked.concat(tasks[number]));
       
  }

}
// function edit last task when user do not specify which task to edit
function editTwo(text){
  let newText = text.substr(5)
  tasks.pop()
  tasks.push(newText)
}

// function edit when user specify which task to edit

function edit(text){
  let newText = text.substr(7)
  let numb = text.match(/\d+/) - 1;
  let res =tasks[numb].replace(tasks[numb],newText)
  tasks[numb] = res
}

// Add task
function add(textTask) {
  
if(textTask.trim()){
tasks.push("[ ]" + textTask)} else {
  console.log("Error")
}
  
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  const fs = require("fs");
  let data = JSON.stringify(tasks);
  fs.writeFileSync('database.json', data);
  console.log('Quitting now, goodbye!')
  process.exit();
}


// The following line starts the application
startApp("Mhamad Safa")
