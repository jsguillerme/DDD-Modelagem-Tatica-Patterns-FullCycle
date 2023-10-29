import Product from "./product"

describe('Product unit tests', () => {

  it('should throw error when id is empty', () => {
    expect(() => {
      let product = new Product('', 'Product 1', 100)
    }).toThrowError('Id is required')
  })

  it('should throw error when name product is empty', () => {
    expect(() => {
      let product = new Product('product-1', '', 100)
    }).toThrowError('Name is required')
  })

  it('should throw error when price is less than zero', () => {
    expect(() => {
      let product = new Product('product-1', 'product-name', -1)
    }).toThrowError('Price must be greater than zero')
  })

  it('should change name', () => {
    let product = new Product('product-1', 'product-name', 100)

    product.changeName('product-new-name')
    expect(product.name).toBe('product-new-name')
  })

  it('should change price', () => {
    let product = new Product('product-1', 'product-name', 100)

    product.changePrice(150)
    expect(product.price).toBe(150)
  })

})