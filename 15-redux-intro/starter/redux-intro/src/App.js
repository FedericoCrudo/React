import CreateCustomer from "./features/customers/CreateCustomer";
import Customer from "./features/customers/Customer";
import AccountOperations from "./features/accounts/AccountOperations";
import BalanceDisplay from "./features/accounts/BalanceDisplay";
import { useSelector } from "react-redux";
function App() {
  const { fullName, balance } = useSelector((state) => state.customer);
  return (
    <div>
      <h1>🏦 The React-Redux Bank ⚛️</h1>
      {fullName ? (
        <CreateCustomer />
      ) : (
        <>
          <Customer />
          <AccountOperations />
          <BalanceDisplay balance={balance} />
        </>
      )}
    </div>
  );
}

export default App;
