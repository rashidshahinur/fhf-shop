// This file defines what our data looks like
// Think of it as describing the shape of everything

export type Product = {
  id: string
  name: string
  slug: string
  price: number
  weight: string
  description: string
  image_url: string
  category_id: string
  country: string
  halal_certifier: string
  is_featured: boolean
  is_active: boolean
  stock_count: number
  created_at: string
}

export type Category = {
  id: string
  name: string
  slug: string
  icon: string
  display_order: number
}

export type Order = {
  id: string
  customer_name: string
  phone: string
  address: string
  line_id: string
  total_amount: number
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled'
  notes: string
  created_at: string
}

export type OrderItem = {
  id: string
  order_id: string
  product_id: string
  quantity: number
  unit_price: number
}

export type CartItem = {
  product: Product
  quantity: number
}