import {
  reactExtension,
  Banner,
  BlockStack,
  Button,
  Text,
  useApi,
  useSelectedPaymentOptions
} from "@shopify/ui-extensions-react/checkout";

// 1. Choose an extension target
export default reactExtension(
  'purchase.thank-you.block.render',
  () => <Extension />,
);

function Extension() {
  const options = useSelectedPaymentOptions();
  const { shop, checkoutToken } = useApi();
  const hasManualPayment = options.some((option) => option.type.toLowerCase() === 'manualpayment');
  const appUrl = `PLUGIN_URL/checkout?checkout_token=${checkoutToken.current}`;

  if (!hasManualPayment) return null;

  return (
    <BlockStack>
      <Text size="large" alignment="center" bold>Review and pay using XCHPay!</Text>
      <Text>Please review your order and complete the payment using XCHPay.</Text>
      <Banner status="warning" title="Please note: Refunds are not available for payments made with XCH. Thank you for your understanding!"/>
      <Button to={appUrl} external>Complete Payment</Button>
    </BlockStack>
  );
}
