interface QuotePropertyCategory {
    id: string;
    name: string;
    items: string[];
}

export const QUOTE_PROPERTY_CATEGORIES :QuotePropertyCategory[]= [
            {
                id: 'res',
                name: 'Residential',
                items: [
                    'Studio', 'Apartment / Flat', 'Townhouse', 'House', 
                    'Penthouse', 'Luxury Villa', 'Holiday Rental / VIP Property'
                ]
            },
            {
                id: 'com',
                name: 'Commercial & Retail',
                items: [
                    'Micro Office', 'Office', 'Coworking Space', 'Retail Shop', 
                    'Shopping Centre', 'Supermarket / Grocery Store', 'Bank / Financial Office', 
                    'Showroom', 'Car Dealership'
                ]
            },
            {
                id: 'hosp',
                name: 'Hospitality & Leisure',
                items: [
                    'Restaurant', 'Café', 'Hotel', 'Gym / Fitness Centre', 'Beauty Salon / Spa'
                ]
            },
            {
                id: 'health',
                name: 'Healthcare & Care',
                items: [
                    'Medical Clinic', 'Hospital', 'Elderly Care Home'
                ]
            },
            {
                id: 'edu',
                name: 'Educational',
                items: [
                    'School / Nursery', 'Playground / Outdoor Play Area'
                ]
            },
            {
                id: 'ind',
                name: 'Industrial',
                items: [
                    'Warehouse', 'Distribution Centre', 'Factory'
                ]
            },
            {
                id: 'spec',
                name: 'Special',
                items: [
                    'Other Property'
                ]
            }
        ];
