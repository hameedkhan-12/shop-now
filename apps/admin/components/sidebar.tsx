import Link from "next/link"

const navItems = [
  {
    label: "Products",
    href: "/products",
    icon: "📦",
  },
]
const Sidebar = () => {
  return (
    <aside className="flex w-84 flex-col bg-gray-900 text-white">
      <div className="border-b border-gray-700 px-6 py-5">
        <span className="text-xl font-bold">🛍️ ShopNow</span>
        <p className="mt-0.5 text-xs text-gray-400">Admin Panel</p>
      </div>

      <nav>
        {navItems.map((item) => (
          <Link
            href={item.href}
            key={item.href}
            className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
          >
            <span>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="border-t border-gray-700 px-6 py-4 text-xs text-gray-300">
        Admin
      </div>
    </aside>
  )
}

export default Sidebar
