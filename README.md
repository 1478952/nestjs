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
