import React from "react";
import { AppProvider, Page } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";

const AppLayout = ({ title, primaryAction, children }) => (
  <AppProvider>
    <Page title={title} primaryAction={primaryAction}>
      {children}
    </Page>
  </AppProvider>
);

export default AppLayout;
