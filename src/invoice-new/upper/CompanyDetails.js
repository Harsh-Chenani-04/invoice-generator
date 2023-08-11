import React from 'react';
import './CompanyDetails.css';

function CompanyDetails({ details, setDetails,logo }) {
    return (
        <div>

            <div className='company-logo'>
                <label htmlFor="logoUpload" className="logo-label">+ Add your logo</label>
                <input
                    type="file"
                    id="logoUpload"
                    accept="image/*"
                    onChange={(e) => setDetails({ ...details, logo: e.target.files[0] })}
                    style={{ display: 'none' }}
                />
                {logo && <img src={URL.createObjectURL(logo)} alt="Company Logo" />}
            </div>

            <div className="input-group">
                <input type="text" value={details.inVoiceFrom}
                    onChange={(e) => setDetails({ ...details, inVoiceFrom: e.target.value })}
                     placeholder="Who is this invoice from?" style={{ height: '50px', marginTop: '20px', width: '265px' }} 
                     />
            </div>
            <div className="input-group">
                <div className="input-row">
                    <label>Bill To:</label>
                    <textarea value={details.billTo}
                        onChange={(e) => setDetails({ ...details, billTo: e.target.value })} placeholder="Bill to" />
                </div>
                <div className="input-row">
                    <label className="ship-to-label">Ship To:</label>
                    <textarea value={details.shipTo}
                        onChange={(e) => setDetails({ ...details, shipTo: e.target.value })}  placeholder="Ship to" />
                </div>
            </div>

          
        </div>
    );
}

export default CompanyDetails;
