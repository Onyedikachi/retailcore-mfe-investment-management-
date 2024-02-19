export default ({ step, setFormRef }) => {
    switch (step) {
      case 1:
        setFormRef("customerInformation");
        break;
      case 2:
        setFormRef("facilityDetails");
        break;
      case 3:
        setFormRef("transactionSettings");
        break;
  
      default:
        setFormRef("customerInformation");
    }
  };