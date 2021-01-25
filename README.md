# Todo App

리액트와 타입스크립트를 활용한 투두 앱 프로젝트.

<img src="https://user-images.githubusercontent.com/68897260/105639103-aaa78c80-5eb9-11eb-931f-95bd349cfb00.png" width="650" height="650" />

## 목차

- [기술 스택](#기술-스택)
- [구현 기능](#구현-기능)
- [프로젝트 진행 중 어려웠던 점](#프로젝트-진행-중-어려웠던-점)
- [프로젝트 후기](#프로젝트-후기)

## 기술 스택

- React
- TypeScript
- CSS Module

## 구현 기능

- [x] 할 일 목록 추가, 삭제, 수정
- [x] 완료된 할 일 목록
- [x] 할 일 목록 데이터 로컬에 저장

## 프로젝트 진행 중 어려웠던 점

아직 타입스크립트에 익숙하지 않다보니 타입스크립트를 다루는 과정에서 발생하는 문제가 많았는데

그중에서도 타입 추론에 의해 암시적으로 union 타입이 만들어지는 경우가 가장 힘들었다.

```tsx
/*
useState에 Todo 타입을 전달했지만 초기값을 지정하지 않은
useState 함수는 기본적으로 undefined 를 반환타입으로 가지게 된다.
따라서, union 타입인 Todo | undefined 타입이 만들어진다. 
*/
interface Todo {
  id: string;
  text: string;
  isDone: boolean;
  currentTime: string;
}

const [todo, setTodo] = useState<Todo>();
```

결국 이렇게 만들어진 Todo | undefined 타입의 값을 사용하기 위해선 반드시 아래의 과정을 거쳐야한다.

```tsx
// 값 자체가 필요한 경우
if (todo) {
  ...
}
if (todo !== undefined) {
  ...
}

// 프로퍼티에 접근하는 경우라면 논리 연산자와 옵셔널 체이닝도 사용할 수 있다.
todo && todo.text
todo?.text
```

물론 타입스크립트가 아닌 자바스크립트를 사용했다면 이런 귀찮은 일은 아주 적거나 없었을테지만

혹시 모를 런타임 에러와 코드 작성에 들이는 노력을 서로 교환하는 느낌이었다.

## 프로젝트 후기

타입스크립트의 제네릭이라는 개념이 크게 와닿질 않았는데 마침 이번 프로젝트에서 제네릭을 활용해 볼 기회가 있었다.

useLocalStorage 라는 커스텀 훅을 만들때 사용했는데, 잘 활용하면 앞으로도 아주 유용하게 쓰일 것 같다.

```tsx
// useLocalStorage.ts
import { Dispatch, SetStateAction, useState, useEffect } from "react";

export default function useLocalStorage<T>(key: string) {
  const initialValue = JSON.parse(localStorage.getItem(key) || "");

  const [state, setState] = useState<T>(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  type Result = [T, Dispatch<SetStateAction<T>>];

  const result: Result = [state, setState];

  return result;
}
```

사용법은 useState 와 거의 동일한데, 인자를 넘겨주는 부분만 초기값 대신 데이터 저장에 사용할 키 값을 문자열로 전달하면 된다.

ex) `const [todos, setTodos] = useLocalStorage<Todo[]>("todos")`

그리고 이 코드에서조차 위에서 쭉 설명했던 union 타입으로 인한 문제가 발생하는데

`localStorage.getItem()` 함수의 반환 타입이 `string | null` 이기 때문에

`string` 타입만을 인자로 받는 `JSON.parse()` 함수엔 전달할 수 없다.

따라서 논리연산자 `||` 로 빈 문자열을 기본값으로 전달하도록 해주었다.

이 부분은 아무래도 타입스크립트를 많이 써보면서 익숙해져야 할 것 같다.
