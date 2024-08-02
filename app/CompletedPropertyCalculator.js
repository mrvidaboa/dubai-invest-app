'use client';

import { useState } from 'react';
import { useCurrency } from './CurrencyContext';

function formatNumber(num) {
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function CompletedPropertyCalculator() {
  const { currency, exchangeRates } = useCurrency();
  const [inputs, setInputs] = useState({
    purchasePrice: '',
    downPayment: '',
    mortgageAmount: '',
    mortgageInterestRate: '',
    mortgageTerm: '',
    annualRent: '',
    appreciationRate: '',
    investmentPeriod: ''
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = value.replace(/[^\d.-]/g, '');
    setInputs(prev => ({ ...prev, [name]: numericValue }));
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    const numericValue = parseFloat(value);
    if (!isNaN(numericValue)) {
      setInputs(prev => ({ ...prev, [name]: formatNumber(numericValue) }));
    }
  };

  const convertCurrency = (amount) => {
    if (currency === 'AED') return amount;
    const rate = exchangeRates[currency] || 1;
    return amount * rate;
  };

  const calculateRoi = () => {
    const values = Object.keys(inputs).reduce((acc, key) => {
      acc[key] = parseFloat(inputs[key].replace(/,/g, '')) || 0;
      return acc;
    }, {});

    const dldFee = 0.04 * values.purchasePrice;
    const agentFee = 0.02 * values.purchasePrice;
    const mortgageAmount = values.mortgageAmount || (values.purchasePrice - values.downPayment);
    const mortgageRegistrationFee = mortgageAmount ? Math.min(0.0025 * mortgageAmount + 290, 10000) : 0;
    const valuationFee = mortgageAmount ? 3000 : 0;
    const titleDeedFee = 250;
    const mortgageProcessingFee = mortgageAmount ? Math.min(0.01 * mortgageAmount, 10000) : 0;

    const initialInvestment = (values.downPayment || values.purchasePrice) + dldFee + agentFee + 
      mortgageRegistrationFee + valuationFee + titleDeedFee + mortgageProcessingFee;

    let annualMortgagePayment = 0;
    if (mortgageAmount && values.mortgageInterestRate && values.mortgageTerm) {
      const monthlyRate = values.mortgageInterestRate / 100 / 12;
      const numberOfPayments = values.mortgageTerm * 12;
      annualMortgagePayment = (mortgageAmount * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1) * 12;
    }

    const annualPropertyManagementFee = 0.05 * values.annualRent;
    const annualMaintenanceCost = 0.01 * values.purchasePrice;
    const annualInsuranceCost = 0.005 * values.purchasePrice;

    const annualNetRentalIncome = values.annualRent - annualPropertyManagementFee - 
      annualMaintenanceCost - annualInsuranceCost - annualMortgagePayment;
    const totalNetRentalIncome = annualNetRentalIncome * values.investmentPeriod;
    const finalPropertyValue = values.purchasePrice * 
      Math.pow(1 + values.appreciationRate / 100, values.investmentPeriod);
    const totalReturn = (finalPropertyValue - values.purchasePrice) + totalNetRentalIncome;

    const roi = (totalReturn / initialInvestment) * 100;
    const annualizedRoi = (Math.pow(1 + roi / 100, 1 / values.investmentPeriod) - 1) * 100;

    const convertedResults = {
      initialInvestment: convertCurrency(initialInvestment),
      totalReturn: convertCurrency(totalReturn),
      roi,
      annualizedRoi,
      annualNetRentalIncome: convertCurrency(annualNetRentalIncome),
      finalPropertyValue: convertCurrency(finalPropertyValue)
    };

    setResults(convertedResults);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Completed Property ROI Calculator ({currency})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(inputs).map((key) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
              {key.split(/(?=[A-Z])/).join(" ")}
            </label>
            <input
              type="text"
              id={key}
              name={key}
              value={inputs[key]}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
            />
          </div>
        ))}
      </div>
      <button 
        onClick={calculateRoi}
        className="mt-6 w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Calculate ROI
      </button>
      {results && (
        <div className="mt-8 p-4 bg-gray-100 rounded">
          <h3 className="text-xl font-bold mb-2">Results ({currency}):</h3>
          {Object.entries(results).map(([key, value]) => (
            <p key={key} className="mb-1 text-black">
              <span className="font-medium">{key.split(/(?=[A-Z])/).join(" ")}:</span> 
              {typeof value === 'number' && !key.includes('roi') ? `${currency} ${formatNumber(value)}` : `${formatNumber(value)}${key.includes('roi') ? '%' : ''}`}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}