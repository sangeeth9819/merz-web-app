// Payment validation schemas
// Using Zod for runtime validation (install: pnpm add zod)

export const paymentValidation = {
  amount: (amount: number) => {
    if (amount <= 0) return { valid: false, error: "Amount must be greater than 0" };
    if (amount > 10000000) return { valid: false, error: "Amount exceeds maximum limit" };
    return { valid: true };
  },
  
  accountNumber: (accountNumber: string) => {
    // Sri Lankan bank account validation example
    const cleanNumber = accountNumber.replace(/\s/g, "");
    if (cleanNumber.length < 8 || cleanNumber.length > 16) {
      return { valid: false, error: "Invalid account number length" };
    }
    if (!/^\d+$/.test(cleanNumber)) {
      return { valid: false, error: "Account number must contain only digits" };
    }
    return { valid: true };
  },
  
  description: (description: string) => {
    if (description.length < 3) {
      return { valid: false, error: "Description too short" };
    }
    if (description.length > 200) {
      return { valid: false, error: "Description too long" };
    }
    // Sanitize for XSS
    const sanitized = description.replace(/[<>]/g, "");
    return { valid: true, sanitized };
  },
};

export const validatePaymentData = (data: {
  amount: number;
  accountNumber: string;
  description: string;
}) => {
  const errors: Record<string, string> = {};
  
  const amountCheck = paymentValidation.amount(data.amount);
  if (!amountCheck.valid) errors.amount = amountCheck.error!;
  
  const accountCheck = paymentValidation.accountNumber(data.accountNumber);
  if (!accountCheck.valid) errors.accountNumber = accountCheck.error!;
  
  const descCheck = paymentValidation.description(data.description);
  if (!descCheck.valid) errors.description = descCheck.error!;
  
  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
};
