import {Layout, Spin} from "antd";
import AppHeader from "./AppHeader.jsx";
import AppSider from "./AppSider.jsx";
import AppContent from "./AppContent.jsx";
import React, {useContext} from "react";
import cryptoContext from "../../context/crypto-context.jsx";

export default function AppLayout() {
  const {loading} = useContext(cryptoContext);

  if (loading) {
    return (
      <Spin fullscreen />
    )
  }

  return (
    <Layout>
      <AppHeader />
      <Layout>
        <AppSider />
        <AppContent />
      </Layout>
    </Layout>
  )
}