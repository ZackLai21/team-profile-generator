const Employee = require("./lib/Employee");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const Manager = require("./lib/Manager");
const inquirer = require("inquirer");
const fs = require("fs");

let manager={};
const engineer =[];
const intern =[];

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
        manager=new Manager(data.name,data.id,data.email,data.office);
        switch(data.member){
            case "Engineer":
                return addEngineer();
            case "Intern":
                return addIntern();
            default:
                return renderListing();
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
        engineer.push(new Engineer(data.name,data.id,data.email,data.github));
        switch(data.member){
            case "Engineer":
                return addEngineer();
            case "Intern":
                return addIntern();
            default:
                return renderListing();
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
        intern.push(new Intern(data.name,data.id,data.email,data.school));
        switch(data.member){
            case "Engineer":
                return addEngineer();
            case "Intern":
                return addIntern();
            default:
                return renderListing();
        }
    });
}

function renderListing(){
    console.log(manager)
    console.log(engineer)
    console.log(intern)
}

getManager();