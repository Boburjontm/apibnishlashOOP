import { Product } from '../assets/Product';

export class ProductService {
  private apiUrl = 'https://api.example.com/products'; // Bu yerni API url bilan almashtiring

  async getProduct(id: number): Promise<Product> {
    const response = await fetch(`${this.apiUrl}/${id}`);
    if (!response.ok) {
      throw new Error('Product not found');
    }
    return response.json();
  }
}
