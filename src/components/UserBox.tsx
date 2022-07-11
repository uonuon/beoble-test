import React, { useEffect, useState } from "react";
import { useAccountData } from "../hooks/useAccountData";

const UserBox: React.FC = () => {
  const {
    name,
    avatar,
    accountBalanace,
    setAddress,
    resetAccount,
    message,
    signMessage,
  } = useAccountData();
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
      alert("Need to install MetaMask");
    }
  };

  const accountChangedHandler = (newAccount: string) => {
    setDefaultAccount(newAccount);
  };

  useEffect(() => {
    if (defaultAccount) {
      setAddress(defaultAccount);
    }
  }, [defaultAccount]);

  const disconnectCurrentUser = () => {
    setDefaultAccount("");
    setConnectButtonText("Connect Wallet");
    resetAccount();
  };

  return (
    <div className="user-card">
      {avatar && <img className="avatar" src={avatar} />}
      {name && <p className="name">Name: {name}</p>}
      <p className="address">{defaultAccount}</p>
      {accountBalanace && (
        <p className="balance">Balance: {accountBalanace} ETH</p>
      )}
      <div className="buttons-container">
        <div className="button" onClick={connectWalletHandler}>
          <p>{connectButtonText}</p>
        </div>

        {!message && defaultAccount && (
          <div className="button sign-button" onClick={signMessage}>
            <p>Sign Message</p>
          </div>
        )}
      </div>
      {message && <p>Hashed message: {message}</p>}
      {window.ethereum && window.ethereum.chainId && (
        <p>Chain ID: {window.ethereum.chainId}</p>
      )}
    </div>
  );
};

export default UserBox;
