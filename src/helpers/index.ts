export const truncateMiddle = (input: string, offset = 5): string => {
  if (!input) return "";
  // hashes
  if (input.startsWith("0x")) {
    return shortenHex(input, offset);
  }
  // for contracts
  if (input.includes(".")) {
    const parts = input.split(".");
    const start = parts[0]?.substr(0, offset);
    const end = parts[0]?.substr(parts[0].length - offset, parts[0].length);
    return `${start}…${end}.${parts[1]}`;
  } else {
    // everything else
    const start = input?.substr(0, offset);
    const end = input?.substr(input.length - offset, input.length);
    return `${start}…${end}`;
  }
};

export function shortenHex(hex: string, length = 4) {
  return `${hex.substring(0, length + 2)}…${hex.substring(
    hex.length - length
  )}`;
}

export const numberWithCommas = (x: any) => {
  return new Intl.NumberFormat("en-US").format(parseFloat(x));
};
