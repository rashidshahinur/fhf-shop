'use client'

import { useEffect, useRef } from "react"

export default function AnnouncementBar() {
  const messages = [
    "⭐ Free delivery on orders over ¥5,000",
    "⭐ 100% Halal Certified Products",
    "⭐ Cash on Delivery available nationwide Japan",
    "⭐ Ramadan Special Offers — Follow us on LINE",
    "⭐ Authentic Bangladeshi and Indonesian products",
    "⭐ New products added weekly",
  ]

  const text = messages.join("     ")

  return (
    <div className="bg-green-700 text-white text-xs py-2 overflow-hidden">
      <style>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .ticker-inner {
          display: inline-block;
          white-space: nowrap;
          animation: ticker 35s linear infinite;
        }
      `}</style>
      <div className="ticker-inner">
        {text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{text}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      </div>
    </div>
  )
}