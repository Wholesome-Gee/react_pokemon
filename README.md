# Ch01. 메인 페이지 생성하기
## 02. Vite를 이용한 리액트 생성
### CLI 로 Vite를 통해 리액트 프로젝트 생성
- `npm init vite`
- 프로젝트명 또는 현재경로( ./ ) 입력
- 프레임워크 선택 ( React )
- 자바스크립트 선택 ( JavaScript ) // 먼저 자바스크립트로 작성 이후에 타입스크립트로 변경할 예정
- 프로젝트에 들어가서 `npm i`
  - vite는 처음 생성이 될 때 기본적인 dependencies가 설치되어 있지 않음.  
    `npm i`를 통해 처음에 전체적인 설치 작업이 필요

### 그 외 필요한 라이브러리 설치
- `npm i axios`
- `npm i react-router-dom`
- `npm i -D autoprefixer`
- `npm i -D postcss`
- `npm i -D tailwindcss`
---
## 03. Vite란?
### Vite를 사용하는 이유
- 빌드 속도나 새로운 코드를 적용 했을 때 Feedback 속도가 빠르다.
- 자세한 내용은 영상참조...  
---
## 04. Create React App VS Vite
- Vite가 CRA보다 설치시간이 빠르고, File Size가 가벼우며, Build된 File Size도 가볍다.
- 하지만 CRA가 안정성 측면에서는 좋다.  
( 리액트생태계의 일부 기능이 Vite에서 아직 지원 안 될수 있으니.. )
---
## 05. TailWindCSS에 대해서
- HTML 안에서 CSS 스타일을 만들 수 있는 CSS 프레임워크.  
  ( https://tailwindcss.com/ )
- 장점 1 : Utility Class를 활용하는 방식으로 빠른 스타일링
- 장점 2 : class / id 작명에 고민을 덜어준다.
- 장점 3 : Utility Class에 익숙하지 않다면, IntelliSense 플로그인이 제공 되어 금방 익숙해질 수 있다.  
( Tailwind CSS IntelliSense 익스텐션 설치 )
---
## 06. TailWindCSS 설정하기
### 강의 내용대로 설정하면 도중에 에러메시지가 떠서 직접 방법을 찾음
- tailwindcss 공식문서를 참조하였음 ( https://tailwindcss.com/docs/installation/using-vite )
  - `npm install tailwindcss @tailwindcss/vite`
  - vite.config.js 수정
    ```js
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import tailwindcss from '@tailwindcss/vite' //추가

    // https://vite.dev/config/
    export default defineConfig({
      plugins: [
        react(),
        tailwindcss()
      ], //추가
    })
    ```
  - index.css 초기화
    ```css
    @import "tailwindcss";
    ```
  - index.html의 \<head>에 `<link href="/src/styles.css" rel="stylesheet">` 추가
---
## 07. PostCSS & Autoprefixer
### PostCSS & Autoprefixer 란?
- javascript로 CSS를 변환하는 Tool
- Can I Use 사이트를 참조하여 자동으로 공급업체 접두사를 추가해준다. 
- 최신 CSS를 사용해도 자동으로 대부분의 브라우저에서 읽을 수 있도록 변환해준다.
- css 선택자를 자동으로 unique한 선택자로 변환해준다. `ex) .name ➡️ .Logo__name__SVK0g`
- css 문법 오류 시 에러메시지를 경로와 함께 콘솔에 출력해준다.
--- 
## 08. API를 통해 포켓몬 데이터 가져오기
### Axios란 ?
- 브라우저, Node.js를 위한 Promise API를 활용하는 HTTP 비동기 통신 라이브러리.
- `npm install axios --save`
### Axios로 Get요청하기
- async 함수내에 try catch문을 작성 후,  
  try문 안에 `const response = await axios.get('url')`로 데이터를 요청하여 response 변수에 담는다.
  ```js
  // Api로부터 받은 데이터를 담아둘 state 생성
  const [pokemons, setPokemons] = useState([])
  const pokeApiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=1008&offset=0';

  // 비동기 함수(async,await)로 데이터를 받아서 state에 저장
  const fetchPokeData = async () => {
    try{
      const response = await axios.get(pokeApiUrl)
      setPokemons(response.data.results);
    } catch (error) {
      console.log(error);
    }
  }
  ```
---
## 09. 포켓몬 카드 생성하기
### 받아온 데이터에서 원하는 property만 뽑아서 따로 object로 만들기 (Formatting)
```js
// data = { a:1 , b:2, c:3, d:4, e:5 } 라고 가정
export default function Component () {
  let [data, setData] = useState({})

  useEffect() {
    fetchData()
  }

  async function fetchData() {
    try {
      let response = axios.get('url')
      let formattedData = formatting(response)
      setData(formattedData)
    } catch (error) {
      console.log(error);
    }
  }

  function formatting(params) {
    let { a, b, c } = data;
    let formattedData = { a, b, c };
    return formattedData;
  }
}
```
---
## 10. 포켓몬 카드 UI 생성하기
### JSX 문법 `{ data && \<div>{data}</div> }`
- { data && \<div>{data}\</div> } 는  data 변수가 true일 때, 오른쪽 html을 보여준다.
- { data ? \<div>{data}\</div> : null } 보다 간결하지만 data가 false일 경우에 대한 대비는 불가능하다.
### tailwind에서 나만의 color변수 만들기 ( tailwind @theme )
- https://tailwindcss.com/docs/theme  ← theme관련 공식문서
- index.css에 아래 내용 추가
  ```css
  @theme {
    --color-초록색: #7ac74c;
  }
  ```
- html 요소의 className에 `'bg-초록' , 'text-초록'` 등 여러 스타일의 색상을 지정할 수 있음.
  - color의 사용처 : https://tailwindcss.com/docs/colors
### string.padStart() 메서드
- `string.padStart(n,'0')`은 해당 string을 n자리 string으로 만들고,  
  앞에서부터 0으로 채우라는 뜻이다.
  ```js
  let str = '5'
  str.padStart(1,'0'); // '5'
  str.padStart(2,'0'); // '05'
  str.padStart(3,'0'); // '005'
  ```
### tailwindCSS의 utility class 모르는것은 chatGPT에게 물어보자
- '테일윈드 유틸리티클래스로 display:flex 는 어떻게 하는거야?'
---
## 11. Image Lazy Loading
- 뷰포트에 당장 노출 될 필요가 없는 이미지들은 로딩해놓지 않고,  
  실제 뷰포트에 보여질 필요가 있을 때, 그 때 로딩하는것
- img태그에 loading='lazy' , onLoad={()=>{  }} 를 사용하여 구현
- `<img src={'url'} alt={'alt'} className={'w-100 h-100 oject-contain'}  loading='lazy' onLoad={()=>{setIsLoading(false)}}/>`
  ```js
  // /components/LazyImage.jsx
  export default function LazyImage({url, alt}) {
    const [isLoading, setIsLoading] = useState(true);
    const [opacity, setOpacity] = useState('opacity-0');
    // 1번 대기
    useEffect(()=>{
      isLoading? setOpacity('opacity-0') : setOpacity('opacity-100');
    },[isLoading])

    // 2번 실행
    // isLoading이 true일 땐 ...loading 출력,
    // img 태그의 loading 속성은 브라우저가 뷰포트에 이미지가 들어올 떄까지 이미지 로드를 하지않음. ( 스크롤을 해야 보이는 이미지라던가 ... )
    // img 태그가 onLoad되면 isLoding은 false가 되고 ...loading이 사라짐
    return (
      <>
        {isLoading && (
          <div className="absolute h-full z-10 w-full flex items-center justify-center">
            ...loading
          </div>
        )}
        <img src={url} alt={alt} width='50%' height='auto' className={` oject-contain ${opacity}`} loading='lazy' onLoad={()=>{setIsLoading(false)}}/>
      </>
    )
  }
  ```
  ---
## useDebounce Custom Hooks 만들기
### useEffect의 return과 의존성 배열을 활용해 useDebounce 기능 만들기
- useDebounce기능은 user가 input에 무언가를 입력시,   
  실시간으로 데이터를 받아와서 뷰포트에 출력해준다고 했을때,  
  데이터 요청에 간격을 설정해주는것.
  ex) user가 input에 'pikachu'를 검색시 ,   
  한글자 한글자 마다 onchange 이벤트리스너가 작동되어 서버에 데이터요청을 하는것이 아닌,  
  타이핑 시 0.5초마다 완성된 타이핑으로 데이터요청을 하는것.
- useDebounce.jsx를 만들어 구현하는데 자세한 내용은 해당영상 참조
---
## AutoComplete 컴포넌트 생성하기
### tailwind-scrollbar
- scroll box에 있는 scrollbar를 보이지 않도록 처리할 수 있다.
- `npm i -D tailwind-scrollbar`
- index.css에 `@plugin 'tailwind-scrollbar'` 추가
- scroll box 요소의 className에 `scrollbar-none` 추가
- 참조링크 : https://www.npmjs.com/package/tailwind-scrollbar
---
