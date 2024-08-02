'use client';

import { useState } from 'react';
import { useCurrency } from './CurrencyContext';

function formatNumber(num) {
  return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function OffPlanPropertyCalculator() {
  const { currency, exchangeRates } = useCurrency();
  const [inputs, setInputs] = useState({
    purchasePrice: '',
    paymentPlan: '20/80',
    constructionPeriod: '',
    appreciationDuringConstruction: '',
    annualRentalIncomePostCompletion: '',
    appreciationPostCompletion: '',
    investmentPeriodPostCompletion: ''
  });

  const [results, setResults] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const numericValue = name === 'paymentPlan' ? value : value.replace(/[^\d.-]/g, '');
    setInputs(prev => ({ ...prev, [name]: numericValue }));
  };

  const handleInputBlur = (e) => {
    const { name, value } = e.target;
    if (name !== 'paymentPlan') {
      const numericValue = parseFloat(value);
      if (!isNaN(numericValue)) {
        setInputs(prev => ({ ...prev, [name]: formatNumber(numericValue) }));
      }
    }
  };

  const convertCurrency = (amount) => {
    if (currency === 'AED') return amount;
    const rate = exchangeRates[currency] || 1;
    return amount * rate;
  };

  const calculateRoi = () => {
    const values = Object.keys(inputs).reduce((acc, key) => {
      acc[key] = key === 'paymentPlan' ? inputs[key] : parseFloat(inputs[key].replace(/,/g, '')) || 0;
      return acc;
    }, {});

    // Calculate costs
    const dldFee = 0.04 * values.purchasePrice;
    const agentFee = 0.02 * values.purchasePrice;
    const registrationFee = values.purchasePrice > 500000 ? 4000 : 2000;
    const oqoodFee = 0.0025 * values.purchasePrice + 250;

    // Calculate initial investment based on payment plan
    const downPaymentPercent = parseInt(values.paymentPlan.split('/')[0]) / 100;
    const initialInvestment = (values.purchasePrice * downPaymentPercent) + (dldFee / 2) + agentFee + registrationFee + oqoodFee;

    // Calculate property value at completion
    const propertyValueAtCompletion = values.purchasePrice * Math.pow(1 + values.appreciationDuringConstruction / 100, values.constructionPeriod);

    // Calculate post-completion returns
    const annualPropertyManagementFee = 0.05 * values.annualRentalIncomePostCompletion;
    const annualMaintenanceCost = 0.01 * propertyValueAtCompletion;
    const annualInsuranceCost = 0.005 * propertyValueAtCompletion;
    const annualNetRentalIncome = values.annualRentalIncomePostCompletion - annualPropertyManagementFee - annualMaintenanceCost - annualInsuranceCost;
    const totalNetRentalIncome = annualNetRentalIncome * values.investmentPeriodPostCompletion;
    const finalPropertyValue = propertyValueAtCompletion * Math.pow(1 + values.appreciationPostCompletion / 100, values.investmentPeriodPostCompletion);
    const totalReturn = (finalPropertyValue - values.purchasePrice) + totalNetRentalIncome;

    // Calculate ROI
    const totalInvestment = values.purchasePrice + dldFee + agentFee + registrationFee + oqoodFee;
    const roi = (totalReturn / totalInvestment) * 100;
    const annualizedRoi = (Math.pow(1 + roi / 100, 1 / (values.constructionPeriod + values.investmentPeriodPostCompletion)) - 1) * 100;

    // Calculate remaining payments schedule
    const remainingPayment = values.purchasePrice * (1 - downPaymentPercent);
    const remainingPaymentSchedule = `${formatNumber(convertCurrency(remainingPayment))} ${currency} to be paid over ${values.constructionPeriod} years`;

    const convertedResults = {
      initialInvestment: convertCurrency(initialInvestment),
      propertyValueAtCompletion: convertCurrency(propertyValueAtCompletion),
      annualNetRentalIncome: convertCurrency(annualNetRentalIncome),
      totalNetRentalIncome: convertCurrency(totalNetRentalIncome),
      finalPropertyValue: convertCurrency(finalPropertyValue),
      totalReturn: convertCurrency(totalReturn),
      roi,
      annualizedRoi,
      remainingPaymentSchedule
    };

    setResults(convertedResults);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Off-Plan Property ROI Calculator ({currency})</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.keys(inputs).map((key) => (
          <div key={key}>
            <label htmlFor={key} className="block text-sm font-medium text-gray-700 mb-1">
              {key.split(/(?=[A-Z])/).join(" ")}
            </label>
            {key === 'paymentPlan' ? (
              <select
                id={key}
                name={key}
                value={inputs[key]}
                onChange={handleInputChange}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              >
                <option value="20/80">20/80</option>
                <option value="30/70">30/70</option>
                <option value="40/60">40/60</option>
              </select>
            ) : (
              <input
                type="text"
                id={key}
                name={key}
                value={inputs[key]}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            )}
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
              {typeof value === 'number' && !key.includes('roi') ? `${currency} ${formatNumber(value)}` : `${value}${key.includes('roi') ? '%' : ''}`}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}