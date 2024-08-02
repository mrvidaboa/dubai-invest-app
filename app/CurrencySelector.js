'use client';

import { useCurrency } from './CurrencyContext';

export default function CurrencySelector() {
  const { currency, setCurrency, exchangeRates } = useCurrency();

  return (
    <select
      value={currency}
      onChange={(e) => setCurrency(e.target.value)}
      className="ml-2 p-2 border rounded"
    >
      {Object.keys(exchangeRates).map((curr) => (
        <option key={curr} value={curr}>
          {curr}
        </option>
      ))}
    </select>
  );
}

