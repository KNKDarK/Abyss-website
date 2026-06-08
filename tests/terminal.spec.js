import { test, expect } from '@playwright/test';

test.describe('Terminal', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('.loading-screen').waitFor({ state: 'hidden' });
  });

  test('terminal toggle is visible', async ({ page }) => {
    await expect(page.locator('.terminal-toggle')).toBeVisible();
  });

  test('clicking toggle opens terminal', async ({ page }) => {
    await page.locator('.terminal-toggle').click();
    await expect(page.locator('.terminal-overlay')).toBeVisible();
  });

  test('terminal close button hides terminal', async ({ page }) => {
    await page.locator('.terminal-toggle').click();
    await expect(page.locator('.terminal-overlay')).toBeVisible();
    await page.evaluate(() => document.querySelector('.terminal-close').click());
    await page.waitForTimeout(500);
    await expect(page.locator('.terminal-overlay')).not.toHaveClass(/active/);
  });

  test('typing help shows command table', async ({ page }) => {
    await page.locator('.terminal-toggle').click();
    const input = page.locator('.terminal-input');
    await input.fill('help');
    await input.press('Enter');
    await expect(page.locator('.terminal-body')).toContainText('COMMANDS');
  });

  test('echo command works', async ({ page }) => {
    await page.locator('.terminal-toggle').click();
    const input = page.locator('.terminal-input');
    await input.fill('echo hello abyss');
    await input.press('Enter');
    await expect(page.locator('.terminal-body')).toContainText('hello abyss');
  });

  test('clear command clears terminal', async ({ page }) => {
    await page.locator('.terminal-toggle').click();
    const input = page.locator('.terminal-input');
    await input.fill('echo test');
    await input.press('Enter');
    await input.fill('clear');
    await input.press('Enter');
    const lines = page.locator('.terminal-body .line');
    expect(await lines.count()).toBe(0);
  });

  test('unknown command shows error', async ({ page }) => {
    await page.locator('.terminal-toggle').click();
    const input = page.locator('.terminal-input');
    await input.fill('notacommand');
    await input.press('Enter');
    await expect(page.locator('.terminal-body')).toContainText('command not found');
  });

  test('boot messages present on first open', async ({ page }) => {
    await page.locator('.terminal-toggle').click();
    await expect(page.locator('.terminal-body')).toContainText('BOOT');
  });
});
