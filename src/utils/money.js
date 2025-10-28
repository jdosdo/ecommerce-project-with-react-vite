export function formatMoney(amountCents) {
  const amountDollars = (amountCents / 100).toFixed(2);
  if (amountDollars >= 0) {
    return `$${amountDollars}`;
  } else {
    return `-$${amountDollars * -1}`;
  }
}
