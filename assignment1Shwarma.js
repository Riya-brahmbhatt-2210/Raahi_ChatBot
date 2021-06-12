const Order = require("./assignment1Order");

const OrderState = Object.freeze({
    WELCOMING:   Symbol("welcoming"),
    MENU:   Symbol("Menu"),
    SIZE:   Symbol("size"),
    TOPPINGS:   Symbol("toppings"),
    DRINKS:  Symbol("drinks"),
    MUFFIN:  Symbol("Muffin"),
    FINISH: Symbol("Finish"),
    EXTRA: Symbol("Extra")
});


const ITEMPRICE = Object.freeze({
    wrap:{
        small:6,
        Medium:8,
        Large:10
    },
    burger:{
        small:6,
        Medium:8,
        Large:10
    },
    pizza:{
        small:6,
        Medium:8,
        Large:10
    },
    coldDrinks: 3,
    Muffin:4
});

module.exports = class ShwarmaOrder extends Order{
    constructor(){
        super();
        this.or="";
        this.ch=0;
        this.f=0;
        this.price=0;
        this.stateCur = OrderState.WELCOMING;
        this.sSize = "";
        this.sToppings = "";
        this.sMuffin = "";
        this.sDrinks = "";
        this.sItem = "shawarama";
        this.staticStr="Order Summary: ";
        this.FinalOrder="";
    }
    handleInput(sInput){
        let aReturn = [];
        switch(this.stateCur){
            case OrderState.WELCOMING:
                if(this.f!=0){
                    this.FinalOrder+=`${this.sSize} ${this.or} with `;
                    this.FinalOrder+=`${this.sToppings}`; 
                }
                this.stateCur = OrderState.MENU;
                aReturn.push("Welcome to Raahi Restuarant.");
                aReturn.push("Choose From following Menu:");
                aReturn.push("1. Wrap \n 2. Burger \n 3. Pizza \n 4. Exit");
                break;
            case OrderState.MENU:
                if(sInput === "1"){
                    this.or="Wrap";
                    this.f++;
                }
                else if(sInput === "2"){
                    this.or="Burger";
                    this.f++;
                }
                else if(sInput === "3"){
                    this.or="Pizza";
                    this.f++;
                }
                else if(sInput === "4"){
                    this.stateCur=OrderState.FINISH;
                    this.ch=0;
                    if(this.f>1){
                        this.FinalOrder+=`\n${this.sSize} ${this.or} with `;
                        this.FinalOrder+=`${this.sToppings}`; 
                    }
                    aReturn.push(this.staticStr);
                    aReturn.push(this.FinalOrder);
                    if(this.sDrinks)
                        aReturn.push(this.sDrinks);
                    if(this.sMuffin)
                        aReturn.push("Muffin");
                    aReturn.push(`And your Order total is $${this.price}`)
                    let d = new Date(); 
                    d.setMinutes(d.getMinutes() + 20);
                    aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                    return aReturn;
                }
                else{
                    this.stateCur=OrderState.MENU;
                    aReturn.push("Please Enter Valid Input!!");
                    break;
                }
                this.stateCur = OrderState.SIZE;
                aReturn.push(`What size would you like of your ${this.or}? (small / Medium / Large)`);
                break;
            case OrderState.SIZE:
                if( sInput.toLowerCase()==="small")
                    this.price+=ITEMPRICE.wrap.small;
                else if( sInput.toLowerCase()==="medium")
                    this.price+=ITEMPRICE.wrap.Medium;
                else if( sInput.toLowerCase()==="large")
                    this.price+=ITEMPRICE.wrap.Large;
                else{
                    this.stateCur=OrderState.SIZE;
                    aReturn.push("Please Enter Valid Input!! (small / Medium / Large)");
                    break;
                }
                this.stateCur = OrderState.TOPPINGS
                this.sSize = sInput;
                aReturn.push(`What toppings would you like with your ${this.or}?`);
                break;
            case OrderState.TOPPINGS:
                this.stateCur = OrderState.MUFFIN
                this.sToppings = sInput;
                aReturn.push("Would you like Muffin with that?");
                break;
            case OrderState.MUFFIN:
                this.stateCur = OrderState.DRINKS
                if(sInput.toLowerCase()==="yes"){
                    this.price+=ITEMPRICE.Muffin;
                    this.sMuffin = sInput;
                }
                aReturn.push("Would you like drinks with that?");
                break;
            case OrderState.DRINKS:
                this.stateCur = OrderState.EXTRA;
                if(sInput.toLowerCase() != "no"){
                    aReturn.push("what drink would you like to have? ");
                    this.price+=ITEMPRICE.coldDrinks;
                    break;
                }    
                this.stateCur = OrderState.FINISH;
                aReturn.push("would you like to choose another item? ");
                break;
            case OrderState.EXTRA:
                this.stateCur = OrderState.FINISH;
                this.sDrinks += " "+ sInput;
                aReturn.push("would you like to choose another item? ");
                break;
            case OrderState.FINISH:
                if(sInput.toLowerCase() === "no"){
                    this.stateCur=OrderState.FINISH;
                    this.ch=1;
                    this.FinalOrder+=`\n${this.sSize} ${this.or} with `;
                    this.FinalOrder+=`${this.sToppings}`; 
                }
                else if(sInput.toLowerCase() === "yes"){
                    this.stateCur=OrderState.WELCOMING;
                    aReturn.push("Are you sure? (Yes / No)");
                    this.ch=0;
                }

                if(this.ch===1){
                    aReturn.push(this.staticStr);
                    aReturn.push(this.FinalOrder);
                    if(this.sDrinks)
                        aReturn.push(this.sDrinks);
                    if(this.sMuffin)
                        aReturn.push("Muffin");
                    aReturn.push(`And your Order total is $${this.price}`)
                    let d = new Date(); 
                    d.setMinutes(d.getMinutes() + 20);
                    aReturn.push(`Please pick it up at ${d.toTimeString()}`);
                }
                break;
        }
        return aReturn;
    }
}