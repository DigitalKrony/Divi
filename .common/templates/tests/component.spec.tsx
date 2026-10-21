/*!
 * Copyright (C) Design:Funedikly. All rights reserved.
 */

/** @jsxRuntime automatic */

import { test, expect } from '@playwright/test';

test.describe('%name.pascal% Component Default Visual Test', () => {
  test('should match visual snapshot baseline', async ({ page }) => {
    await page.goto('/iframe.html?id=components-%name.pascal%--basic');
    await page.waitForSelector('#storybook-root');
    
    await expect(page.locator('#storybook-root')).toHaveScreenshot('%name.pascal%_basic.png');
  });
});
