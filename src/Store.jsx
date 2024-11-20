import { configureStore } from "@reduxjs/toolkit";
import Acauntslice from "./Features/acount/Acauntslice"; // Yaxshi nomlangan slice
import Customerslices from "./Features/customer/Customerslices";

const Store = configureStore({
  reducer: {
    acount: Acauntslice, // slice nomi bilan mos keladi
    customer: Customerslices,
  },
});

export default Store;
