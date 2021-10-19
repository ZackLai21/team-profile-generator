const employee = require("./Employee");

class Engineer extends employee{
    constructor(name,id,email,GitHub){
        super(name,id,email);
        this.github = GitHub;
    }

    getGithub(){
        return this.github;
    }

    getRole(){
        const role = "Engineer";
        return role;
    }


}

module.exports=Engineer;