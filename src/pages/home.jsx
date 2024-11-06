import React, { useReducer } from "react";
import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import { Card, Tabs, Input, Button, Typography, Space } from "antd";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

const initialState = {
  balance: 1000,
  loan: 500,
  profileActive: false,
};

function reducer(state, action) {
  switch (action.type) {
    case "DEPOSIT":
      return { ...state, balance: state.balance + action.amount };
    case "WITHDRAW":
      return {
        ...state,
        balance:
          state.balance >= action.amount
            ? state.balance - action.amount
            : state.balance,
      };
    case "GET_LOAN":
      return { ...state, loan: state.loan + action.amount };
    case "PAY_LOAN":
      return {
        ...state,
        loan:
          state.loan >= action.amount ? state.loan - action.amount : state.loan,
      };
    case "OPEN_PROFILE":
      return { ...state, profileActive: true };
    case "CLOSE_PROFILE":
      if (state.loan > 0) {
        toast.warning("Qarzni to'lang!");
      }
      return { ...state, profileActive: false };
    default:
      return state;
  }
}

function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleTransaction = (type) => {
    const amount = parseFloat(document.getElementById("amount-input").value);
    if (isNaN(amount) || amount <= 0) return;
    dispatch({ type, amount });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <Card
        className="max-w-4xl mx-auto"
        style={{ margin: "auto", maxWidth: 800 }}
      >
        <Title level={2}>FlexiBank Dashboard</Title>
        <Text type="secondary">Manage your finances with ease</Text>

        <div className="w-full grid grid-cols-2 gap-2 mt-2">
          <div className="border border-spacing-1 p-6 rounded-lg">
            <Title level={4}>Account Balance</Title>
            <Text className="text-3xl font-bold">${state.balance}</Text>
          </div>
          <div className="border border-spacing-1 p-6 rounded-lg">
            <Title level={4}>Current Loan</Title>
            <Text className="text-3xl font-bold">${state.loan}</Text>
          </div>
        </div>

        <Tabs defaultActiveKey="1" style={{ marginTop: 20 }}>
          <TabPane tab="Withdraw / Deposit" key="1">
            <Card title="Withdraw or Deposit Money" bordered={false}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Amount</Text>
                <Input
                  id="amount-input"
                  placeholder="Enter amount"
                  type="number"
                />
                <Space>
                  <Button
                    type="primary"
                    icon={<ArrowUpOutlined />}
                    onClick={() => handleTransaction("WITHDRAW")}
                    disabled={!state.profileActive} // Profil yopiq bo'lsa, tugmalar faol emas
                  >
                    Withdraw
                  </Button>
                  <Button
                    type="primary"
                    icon={<ArrowDownOutlined />}
                    onClick={() => handleTransaction("DEPOSIT")}
                    disabled={!state.profileActive} // Profil yopiq bo'lsa, tugmalar faol emas
                  >
                    Deposit
                  </Button>
                </Space>
              </Space>
            </Card>
          </TabPane>
          <TabPane tab="Loan Management" key="2">
            <Card title="Loan Operations" bordered={false}>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Text>Amount</Text>
                <Input
                  id="loan-input"
                  placeholder="Enter amount"
                  type="number"
                />
                <Space>
                  <Button
                    type="primary"
                    icon={<ArrowDownOutlined />}
                    onClick={() => handleTransaction("GET_LOAN")}
                    disabled={!state.profileActive}
                  >
                    Get Loan
                  </Button>
                  <Button
                    type="primary"
                    icon={<ArrowUpOutlined />}
                    onClick={() => handleTransaction("PAY_LOAN")}
                    disabled={!state.profileActive}
                  >
                    Pay Loan
                  </Button>
                </Space>
              </Space>
            </Card>
          </TabPane>
          <TabPane tab="Profile" key="3">
            <Card title="Profile Management" bordered={false}>
              <Text>
                Profile Status: {state.profileActive ? "Active" : "Inactive"}
              </Text>
              <Space style={{ marginTop: 16 }}>
                <Button
                  type="primary"
                  icon={<UserAddOutlined />}
                  onClick={() => dispatch({ type: "OPEN_PROFILE" })}
                  disabled={state.profileActive}
                >
                  Open Profile
                </Button>
                <Button
                  type="danger"
                  icon={<UserDeleteOutlined />}
                  onClick={() => dispatch({ type: "CLOSE_PROFILE" })}
                  disabled={!state.profileActive}
                >
                  Close Profile
                </Button>
              </Space>
            </Card>
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
}

export default Home;
