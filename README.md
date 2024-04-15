## NestJS 구조

Request -> Middleware -> Guard -> Interceptor -> Pipe -> [Controller, Service, Repository] -> ExceptionFilter -> Interceptor -> Response

## 백엔드엔지니어란?

서버사이드 프로그램을 디자인하고, 개발하고, 유지보수 하는 역할을 한다.

### api server

프론트엔드와 백엔드 또는 백엔드끼리의 연결을 가능하게 해주는 영역

- NestJS
- Django
- Spring
- GraphQL
- REST API
- gRPC

### database

데이터저장소

- Postgresql
- MySQL
- Oracle
- MongoDB
- DynamoDB

### infrastructure

백엔드를 실행하는 하드웨어를 관리하는 영역

- Cloud
- K8s
- DevOps

## NodeJS?

NestJS를 구동시키는 엔진이다.

### 오픈소스

누구나 볼수있도록 소스가 공개되어 있다.

### 크로스 플랫폼

여러 OS에서 사용할 수 있다.

### 자바스크립트 런타임

자바스크립트를 실행할 수 있다.

## 컴파일 및 인터프리터

- 프로그램을 실행하기 전에 작성된 코드를 기계어로 한 번에 모두 변환한 후 실행한다.
- 프로그램을 실행하면서 동시에 코드를 한줄 한줄씩 변환해서 실행한다.

### 컴파일

- 프로그램을 실행하기 전에 기계어로 전부 변환을 한 다음 실행한다.
- 기계어로 모두 변환이 된 상태에서 실행되기때문에 실행 과정은 빠르다.
- 작성한 코드가 변경될 때마다 오랜시간 컴파일을 해야하는 문제가 있다.
- 타겟 플랫폼에서 직접 컴파일을 진행한다.

### 인터프리터

- 프로그램을 실행하는 도중에 각 코드를 줄 별로 변환해서 실행한다.
- 모든 코드가 변환이 된 상태로 실행되지 않기 때문에 실행이 비교적 느리다.
- 한 번에 컴파일을 할 필요가 없기 때문에 코드 변경이 있을때마다 매번 전체 컴파일을 할 필요가 없다.
- 코드를 실행하는 또 다른 프로그램이 존재한다.

## JIT (Just In Time Comilation)

JIT은 Compile 방식과 Interpret 방식의 장점을 모아둔 형태이다.
V8 또한 JIT Compilation을 사용한다.

ignition을 이용 Interpretation을 해서 js의 dynamically typed 특성을 살리며 컴파일 시간을 짧게 가져간다.
Turbofan을 이용 자주 사용되는 코드를 Machine code 로 최적화해서 컴파일 해 둦ㄴ다.
해당보크는 최적화된 상태에서 반복적으로 사용할 수 있다.
만약에 최적화가 잘못되었거나 필요없어지만여 다시 Byte Code 로 변환한다.

## HTTP

http는 클라이언트와 서버가 통신하는 방법중 하나이다.
클라이언트가 요청을 보내면 서버가 응답을 반환해준다.
요청과 응답의 구조화된 데이터를 보낼 때 일반적으로 JSON구조를 사용한다.

### JSON

- js객체 또는 여타 언어의 Map과 구조가 매우 비슷하다.
- 요청과 응답의 body에 사용되는 구조이다.
- 보낼때 string으로 변환하고 받으면 다시 json으로 변환한다.
- key / value 짝으로 이루어져 있고 콜론을 기준으로 왼쪽이 key 오른쪽이 value가 된다.
- key는 string만 허용된다.
- value는 숫자 string 중첩된 json 그리고 list등이 허용된다.

### http url

- url : 요청을 보내는 주소
- method : 요청의 종류/타입 (GET/POST/PUT/PATCH/DELETE)
- header : 요청의 메타데이터
- body : 요청에 관련된 데이터

### http 응답

