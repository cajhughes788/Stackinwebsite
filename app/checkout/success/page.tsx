import { Suspense } from "react";
import {
  CheckoutSuccessPageContent,
  CheckoutSuccessPageContentWithSearchParams,
} from "./success-page-content";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<CheckoutSuccessPageContent source={null} />}>
      <CheckoutSuccessPageContentWithSearchParams />
    </Suspense>
  );
}
