# React Shop

## 디렉토리 구조
```
📦 public/
┣ 📂 img/            # SVG 아이콘 및 정적 리소스
📦 src/
┣ 📂 assets/          # CSS 및 이미지 등의 정적 리소스
┃ ┗ 📂 css/
┃   ┗ 📄 tailwind.css # 글로벌 스타일 정의
┣ 📂 components/      # 재사용 가능한 UI 컴포넌트
┃ ┣ 📂 carts/         # 장바구니 관련 컴포넌트 (CartList, CartView 등)
┃ ┣ 📂 common/        # 공통 컴포넌트 (Nav, Drawer, Search, Spinner 등)
┃ ┗ 📂 layout/        # 레이아웃 구성 요소 (Nav, Footer 등)
┃ ┗ 📂 products/      # 제품 관련 컴포넌트 (ProductsView, ProductsLoad 등)
┣ 📂 constants/       # 상수 정의 (카테고리 enum, 공통 문자열 등)
┣ 📂 context/         # 전역 Context (ThemeContext 등)
┣ 📂 helpers/         # 헬퍼 유틸 함수 또는 유틸리티 모듈 (비어 있거나 예정)
┣ 📂 hooks/           # 커스텀 훅 정의 (useDebounce)
┣ 📂 products/        # 상품 정보 관련 상태 로딩 처리 (ProductsLoad, ProductsView 등)
┣ 📂 router/          # 라우팅 설정 (React Router 기반)
┣ 📂 store/           # Recoil 기반 상태 관리 (cart 상태, 상품 목록 등)
┣ 📂 views/           # 페이지 컴포넌트 (각 카테고리, 상세, 장바구니 등 실제 라우팅 페이지)
┣ 📄 App.tsx          # 앱 루트 컴포넌트 (ThemeProvider, Suspense 등 적용)
┣ 📄 main.tsx         # React 앱 진입 지점 (createRoot 등 설정)
┗ 기타 설정 파일들   # Vite, Tailwind, ESLint 등 구성 파일
```

## 기술 스택
| 기술 스택                         | 설명                                                            |
| ----------------------------- | ------------------------------------------------------------- |
| **React 18**                  | 컴포넌트 기반 UI 라이브러리. `startTransition`, `Suspense` 등 최신 기능 일부 적용 |
| **TypeScript**                | 정적 타입 기반의 안정적인 개발을 위한 설정. 타입 추론 + 명시적 인터페이스 병행                |
| **Vite**                      | 빠른 개발 서버와 번들링을 지원하는 빌드 도구. `vite.config.ts`로 구성               |
| **Recoil**                    | 전역 상태 관리를 위한 상태 컨테이너. atom/selector 기반으로 구성                   |
| **React Router v6**           | SPA 라우팅 처리. lazy 로딩 및 `<Suspense>` 조합으로 UX 개선                 |
| **Tailwind CSS**              | 유틸리티 기반 CSS 프레임워크. 반응형 디자인 및 다크모드 손쉬운 구현                      |
| **daisyUI**                   | Tailwind 기반 UI 컴포넌트 라이브러리. 버튼, 카드 등 시멘틱 클래스 제공                |


## 핵심 기능 및 적용 사례

