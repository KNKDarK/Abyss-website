import { test, expect } from '@playwright/test';

test.describe('Page navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads index page with all core elements', async ({ page }) => {
    await expect(page.locator('#loading-screen')).toBeVisible();
    await expect(page.locator('.loading-text')).toHaveText('Awaiting Abyss');
    await expect(page.locator('.cursor')).toBeAttached();
    await expect(page.locator('#particle-canvas')).toBeAttached();
    await expect(page.locator('#side-nav')).toBeAttached();
    await expect(page.locator('.terminal-toggle')).toBeVisible();
    await expect(page.locator('h1.glitch')).toHaveText('TEAM ABYSS');
  });

  test('loading screen hides after page load', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await expect(page.locator('#loading-screen')).toHaveClass(/hidden/);
  });

  test('shows loading screen on internal navigation', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.locator('.loading-screen').waitFor({ state: 'hidden' });

    await page.locator('.btn-primary[href="team.html"]').click();
    await expect(page.locator('#loading-screen')).not.toHaveClass(/hidden/);
    await page.waitForURL('**/team**');
  });

  test('ctrl+click does not trigger loading screen', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.locator('.loading-screen').waitFor({ state: 'hidden' });

    await page.locator('.btn-primary[href="team.html"]').click({ modifiers: ['Control'] });
    await expect(page.locator('#loading-screen')).toHaveClass(/hidden/);
  });

  test('middle click does not trigger loading screen', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.locator('.loading-screen').waitFor({ state: 'hidden' });

    await page.locator('.btn-primary[href="team.html"]').click({ button: 'middle' });
    await expect(page.locator('#loading-screen')).toHaveClass(/hidden/);
  });

  test('navigates to all pages', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await page.locator('.loading-screen').waitFor({ state: 'hidden' });

    const pages = [
      { link: '.btn-primary[href="team.html"]', url: '/team', heading: 'VOID WALKERS' },
      { link: '.btn-outline[href="projects.html"]', url: '/projects', heading: 'PROJECTS' },
    ];

    for (const { link, url, heading } of pages) {
      await page.locator(link).click();
      await page.waitForURL(`**${url}**`);
      await expect(page.locator('h1.glitch').first()).toContainText(heading);
      await page.goBack();
      await page.waitForLoadState('networkidle');
      await page.locator('.loading-screen').waitFor({ state: 'hidden' });
    }
  });
});
