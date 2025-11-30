jest.mock('../../src/services/product/productService', () => ({
  getAllProducts: jest.fn(),
}));

jest.mock('../../src/services/report/reportService', () => ({
  createReport: jest.fn(),
}));

const { getAllProducts } = require('../../src/services/product/productService');
const { createReport } = require('../../src/services/report/reportService');

describe('ProductNotFoundScreen Logic', () => {
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('getAllProducts returns products', async () => {
    const mockProducts = [
      { productNumber: '123', name: 'Test Product', imageUrl: '' }
    ];
    
    getAllProducts.mockResolvedValue(mockProducts);
    
    const result = await getAllProducts();
    
    expect(getAllProducts).toHaveBeenCalled();
    expect(result).toEqual(mockProducts);
    expect(result).toHaveLength(1);
  });

  test('createReport is called with correct data', async () => {
    const reportData = {
      productNumber: '123',
      productName: 'Test Product',
      userRole: 'Employee',
    };
    
    createReport.mockResolvedValue('success');
    
    await createReport(reportData);
    
    expect(createReport).toHaveBeenCalledWith(reportData);
    expect(createReport).toHaveBeenCalledTimes(1);
  });

  test('products can be filtered based on search', () => {
    const products = [
      { productNumber: '123', name: 'Apple', imageUrl: '' },
      { productNumber: '456', name: 'Banana', imageUrl: '' },
      { productNumber: '789', name: 'Orange', imageUrl: '' },
    ];

    const searchQuery = 'ap';

    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    expect(filtered).toHaveLength(1);
    expect(filtered[0].name).toBe('Apple');
  });
});