type PricingRule = {
    price: number;
    discountHandler?: (quantity: number) => number;
};

type PricingRules = Record<string, PricingRule>;

class Checkout {
    private pricingRules: PricingRules;
    private items: string[];

    constructor(pricingRules: PricingRules) {
        this.pricingRules = pricingRules;
        this.items = [];
    }

    scan(item: string): void {
        this.items.push(item);
    }

    total(): number {
        const itemCounts: { [sku: string]: number } = {};

        // Count occurrences of each scanned item
        for (const item of this.items) {
            itemCounts[item] = (itemCounts[item] || 0) + 1;
        }
        let totalCost = 0;

        // Calculate total cost based on the pricing rules
        for (const sku in itemCounts) {
            const count = itemCounts[sku];
            const pricingRule = this.pricingRules[sku];

            if (pricingRule) {
                const { price, discountHandler } = pricingRule;
                const applicablePrice = discountHandler ? discountHandler(count) : price ;
                if(sku === 'atv'){
                    totalCost += applicablePrice;
                } else {
                totalCost += applicablePrice * count;
                }
            }


        }

        return parseFloat(totalCost.toFixed(2)); // Return total cost rounded to 2 decimal places
    }
}

// Define the pricing rules
const pricingRules: PricingRules = {
    ipd: {
        price: 549.99,
        discountHandler: (quantity) => (quantity > 4 ? 499.99 : 549.99), // Bulk discount for Super iPad
    },
    mbp: {
        price: 1399.99,
    },
    atv: {
        price: 109.50,
        discountHandler: (quantity) => {
            const setsOfThree = Math.floor(quantity / 3);
            const remaining = quantity % 3;
            return (setsOfThree * 2 * 109.50) + remaining *109.50 // 3 for 2 deal on Apple TV
        },
    },
    vga: {
        price: 30.00,
    },
};

export { Checkout, pricingRules };