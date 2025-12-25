import React, { useState, useEffect } from "react";
import CustomSelect from "./CustomSelect";

const SalePriceAndCharges = () => {
  const [sellingPrice, setSellingPrice] = useState("");
  const [extraChargeAmount, setExtraChargeAmount] = useState("");
  const [downPaymentPercent, setDownPaymentPercent] = useState("");
  const [selectedNego, setSelectedNego] = useState("");
  const [selectedExtraCharge, setSelectedExtraCharge] = useState("");
  const [totalCosts, setTotalCosts] = useState(0);
  const [downPaymentAmount, setDownPaymentAmount] = useState(0);

  const isNegotiable = [
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" },
  ];

  const extraCharges = [
    { value: "registration_stamp_duty", label: "Registration & Stamp Duty" },
    { value: "brokerage_fees", label: "Brokerage/Agent Fees" },
    { value: "maintenance_charges", label: "Maintenance Charges" },
    { value: "parking_charges", label: "Parking Charges" },
    { value: "clubhouse_membership", label: "Clubhouse Membership" },
    { value: "society_transfer", label: "Society Transfer Charges" },
    { value: "utility_deposits", label: "Utility Deposits" },
    { value: "legal_fees", label: "Legal Fees" },
    { value: "furniture_fixtures", label: "Furniture/Fixtures" },
    { value: "interior_renovation", label: "Interior/Renovation" },
    { value: "advance_property_tax", label: "Advance Property Tax" },
    { value: "security_deposit", label: "Security Deposit" },
    { value: "shared_access_fees", label: "Shared Access Fees" },
    { value: "custom_charge", label: "Other (Custom)" },
  ];

  // Calculate total costs and down payment amount
  useEffect(() => {
    const selling = parseFloat(sellingPrice) || 0;
    const extra = parseFloat(extraChargeAmount) || 0;
    const total = selling + extra;
    setTotalCosts(total);

    const percent = parseFloat(downPaymentPercent) || 0;
    const downAmount = (selling * percent) / 100;
    setDownPaymentAmount(downAmount);
  }, [sellingPrice, extraChargeAmount, downPaymentPercent]);

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      // 1 crore
      return `${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      // 1 lakh
      return `${(amount / 100000).toFixed(2)} L`;
    } else if (amount >= 1000) {
      // 1 thousand
      return `${(amount / 1000).toFixed(2)} K`;
    }
    return amount.toFixed(2);
  };

  return (
    <div className="p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Main Grid Container */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column - Selling Price and Extra Charges */}
        <div className="space-y-4 sm:space-y-6">
          {/* Selling Price */}
          <div className="w-full">
            <label className="flex items-center text-xs sm:text-sm text-gray-400 font-medium mb-3">
              Selling Price
              <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
              <div className="lg:col-span-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    placeholder="Enter selling price"
                    className="w-full pl-8 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    min="0"
                  />
                </div>
              </div>
              <div className="lg:col-span-2">
                <CustomSelect
                  options={isNegotiable}
                  selectedValue={selectedNego}
                  onSelect={setSelectedNego}
                  placeholder="Negotiable?"
                  size="default"
                  clearable
                />
              </div>
            </div>
          </div>

          {/* Extra Charges */}
          <div className="w-full">
            <label className="flex items-center text-xs sm:text-sm text-gray-400 font-medium mb-3">
              Registration or Extra Charges
              <span className="text-gray-500 ml-2 font-normal">(Optional)</span>
            </label>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
              <div className="lg:col-span-2">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={extraChargeAmount}
                    onChange={(e) => setExtraChargeAmount(e.target.value)}
                    placeholder="Amount"
                    className="w-full pl-8 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    min="0"
                  />
                </div>
              </div>
              <div className="lg:col-span-3">
                <CustomSelect
                  options={extraCharges}
                  selectedValue={selectedExtraCharge}
                  onSelect={setSelectedExtraCharge}
                  placeholder="Select charge type"
                  size="default"
                  searchable
                  clearable
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Property Worth and Down Payment */}
        <div className="space-y-4 sm:space-y-6">
          {/* Property Worth */}
          <div className="w-full">
            <label className="flex items-center text-xs sm:text-sm text-gray-400 font-medium mb-3">
              Total Property Worth
            </label>

            <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-400">Total Cost:</span>
                <div className="flex items-center text-green-400 font-semibold text-lg">
                  <span className="mr-1">₹</span>
                  <span>{formatCurrency(totalCosts)}</span>
                </div>
              </div>

              {extraChargeAmount && (
                <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-500">
                  <div className="flex justify-between">
                    <span>Base Price:</span>
                    <span>
                      ₹ {formatCurrency(parseFloat(sellingPrice) || 0)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Extra Charges:</span>
                    <span>
                      ₹ {formatCurrency(parseFloat(extraChargeAmount))}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Down Payment Calculator */}
          <div className="w-full">
            <label className="flex items-center text-xs sm:text-sm text-gray-400 font-medium mb-3">
              Down Payment Calculator
              <span className="text-gray-500 ml-2 font-normal">(Optional)</span>
            </label>

            <div className="space-y-4">
              {/* Percentage Input */}
              <div className="relative">
                <input
                  type="number"
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(e.target.value)}
                  placeholder="Enter percentage"
                  className="w-full pr-12 pl-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                  min="0"
                  max="100"
                />
                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 font-medium">
                  %
                </span>
              </div>

              {/* Calculated Amount Display */}
              {downPaymentAmount > 0 && (
                <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      Down Payment Amount:
                    </span>
                    <div className="flex items-center text-blue-400 font-semibold text-lg">
                      <span className="mr-1">₹</span>
                      <span>{formatCurrency(downPaymentAmount)}</span>
                    </div>
                  </div>

                  <div className="mt-2 pt-2 border-t border-gray-700 text-xs text-gray-500">
                    <div className="flex justify-between">
                      <span>Remaining Amount:</span>
                      <span>
                        ₹{" "}
                        {formatCurrency(
                          (parseFloat(sellingPrice) || 0) - downPaymentAmount
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      {(sellingPrice || extraChargeAmount || downPaymentPercent) && (
        <div className="mt-8 p-4 sm:p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl border border-gray-600 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
            Transaction Summary
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-900 p-3 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Selling Price</div>
              <div className="text-green-400 font-semibold">
                ₹{" "}
                {sellingPrice
                  ? formatCurrency(parseFloat(sellingPrice))
                  : "0.00"}
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Extra Charges</div>
              <div className="text-yellow-400 font-semibold">
                ₹{" "}
                {extraChargeAmount
                  ? formatCurrency(parseFloat(extraChargeAmount))
                  : "0.00"}
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Total Worth</div>
              <div className="text-blue-400 font-semibold">
                ₹ {formatCurrency(totalCosts)}
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg">
              <div className="text-xs text-gray-400 mb-1">Down Payment</div>
              <div className="text-purple-400 font-semibold">
                ₹ {formatCurrency(downPaymentAmount)}
                {downPaymentPercent && (
                  <span className="text-gray-500 text-xs ml-1">
                    ({downPaymentPercent}%)
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SalePriceAndCharges;
