// Better AuthのReact用クライアント作成関数
import { createAuthClient } from "better-auth/react";
// ベースURLを取得するユーティリティ関数
import { getBaseURL } from "@/lib/get-base-url";
// サーバー側の認証設定から型情報を推論するプラグイン
import { inferAdditionalFields } from "better-auth/client/plugins";
// サーバー側の認証設定（型推論用）
import { auth } from "@/lib/auth";

/**
 * Better Authのクライアント側設定
 * フロントエンド（React）で認証機能を使用するためのクライアント
 */
export const authClient = createAuthClient({
  // サーバー側の認証APIのベースURL
  baseURL: getBaseURL(),
  
  // プラグイン設定
  // サーバー側の認証設定から型情報を自動推論
  // これにより、クライアント側でも型安全な認証操作が可能
  plugins: [inferAdditionalFields<typeof auth>()]
})