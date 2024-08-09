## Nextjs
- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
  This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

--------------------------------

✔ Would you like to use TypeScript with this project? … No / **Yes**  
✔ Would you like to use ESLint with this project? … No / **Yes**  
✔ Would you like to use Tailwind CSS with this project? … No / **Yes**  
✔ Would you like to use `src/` directory with this project? … No / **Yes**  
✔ Use App Router (recommended)? … No / **Yes**  
✔ Would you like to customize the default import alias? … **No** / Yes  
✔ What import alias would you like configured? … @/*  

-----------------------------------

## Getting Started

1. 開発モードでの実行

```bash
npx next dev (-p 5000)
```
[http://localhost:3000](http://localhost:3000) で表示します。(ポート指定した場合は任意のポートで)

2. ディレクトリ・ファイル構成

```
src/
├── app
│   ├── api
│   │   ├── login  
│   │   │   └── route.ts // apiエンドポイント
│   │   ├── logout
│   │   ├── register
│   │   └── user
│   │
│   ├── page.tsx // ルート
│   ├── layout.tsx
│   ├── globals.css
│   │
│   ├── login // ログインページ
│   │   └── page.tsx 
│   └── register // 登録ページ
│   
├── components   
│       ├── Filter.tsx
│       ├── Gallery.tsx
│       ├── Header.tsx
│       ├── Layout.tsx
│       └── Lightbox.tsx
│       
├── styles // CSS
│   ├── components // コンポーネント用の .module.scss
│   │   ├── ***.module.scss //
│   │   └── ***.module.scss 
│   ├── layouts
│   │    ├── NewsCategoryList.module.scss
│   │    └── NewsPostList.module.scss
│   │    
│   ├── global.scss // グローバル(アプリ全体)で読み込ませたいスタイル
│   └── valiables.scss // scss変数用
│
├── utils
│   ├── s3Client.ts
│   ├── s3Utils.ts
│   └── session.ts
│
└── middleware.ts
```
You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Database

MySQL
ORM : [Prisma](https://prisma.io)
  - Prismaの導入
    ```bash
    npm install prisma --save-dev
    npm install @prisma/client
    ```
  - [Prisma Documentation](https://prisma.io/docs) 

Login
  - cookie/bcrypt
    ```bash
    npm install bcrypt @types/bcrypt --save-dev
    npm install cookie @types/cookie --save-dev
    npm install uuid
    npm install multiparty @types/multiparty --save-dev
    ```

## Images
  - AWS S3
    * S3のオブジェクトのメタデータに"category"と"tags"を付与。これでフィルタをかけられるようにしている。
