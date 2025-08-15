import { Suspense } from "react";
import KakaoRedirectHandler from "./KakaoRedirectHandler";

export default function Page() {
  return (
    <Suspense fallback={<div>카카오 로그인 준비 중...</div>}>
      <KakaoRedirectHandler />
    </Suspense>
  );
}
