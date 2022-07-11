import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import { numberWithCommas, truncateMiddle } from "../helpers";

const provider =
  window.ethereum && new ethers.providers.Web3Provider(window.ethereum);

export const useAccountData = () => {
  const [address, setAddress] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [accountBalanace, setAccountBalance] = useState("");
  const [message, setMessage] = useState("");

  const getAccountBalance = async () => {
    provider.getBalance(address).then((balance: string) => {
      const balanceInEth = ethers.utils.formatEther(balance);
      setAccountBalance(numberWithCommas(balanceInEth));
    });
  };

  const getAvatar = async () => {
    provider.getAvatar(address).then((avatar: string) => {
      setAvatar(avatar ?? "");
    });
  };

  const getName = async () => {
    provider.lookupAddress(address).then((resolvedName: string) => {
      setName(resolvedName ?? "Anonymous ENS");
    });
  };

  const signMessage = () => {
    const signer = provider.getSigner();
    signer.signMessage("Hello World!").then((msg: string) => {
      setMessage(truncateMiddle(msg, 10));
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
    setMessage("");
  };

  return {
    name,
    avatar,
    accountBalanace,
    setAddress,
    resetAccount,
    signMessage,
    message,
  };
};
