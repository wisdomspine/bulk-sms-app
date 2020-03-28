export abstract class Model {
    id: string | number;
    date: string;
    update: string;

    getDate(){
        return new Date(this.date || null)
    }

    getUpdate(){
        return new Date(this.update || null)
    }
}