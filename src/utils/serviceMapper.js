// src/utils/serviceMapper.js
export const serviceMapper = {
  professionalServices: {
    'plumbing': {
      'name': 'Professional Plumbing',
      'slug': 'professional-plumbing',
      'categoryId': '68eab131001131897a342d85',
    },
    'electrical': {
      'name': 'Electrical Services',
      'slug': 'electrical-services',
      'categoryId': '68eab131001131897a342d8f',
    },
    'mechanical': {
      'name': 'Mechanical Services',
      'slug': 'mechanical-services',
      'categoryId': '68eab132001131897a342d99',
    },
    'carpentry': {
      'name': 'Carpentry Services',
      'slug': 'carpentry-services',
      'categoryId': '68eab132001131897a342da2',
    },
    'painting': {
      'name': 'Painting Services',
      'slug': 'painting-services',
      'categoryId': '68eab133001131897a342dac',
    },
    'fashion': {
      'name': 'Fashion Services',
      'slug': 'fashion-services',
      'categoryId': '68eab133001131897a342db6',
    },
    'beauty': {
      'name': 'Beauty Services',
      'slug': 'beauty-services',
      'categoryId': '68eab134001131897a342dbf',
    },
    'errand': {
      'name': 'Errand Services',
      'slug': 'errand-services',
      'categoryId': '68eab134001131897a342dc9',
    },
    'delivery': {
      'name': 'Delivery Services',
      'slug': 'delivery-services',
      'categoryId': '68eab134001131897a342dd2',
    },
    'moving': {
      'name': 'Moving Services',
      'slug': 'moving-services',
      'categoryId': '68eab135001131897a342ddb',
    },
    'cleaning': {
      'name': 'Cleaning Services',
      'slug': 'cleaning-services',
      'categoryId': '68eab135001131897a342de4',
    },
    'babysitting': {
      'name': 'Babysitting Services',
      'slug': 'babysitting-services',
      'categoryId': '68eab136001131897a342ded',
    },
    'personal': {
      'name': 'Personal Assistance',
      'slug': 'personal-assistance',
      'categoryId': '68eab136001131897a342df5',
    },
    'grocery': {
      'name': 'Grocery Shopping',
      'slug': 'grocery-shopping',
      'categoryId': '68eab134001131897a342dc9', // Same as errand
    },
  },

  // Create a reverse lookup map by categoryId
  categoryIdMap: {},

  // Initialize the reverse lookup
  initialize: function() {
    this.categoryIdMap = {};
    Object.values(this.professionalServices).forEach(service => {
      this.categoryIdMap[service.categoryId] = service;
    });
  },

  // Get service by category ID
  getServiceByCategoryId: function(categoryId) {
    if (!this.categoryIdMap || Object.keys(this.categoryIdMap).length === 0) {
      this.initialize();
    }
    return this.categoryIdMap[categoryId];
  },

  // Get service name by category ID
  getServiceNameByCategoryId: function(categoryId) {
    const service = this.getServiceByCategoryId(categoryId);
    return service ? service.name : this.formatUnknownService(categoryId);
  },

  // Fallback for unknown category IDs
  formatUnknownService: function(categoryId) {
    return `Unknown Service (${categoryId})`;
  }
};

// Initialize the mapper
serviceMapper.initialize();

export default serviceMapper;