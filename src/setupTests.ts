import "@testing-library/jest-dom";
// src/setupTests.ts
import { server } from "./mocks/server";
// import '@testing-library/jest-dom/extend-expect';

// Запускаем сервер перед всеми тестами
beforeAll(() => server.listen());

// Сбрасываем обработчики после каждого теста, чтобы не было конфликтов
afterEach(() => server.resetHandlers());

// Останавливаем сервер после всех тестов
afterAll(() => server.close());
