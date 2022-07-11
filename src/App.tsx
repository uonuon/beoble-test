import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { useAccountData } from "./hooks/useAccountData";
import UserBox from "./components/UserBox";

function App() {
  return (
    <div className="container">
      <h1>Welcome to beoble-test</h1>

      {/* {defaultAccount && <UserBox address={defaultAccount}/>} */}
      {<UserBox />}
    </div>
  );
}

export default App;
