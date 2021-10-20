const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const fs = require("fs");

const listing =[];


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
                return renderHtml();
        }
    });
}

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
                return renderHtml();
        }
    });
}

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
                return renderHtml();
        }
    });
}

function renderManager(manager){
    return`
    <div class="col-4 mt-4">
      <div class="card h-100">
        <div class="card-header">
            <h3>${manager.name}</h3>
            <h4>Manager</h4><i class="material-icons">content_paste</i>
        </div>
        <div class="card-body">
            <p class="id">ID: ${manager.id}</p>
            <p class="email">Email: <a href="#">${manager.email}</a></p>
            <p class="office">Office Number: ${manager.officeNumber}</p>
        </div>
      </div>
    </div>
    `
}

function renderEngineer(engineer){
    return`
    <div class="col-4 mt-4">
      <div class="card h-100">
        <div class="card-header">
            <h3>${engineer.name}</h3>
            <h4>Engineer</h4><i class="material-icons">laptop_mac</i>
        </div>
        <div class="card-body">
            <p class="id">ID: ${engineer.id}</p>
            <p class="email">Email: <a href="#">${engineer.email}</a></p>
            <p class="github">Github: <a href="#">${engineer.github}</a></p>
        </div>
      </div>
    </div>
    `
}


function renderIntern(intern){
    return`
    <div class="col-4 mt-4">
      <div class="card h-100">
        <div class="card-header">
            <h3>${intern.name}</h3>
            <h4>Intern</h4><i class="material-icons">assignment_ind</i>
        </div>
        <div class="card-body">
            <p class="id">ID: ${intern.id}</p>
            <p class="email">Email:<a href="#}">${intern.email}</a></p>
            <p class="school">School: ${intern.school}</p>
        </div>
      </div>
    </div>
    `
}

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


function renderHtml(){
    console.log(listing)
}

getManager();