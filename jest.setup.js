// Для імітації глобальних об'єктів Next.js
global.console = {
  ...console,
  error: jest.fn(),
  warn: jest.fn(),
};
