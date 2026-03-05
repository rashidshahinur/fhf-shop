'use client'

import { useCartStore } from "@/src/store/cartStore"
import { Product } from "@/src/types"
import { useState } from "react"

export default function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCartStore(state => state.addItem)
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addItem(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 1500)
  }

  return (
    <button
      onClick={handleAdd}
      className={
        "w-full py-2 rounded-lg text-xs font-bold transition-all " +
        (added
          ? "bg-green-500 text-white"
          : "bg-green-700 text-white hover:bg-green-800")
      }
    >
      {added ? "Added!" : "ADD TO CART"}
    </button>
  )
}
