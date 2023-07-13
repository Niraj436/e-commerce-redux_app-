import { Provider } from "react-redux";
import MyRoute from "./MyRoute";
import { myPersistor, mystore } from "./Redux/Store";
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <>
      <Provider store={mystore}>
        <PersistGate persistor={myPersistor}>
          <MyRoute />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
