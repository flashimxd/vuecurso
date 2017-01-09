class BillPay{

    constructor( data  = {}){
        this.date_due =  '';
        this.name = '';
        this.value = 0;
        this.done = false;

        Object.assign(this, data);
    }

    toJSON(){
        let due_date = (typeof this.date_due === 'string' &&this.date_due.length == 10) ? this.date_due: this.date_due.toISOString().substring(0,10);
        return {
            date_due: due_date,
            name : this.name,
            value: this.value,
            done: this.done
        }
    }
}