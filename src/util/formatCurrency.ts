export default function formatCurrency(data: number) {
  return data.toLocaleString('en-US', {
    style: 'currency',
    currency: 'usd',
    minimumFractionDigits: 0
  })
}
