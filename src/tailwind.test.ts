import { describe, it, expect } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';

describe('Tailwind Configuration', () => {
  it('has a valid tailwind.config.js file', () => {
    const configPath = resolve(__dirname, '../tailwind.config.js');
    const fileExists = (() => {
      try {
        readFileSync(configPath, 'utf-8');
        return true;
      } catch (err) {
        return false;
      }
    })();
    
    expect(fileExists).toBe(true);
  });
  
  it('has proper Tailwind directives in app.css', () => {
    const cssPath = resolve(__dirname, './app.css');
    const cssContent = readFileSync(cssPath, 'utf-8');
    
    expect(cssContent).toContain('@tailwind base');
    expect(cssContent).toContain('@tailwind components');
    expect(cssContent).toContain('@tailwind utilities');
  });
});