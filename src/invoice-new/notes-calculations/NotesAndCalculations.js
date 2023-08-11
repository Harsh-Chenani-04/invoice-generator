import React from 'react';
import Notes from './Notes';
import BillDetails from './BillDetails';

import './NotesAndCalculations.css';


function NotesAndCalculations({ calculateSubtotal,
    calculateDiscountAmount,
    calculateSubtotalAfterDiscount,
    calculateTaxAmount,
    calculateTotal,
    calculateBalanceDue,
    discountPercentage,
    setDiscountPercentage,
    taxPercentage,
    setTaxPercentage,
    shippingCharges,
    setShippingCharges,
    amountPaid,
    setAmountPaid, showDiscountInput,
    handleCancelDiscount,
    handleAddDiscount,
    showTaxInput,
    handleCancelTax,
    handleAddTax,
    showShippingInput,
    handleCancelShipping,
    handleAddShipping
}) {
    return (
        <div>
            {/* <h2>Additional Information</h2> */}
            <div className="additional-info">
                <Notes />
                <BillDetails
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
            </div>
        </div>
    );
}

export default NotesAndCalculations;
