// Better Authライブラリのメイン関数
import { betterAuth } from "better-auth";
// ベースURLを取得するユーティリティ関数
import { getBaseURL } from "@/lib/get-base-url";
// Drizzle ORMアダプター（データベース接続用）
import { drizzleAdapter } from "better-auth/adapters/drizzle";
// データベース接続インスタンス
import { db } from "@/db";
// ユニークID生成ライブラリ
import { nanoid } from "nanoid";
// Next.js用のクッキー管理プラグイン
import { nextCookies } from "better-auth/next-js";
// 認証スキーマ
import * as schema from "@/db/schemas/auth";

/**
 * Better Authの設定
 * 認証システムの中核となる設定オブジェクト
 */
export const auth = betterAuth({
  // アプリケーションのベースURL（認証コールバック用）
  baseURL: getBaseURL(),
  
  // データベース設定
  // Drizzle ORMを使用してPostgreSQLに接続
  database: drizzleAdapter(db, {
    provider: "pg",        // PostgreSQLプロバイダーを指定
    usePlural: true,        // テーブル名を複数形で使用（users, sessions等）
    schema
  }),
  
  // 高度な設定
  advanced: {
    database: {
      // カスタムID生成関数
      // nanoidを使用して10文字のユニークIDを生成
      generateId: () => {
        return nanoid(10)
      }
    }
  },
  
  // プラグイン設定
  // Next.js用のクッキー管理機能を有効化
  plugins: [nextCookies()]
});