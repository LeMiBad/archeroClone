import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  /* Сброс базовых стилей браузера */
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html, body {
    height: 100%;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-size: 16px;
    line-height: 1.5;
    color: #333;
    background-color: #f4f4f4;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Обнуляем отступы у списка */
  ul, ol {
    list-style: none;
  }

  /* Убираем подчеркивание у ссылок */
  a {
    text-decoration: none;
    color: inherit;
  }

  /* Сброс кнопок */
  button {
    background: none;
    border: none;
    padding: 0;
    font-family: inherit;
    cursor: pointer;
  }

  /* Установка плавного скролла */
  html {
    scroll-behavior: smooth;
  }

  /* Сброс стилей изображений */
  img {
    max-width: 100%;
    display: block;
  }

  /* Добавление базового стиля для заголовков */
  h1, h2, h3, h4, h5, h6 {
    font-weight: 600;
    line-height: 1.2;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100%;
`;