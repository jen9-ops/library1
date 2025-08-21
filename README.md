# library1

// Пример вызова:
try {
    // Ваш код, который может сломаться
    throw new Error('Test error');
} catch (err) {
    handleError(err, 1500); // 1500 мс как время выполнения
}
