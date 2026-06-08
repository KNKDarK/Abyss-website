import { test, expect } from '@playwright/test';

test.describe('Interactive features', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await page.locator('.loading-screen').waitFor({ state: 'hidden' });
  });

  test.describe('Side navigation', () => {
    test('side-nav hidden by default', async ({ page }) => {
      await expect(page.locator('#side-nav')).not.toHaveClass(/visible/);
    });

    test('side-nav appears when cursor approaches left edge', async ({ page }) => {
      await page.mouse.move(5, 300);
      await expect(page.locator('#side-nav')).toHaveClass(/visible/);
    });

    test('side-nav hidden when cursor moves away from edge', async ({ page }) => {
      await page.mouse.move(5, 300);
      await expect(page.locator('#side-nav')).toHaveClass(/visible/);
      await page.mouse.move(200, 300);
      await expect(page.locator('#side-nav')).not.toHaveClass(/visible/);
    });

    test('side-nav items have correct hrefs', async ({ page }) => {
      const items = page.locator('#side-nav .side-item');
      await expect(items.nth(0)).toHaveAttribute('href', 'index.html');
      await expect(items.nth(1)).toHaveAttribute('href', 'team.html');
      await expect(items.nth(2)).toHaveAttribute('href', 'projects.html');
      await expect(items.nth(3)).toHaveAttribute('href', 'extras.html');
    });

    test('clicking side-nav item navigates', async ({ page }) => {
      await page.mouse.move(5, 300);
      await page.locator('#side-nav a[href="team.html"]').click();
      await page.waitForTimeout(1500);
      expect(page.url()).toMatch(/\/team/);
    });
  });

  test.describe('Magnetic buttons', () => {
    test('buttons respond to hover with magnetic translation', async ({ page }) => {
      const btn = page.locator('.btn-primary').first();
      const box = await btn.boundingBox();
      await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
      await page.mouse.move(box.x + 10, box.y + 10);
      const mx = await btn.evaluate(el => getComputedStyle(el).getPropertyValue('--mx'));
      expect(parseFloat(mx)).not.toBe(0);
    });

    test('magnetic offset clears on mouse leave', async ({ page }) => {
      const btn = page.locator('.btn-primary').first();
      const box = await btn.boundingBox();
      await page.mouse.move(box.x + 10, box.y + 10);
      await page.mouse.move(box.x - 50, box.y - 50);
      const mx = await btn.evaluate(el => getComputedStyle(el).getPropertyValue('--mx'));
      expect(mx).toBe('0px');
    });
  });

  test.describe('3D Tilt cards', () => {
    async function waitForPage(page, url) {
      await page.goto(url);
      await page.waitForLoadState('networkidle');
      await page.locator('.loading-screen').waitFor({ state: 'hidden' });
      await page.waitForTimeout(100);
    }

    test('team-member gets tilt-card class', async ({ page }) => {
      await waitForPage(page, '/team.html');
      await expect(page.locator('.team-member').first()).toHaveClass(/tilt-card/);
    });

    test('tilt applies transform on mousemove', async ({ page }) => {
      await waitForPage(page, '/team.html');
      const card = page.locator('.team-member').first();
      await card.scrollIntoViewIfNeeded();
      await card.waitFor({ state: 'visible' });
      const hasTilt = await card.evaluate(el => {
        const rect = el.getBoundingClientRect();
        el.dispatchEvent(new MouseEvent('mousemove', {
          clientX: rect.left + rect.width / 2,
          clientY: rect.top + rect.height / 2,
          bubbles: true,
        }));
        return el.style.transform.includes('perspective');
      });
      expect(hasTilt).toBe(true);
    });

    test('tilt clears on mouse leave', async ({ page }) => {
      await waitForPage(page, '/team.html');
      const card = page.locator('.team-member').first();
      const box = await card.boundingBox();
      await page.mouse.move(box.x + 10, box.y + 10);
      await page.mouse.move(box.x - 100, box.y - 100);
      const transform = await card.evaluate(el => el.style.transform);
      expect(transform).toBe('');
    });

    test('project-card gets tilt-card class', async ({ page }) => {
      await waitForPage(page, '/projects.html');
      await expect(page.locator('.project-card').first()).toHaveClass(/tilt-card/);
    });

    test('extra-card gets tilt-card class', async ({ page }) => {
      await waitForPage(page, '/extras.html');
      await expect(page.locator('.extra-card').first()).toHaveClass(/tilt-card/);
    });
  });

  test.describe('Text reveal', () => {
    test('subtitle split into char spans', async ({ page }) => {
      const chars = page.locator('.subtitle .reveal-char');
      const count = await chars.count();
      expect(count).toBeGreaterThan(10);
    });

    test('member bio chars visible on scroll', async ({ page }) => {
      await page.goto('/team.html');
      await page.waitForLoadState('networkidle');
      await page.locator('.loading-screen').waitFor({ state: 'hidden' });
      const bio = page.locator('.member-bio .reveal-char').first();
      await bio.scrollIntoViewIfNeeded();
      await expect(bio).toBeVisible();
    });
  });

  test.describe('Cursor trail', () => {
    test('particles appear on mouse move', async ({ page }) => {
      await page.mouse.move(100, 100);
      await page.waitForTimeout(200);
      await page.mouse.move(200, 200);
      await page.waitForTimeout(200);
      const count = await page.locator('.trail-particle').count();
      expect(count).toBeGreaterThan(0);
    });

    test('particles disappear after their duration', async ({ page }) => {
      await page.mouse.move(100, 100);
      await page.waitForTimeout(200);
      await page.mouse.move(200, 200);
      await page.waitForTimeout(2000);
      const count = await page.locator('.trail-particle').count();
      expect(count).toBe(0);
    });
  });

  test.describe('Snap scroll', () => {
    test('projects page has snap-scroll class', async ({ page }) => {
      await page.goto('/projects.html');
      await page.waitForLoadState('networkidle');
      const hasSnap = await page.evaluate(() => document.documentElement.classList.contains('snap-scroll'));
      expect(hasSnap).toBe(true);
    });

    test('snap indicators visible on projects page', async ({ page }) => {
      await page.goto('/projects.html');
      await page.waitForLoadState('networkidle');
      await expect(page.locator('.snap-indicators')).toBeVisible();
      const dots = page.locator('.snap-dot');
      expect(await dots.count()).toBeGreaterThanOrEqual(2);
    });

    test('snap section count on projects page', async ({ page }) => {
      await page.goto('/projects.html');
      await page.waitForLoadState('networkidle');
      const count = await page.evaluate(() => document.querySelectorAll('.snap-section').length);
      expect(count).toBeGreaterThanOrEqual(2);
    });

    test('single section page gets no snap', async ({ page }) => {
      const hasSnap = await page.evaluate(() => document.documentElement.classList.contains('snap-scroll'));
      expect(hasSnap).toBe(false);
    });
  });

  test.describe('Scroll progress', () => {
    test('progress bar exists in DOM', async ({ page }) => {
      await expect(page.locator('.scroll-progress')).toBeAttached();
    });
  });
});
