

interface AllocateThisWay {

}

interface AllocateThatWay {

} 

class Composition {

    constructor(
        private readonly allocateThisWay: AllocateThisWay,
        private readonly allocateThatWay: AllocateThatWay
    ) {}
    
    getOptions(option: "allocateThisWay" | "allocateThatWay") {

        const optionsFunctions = {
            allocateThisWay: this.allocateThisWay,
            allocateThatWay: this.allocateThatWay
        }

        const method = optionsFunctions[option]
        
        return method
    }

}


const doSomething = () => {
    console.log('do something')
}
