// 
import React from "react";

type Props = {
  darkMode: boolean;
};

const orders = [
  {
    id: "ORD-1001",
    customer: "Amit Sharma",
    product: "Wireless Headphones",
    amount: "₹2,499",
    status: "Delivered",
  },
  {
    id: "ORD-1002",
    customer: "Neha Verma",
    product: "Smart Watch",
    amount: "₹3,999",
    status: "Pending",
  },
  {
    id: "ORD-1003",
    customer: "Rahul Mehta",
    product: "Gaming Mouse",
    amount: "₹1,299",
    status: "Cancelled",
  },
];

const Order = ({ darkMode }: Props) => {
  return (
    <div
      className={`min-h-screen px-4 md:px-10 py-10 transition-all duration-300 ${
        darkMode ? "bg-[#070B14]" : "bg-gray-100"
      }`}
    >
      <div className="max-w-6xl mx-auto space-y-10">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
            Orders
          </h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Manage all customer orders in one place
          </p>
        </div>

        {/* ORDER GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 
              rounded-[28px] p-6 shadow-xl hover:shadow-2xl transition duration-300"
            >

              {/* TOP */}
              <div className="flex justify-between items-center">
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  {order.id}
                </h2>

                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium ${
                    order.status === "Delivered"
                      ? "bg-green-500/20 text-green-400"
                      : order.status === "Pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : "bg-red-500/20 text-red-400"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* DETAILS */}
              <div className="mt-5 space-y-2 text-sm">
                <p className="text-gray-600 dark:text-gray-300">
                  👤 {order.customer}
                </p>

                <p className="text-gray-600 dark:text-gray-300">
                  📦 {order.product}
                </p>

                <p className="font-bold text-lg text-gray-900 dark:text-white">
                  💰 {order.amount}
                </p>
              </div>

              {/* BUTTON */}
              <button
                className="mt-6 w-full py-3 rounded-2xl font-semibold 
                bg-purple-500 hover:bg-purple-600 text-white
                transition duration-300 shadow-lg"
              >
                View Details
              </button>

            </div>
          ))}

        </div>
      </div>
    </div>
  );
};

export default Order;