import { expect, test } from '@playwright/test';

test.describe('Fab site map', () => {
  test('lays out every node as a working link', async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/fab/');

    await expect(page.locator('[data-fab]')).toHaveClass(/fab--live/);
    const nodes = page.locator('[data-fab] [data-node]');
    await expect(nodes).toHaveCount(36);
    await expect(page.locator('[data-fab] [data-node].is-in')).toHaveCount(36, { timeout: 8000 });

    // every node sits inside the stage
    const stage = (await page.locator('[data-fab-stage]').boundingBox())!;
    for (const dot of await page.locator('.fab-dot, .fab-pill, .fab-core').all()) {
      const box = (await dot.boundingBox())!;
      expect(box.x).toBeGreaterThanOrEqual(stage.x);
      expect(box.x + box.width).toBeLessThanOrEqual(stage.x + stage.width);
      expect(box.y).toBeGreaterThanOrEqual(stage.y);
      expect(box.y + box.height).toBeLessThanOrEqual(stage.y + stage.height);
    }
    expect(errors).toEqual([]);
  });

  test('focusing a node traces it and a click opens the page', async ({ page }) => {
    await page.goto('/fab/');
    const garage = page.locator('[data-id="garage"]');
    await garage.focus();
    await expect(garage).toHaveClass(/is-active/);
    await expect(page.locator('[data-id="home"]')).toHaveClass(/is-lit/);
    await expect(page.locator('[data-id="story-dinajpur"]')).not.toHaveClass(/is-lit/);

    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/\/garage\/?$/);
  });

  test('motion can be switched off', async ({ page }) => {
    await page.goto('/fab/');
    const toggle = page.locator('[data-fab-motion]');
    await toggle.click();
    await expect(toggle).toHaveAttribute('aria-pressed', 'false');
    await expect(page.locator('[data-fab]')).toHaveClass(/fab--still/);
  });
});
