import { Suspense } from "react";
import Checkout from "@/modules/Checkout";

export default function Page() {
  return (
    <Suspense>
      <Checkout />
    </Suspense>
  );
}
