// src/components/cashier/PaymentCard.jsx
import React from "react";

function PaymentCard({ payment, onApprove, onReject }) {
  if (!payment) {
    return <div className="p-4 bg-gray-100 rounded shadow">⚠️ No payment data</div>;
  }

  const {
    id = "N/A",
    customer = "Unknown",
    amount = 0,
    method = "Cash",
    approved = false,
  } = payment;

  return (
    <div className="p-4 bg-white shadow rounded-lg mb-4 border">
      <h3 className="font-semibold text-lg">Payment #{id}</h3>
      <p>💳 Customer: {customer}</p>
      <p>💵 Amount: {amount} ETB</p>
      <p>📌 Method: {method}</p>
      <p>Status: {approved ? "✅ Approved" : "⏳ Pending"}</p>

      {!approved && (
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onApprove(id)}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Approve
          </button>
          <button
            onClick={() => onReject(id)}
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Reject
          </button>
        </div>
      )}
    </div>
  );
}

export default PaymentCard;