### React 18 기능 활용
- Suspense 활용을 통해 컴포넌트 렌더링 대기 중 fallback UI 제공
```tsx
          <Suspense fallback={<div className="flex justify-center p-10">로딩 중...</div>}>
            <section className="main pt-16">
              <Router />
            </section>
          </Suspense>
```
- 컴포넌트 코드 분할을 통한 초기 로딩 최소화
```tsx
const CartList = lazy(() => import("./CartList"));

  return (
    <>
        <div className="lg:flex justify-between mb-20">
          <div>
            {!isEmpty && (
              <Suspense fallback={<Spinner />}>
                <CartList />
              </Suspense>
            )}
          </div>
    </>
  );
```
- startTransition을 통해 사용자 인터렉션 중 느린 상태 업데이트를 우선순위 낮춰 처리
```tsx
const CartList = (): JSX.Element => {
  const [cart, setCart] = useRecoilState(cartState);
  const items = useRecoilValue(cartList);

  const addToCartHandler = (id: number) => {
    startTransition(() => {
      setCart(addToCart(cart, { id }));
    });
  };

  const removeFromCartHandler = (id: number) => {
    startTransition(() => {
      setCart(removeFromCart(cart, id.toString()));
    });
  };

  return (
    <>

            <div className="card-actions">
              <div className="btn-group">
                <button className="btn btn-primary" onClick={() => removeFromCartHandler(Number(item.id))}>
                  -
                </button>
                <button className="btn btn-ghost no-animation">{item.count}</button>
                <button className="btn btn-primary" onClick={() => addToCartHandler(Number(item.id))}>
                  +
                </button>
              </div>
            </div>
    </>
  );
};
```
- useDeferredValue를 통해 입력값 변경 시 지연된 상태 제공, 빠른 입력 반응성 확보함
```tsx
const Search = ({ isSearchOpen, onClose }: SearchProps): JSX.Element => {

  const debouncedKeyword = useDebounce(keyword, 200);
  const deferredKeyword = useDeferredValue(debouncedKeyword);

  const filtered = useMemo(() => {
    if (!deferredKeyword.trim()) return [];
    return products.filter((product) => product.title.toLowerCase().includes(deferredKeyword.toLowerCase()));
  }, [deferredKeyword, products]);

  return (
      {filtered.length > 0 && (
        <ul
          ref={listRef}
          className="!fixed left-0 sm:!absolute sm:top-14 menu flex-nowrap dropdown-content w-full sm:w-64 max-h-96 shadow text-base-content overflow-y-auto bg-white dark:bg-gray-600"
        >
          {filtered.map((product, index) => (
            <li
              key={product.id}
              className={`cursor-pointer ${
                highlightIndex === index ? "bg-gray-200 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
              onMouseDown={() => {
                navigate(`/product/${product.id}`);
                setKeyword("");
                setHighlightIndex(-1);
                onClose();
              }}
            >
              <span className="block py-2 px-4">{product.title}</span>
            </li>
          ))}
        </ul>
      }
  );
};
```

### Recoil 전역 상태 관리 & localStorage 활용
좋아, 그럼 **2번: Recoil – 전역 상태 관리 구조 및 적용 사례** 정리를 이어서 작성할게. 이번에도 **개념 설명 → 원리 → 실제 프로젝트 내 구조 및 코드 예시** 순으로 구성해.

---

## 🧠 Recoil – 전역 상태 관리 및 구조 설계

### 🔍 사용 목적

Recoil은 React 전용 전역 상태 관리 라이브러리로, \*\*atom(단일 상태 단위)\*\*와 \*\*selector(파생 상태)\*\*를 통해 **직관적인 상태 추적 및 조합**이 가능함. 이 프로젝트에서는 특히 **장바구니 관리**, **상품 데이터 추출**, **로컬 저장소 연동**에 활용.

---

### ✅ Recoil 구조 요약

| 개념                                    | 설명                  | 적용 위치                              |
| ------------------------------------- | ------------------- | ---------------------------------- |
| `atom`                                | 상태 단위 정의 (장바구니 등)   | `store/cart.ts`                    |
| `selector`                            | atom 기반 파생 상태 생성    | `store/cart.ts`, `products.ts`     |
| `selectorFamily`                      | 동적 파라미터 기반 selector | `store/products.ts`의 `productById` |
| `useRecoilValue`, `useSetRecoilState` | 컴포넌트 내 상태 활용 훅      | 각 view 및 components                |

---

### 🛒 장바구니 상태 구조 예시

```ts
// 📁 store/cart.ts
export const cartState = atom<ICartState>({
  key: "cart",
  default: {},
  effects: [
    ({ setSelf, onSet }) => {
      const stored = localStorage.getItem(CART_ITEM);
      if (stored) setSelf(JSON.parse(stored));
      onSet((value) => localStorage.setItem(CART_ITEM, JSON.stringify(value)));
    },
  ],
});
```

> ✅ localStorage 연동을 통한 새로고침 후 상태 유지

---

### 🧠 selectorFamily를 활용한 상품 정보 추출

```ts
// 📁 store/products.ts
export const productById = selectorFamily<IProduct, number>({
  key: "productById",
  get: (id) => async () => {
    const response = await fetch(`${API}/products/${id}`);
    return await response.json();
  },
});
```

```ts
// 📁 cart.ts (장바구니 파생 상태)
export const cartList = selector<ICartItems[]>({
  key: "cartList",
  get: ({ get }) => {
    const cart = get(cartState);
    return Object.entries(cart.items || {}).map(([id, info]) => {
      const product = get(productById(Number(id)));
      return {
        id,
        title: product?.title || "알 수 없음",
        price: product?.price || 0,
        image: product?.image || "",
        count: info.count,
      };
    });
  },
});
```

> 💡 상품 ID만 저장하고, 상세 데이터는 selectorFamily를 통해 동적으로 fetch하여 최신 정보 반영


---

## 🎨 TailwindCSS + DaisyUI – UI 유틸리티 기반 디자인 시스템

### 🔍 사용 목적

이 프로젝트는 빠른 스타일링, 반응형 대응, 다크모드 전환 등을 위해 **TailwindCSS**를 기반으로 하고, 컴포넌트 수준의 UI 프리셋을 위해 **DaisyUI**를 함께 사용함.

---

### ✅ 핵심 원리

| 요소          | 설명                                               | 적용 예시                                       |
| ----------- | ------------------------------------------------ | ------------------------------------------- |
| TailwindCSS | 유틸리티 클래스 기반 스타일링                                 | `className="text-center text-xl font-bold"` |
| DaisyUI     | Tailwind 기반 UI 컴포넌트 프리셋                          | `className="btn btn-primary"`               |
| 다크모드 대응     | `data-theme="dark"` 및 DaisyUI 내장 지원              | Nav / Layout                                |
| 반응형 처리      | `sm`, `md`, `lg`, `xl`, `2xl` prefix로 유연한 스타일 구성 | `lg:grid-cols-4`, `px-4 xl:px-2` 등          |

---

### 🛠 프로젝트 내 주요 적용 사례

#### 1. 다크모드 적용: `ThemeContext` + DaisyUI

```tsx
// 📁 layout/Nav.tsx
<html data-theme={isDark ? "dark" : "light"} />
```

#### 2. Card 스타일 구성 (상품 박스)

```tsx
<a className="card card-bordered border-gray-200 dark:border-gray-800 card-compact lg:card-normal">
  <figure className="flex h-80 bg-white overflow-hidden">
    <img src={product.image} alt={product.title} />
  </figure>
  <div className="card-body bg-gray-100 dark:bg-gray-700" />
