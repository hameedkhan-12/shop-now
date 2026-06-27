import Link from "next/link"

export function Navbar() {
  return (
    <div>
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto flex items-center justify-between px-4 py-3">
          <Link href={"/"} className="text-xl font-bold text-neutral-900">
            🛍️ ShopNow
          </Link>
          <div className="text-sm text-neutral-500">Customer Store</div>
        </div>
      </div>
    </div>
  )
}
