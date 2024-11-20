import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // useSelector va useDispatch hooklari
import { deposit } from "./Acauntslice"; // to'g'ri import

function AccountOperation() {
  const [depositamount, setdepositamount] = useState(""); // Depozit miqdori
  const dispatch = useDispatch(); // Redux dispatch funksiyasi

  // balance qiymatini Redux store dan olish
  const balance = useSelector((store) => store.acount.balance); // to'g'ri slice nomi

  const handleDeposit = (e) => {
    e.preventDefault();
    if (!depositamount) return;
    dispatch(deposit(Number(depositamount))); // depositni number tipiga o'zgartiramiz
    setdepositamount(""); // inputni tozalash
  };

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-semibold mb-4">Bank Account</h2>
      {/* balance qiymatini ko'rsatamiz */}
      <h2 className="text-2xl font-semibold mb-4">{balance}</h2>

      <form
        onSubmit={handleDeposit}
        className="flex flex-col items-center space-y-4"
      >
        <label className="text-lg">
          Enter Balance:
          <input
            type="number"
            value={depositamount}
            onChange={(e) => setdepositamount(e.target.value)}
            className="border rounded-md p-2 ml-2"
            placeholder="Enter balance"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default AccountOperation;
