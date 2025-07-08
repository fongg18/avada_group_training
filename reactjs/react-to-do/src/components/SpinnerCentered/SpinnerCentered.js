import React from "react";
import { Spinner } from "@shopify/polaris";

const SpinnerCentered = () => (
  <div style={{ display: "flex", justifyContent: "center", padding: 40 }}>
    <Spinner accessibilityLabel="Loading todos" size="large" />
  </div>
);

export default SpinnerCentered;
