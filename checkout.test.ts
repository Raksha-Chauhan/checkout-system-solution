import { Checkout, pricingRules } from './checkout';

describe('Checkout System', () => {
    it('should calculate total for Apple TVs with 3-for-2 offer', () => {
        const co = new Checkout(pricingRules);
        co.scan('atv');
        co.scan('atv');
        co.scan('atv');
        co.scan('vga');
        expect(co.total()).toBe(249.00); // 2 * 109.50 + 30
    });

    it('should calculate total for multiple iPads with bulk discount', () => {
        const co = new Checkout(pricingRules);
        co.scan('atv');
        co.scan('ipd');
        co.scan('ipd');
        co.scan('atv');
        co.scan('ipd');
        co.scan('ipd');
        co.scan('ipd');
        expect(co.total()).toBe(2718.95); // 3 * 109.50 + 4 * 499.99
    });

    it('should calculate total for different items without any discounts', () => {
        const co = new Checkout(pricingRules);
        co.scan('mbp');
        co.scan('vga');
        co.scan('atv');
        expect(co.total()).toBe(1539.49); // 1399.99 + 30 + 109.50
    });

    it('should calculate total for more than 4 iPads with bulk discount', () => {
        const co = new Checkout(pricingRules);
        co.scan('ipd');
        co.scan('ipd');
        co.scan('ipd');
        co.scan('ipd');
        co.scan('ipd'); // 5 iPads
        expect(co.total()).toBe(2499.95); // 5 * 499.99
    });

    it('should work with empty cart', () => {
        const co = new Checkout(pricingRules);
        expect(co.total()).toBe(0.00);
    });
});

