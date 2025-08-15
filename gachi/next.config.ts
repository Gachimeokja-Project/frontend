import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Vercel 배포 시 ESLint 오류 무시
  },
};

export default nextConfig;
//수정 완