</a>
```

> ✅ DaisyUI의 `card`, `btn`, `badge`, `drawer` 등을 적극 활용하여 디자인 일관성 확보

---

### 🧱 레이아웃 구조 (Layout Shift 방지 포함)

```tsx
// 📁 App.tsx
<main className="main flex flex-col">
  <Nav />
  <Router />
  <Footer />
</main>
```

```css
/* 📁 tailwind.css */
.main {
  min-height: calc(100vh - 160px);
}
```

> ✅ Nav(64px) + Footer(96px) 제외한 본문 영역 유지 → Footer 밀림 현상 방지

---

### 📱 반응형 구조 예시 (ItemList.tsx)

```tsx
<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
  {/* 카드 리스트 */}
</div>
```

> 💡 작은 화면에선 2열, 중간 화면 이상에서 3\~4열로 자연스러운 레이아웃 흐름 제공

---

### 💡 구조적 이점 요약

* 별도 CSS 작성 최소화 → 유지보수성과 일관성 향상
* 다크모드 전역 적용 구조와 DaisyUI 컴포넌트 프리셋으로 빠른 UI 구현
* 반응형과 Layout Shift 대응을 유틸리티 기반으로 세밀하게 처리

---

좋아! 지금까지 정리된 맥락을 기반으로 README의 마지막 항목인 **커스텀 훅 & Context API 사용 정리** 섹션을 다음과 같이 구성할 수 있어. 요청한 대로 **"설명 + 원리 + 실제 예시 코드"** 중심으로 정리해줄게.

---

## 🧩 커스텀 훅 & Context API 정리

### 1. `useDebounce` – 입력 지연 처리 커스텀 훅

* **설명**

  * 사용자가 입력하는 값을 일정 시간 지연시켜, 불필요한 연산이나 API 호출을 방지하는 커스텀 훅이다.
  * 특히 검색 기능에서 입력이 멈춘 시점에만 필터링 로직을 실행하도록 하여 **성능 최적화**에 기여한다.

* **동작 원리**

  * 내부적으로 `setTimeout`을 사용해 지정한 시간(`delay`)이 지나면 상태를 갱신한다.
  * `useEffect` 내에서 `value`가 변경될 때마다 타이머를 초기화하여, **최종 입력값만 반영**되도록 한다.

* **실제 코드 예시**

  ```ts
  const useDebounce = <T>(value: T, delay: number = 300): T => {
    const [debounced, setDebounced] = useState(value);

    useEffect(() => {
      const handler = setTimeout(() => setDebounced(value), delay);
      return () => clearTimeout(handler);
    }, [value, delay]);

    return debounced;
  };
  ```

* **적용 위치 예시 – `Search.tsx`**

  ```ts
  const debouncedKeyword = useDebounce(keyword, 200);
  const deferredKeyword = useDeferredValue(debouncedKeyword);
  ```

---

### 2. `ThemeContext` – 다크모드 전역 관리용 Context API

* **설명**

  * 테마 상태(`light` / `dark`)를 앱 전체에서 공유하기 위한 컨텍스트.
  * `localStorage`와 연동되어 사용자의 테마 설정을 저장하고, 컴포넌트 간 상태 전달을 간편화함.

* **동작 원리**

  * `createContext`로 테마 상태와 토글 함수를 공유하고, 내부에서 `useEffect`로 초기 테마를 설정한다.
  * 커스텀 훅 `useTheme()`을 통해 컴포넌트 내에서 손쉽게 접근할 수 있도록 래핑되어 있음.

* **컨텍스트 제공자 코드 (`ThemeContext.tsx`)**

  ```ts
  const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });

  export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [theme, setTheme] = useState("light");

    useEffect(() => {
      const saved = localStorage.getItem("theme") ?? "light";
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }, []);

    const toggleTheme = () => {
      const next = theme === "light" ? "dark" : "light";
      setTheme(next);
      localStorage.setItem("theme", next);
      document.documentElement.setAttribute("data-theme", next);
    };

    return (
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    );
  };
  ```

* **커스텀 훅 `useTheme()`**

  ```ts
  export const useTheme = () => useContext(ThemeContext);
  ```

* **적용 위치 예시 – `Nav.tsx`**

  ```ts
  const { theme, toggleTheme } = useTheme();

  <input type="checkbox" onChange={toggleTheme} checked={theme === "dark"} />
  ```

---

### 배포 주소
- https://react-shop-seven-pi.vercel.app/