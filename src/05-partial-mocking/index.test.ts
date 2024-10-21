// Uncomment the code below and write your tests
import { mockOne, mockTwo, mockThree, unmockedFunction } from './index';

jest.mock('./index', () => ({
  mockOne: jest.fn(),
  mockTwo: jest.fn(),
  mockThree: jest.fn(),
  unmockedFunction: jest.requireActual('./index').unmockedFunction,
}));

describe('partial mocking', () => {
  let consoleSpy: jest.SpyInstance;

  afterAll(() => {
    jest.unmock('./index');
  });

  beforeEach(() => {
    // Мокируем console.log перед каждым тестом
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
  });

  afterEach(() => {
    // Восстанавливаем console.log после каждого теста
    consoleSpy.mockRestore();
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    mockOne();
    mockTwo();
    mockThree();

    // Проверяем, что они были вызваны, но не вызвали логгирование
    expect(mockOne).toHaveBeenCalled();
    expect(mockTwo).toHaveBeenCalled();
    expect(mockThree).toHaveBeenCalled();

    // Проверяем, что ничего не вывелось в консоль
    expect(consoleSpy).not.toHaveBeenCalled();
  });

  test('unmockedFunction should log into console', () => {
    unmockedFunction();

    // Проверяем, что unmockedFunction вывела сообщение в консоль
    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');
  });
});
