const simulatePayment = async ({ amount, method = 'mock' }) => {
  if (method !== 'mock') {
    throw new Error('Only mock payments are supported in this environment');
  }

  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    status: 'paid',
    transactionId: `mock_${Date.now()}`,
    amount,
  };
};

module.exports = { simulatePayment };

