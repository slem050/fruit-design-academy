export type MockPurchaseState = "not_purchased" | "mock_purchased";

export const getMockPurchaseState = (): MockPurchaseState => {
  return "not_purchased";
};
