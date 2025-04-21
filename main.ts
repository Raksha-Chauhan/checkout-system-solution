import { Checkout, pricingRules } from './checkout.js';


const args = process.argv.slice(2);

// Check if a argument is provided
if (args.length > 0) {
    const co = new Checkout(pricingRules);
    for(let arg of args){  
        co.scan(arg)
    }
    console.log(co.total()); 
} else {
    console.log('No argument provided!');
}
