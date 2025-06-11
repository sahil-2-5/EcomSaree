import React from "react";
import { AuthProvider } from "./context/AuthContext";
import AppRoutes from "./RoutePath/RoutesPath";

const App = () => {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
};

export default App;
