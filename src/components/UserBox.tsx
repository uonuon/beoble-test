import React, { useEffect, useState } from "react";
import { useAccountData } from "../hooks/useAccountData";

const UserBox: React.FC = () => {
  const { name, avatar, accountBalanace, setAddress, resetAccount } =
    useAccountData();
  const [defaultAccount, setDefaultAccount] = useState("");
  const [connectButtonText, setConnectButtonText] = useState("Connect Wallet");

  const connectWalletHandler = () => {
    if (defaultAccount) {
      disconnectCurrentUser();
      return;
    }

    if (window.ethereum && window.ethereum.isMetaMask) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result: any) => {
          accountChangedHandler(result[0]);
          setConnectButtonText("Disconnect Wallet");
        });
    } else {
      console.log("Need to install MetaMask");
    }
  };

  const accountChangedHandler = (newAccount: string) => {
    setDefaultAccount(newAccount);
  };

  useEffect(() => {
    if (defaultAccount) {
      setAddress("0x5555763613a12D8F3e73be831DFf8598089d3dCa");
    }
  }, [defaultAccount]);

  const disconnectCurrentUser = () => {
    setDefaultAccount("");
    setConnectButtonText("Connect Wallet");
    resetAccount();
  };

  return (
    <div className="user-card">
      <div className="button" onClick={connectWalletHandler}>
        <p>{connectButtonText}</p>
      </div>
      {avatar && <img className="avatar" src={avatar} />}
      {name && <p className="name">Name: {name}</p>}
      <p className="address">{defaultAccount}</p>
      {accountBalanace && (
        <p className="balance">Balance: {accountBalanace} ETH</p>
      )}
      {window.ethereum.chainId && <p>Chain ID: {window.ethereum.chainId}</p>}
    </div>
  );
};

export default UserBox;
