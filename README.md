# {{project name을 작성해주세요}}
{{project name}} 서버 입니다 

프로젝트 시작할때는 그 당시 nest 최신버전을 지향합니다.

## 세팅 및 설치 방법

### git 세팅
```
git 
1. github에 새로운 repository를 생성한다. 
2. git clone --mirror git@github.com:mcircle-dev/basic-nestjs.git {임시폴더명} 
3. cd {임시폴더명}
4. git remote set-url --push origin {{1번에서 생성한 repository url}}
5. git push --mirror
6. git clone {{1번에서 생성된 repository url}}
```

### nestjs 최신버전 업데이트
```
//step1
npm install -g @nestjs/cli

//step2: nest 최신버전 확인
nest --version

// update deependencies
npm i -g npm-check-updates

//step: 3 update package하기 
ncu -u -f /^@nestjs/ 

```


### prerequisite
node버전은 프로젝트 생성시 배포할 서버에서 지원하는 가장 최신 LTS 버전으로 사용합니다.
DB는 rdb는 mariaDB를 사용하고 nosql은 mongodb(documentDB)를 사용합니다. 

| 항목                    | version | 
|-----------------------|:-------:|
| Node                  | 20.11.0 |
| mariaDB               |         |


### 환경변수
참고 : [보러가기](https://well-check.atlassian.net/wiki/spaces/QPKY/pages/917110829/env)

### prettier
참고: [보러가기](https://well-check.atlassian.net/wiki/spaces/QPKY/pages/917176350/eslint+prettier)

### rest api naming rule
참고: [보러가기](https://well-check.atlassian.net/wiki/spaces/QPKY/pages/921763841/rest+api+naming+rule)

### request, response
참고: [보러가기](https://well-check.atlassian.net/wiki/spaces/QPKY/pages/680230913/request+response)

### 실행
```
npm run start:local
```
