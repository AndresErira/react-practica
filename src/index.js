import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./routes/App";

const rootElement = document.getElementById('app');
const root=ReactDOM.createRoot(rootElement);

root.render(<App/>);