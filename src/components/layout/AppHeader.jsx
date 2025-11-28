import React, {useEffect, useState} from "react";
import {Layout, Space, Select, Button, Modal, Drawer} from "antd";
import {useCrypto} from "../../context/crypto-context.jsx";
import CoinInfoModal from "../CoinInfoModal.jsx";
import AddAssetForm from "../AddAssetForm.jsx";

const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: '1rem',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
};

export default function AppHeader() {
  const [drawer, setDrawer] = useState(false);
  const [coin, setCoin] = useState(null);
  const [select, setSelect] = useState(false);
  const [modal, setModal] = useState(false);
  const {crypto} = useCrypto();

  // Возвращает функкцию очистки
  useEffect(() => {
    const keypress = (event) => {
      if (event.key === "/") {
        setSelect((prev) => !prev);
      }
    }
    document.addEventListener('keypress', keypress)
    return () => document.removeEventListener('keypress', keypress)
  }, []);

  function handleSelect(value) {
    setSelect((prev) => !prev);
    setModal(true);
    setCoin(crypto.find((c) => c.id === value))
  }

  return (
    <Layout.Header style={headerStyle}>
      <Select
        open={select}
        onClick={() => setSelect((prev) => !prev)}
        onSelect={handleSelect}
        value="press / to open"
        style={{width: 250}}
        options={crypto.map(coin => ({
          label: coin.name,
          value: coin.id,
          icon: coin.icon,
        }))}
        optionRender={option => (
          <Space
          >
            <img
              style={{width: 20}}
              src={option.data.icon}
              alt={option.data.label}
            />
            {option.data.label}
          </Space>
        )}
      />

      <Modal
        closable={{'aria-label': 'Custom Close Button'}}
        footer={null}
        open={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        <CoinInfoModal coin={coin} />
      </Modal>

      <Button type="primary" onClick={() => setDrawer(true)}>Add Asset</Button>
      <Drawer
        title="Add Asset"
        closable={{'aria-label': 'Close Button'}}
        onClose={() => setDrawer(false)}
        open={drawer}
        width={600}
      >
        <AddAssetForm/>
      </Drawer>
    </Layout.Header>
  )
}