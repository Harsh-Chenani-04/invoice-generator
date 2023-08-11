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
    let yPos = 14;
    let y1Pos = 22;
    // Add Company Details
    doc.setFontSize(32);
    doc.text('INVOICE',149,17)
   

    if (companyDetails) {
      console.log(companyDetails);
      doc.setFontSize(10);
      const keys = Object.keys(companyDetails);

      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = companyDetails[key];
        if(i === 0){
          if (value !== null && value !== undefined) {
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0) 
            doc.text(` ${value}`, 15, yPos);
            doc.setTextColor(128, 128, 128) 
            doc.setFont('helvetica', 'normal');
            yPos += 35;
          }
        }
        if(i === 1){
          doc.text(` Bill To :`, 15, yPos);
          if (value !== null && value !== undefined) {
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0) 
            doc.text(` ${value}`, 15, yPos+5);
            doc.setTextColor(128, 128, 128) 
            doc.setFont('helvetica', 'normal');
           // yPos += 25;
          }
        }
        if(i===2){
          doc.text(` Ship To :`, 65, yPos);
          if (value !== null && value !== undefined) {
            doc.setFont('helvetica', 'bold');
            doc.setTextColor(0, 0, 0) 
            doc.text(` ${value}`, 65, yPos+5);
            doc.setTextColor(128, 128, 128) 
            doc.setFont('helvetica', 'normal');
            // yPos += 25;
          }
        }

      }


     
    }
    
    yPos += 40
    // Add Customer Details
    doc.setFontSize(10);
   
    if (customerDetails) {
      console.log(customerDetails);
        // doc.text('Customer Details:', 10, yPos);
        //  yPos+= 10;
      //doc.text(customerDetails.inv)
      const keys = Object.keys(customerDetails);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        const value = customerDetails[key];
        if(i==1){
          key = "Date";
        }
        else if(i==2){
          key = "Payment Terms";
        }
        else if (i == 3) {
          key = "Due Date";
        }
        else if (i == 4) {
          key = "PO Number";
        }
        if(i === 0){
          if (value !== null && value !== undefined) {
            doc.text(` #${value}`, 190, y1Pos);
            y1Pos += 20;
          }
          
        }
        else {
          if (value !== null && value !== undefined) {
            doc.text(`${key}:\t\t `, 130, y1Pos);
            doc.setTextColor(0, 0, 0) 
            doc.text(`${value}`, 180, y1Pos);
            doc.setTextColor(128, 128, 128)
            y1Pos += 10;
          }
        }
      }
      
      doc.setFontSize(12);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(0, 0, 0) 
      doc.text(`Balance Due:\t\t `, 129, y1Pos);
      doc.text(`$${balanceDue || 0}`, 180, y1Pos);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(128, 128, 128) 
      y1Pos += 15;
        
    }
  
    doc.setFillColor(33,33,33); // Set fill color to black
    doc.roundedRect(6, y1Pos-5, 193, 8, 5, 5, 'F'); // Draw rectangle
    
    doc.setTextColor(255,255,255); //
    // Add Invoice Items
    doc.setFontSize(10);
    doc.text('Item\t', 10, y1Pos);
    doc.text('Quantity\t', 130, y1Pos);
    doc.text('Rate\t', 160, y1Pos);
    doc.text('Amount\t', 185, y1Pos);

    //doc.setFillColor(255, 255, 255); // Reset fill color
    doc.setTextColor(0, 0, 0);
    y1Pos += 7;
    console.log(items);
    items.forEach((item) => {
      if (item && item.description && item.quantity && item.rate) {
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(0, 0, 0) 
        doc.text(` ${item.description}`, 9, y1Pos);
        doc.setFont('helvetica', 'normal');
        //doc.setTextColor(128, 128, 128)
        doc.text(` ${item.quantity}`, 129, y1Pos);
        doc.text(` $${item.rate}`, 159, y1Pos);
        doc.text(` $${item.amount}`, 185, y1Pos);
        // doc.text(`Item: ${item.description}, Quantity: ${item.quantity}, Price: ${item.rate}`, 15, y1Pos);
        y1Pos += 5;
      }
    });
    doc.setTextColor(128, 128, 128)
   y1Pos += 20
    // Add Subtotal
    doc.setFontSize(10);
    doc.text(`Subtotal:`, 140, y1Pos);
    doc.setTextColor(0, 0, 0)
    doc.text(`$${subtotal || 0}`, 185, y1Pos);
    y1Pos += 10;

    // Add Discount
    doc.setTextColor(128, 128, 128)
    doc.setFontSize(10);
    doc.text(`Discount (${discount?.discountPercentage || 0}%):`, 129, y1Pos);
    doc.setTextColor(0, 0, 0)
    doc.text(`$${discount?.discountAmount || 0}`, 185, y1Pos);
    y1Pos += 10;
  

    // Add Tax
    doc.setTextColor(128, 128, 128)
    doc.setFontSize(10);
    doc.text(`Tax (${tax?.taxPercentage || 0}%):`, 137, y1Pos);
    doc.setTextColor(0, 0, 0)
    doc.text(`$${tax?.taxAmount || 0}`, 185, y1Pos);
    y1Pos += 10;
   

    // Add Shipping Charges
    doc.setTextColor(128, 128, 128)
    doc.setFontSize(10);
    doc.text(`Shipping Charges:`, 125, y1Pos);
    doc.setTextColor(0, 0, 0)
    doc.text(`$${shippingCharges || 0}`, 185, y1Pos);
    y1Pos += 10;


    // Add Total
    doc.setTextColor(128, 128, 128)
    doc.setFontSize(10);
    doc.text(`Total:`, 145, y1Pos);
    doc.setTextColor(0, 0, 0)
    doc.text(`$${total || 0}`, 185, y1Pos);
    y1Pos += 10;
   

    // Add Amount Paid
    doc.setTextColor(128, 128, 128)
    doc.setFontSize(10);
    doc.text(`Amount Paid:`, 133, y1Pos);
    doc.setTextColor(0, 0, 0)
    doc.text(`$${amountPaid || 0}`, 185, y1Pos);
    y1Pos += 10;
  

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
