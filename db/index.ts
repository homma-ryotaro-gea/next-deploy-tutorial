// 環境変数を読み込むためのdotenvライブラリ
import { config } from "dotenv";
// Drizzle ORMのPostgreSQLアダプター
import { drizzle } from "drizzle-orm/postgres-js";
// PostgreSQLクライアント
import postgres from "postgres";
// 認証スキーマ
import * as authSchema from "@/db/schemas/auth";

// .envファイルから環境変数を読み込み
config({path:".env"})

// PostgreSQLデータベースへの接続クライアントを作成
// DATABASE_URLは環境変数から取得（例: postgresql://user:password@localhost:5432/dbname）
const client = postgres(process.env.DATABASE_URL!)

// Drizzle ORMを使用してデータベースクライアントをラップ
// これにより型安全なデータベース操作が可能になる
export const db = drizzle({
  client,
  schema:{...authSchema}
})