import {
  CustomerInformation,
  FacilityDetails,
  TransactionSettings,
} from "@app/components/pages/management/book-investment";
import { Fragment } from "react";

export default ({ step, handleNav }) => {
  return (
    <Fragment>
      {/* {<span>{step}</span>  } */}
      {step === 1 && <span><CustomerInformation proceed={handleNav} /></span>}
      {step === 2 && <span><FacilityDetails proceed={handleNav}/></span>}
      {step === 3 && <span><TransactionSettings proceed={handleNav}/></span>}
    </Fragment>
  );
};
