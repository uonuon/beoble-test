import React, { useEffect, useState } from "react";
import { ethers } from "ethers";

const provider = new ethers.providers.Web3Provider(window.ethereum);

export const useAccountData = () => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [accountBalanace, setAccountBalance] = useState("");

  const getAccountBalance = async () => {
    provider.getBalance(address).then((balance) => {
      const balanceInEth = ethers.utils.formatEther(balance);
      setAccountBalance(balanceInEth);
    });
  };

  const getAvatar = async () => {
    provider.getAvatar(address).then((avatar) => {
      setAvatar(avatar ?? "");
    });
  };

  const getName = async () => {
    provider.lookupAddress(address).then((resolvedName) => {
      setName(resolvedName ?? "Anonymous ENS");
    });
  };

  useEffect(() => {
    if (address) {
      getAccountBalance();
      getAvatar();
      getName();
    }
  }, [address]);

  const resetAccount = () => {
    setAccountBalance("");
    setAvatar("");
    setAddress("");
    setName("");
  };

  return {
    name,
    avatar,
    accountBalanace,
    setAddress,
    resetAccount,
  };
};
