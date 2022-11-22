class ticketManager{
    
    #precioBaseDeGanancia
    
    constructor(){
        this.events = []
        this.#precioBaseDeGanancia = 0.15

        getEvents = () =>{ return this.events }

        getnextID = () =>{
            const count = this.events.length;

            if(count > 0) {
                const lastEvent = this.events[count-1];
                const id = lastEvent.id + 1;

                return id
            }
            else{
                return 1
            }
        }

        addEvent = (name, place, price, capacity, date) =>{
        const id = this.getnextID()
        const event ={
            id,
            name,
            place,
            price: price * (1 + this.#precioBaseDeGanancia),
            capacity: capacity  ??  50,
            date: date  ??  new Date().toLocaleDateString(),
            participants: []
        }

        this.events.push(event)
        }
    }
}