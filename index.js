const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const fs = require("fs");

const listing =[];

//prompt the questions for users
function getManager(){
    return inquirer.prompt([
        {
            type:"input",
            message:"What is the team manager's name?",
            name:"name",
        },
        {
            type:"input",
            message:"What is the team manager's id?",
            name:"id",
        },
        {
            type:"input",
            message:"What is the team manager's email?",
            name:"email",
        },
        {
            type:"input",
            message:"What is the team manager's office number?",
            name:"office",
        },
        {
            type:"list",
            message:"Which type of team member would you like to add?",
            name:"member",
            choices:["Engineer","Intern","I don't want to add any more team members"],
        },
    ]).then((data)=>{
        listing.push(new Manager(data.name,data.id,data.email,data.office));
        switch(data.member){
            case "Engineer":
                return addEngineer();
            case "Intern":
                return addIntern();
            default:
                return generateHtml(listing);
        }
    });
}

//If the user choose to add engineer, prompt the questions to add a engineer
function addEngineer(){
    return inquirer.prompt([
        {
            type:"input",
            message:"What is your engineer's name?",
            name:"name",
        },
        {
            type:"input",
            message:"What is your engineer's id?",
            name:"id",
        },
        {
            type:"input",
            message:"What is your engineer's email?",
            name:"email",
        },
        {
            type:"input",
            message:"What is your engineer's GitHub username?",
            name:"github",
        },
        {
            type:"list",
            message:"Which type of team member would you like to add?",
            name:"member",
            choices:["Engineer","Intern","I don't want to add any more team members"],
        },
    ]).then((data)=>{
        listing.push(new Engineer(data.name,data.id,data.email,data.github));
        switch(data.member){
            case "Engineer":
                return addEngineer();
            case "Intern":
                return addIntern();
            default:
                return generateHtml(listing);
        }
    });
}

//If the user choose to add intern, prompt the questions to add a intern
function addIntern(){
    return inquirer.prompt([
        {
            type:"input",
            message:"What is your intern's name?",
            name:"name",
        },
        {
            type:"input",
            message:"What is your intern's id?",
            name:"id",
        },
        {
            type:"input",
            message:"What is your intern's email?",
            name:"email",
        },
        {
            type:"input",
            message:"What is your intern's school?",
            name:"school",
        },
        {
            type:"list",
            message:"Which type of team member would you like to add?",
            name:"member",
            choices:["Engineer","Intern","I don't want to add any more team members"],
        },
    ]).then((data)=>{
        listing.push(new Intern(data.name,data.id,data.email,data.school));
        switch(data.member){
            case "Engineer":
                return addEngineer();
            case "Intern":
                return addIntern();
            default:
                return generateHtml(listing);
        }
    });
}

//helper function to build a manager card
function renderManager(manager){
    return`
    <div class="col-4 mt-4">
      <div class="card h-100 shadow-lg">
        <div class="card-header bg-info text-white">
            <h3>${manager.getName()}</h3>
            <h4>Manager</h4>
        </div>
        <div class="card-body">
            <p class="id">ID: ${manager.getId()}</p>
            <p class="email">Email: <a href="mailto:${manager.getEmail()}">${manager.getEmail()}</a></p>
            <p class="office">Office Number: ${manager.getOfficeNumber()}</p>
        </div>
      </div>
    </div>
    `
}

//helper function to bulid an engineer card
function renderEngineer(engineer){
    return`
    <div class="col-4 mt-4">
      <div class="card h-100 shadow-lg">
        <div class="card-header bg-info text-white">
            <h3>${engineer.getName()}</h3>
            <h4>Engineer</h4>
        </div>
        <div class="card-body">
            <p class="id">ID: ${engineer.getId()}</p>
            <p class="email">Email: <a href="mailto:${engineer.getEmail()}">${engineer.getEmail()}</a></p>
            <p class="github">Github: <a href="https://github.com/${engineer.getGithub()}" target="_blank">${engineer.getGithub()}</a></p>
        </div>
      </div>
    </div>
    `
}

//helper function to bulid an intern card
function renderIntern(intern){
    return`
    <div class="col-4 mt-4">
      <div class="card h-100 shadow-lg">
        <div class="card-header bg-info text-white">
            <h3>${intern.getName()}</h3>
            <h4>Intern</h4>
        </div>
        <div class="card-body">
            <p class="id">ID: ${intern.getId()}</p>
            <p class="email">Email:<a href="mailto:${intern.getEmail()}">${intern.getEmail()}</a></p>
            <p class="school">School: ${intern.getSchool()}</p>
        </div>
      </div>
    </div>
    `
}

//helper function to decision which card to build
function renderCard(member){
    switch(member.getRole()){
        case "Manager":
            return renderManager(member);
        case "Engineer":
            return renderEngineer(member);
        case "Intern":
            return renderIntern(member);
        default:
            return "";
    }
}

//function to bulid the whole html
function renderHtml(listing){
    const cards = listing.map((member)=>renderCard(member));
    return`
    <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Team Profile</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.5.0/css/bootstrap.min.css">
  </head>
  <body>
    <div class="jumbotron jumbotron-fluid bg-info">
      <div class="container">
        <h1 class="display-4 text-center text-white">My Team</h1>
      </div>
    </div>
   
      <div class="container">
        <div class="row justify-content-center" id="team-cards">
        ${cards.join("")}

        </div>
    </div>

    
</body>
</html>
    `;
}

//write the html into file
function generateHtml(listing){
    const html = renderHtml(listing);
    fs.writeFile("./dist/index.html",html,(err)=>{
    if(err){
        console.log(err);
        return;
    }
    console.log("Success!!!");
  })
}

//init
getManager();