- Status Code : 응답의 종류
  - 100 ~ 199 : Informational Response (정보응답)
  - 200 ~ 299 : Successful Response (성공응답)
    - 200 : OK 문제없이 요청이 잘 실행됨
    - 201 : Created 문제없이 데이터 생성이 잘 됨
  - 300 ~ 399 : Redirection Message (리다이렉션 메세지)
    - 301 : Moved Permanently 리소스가 영구적으로 이동됨
  - 400 ~ 499 : Client Error Response (클라이언트 에러 응답)
    - 400 : Bad Request 요청이 잘못됨 (필수값 부족 등)
    - 401 : Unauthorizzed 인증 토큰/키가 잘못됨
    - 403 : Forbidden 접근불가능한 리소스 401과 달리 인증은 된 상태
    - 404 : Not Found 존재하지 않는 리소스
    - 405 : Method Not Allowed 허가되지 않은 요청 Method
  - 500 ~ 599 : Server Error Response (서버 에러 응답)
    - 500 : Internal Server Error 알 수 없는 서버에러
- header : 응답의 메타데이터
- body : 응답에 관련된 데이터

## NestJS

- 효율적이고 스케일링이 쉬운 NodeJS 서버를 만드는데 사용하는 프레임워크다
- 차세대 js를 사용하며 ts로 만들어졌으며 ts를 완전 지원한다.
- express같은 견고한 http 서버 프레임워크를 사용하고 있으며 원한다면 fastify를 대신 사용할 수도 있다.
- 상당히 많은 nodejs 라이브러리, 헬퍼, 툴들이 있음에도 불구하고 아키텍쳐 설계에 대한 문제를 해결해주는 해결책은 없다.
- 자체적으로 서버 아키텍처를 제공해준다. 그래서 테스트하기 쉽고, 디커플링이 잘 돼 있고, 유지보수가 편한 서버를 제작하게 해준다.

service.ts

- 기능구현

module.ts

- 컨트롤러와 서비스를 포함한 다른 프로바이더들을 관리. (의존성관리)

controller.ts

- 메소드 구현

controller.spec.ts

- 테스트코드를 쓰기위해 만드는 파일

## REST API set

[GET] http://localhost:3000/posts // Query 사용

- 다수의 Post를 가져온다.

[GET] http://localhost:3000/posts/11 // Query 사용

- 11이라는 ID를 갖고있는 Post를 하나 가져온다.

[POST] http://localhost:3000/posts // Body 사용

- 새로운 Post를 생성한다.

[PATCH] http://localhost:3000/posts/8 // Body 사용

- 8이라는 ID를 갖고있는 Post를 부분 변경한다.

[PUT] http://localhost:3000/posts/8 // Body 사용

- 8이라는 ID를 갖고있는 Post를 변경하거나 생성한다.

[DELETE] http://localhost:3000/posts/8 // Body 사용

- 8이라는 ID를 갖고있는 Post를 삭제한다.

## 의존성 주입과 제어의 역전

### 의존성 주입

```js
  class B {}

  class A {
    constructor(instance: B);
  }
```

프레임워크가 클래스 B를 자동으로 생성해서 constructor에다 입력을 해줌.
클래스 A를 사용할 때 클래스 B의 인스턴스가 필요하기 때문에 클래스 A는 클래스 B에 의존하고있기 때문에 의존하는 값을 주입하여준다.

### 제어의 역전

```js
  class B {}

  class A {
    constructor(instance: B)
  }

  class C {
    constructor(instance: B)
  }
```

원래는 A와 C가 B에 의존성이 있다하면 B를 직접 생성해서 넣어준다.
nestjs에서는 B를 생성하고 삭제하고 주입해주는 과정을 프레임워크가 함.

## SQL 기본기

SQL을 알아야 지속가능한 데이터를 저장하는 방법을 알 수 있다.

변수는 왜 초기화 되는가? 하드웨어적 문제
코드는 ssd에 저장된다. (영구적 데이터)
코드를 실행하면 RAM으로 올라감 (휘발성 데이터)

왜 RAM을 사용하나? RAM이 훨씬 속도가 빠름.

### Select - 데이터 선택하기

SELECT {column} FROM {table}

