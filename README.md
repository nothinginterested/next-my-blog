## Next.js+TS+React+Typeorm构建的个人博客

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

## 启动数据库
docker run -v "$PWD/blog-data":/var/lib/postgresql/data -p 5432:5432 -e POSTGRES_USER=blog -e POSTGRES_HOST_AUTH_METHOD=trust -d postgres:12.2

## 创建数据库
```
docker exec -it pid bash

CREATE DATABASE blog_development ENCODING 'UTF8' LC_COLLATE 'en_US.utf8' LC_CTYPE 'en_US.utf8';

```


docker exec -it pig号

## 自动部署

```
ssh lzz-blog@lzzhs 'bash -s' < bin/deploy.s
```
