export class UsersModel{

    constructor(id, dept, username, email, user_name, user_phone, dept_id){
        this.id = id;
        this.dept = dept;
        this.username = username;
        this.email = email;
        this.user_name = user_name;
        this.dept_id = dept_id;
        this.user_phone = user_phone;
    }

    // updateInfo(pontos, golsMarcados, golsSofridos){
    //     this.pontos += pontos;
    //     this.gm += golsMarcados;
    //     this.gs += golsSofridos;
    // }

}
