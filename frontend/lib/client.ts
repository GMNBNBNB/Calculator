import { createPromiseClient } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-web";
import { CalculatorService } from "../gen/proto/calculator/v1/calculator_connect";

const transport = createConnectTransport({
  baseUrl: "http://localhost:8080",
});

export const client = createPromiseClient(CalculatorService, transport);
