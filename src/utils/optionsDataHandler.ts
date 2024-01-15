export default ({query, value, label, setQuery}) => {
  // console.log('Label: ' + label)
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
      // console.log('investment product filter')
      setQuery({
        ...query,
        status_In: value.length ? value.map((i) => i.value) : null,
      });
    }
    if (label === "investment product") {
      // console.log('investment product filter')
      setQuery({
        ...query,
        investmentProducts_In: value.length ? value.map((i) => i.value) : null,
      });
    }
  };