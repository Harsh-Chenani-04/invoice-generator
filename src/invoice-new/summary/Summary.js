import React from 'react';
import './Summary.css';
import jsPDF from 'jspdf';

export default function Summary({ invoiceDataforDownload }) {
  const { companyDetails,
    customerDetails,
    items,
    subtotal,
    discount,
    tax,
    shippingCharges,
    total,
    amountPaid,
    balanceDue } = invoiceDataforDownload;


  const downloadInvoicePDF = (
    companyDetails,
    customerDetails,
    items,
    subtotal,
    discount,
    tax,
    shippingCharges,
    total,
    amountPaid,
    balanceDue
  ) => {
    const doc = new jsPDF();

    // Set initial vertical position for content
    let yPos = 20;

    // Add Company Details
    doc.setFontSize(16);
   
    if (companyDetails) {
      console.log(companyDetails);
      doc.setFontSize(14);
      doc.text('Company Details:', 10, yPos);
      yPos += 10;
      Object.entries(companyDetails).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          doc.text(`${key}: ${value}`, 15, yPos);
          yPos += 10;
        }
      });
    }

    // Add Customer Details
    doc.setFontSize(16);
   
    if (customerDetails) {
      console.log(customerDetails);
        doc.text('Customer Details:', 10, yPos);
         yPos+= 10;
      //doc.text(customerDetails.inv)
      Object.entries(customerDetails).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          doc.text(`${key}: ${value}`, 15, yPos);
          yPos += 10;
        }
      });
    }

    // Add Invoice Items
    doc.setFontSize(16);
    doc.text('Items:', 10, yPos);
    yPos += 10;
    console.log(items);
    items.forEach((item) => {
      if (item && item.description && item.quantity && item.rate) {
        doc.text(`Item: ${item.description}, Quantity: ${item.quantity}, Price: ${item.rate}`, 15, yPos);
        yPos += 10;
      }
    });


    // Add Subtotal
    doc.setFontSize(16);
    doc.text(`Subtotal: ${subtotal || 0}`, 10, yPos);
    yPos += 10;

    // Add Discount
    doc.setFontSize(16);
    doc.text(`Discount: ${discount?.discountAmount || 0} (${discount?.discountPercentage || 0}%)`, 10, yPos);
    yPos += 10;

    // Add Tax
    doc.setFontSize(16);
    doc.text(`Tax: ${tax?.taxAmount || 0} (${tax?.taxPercentage || 0}%)`, 10, yPos);
    yPos += 10;

    // Add Shipping Charges
    doc.setFontSize(16);
    doc.text(`Shipping Charges: ${shippingCharges || 0}`, 10, yPos);
    yPos += 10;

    // Add Total
    doc.setFontSize(16);
    doc.text(`Total: ${total || 0}`, 10, yPos);
    yPos += 10;

    // Add Amount Paid
    doc.setFontSize(16);
    doc.text(`Amount Paid: ${amountPaid || 0}`, 10, yPos);
    yPos += 10;

    // Add Balance Due
    doc.setFontSize(16);
    doc.text(`Balance Due: ${balanceDue || 0}`, 10, yPos);
    yPos += 10;

    // Save the PDF
    doc.save('invoice.pdf');
  };




    return (
        <div className="summary-container">
        <button className="download" onClick={() => downloadInvoicePDF(
          companyDetails,
          customerDetails,
          items,
          subtotal,
          discount,
          tax,
          shippingCharges,
          total,
          amountPaid,
          balanceDue
        )}>
          Download Invoice
        </button>
        

            <div class="section selected-currency">
              <label class="control-label">CURRENCY</label>
              <div>
                <div class="invoiced-select">
                  <select>
                <option value="USD">USD</option>
                <option value="INR">INR</option>
                  </select>
                 </div>
              </div>
            </div>

            <div class="section selected-currency">
              <label class="control-label">TYPE</label>
              <div>
                <div class="invoiced-select">
                  <select>
                    <option value="Invoice">Invoice</option>
                    <option value="Credit Note">Credit Note</option>
                    <option value="Quote">Quote</option>
                    <option value="Purchase Order">Purchase Order</option>
                    <option value="Receipt">Receipt</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="section save-template">
              <a href="" ng-click="saveDefaults()" ng-show="!isDefault()" tabindex="1054">
                Save Defaults
              </a> 
            </div>

            <div class="section my-invoices-btn">
              <a href="/history" tabindex="1054">
                History
                <span class="badge rounded-circle ng-binding" ng-show="numDocuments>0"></span>
              </a>
            </div>
        </div>
    );
}
