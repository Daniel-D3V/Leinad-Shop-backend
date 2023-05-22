export class NoDataToUpdateError extends Error {
    constructor(){
        super("No data to update was provided.")
        this.name = this.constructor.name
    }
}