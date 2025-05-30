# React Shop

- 여러분이 직접 개인 프로젝트를 구성하듯 만드셔도 괜찮습니다.
- 클론코딩을 한다면, 코드에 대한 회고들을 남기고 구현한 기능들의 내용들을 이해하시면서 경험하는 내용들을 작성 해보세요.

## 디렉토리 구조

- 여러분의 디렉토리 구조를 도식화 해보세요. 아래는 예시입니다.

```
.
├── .github               # Github setting folder
├── .vscode               # VSCode setting folder
├── public                # Public folder
│   └── assets
│       └── images        # Images
├── src
│   ├── components        # all components
│   ├── pages             # Next JS pages
│   ├── styles            # PostCSS style folder with Tailwind
│   └── utils             # Utility folder
├── .eslintignore         # Ignore ESLint
├── .eslintrc             # ESLint settings
├── .gitignore            # Ignore Git commit
├── .nvmrc                # Specification of NPM
├── .prettierignore       # Ignore prettier
├── .prettierrc           # Formatting code setting
├── LICENSE               # License file
├── lint-staged.config.js # Lint information
├── next-env.d.ts         # NextJS environment definition file
├── next.config.js        # NextJS configuration
├── package-lock.json     # Same packages with others
├── package.json          # Package information
├── postcss.config.js     # PostCSS setting
├── SECURITY.md           # Security
├── README.md             # README file
├── tailwind.config.js    # Tailwind CSS configuration
└── tsconfig.json         # TypeScript configuration
```

## Cart

Cart 기능을 구현하면서 기록한 내용을 남깁니다.

- addCart : cart에 아이템의 데이터를 추가하는 Recoil 함수 입니다.

..
..

## Vercel

### 배포 단계

-

### 배포 주소

- vercel.json은 서버에서 CSR(Client Side Rendering) 시에 라우팅 주소를 알 수 없기 때문에 rewrite로 주소를 루트로 보내어 Client의 Routing 시스템을 사용하도록 유도합니다.
- https://react-shop-oinochoe.vercel.app/
