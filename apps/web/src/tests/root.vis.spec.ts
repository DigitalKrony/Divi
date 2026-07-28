import { test, expect } from '@playwright/test';

test('Web app matches visual baseline', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  await page.waitForLoadState('networkidle');
  await expect(page).toHaveScreenshot('web-app.png');
});