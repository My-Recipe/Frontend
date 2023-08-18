# FRiED NOTE

나만의 작은 주방

Vite + SWC를 사용한 리액트 어플리케이션입니다.

Emotion을 CSS 라이브러리로 사용중입니다. css prop + object 방식으로 사용합니다.
vite-plugin-pages를 통해 file-base routing을 사용합니다.

<aside>

**💡Git hooks**

- pre commit
  컴포넌트 파일에 console.[clear|dir|log|info|warn|error] 가 존재하는지 확인하는 과정을 거칩니다. 해당 텍스트가 있다면 커밋이 불가능하니, 없앤 뒤 커밋해주세요.
- commit msg
  [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) 가이드라인을 따릅니다. 해당 구조와 다르다면 커밋이 불가능하니, 구조를 수정 후 커밋해주세요.

</aside>

## Github Convention

- 1 issue 1 branch를 원칙으로 합니다.
- 하나의 branch에서 작업이 완료되면 PR을 통해 master로 병합합니다.
  - PR이 병합 후 Close가 되면, branch를 삭제합니다.
- master에 병합이 완료되면, 다른 작업중인 branch에서 rebase를 진행합니다.

## Code Convention

### Naming

- 변수, 함수명은 **camelCase** 로 작성합니다.
  - 길더라도 구체적으로 작성합니다
    - `isOpen` ⇒ `isErrorModalOpen`
    - `handleSubmit` X ⇒ `handleFormSubmit` O ⇒ `handleCommentFormSubmit` O
- 상수는 **UPPER_CASE** 로 작성합니다.
- type, interface, class 등은 **PascalCase**로 작성합니다.

### Formatting

- 함수의 인자값은 3개 이상을 지양합니다.

  ```tsx
  // X  (인자가 4개)
  const createMenu = (title,body,text,cancellable)=> { ... }

  // O (인자가 객체 1개)
  const createMenu = ({ title, body, buttonText, cancellable }) => {
    // ...
  }
  // 호출
  createMenu({
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
  });
  ```

- 비동기 코드는 **asnyc / await**을 지향합니다. (then 체이닝 X)
