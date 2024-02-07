export default ({query, value, label, setQuery}) => {

    if (label === "product type") {
      setQuery({
        ...query,
        productType_In: value.length ? value.map((i) => i.value) : null,
      });
    }
    if (label === "type") {
      setQuery({
        ...query,
        requestType_In: value.length ? value.map((i) => i.value) : null,
      });
    }

    if (label === "initiator") {
      setQuery({
        ...query,
        initiator_In: value.length ? value.map((i) => i.value) : null,
      });
    }
    if (label === "reviewer") {
      setQuery({
        ...query,
        approvers_In: value.length ? value.map((i) => i.value) : null,
      });
    }
    if (label === "state" || label === "status") {
    
      setQuery({
        ...query,
        status_In: value.length ? value.map((i) => i.value) : null,
      });
    }
    if (label === "investment product") {
 
      setQuery({
        ...query,
        investmentProducts_In: value.length ? value.map((i) => i.value) : null,
      });
    }
  };