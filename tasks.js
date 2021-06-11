
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
  else if (text.match(/check\s+\d+/)){
    check()
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
  console.log("lists of commands available: \n hello \n help \n unknown command \n exit \n quit \n node tasks.js \n Hello Batata ")
}
let tasks = [ 'Hello', 'hello 2', 'hello 3']
let unchecked = "[ ] "
let checked = "[✓] "

// show list

function list(){
  // let taskArray = tasks.map(item => `${item}\n`).join('')
  for (i=0; i<tasks.length; i++){
    console.log(i+1 + "-" + unchecked + tasks[i])
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


function editTwo(text){
  let newText = text.substr(5)
  tasks.pop()
  tasks.push(newText)
}


function edit(text){
  let newText = text.substr(7)
  let numb = text.match(/\d+/) - 1;
  let res =tasks[numb].replace(tasks[numb],newText)
  tasks[numb] = res
 
}

// Add task
function add(textTask) {
  
if(textTask.trim()){
tasks.push(textTask)} else {
  console.log("Error")
}
  
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Mhamad Safa")