SELECT id, author, title, content, likeCount, commentCount FROM posts
post 테이블로부터 id, author, title, content, likeCount, commentCount 컬럼들을 전부 다 선택한다.

### Update - 데이터 업데이트하기

UPDATE {table} SET {column} WHERE {condition}

UPDATE posts SET likeCount = 0 WHERE id = 3
id가 3인 경우만 likeCount를 0으로 바꾼다.

### Delete - 데이터 삭제하기

DELETE FROM {table} WHERE {condition}

DELETE FROM posts WHERE author = "test"
작성자가 test인 데이터를 삭제해라

### Insert - 새로운 데이터 추가하기

INSERT INTO {table} {column1, column2, ...} VALUES {valu1, value2, ...}

INSERT INTO posts (id, author, ...) VALUES (7, "test", ...)

## Docker

모든 프로그램은 여러개의 서버에서 구동을 할 수 있어야한다.

프로젝트를 보내주면 누군가의 PC에서는 실행이 안된다~ -> 잉? 제 컴퓨터에서는 잘 되는데요?

멀티플랫폼 - windows, macos, linux 각각 다른회사이고 서로 호환되게 만들지를 않는다.

### Dockerfile

1. nodejs를 설치한다
2. yarn을 설치한다
3. nestjs cli를 설치한다
4. postgresql을 설치한다
5. mongoDB를 설치한다
6. 각종 환경변수 작업을 해준다
   와 같은 일련의 과정을 한 파일에 작성

### Docker Compose

하나의 기기에서 여러개의 컨테이너를 돌리는 기술

## Realationship

### 1 to 1

row 하나당 row 하나를 연동하는것

### 1 to n

row 하나당 여러개의 row와 연동

### n to n

게시글 과 태그의 관계

게시글 테이블과 태그 테이블이 있으며 중간 테이블을 구성해야한다. 단순하게 게시글 아이디와 태그아이디만을 가지고 있는 테이블

## SQL Relations

### RDB

Relational Database (관계형 데이터베이스)
SQL을 쓰는 데이터베이스를 주로 뜻함

## Session

유저의 정보를 데이터베이스에 저장하고 상태를 유지하는 도구

- Session은 특수한 ID 값으로 구성되어있다.
- Session은 서버에서 생성되며 클라이언트에서 쿠키를 통해 저장된다.
- 클라이언트에서 요청을 보낼때 Session ID를 같이 보내면 현재 요청을 보내는 사용자가 누구인지 서버에서 알 수 있다.
  (요청마다 매번 아이디와 비밀번호를 물어볼 필요 없음)
- Session ID는 데이터베이스에 저장되기때문에 요청이 있을때마다 매번 데이터베이스를 확인해야한다.
- 서버에서 데이터가 저장되기 때문에 클라이언트에 사용자 정보가 노출될 위험이 없다.
- 데이터베이스에 Session을 저장해야 하기 때문에 Horizontal Scaling이 어렵다.

## JWT Token

유저의 정보를 Base 64로 인코딩된 String 값에 저장하는 도구

- JWT Token은 Header, Payload, Signature로 구성되어 있으며 Base 64로 인코딩 되어있다.
- JWT Token은 서버에서 생성되며 클라이언트에서 저장된다.
- 클라이언트에서 요청을 보낼때 JWT Token ID를 같이 보내면 현재 요청을 보내는 사용자가 누구인지 서버에서 알 수 있다.
  (요청마다 매번 아이디와 비밀번호를 물어볼 필요 없음)
- JWT Token은 데이터베이스에 저장되지않고 Signature값을 이용해서 검증할 수 있다. 그래서 검증할때마다
  데이터베이슬르 매번 들여다볼 필요가 없다.
- 정보가 모두 토큰에 담겨있고 클라이언트에서 토큰을 저장하기 때문에 정보 유출의 위험이 있다.
- 데이터베이스가 필요없기 때문에 Horizontal Scaling이 쉽다.

## Session vs JWT Token

### 유저의 정보를 어디에서 저장하고 있는가?

- Session
  - 서버
- JWT Token
  - 클라이언트

