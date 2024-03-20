import React from 'react';
import { TicketIcon } from '@heroicons/react/24/outline';

const InvoiceList = ({ invoices }: any) => {
  console.log(invoices);
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 border-b border-gray-300 pb-4">Billing History</h2>
      <table className="w-full">
        <tbody>
          {invoices.map((invoice: any) => (
            <tr key={invoice.id}>
              <td className=" px-4 py-2">{invoice.paid_at}</td>
              <td className=" px-4 py-2">{invoice.amount} {invoice.currency.toUpperCase()}</td>
              <td className=" px-4 py-2">
                <button
                  onClick={() => {
                    window.open(invoice.hosted_invoice_url, "_blank");
                  }}
                  className="flex gap-2 items-center p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 text-sm rounded-md focus:outline-none transition duration-300 ease-in-out border border-purple-600 hover:border-purple-800 focus:border-purple-800"
                >
                  <TicketIcon height={20} width={20} />
                  View Invoice
                </button>

              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceList;