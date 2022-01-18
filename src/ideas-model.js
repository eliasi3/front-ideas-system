export class    IdeasModel{

    constructor(id, idea_name, idea_description, user, category, mission){
        this.id = id;
        this.idea_name = idea_name;
        this.idea_description = idea_description;
        this.user = user
        this.category = category
        this.mission = mission
        
        
    }

    // updateInfo(pontos, golsMarcados, golsSofridos){
    //     this.pontos += pontos;
    //     this.gm += golsMarcados;
    //     this.gs += golsSofridos;
    // }

}
