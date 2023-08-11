import React, { useState } from 'react';
import './App.css';
// import Navbar from './Invoice/Navbar/Navbar';
import InformationForm from './invoice-new/upper/InformationForm';
import Card from './invoice-new/UI/Card'
import Generator from './invoice-new/Generator/Generator';
import NotesAndCalculations from './invoice-new/notes-calculations/NotesAndCalculations';
import Summary from './invoice-new/summary/Summary';
function App() {
  const [companyDetails, setCompanyDetails] = useState({
    logo: '',
    inVoiceFrom: '',
    shipTo: '',
    billTo: '',
  });

  const [notes, setNotes] = useState({
    note: '',
    terms: '',
  
  });

  const [customerDetails, setCustomerDetails] = useState({
    invoiceNumber: '',
    date: Date(),
    paymentTerms: '',
    dueDate: '',
    poNumber: '',
  });

  const [invoiceData, setInvoiceData] = useState({items:[]});

  const addItem = () => {
    setInvoiceData({
      ...invoiceData,
      items: [...invoiceData.items, { description: '', quantity: 1, rate: 0, amount: 0 }],
    });
  };

  const removeItem = (index) => {
    const newItems = invoiceData.items.filter((item, i) => i !== index);
    setInvoiceData({
      ...invoiceData,
      items: newItems,
    });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...invoiceData.items];
    newItems[index][field] = value;

    if (field === 'quantity' || field === 'rate') {
      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
    }

    setInvoiceData({
      ...invoiceData,
      items: newItems,
    });
  };

  const [showDiscountInput, setShowDiscountInput] = useState(false);
  const [showTaxInput, setShowTaxInput] = useState(false);
  const [showShippingInput, setShowShippingInput] = useState(false);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [taxPercentage, setTaxPercentage] = useState(0);
  const [shippingCharges, setShippingCharges] = useState(0);
  const [amountPaid, setAmountPaid] = useState(0);
  const [initialDiscountPercentage, setInitialDiscountPercentage] = useState(0);
  const [initialTaxPercentage, setInitialTaxPercentage] = useState(0);
  const [initialShippingCharges, setInitialShippingCharges] = useState(0);

  const {items} = invoiceData;

  // Calculate subtotal
  const subtotal = items.reduce((total, item) => total + item.amount, 0);

  // Calculate discount
  const discountAmount = (subtotal * (discountPercentage / 100)).toFixed(2);

  // Calculate subtotal after discount
  const subtotalAfterDiscount = (subtotal - parseFloat(discountAmount)).toFixed(2);

  // Calculate tax
  const taxAmount = (subtotalAfterDiscount * (taxPercentage / 100)).toFixed(2);

  // Calculate total amount
  const total = (parseFloat(subtotalAfterDiscount) + parseFloat(taxAmount) + parseFloat(shippingCharges)).toFixed(2);

  // Calculate balance due
  const balanceDue = (parseFloat(total) - parseFloat(amountPaid)).toFixed(2);


  const calculateSubtotal = () => {
    return items.reduce((total, item) => total + item.amount, 0);
  };

  const calculateDiscountAmount = () => {
    return (calculateSubtotal() * (discountPercentage / 100)).toFixed(2);
  };

  const calculateSubtotalAfterDiscount = () => {
    return (calculateSubtotal() - parseFloat(calculateDiscountAmount())).toFixed(2);
  };

  const calculateTaxAmount = () => {
    return (calculateSubtotalAfterDiscount() * (taxPercentage / 100)).toFixed(2);
  };

  const calculateTotal = () => {
    return (
      parseFloat(calculateSubtotalAfterDiscount()) +
      parseFloat(calculateTaxAmount()) +
      parseFloat(shippingCharges)
    ).toFixed(2);
  };

  const calculateBalanceDue = () => {
    return (parseFloat(calculateTotal()) - parseFloat(amountPaid)).toFixed(2);
  };

  const handleAddDiscount = () => {
    setShowDiscountInput(true);
    setInitialDiscountPercentage(discountPercentage);
  };

  const handleCancelDiscount = () => {
    setShowDiscountInput(false);
    setDiscountPercentage(initialDiscountPercentage);
  };

  const handleAddTax = () => {
    setShowTaxInput(true);
    setInitialTaxPercentage(taxPercentage);
  };

  const handleCancelTax = () => {
    setShowTaxInput(false);
    setTaxPercentage(initialTaxPercentage);
  };

  const handleAddShipping = () => {
    setShowShippingInput(true);
    setInitialShippingCharges(shippingCharges);
  };

  const handleCancelShipping = () => {
    setShowShippingInput(false);
    setShippingCharges(initialShippingCharges);
  };

  const generateInvoice = () => {
    // Here, you would generate a PDF using a library like 'jspdf' or 'react-pdf'
    // Format the invoiceData appropriately for the PDF generation library
    console.log('Generating invoice...', invoiceData);
  };

  const invoiceDataforDownload = {
    companyDetails: {
      inVoiceFrom: companyDetails.inVoiceFrom,
      shipTo: companyDetails.shipTo,
      billTo: companyDetails.billTo,
    },

    customerDetails: {
      invoiceNumber: customerDetails.invoiceNumber,
      date: customerDetails.date,
      paymentTerms: customerDetails.paymentTerms,
      dueDate: customerDetails.dueDate,
      poNumber: customerDetails.poNumber,
    },
     items: invoiceData.items, 
    subtotal: calculateSubtotal(),
    discount: {
      discountPercentage, discountAmount
    },
    tax: {
      taxAmount,
      taxPercentage
    }
    ,
    shippingCharges: shippingCharges
    ,
    total: total,
    amountPaid: amountPaid,
    balanceDue: balanceDue
  };
  
  const downloadInvoice = () => {
    const invoiceData = {
      company: companyDetails,
      customer: customerDetails,
      items:items,
      subtotal:subtotal,
      discount:{
        discountPercentage,discountAmount
      },
      tax:{
        taxAmount,
        taxPercentage
      }
      ,
      shippingCharges:{
        shippingCharges
      }
      ,
      total:total,
      amountPaid:amountPaid,
      balanceDue:balanceDue
    };

    // Convert the data to a JSON string
    const invoiceJSON = JSON.stringify(invoiceData);

    // Create a Blob object with the JSON data
    const blob = new Blob([invoiceJSON], { type: 'application/json' });

    // Create a URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a temporary anchor element
    const a = document.createElement('a');
    a.href = url;
    a.download = 'invoice.json'; // Set the desired file name

    // Programmatically trigger a click event on the anchor element
    a.click();

    // Clean up by revoking the Blob URL
    URL.revokeObjectURL(url);
  };

  
  return (
    <div className="App">
      <div className='card-container'>
      <Card className="first-card">
       
        <InformationForm
          companyDetails={companyDetails}
          setCompanyDetails={setCompanyDetails}
          customerDetails={customerDetails}
          setCustomerDetails={setCustomerDetails}
        />
        <Generator 
          invoiceData={invoiceData}
          onInvoiceDataChange={(index, field, value) => handleItemChange(index, field, value)}
          addItem={addItem}
          removeItem={removeItem}
          generateInvoice={generateInvoice}
        />

        < NotesAndCalculations
            calculateSubtotal={calculateSubtotal}
            calculateDiscountAmount={calculateDiscountAmount}
            calculateSubtotalAfterDiscount={calculateSubtotalAfterDiscount}
            calculateTaxAmount={calculateTaxAmount}
            calculateTotal={calculateTotal}
            calculateBalanceDue={calculateBalanceDue}
            discountPercentage={discountPercentage}
            setDiscountPercentage={setDiscountPercentage}
            taxPercentage={taxPercentage}
            setTaxPercentage={setTaxPercentage}
            shippingCharges={shippingCharges}
            setShippingCharges={setShippingCharges}
            amountPaid={amountPaid}
            setAmountPaid={setAmountPaid}
            showDiscountInput={showDiscountInput}
            handleCancelDiscount={handleCancelDiscount}
            handleAddDiscount={handleAddDiscount}
            showTaxInput={showTaxInput}
            handleCancelTax={handleCancelTax}
            handleAddTax={handleAddTax}
            showShippingInput={showShippingInput}
            handleCancelShipping={handleCancelShipping}
            handleAddShipping={handleAddShipping}
        />
      </Card>
     
        
          <Card className="another-card">
          <Summary invoiceDataforDownload={invoiceDataforDownload} />
         
          </Card>
        
     
    </div>
    </div>
  );
}

export default App;