### 클라이언트에서 서버로 보내는 정보는?

- Session
  - 쿠키
- JWT Token
  - 토큰

### 유저 정보를 가져올 때 데이터베이스를 확인해야하는가?

- Session
  - 확인필요
- JWT Token
  - 토큰의 Payload에 들어있는 정보만 필요할경우 확인 불필요

### 클라이언트에서 인증 정보를 읽을 수 있는가?

- Session
  - 불가능
- JWT Token
  - 가능

### Horizontal Scaling이 쉬운가?

- Session
  - 어려움
- JWT Token
  - 쉬움

## Refresh Token & Access Token

- 두 토큰 모두 JWT 기반이다.
- Access Token은 API요청을 할 때 검증용 토큰으로 사용된다. 즉, 인증이 필요한 API를 사용할때는
  꼭 Access Token을 Header에 넣어서 보내야한다.
  예) 유저 정보 수정, 회사 채용공고 지원 인원 확인 등.
- Refresh Token은 Access Token을 추가로 발급할 때 사용된다. Access Token을 새로고침
  (Refresh)하는 기능이 있기 때문에 Refresh Token이라고 부른다.
- Access Token은 유효기간이 짧고 Refresh Token은 유효기간이 길다.
- 자주 노출되는 Access Token은 유효기간을 짧게해서 Token이 탈취돼도 해커가 오래 사용하지 못하도록 방지할 수 있다.
- 상대적으로 노출이 적은 Refresh Token의 경우 Access Token을 새로 발급받을때만 사용되기 때문에 탈취 가능성이 적다.

## Encryption

### Algorithm

- bcrypt
  - 같은조건에서 항상 같은 문자를 뱉어낸다.
  - 일부러 느리게 작동되도록 설계가 되어있다.
    - 딕셔너리 어택(해시 매칭 테이블) 방지
- md5
- sha1

## Pagination

Pagination이란 많은 데이터를 부분적으로 나눠서 불러오는 기술이다.

### Pagination의 특징

- 쿼리에 해당되는 모든 데이터를 한번에 다 불러오지 않고 부분적으로 쪼개서 불러온다.
- 쿠팡같은 앱의 경우 수억개의 상품이 데이터베이스에 저장되어있는데 사용자가 상품 검색 화면을 들어갈때마다 모든 상품정보를 서버에서 클라이언트로 전송할 필요가 없다.
- 현대 클라우드 시스템은 데이터전송에 돈이 든다
- 돈이 안들더라도 수억개의 데이터를 한번에 보내면 분명 메모리가 터질것이다!
- 메모리가 터지지 않더라도 데이터 전송에 상당히 오랜 시간이 걸릴것이다!

### Page Based Pagination

- 페이지 기준으로 데이터를 잘라서 요청하는 Pagination
- 요청을 보낼때 원하는 데이터 갯수와 몇번째 페이지를 가져올 지 명시
- 페이지 숫자를 누르면 다음 페이지로 넘어가는 형태의 UI에서 많이 사용
- Pagination 도중에 데이터베이스에서 데이터가 추가되거나 삭제될경우 저장되는 데이터가 누락되거나 중복될 수 있음.
- Pagination 알고리즘이 매우 간단함

### Cursor Based Pagination

- 가장 최근에 가져온 데이터를 기준으로 다음 데이터를 가져오는 Pagination
- 요청을 보낼때 마지막 데이터의 기준값(ID등 Unique 값)과 몇개의 데이터를 가져올지 명시
- 스크롤 형태의 리스트에서 자주 사용
- 최근 데이터의 기준값을 기반으로 쿼리가 작성되기 때문에 데이터가 누락되거나 중복될 확률이 적음

### 요청 형태

- http://localhost:3000/posts?order_createdAt=ASC&where_id_more_than=3&take=20
  - {property}\_{filter} 형식으로 구현
  - order_createdAt : 내림/오름차 정렬
  - where\_\_id_more_than : 어떤 ID 이후로부터 데이터를 요청할건지
  - take : 몇개의 데이터를 요청할건지
