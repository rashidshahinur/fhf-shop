import { create } from 'zustand'
import { CartItem, Product } from '@/src/types'

// This is the brain of your shopping cart
// It remembers what's in the cart across all pages

type CartStore = {
  items: CartItem[]
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],

  // Add a product to cart
  addItem: (product: Product) => {
    const items = get().items
    const existing = items.find(item => item.product.id === product.id)

    if (existing) {
      // If already in cart, just increase quantity
      set({
        items: items.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      })
    } else {
      // If new, add it with quantity 1
      set({ items: [...items, { product, quantity: 1 }] })
    }
  },

  // Remove a product completely from cart
  removeItem: (productId: string) => {
    set({ items: get().items.filter(item => item.product.id !== productId) })
  },

  // Change quantity of a specific product
  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId)
      return
    }
    set({
      items: get().items.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    })
  },

  // Empty the entire cart
  clearCart: () => set({ items: [] }),

  // Calculate total price
  getTotalPrice: () => {
    return get().items.reduce(
      (total, item) => total + item.product.price * item.quantity, 0
    )
  },

  // Count total number of items
  getTotalItems: () => {
    return get().items.reduce((total, item) => total + item.quantity, 0)
  }
}))

