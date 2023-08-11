import React from 'react';
// import CompanyDetails from './CompanyDetails/CompanyDetails';
// import CustomerDetails from './CustomerDetails/CustomerDetails';
import './InformationForm.css'; // Import your CSS file for styling
import CompanyDetails from './CompanyDetails';
import CustomerDetails from './CustomerDetails';
function InformationForm({
    companyDetails,
    setCompanyDetails,
    customerDetails,
    setCustomerDetails,
}) {
    return (
        <div className="information-form">
            <div className="left-side">
                {/* <h2>Company Details</h2> */}
                <CompanyDetails
                    details={companyDetails}
                    setDetails={setCompanyDetails}
                />
            </div>
            <div className="right-side">
                <CustomerDetails
                    customer={customerDetails}
                    onCustomerChange={setCustomerDetails}
                />
            </div>
        </div>
    );
}

export default InformationForm;
