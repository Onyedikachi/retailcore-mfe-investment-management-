import React from "react";
export const onProceed = (proceed) => {
  proceed();
};

type TransactionSettingsProps = {
  formData?: any;
  setFormData?: (e) => void;
  proceed?: () => void;
};
export default function TransactionSettings({
  formData,
  setFormData,
  proceed,
}: TransactionSettingsProps) {
  return (
    <form
      id="transactionSettings"
      data-testid="submit-button"
      onSubmit={(d) => onProceed(proceed)}
    >
      {" "}
      <div>TransactionSettings</div>
    </form>
  );
}
