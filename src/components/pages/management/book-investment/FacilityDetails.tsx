
import React from "react";
export const onProceed = (proceed) => {
  proceed();
};

type FacilityDetailsProps = {
  formData?: any;
  setFormData?: (e) => void;
  proceed?: () => void;
};
export default function FacilityDetails({
  formData,
  setFormData,
  proceed,
}: FacilityDetailsProps) {
  return (
    <form
      id="facilityDetails"
      data-testid="submit-button"
      onSubmit={(d) => onProceed(proceed)}
    >
      {" "}
      <div>FacilityDetails</div>
    </form>
  );
}




