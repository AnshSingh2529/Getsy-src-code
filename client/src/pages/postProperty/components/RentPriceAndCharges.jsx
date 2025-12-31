import React, { useState, useEffect } from "react";
import { Clock, Plus, Minus, Calculator } from "lucide-react";
import CustomSelect from "./CustomSelect";

const RentPriceAndCharges = () => {
  const [rentAmount, setRentAmount] = useState("");
  const [lateChargeAmount, setLateChargeAmount] = useState("");
  const [securityDepositAmount, setSecurityDepositAmount] = useState("");
  const [electricityAmount, setElectricityAmount] = useState("");
  const [months, setMonths] = useState(1);
  const [selectedRentTime, setSelectedRentTime] = useState("per-month");
  const [selectedLateChargeTime, setSelectedLateChargeTime] =
    useState("per-month");
  const [selectedElectricityTime, setSelectedElectricityTime] =
    useState("per-month");

  // Calculated values
  const [totalMonthlyRent, setTotalMonthlyRent] = useState(0);
  const [totalContractValue, setTotalContractValue] = useState(0);

  const handleIncrement = () => {
    if (months < 60) {
      // Increased max to 60 months (5 years)
      setMonths((prev) => prev + 1);
    }
  };

  const handleDecrement = () => {
    if (months > 1) {
      setMonths((prev) => prev - 1);
    }
  };

  const rentTime = [
    { value: "per-month", label: "Per Month" },
    { value: "quarterly", label: "Quarterly" },
    { value: "half-yearly", label: "Half Yearly" },
    { value: "per-year", label: "Per Year" },
  ];

  // Calculate totals
  useEffect(() => {
    const rent = parseFloat(rentAmount) || 0;
    const late = parseFloat(lateChargeAmount) || 0;
    const security = parseFloat(securityDepositAmount) || 0;
    const electricity = parseFloat(electricityAmount) || 0;

    // Convert all to monthly amounts
    const rentMultiplier =
      selectedRentTime === "per-month"
        ? 1
        : selectedRentTime === "quarterly"
        ? 1 / 3
        : selectedRentTime === "half-yearly"
        ? 1 / 6
        : 1 / 12;

    const lateMultiplier =
      selectedLateChargeTime === "per-month"
        ? 1
        : selectedLateChargeTime === "quarterly"
        ? 1 / 3
        : selectedLateChargeTime === "half-yearly"
        ? 1 / 6
        : 1 / 12;

    const electricityMultiplier =
      selectedElectricityTime === "per-month"
        ? 1
        : selectedElectricityTime === "quarterly"
        ? 1 / 3
        : selectedElectricityTime === "half-yearly"
        ? 1 / 6
        : 1 / 12;

    const monthlyRent =
      rent * rentMultiplier +
      late * lateMultiplier +
      electricity * electricityMultiplier +
      security;
    setTotalMonthlyRent(monthlyRent);
    setTotalContractValue(monthlyRent * months);
  }, [
    rentAmount,
    lateChargeAmount,
    securityDepositAmount,
    electricityAmount,
    selectedRentTime,
    selectedLateChargeTime,
    selectedElectricityTime,
    months,
  ]);

  const formatCurrency = (amount) => {
    if (amount >= 10000000) {
      return `${(amount / 10000000).toFixed(2)} Cr`;
    } else if (amount >= 100000) {
      return `${(amount / 100000).toFixed(2)} L`;
    } else if (amount >= 1000) {
      return `${(amount / 1000).toFixed(2)} K`;
    }
    return amount.toFixed(2);
  };

  return (
    <div className="p-2 sm:p-4 lg:p-6 max-w-7xl mx-auto">
      {/* Main Grid Container */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        {/* Left Column - Rental Costs and Late Charges */}
        <div className="space-y-4 sm:space-y-6">
          {/* Rental Costs */}
          <div className="w-full">
            <label className="flex items-center text-xs sm:text-sm text-gray-400 font-medium mb-3">
              Rental Costs
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
                    value={rentAmount}
                    onChange={(e) => setRentAmount(e.target.value)}
                    placeholder="Enter rent amount"
                    className="w-full pl-8 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    min="0"
                  />
                </div>
              </div>
              <div className="lg:col-span-2">
                <CustomSelect
                  options={rentTime}
                  selectedValue={selectedRentTime}
                  onSelect={setSelectedRentTime}
                  placeholder="Per Month"
                  size="default"
                  clearable
                />
              </div>
            </div>
          </div>

          {/* Late Charges */}
          <div className="w-full">
            <label className="flex items-center text-xs sm:text-sm text-gray-400 font-medium mb-3">
              Late Charges
              <span className="text-gray-500 ml-2 font-normal">(Optional)</span>
            </label>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
              <div className="lg:col-span-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={lateChargeAmount}
                    onChange={(e) => setLateChargeAmount(e.target.value)}
                    placeholder="Late charge amount"
                    className="w-full pl-8 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    min="0"
                  />
                </div>
              </div>
              <div className="lg:col-span-2">
                <CustomSelect
                  options={rentTime}
                  selectedValue={selectedLateChargeTime}
                  onSelect={setSelectedLateChargeTime}
                  placeholder="Per Month"
                  size="default"
                  clearable
                />
              </div>
            </div>
          </div>
          <div className="w-full">
            <label className="flex items-center text-xs sm:text-sm text-gray-400 font-medium mb-3">
              Security Deposit
              <span className="text-gray-500 ml-2 font-normal">(Optional)</span>
            </label>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
              <div className="lg:col-span-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={securityDepositAmount}
                    onChange={(e) => setSecurityDepositAmount(e.target.value)}
                    placeholder="Security deposit amount"
                    className="w-full pl-8 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    min="0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Duration and Electricity */}
        <div className="space-y-4 sm:space-y-6">
          {/* Minimum Rental Duration */}
          <div className="w-full">
            <label className="flex items-center text-xs sm:text-sm text-gray-400 font-medium mb-3">
              <Clock className="w-4 h-4 mr-2" />
              Minimum Rental Duration
            </label>

            <div className="bg-gray-800 border border-gray-600 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm text-gray-300">
                  Duration (months):
                </span>
                <div className="flex items-center bg-gray-700 rounded-lg overflow-hidden shadow-sm">
                  <span
                    onClick={handleDecrement}
                    disabled={months <= 1}
                    className="flex items-center justify-center w-10 h-10 text-blue-300 hover:text-blue-200 hover:bg-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
                  >
                    <Minus size={16} />
                  </span>
                  <div className="flex items-center justify-center w-16 h-10 bg-gray-600 text-white text-lg font-bold">
                    {months}
                  </div>
                  <span
                    onClick={handleIncrement}
                    disabled={months >= 60}
                    className="flex items-center justify-center w-10 h-10 text-blue-300 hover:text-blue-200 hover:bg-gray-600 disabled:text-gray-500 disabled:cursor-not-allowed transition-all"
                  >
                    <Plus size={16} />
                  </span>
                </div>
              </div>

              <div className="text-xs text-gray-500 grid grid-cols-2 gap-2">
                <div>Min: 1 month</div>
                <div>Max: 60 months</div>
                <div className="col-span-2">
                  Duration: {Math.floor(months / 12)} year(s) {months % 12}{" "}
                  month(s)
                </div>
              </div>
            </div>
          </div>

          {/* Electricity Costs */}
          <div className="w-full">
            <label className="flex items-center text-xs sm:text-sm text-gray-400 font-medium mb-3">
              Electricity Costs
            </label>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
              <div className="lg:col-span-3">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm">
                    ₹
                  </span>
                  <input
                    type="number"
                    value={electricityAmount}
                    onChange={(e) => setElectricityAmount(e.target.value)}
                    placeholder="Electricity charges"
                    className="w-full pl-8 pr-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-700 border border-gray-600 rounded-lg text-gray-300 placeholder-gray-400 outline-none focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-all"
                    min="0"
                  />
                </div>
              </div>
              <div className="lg:col-span-2">
                <CustomSelect
                  options={rentTime}
                  selectedValue={selectedElectricityTime}
                  onSelect={setSelectedElectricityTime}
                  placeholder="Per Month"
                  size="default"
                  clearable
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Calculation Summary */}
      {(rentAmount || lateChargeAmount || electricityAmount) && (
        <div className="mt-8 p-4 sm:p-6 bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl border border-gray-600 shadow-lg">
          <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
            <Calculator className="w-5 h-5 mr-3 text-blue-400" />
            Rental Calculation Summary
          </h3>

          {/* Monthly Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Monthly Breakdown
              </h4>
              <div className="space-y-2 text-xs">
                {rentAmount && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Base Rent:</span>
                    <span className="text-blue-400">
                      ₹{" "}
                      {formatCurrency(
                        parseFloat(rentAmount) *
                          (selectedRentTime === "per-month"
                            ? 1
                            : selectedRentTime === "quarterly"
                            ? 1 / 3
                            : selectedRentTime === "half-yearly"
                            ? 1 / 6
                            : 1 / 12)
                      )}
                    </span>
                  </div>
                )}
                {lateChargeAmount && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Late Charges:</span>
                    <span className="text-yellow-400">
                      ₹{" "}
                      {formatCurrency(
                        parseFloat(lateChargeAmount) *
                          (selectedLateChargeTime === "per-month"
                            ? 1
                            : selectedLateChargeTime === "quarterly"
                            ? 1 / 3
                            : selectedLateChargeTime === "half-yearly"
                            ? 1 / 6
                            : 1 / 12)
                      )}
                    </span>
                  </div>
                )}
                {securityDepositAmount && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Security Deposit:</span>
                    <span className="text-yellow-400">
                      ₹ {formatCurrency(parseFloat(securityDepositAmount))}
                    </span>
                  </div>
                )}
                {electricityAmount && (
                  <div className="flex justify-between">
                    <span className="text-gray-400">Electricity:</span>
                    <span className="text-green-400">
                      ₹{" "}
                      {formatCurrency(
                        parseFloat(electricityAmount) *
                          (selectedElectricityTime === "per-month"
                            ? 1
                            : selectedElectricityTime === "quarterly"
                            ? 1 / 3
                            : selectedElectricityTime === "half-yearly"
                            ? 1 / 6
                            : 1 / 12)
                      )}
                    </span>
                  </div>
                )}
                <div className="border-t border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-300">Total Monthly:</span>
                    <span className="text-white">
                      ₹ {formatCurrency(totalMonthlyRent)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-900 p-4 rounded-lg">
              <h4 className="text-sm font-medium text-gray-300 mb-3">
                Contract Summary
              </h4>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Duration:</span>
                  <span className="text-blue-400">{months} months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Monthly Total:</span>
                  <span className="text-green-400">
                    ₹ {formatCurrency(totalMonthlyRent)}
                  </span>
                </div>
                <div className="border-t border-gray-700 pt-2 mt-2">
                  <div className="flex justify-between font-medium">
                    <span className="text-gray-300">Contract Value:</span>
                    <span className="text-yellow-400 text-sm">
                      ₹ {formatCurrency(totalContractValue)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-gray-900 p-3 rounded-lg text-center">
              <div className="text-xs text-gray-400 mb-1">Monthly Rent</div>
              <div className="text-blue-400 font-semibold text-sm">
                ₹ {formatCurrency(totalMonthlyRent)}
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg text-center">
              <div className="text-xs text-gray-400 mb-1">Contract Period</div>
              <div className="text-purple-400 font-semibold text-sm">
                {months}m
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg text-center">
              <div className="text-xs text-gray-400 mb-1">Total Value</div>
              <div className="text-green-400 font-semibold text-sm">
                ₹ {formatCurrency(totalContractValue)}
              </div>
            </div>
            <div className="bg-gray-900 p-3 rounded-lg text-center">
              <div className="text-xs text-gray-400 mb-1">Avg/Year</div>
              <div className="text-orange-400 font-semibold text-sm">
                ₹ {formatCurrency(totalMonthlyRent * 12)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RentPriceAndCharges;
