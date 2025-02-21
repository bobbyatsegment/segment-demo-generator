const firstNames = [
    'Alice', 'Bob', 'Charlie', 'Dana', 'Eli', 'Fiona', 'George', 'Hannah', 'Ian', 'Jasmine',
    'Kyle', 'Lena', 'Mason', 'Nora', 'Oliver', 'Paige', 'Quinn', 'Ryan', 'Samantha', 'Tyler',
    'Uma', 'Victor', 'Wendy', 'Xander', 'Yara', 'Zane', 'Ava', 'Benjamin', 'Chloe', 'David',
    'Emma', 'Frank', 'Grace', 'Henry', 'Isla', 'Jack', 'Katherine', 'Leo', 'Madeline', 'Nathan',
    'Olivia', 'Patrick', 'Rebecca', 'Samuel', 'Tessa', 'Ulysses', 'Valerie', 'William', 'Zoe'
  ];
  
const lastNames = [
    'Johnson', 'Smith', 'Davis', 'White', 'Rogers', 'Taylor', 'Mills', 'Brown', 'Carter', 'Lee',
    'Parker', 'Evans', 'Harris', 'Bennett', 'Nelson', 'Moore', 'Wright', 'Garcia', 'Foster', 'Hall',
    'Anderson', 'Mitchell', 'Adams', 'Cooper', 'Gonzalez', 'Reed', 'Morgan', 'Bell', 'Murphy', 'Cook',
    'Brooks', 'Sanders', 'Ward', 'Richardson', 'Bailey', 'Price', 'Wood', 'Green', 'Hughes', 'Phillips',
    'Fisher', 'West', 'Daniels', 'Palmer', 'Stone', 'Griffin', 'Hawkins', 'Gibson', 'Bishop', 'Murray'
];

const plans = ['Free', 'Basic', 'Pro', 'Enterprise'];
const industries = ['E-commerce', 'B2B SaaS', 'Finance', 'Healthcare', 'Education', 'Retail', 'Marketing', 'Technology', 'Media', 'Consumer Goods'];
const locations = ['New York, NY', 'San Francisco, CA', 'Austin, TX', 'Chicago, IL', 'Denver, CO', 'Boston, MA', 'Seattle, WA', 'Los Angeles, CA', 'Miami, FL', 'Atlanta, GA'];

export const eventCatalog = [
    {
        name: 'Product Viewed',
        requiresUserId: false,
        properties: (idx) => ({
        productId: `sku-${idx}`,
        name: `Sample Product ${idx}`,
        category: 'Demo Category',
        price: 19.99,
        currency: 'USD'
        })
    },
    {
        name: 'Product Clicked',
        requiresUserId: false,
        properties: (idx) => ({
        productId: `sku-${idx}`,
        name: `Sample Product ${idx}`,
        position: idx,
        url: `https://www.example.com/product/${idx}`
        })
    },
    {
        name: 'Product Added',
        requiresUserId: false,
        properties: (idx) => ({
        productId: `sku-${idx}`,
        name: `Sample Product ${idx}`,
        category: 'Demo Category',
        price: 19.99,
        currency: 'USD',
        quantity: 1
        })
    },
    {
        name: 'Product Removed',
        requiresUserId: false,
        properties: (idx) => ({
        productId: `sku-${idx}`,
        name: `Sample Product ${idx}`
        })
    },
    {
        name: 'Cart Viewed',
        requiresUserId: false,
        properties: (idx) => ({
        cartId: `cart-${idx}`,
        products: [
            {
            productId: `sku-${idx}`,
            name: `Sample Product ${idx}`,
            price: 19.99,
            quantity: 1
            }
        ]
        })
    },
    {
        name: 'Checkout Started',
        requiresUserId: true,
        properties: (idx) => ({
        orderId: `order-${idx}`,
        total: 99.99,
        products: [
            {
            productId: `sku-${idx}`,
            name: `Sample Product ${idx}`,
            price: 19.99,
            quantity: 1
            }
        ]
        })
    },
    {
        name: 'Order Completed',
        requiresUserId: true,
        properties: (idx) => ({
        orderId: `order-${idx}`,
        total: 99.99,
        currency: 'USD',
        products: [
            {
            productId: `sku-${idx}`,
            name: `Sample Product ${idx}`,
            price: 19.99,
            quantity: 5
            }
        ]
        })
    },
    {
        name: 'Order Refunded',
        requiresUserId: true,
        properties: (idx) => ({
        orderId: `order-${idx}`,
        total: 99.99,
        reason: 'customer-request'
        })
    },
    {
        name: 'Order Cancelled',
        requiresUserId: true,
        properties: (idx) => ({
        orderId: `order-${idx}`,
        reason: 'payment-failure'
        })
    },
    {
        name: 'Lead Created',
        requiresUserId: true,
        properties: (idx) => ({
        leadId: `lead-${idx}`,
        source: 'website',
        status: 'open'
        })
    },
    {
        name: 'Opportunity Created',
        requiresUserId: true,
        properties: (idx) => ({
        opportunityId: `opp-${idx}`,
        leadId: `lead-${idx}`,
        stage: 'Prospecting'
        })
    },
    {
        name: 'Opportunity Won',
        requiresUserId: true,
        properties: (idx) => ({
        opportunityId: `opp-${idx}`,
        amount: 5000,
        currency: 'USD'
        })
    }
];
  
  function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  /**
   * Returns a random user profile from the dummy user list.
   */
export const getRandomUser = (prefix) => {
    const firstName = getRandomElement(firstNames);
    const lastName = getRandomElement(lastNames);
    const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${prefix}.com`;

    return {
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email,
        plan: getRandomElement(plans),
        location: getRandomElement(locations),
        industry: getRandomElement(industries)
    };
}