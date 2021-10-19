const employee = require("./Employee");

class Manager extends employee{
    constructor(name,id,email,office){
        super(name,id,email);
        this.officeNumber = office;
    }

    getOfficeNumber(){
        return this.officeNumber;
    }

    getRole(){
        const role = "Manager";
        return role;
    }


}

module.exports=Manager;