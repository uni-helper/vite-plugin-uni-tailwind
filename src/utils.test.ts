import { describe, expect, it } from 'vitest';
import { getShouldApply } from './utils';

describe('utils::getShouldApply', () => {
  it('default', () => {
    expect(getShouldApply(['MP', 'QUICKAPP'], 'MP-WEIXIN')).toBe(true);
    expect(getShouldApply(['MP', 'QUICKAPP'], 'MP-ALIPAY')).toBe(true);
    expect(getShouldApply(['MP', 'QUICKAPP'], 'APP')).toBe(false);
    expect(getShouldApply(['MP', 'QUICKAPP'], 'APP-PLUS')).toBe(false);
    expect(getShouldApply(['MP', 'QUICKAPP'], 'APP-PLUS-NVUE')).toBe(false);
    expect(getShouldApply(['MP', 'QUICKAPP'], 'QUICKAPP-WEBVIEW')).toBe(true);
    expect(getShouldApply(['MP', 'QUICKAPP'], 'QUICKAPP-WEBVIEW-UNION')).toBe(true);
    expect(getShouldApply(['MP', 'QUICKAPP'], 'QUICKAPP-WEBVIEW-HUAWEI')).toBe(true);
  });

  it('MP', () => {
    expect(getShouldApply(['MP'], 'MP-WEIXIN')).toBe(true);
    expect(getShouldApply(['MP'], 'MP-ALIPAY')).toBe(true);
    expect(getShouldApply(['MP', 'MP-WEIXIN'], 'MP-ALIPAY')).toBe(true);
    expect(getShouldApply(['MP-ALIPAY', 'MP-WEIXIN'], 'MP-ALIPAY')).toBe(true);
  });

  it('APP', () => {
    expect(getShouldApply(['APP'], 'APP')).toBe(true);
    expect(getShouldApply(['APP'], 'APP-PLUS')).toBe(true);
    expect(getShouldApply(['APP'], 'APP-PLUS-NVUE')).toBe(true);
    expect(getShouldApply(['APP'], 'QUICKAPP')).toBe(false);
    expect(getShouldApply(['APP'], 'QUICKAPP-WEBVIEW')).toBe(false);
    expect(getShouldApply(['APP'], 'QUICKAPP-WEBVIEW-UNION')).toBe(false);
    expect(getShouldApply(['APP'], 'QUICKAPP-WEBVIEW-HUAWEI')).toBe(false);
    expect(getShouldApply(['APP-PLUS'], 'APP')).toBe(true);
    expect(getShouldApply(['APP-PLUS'], 'APP-PLUS')).toBe(true);
    expect(getShouldApply(['APP-PLUS'], 'APP-PLUS-NVUE')).toBe(true);
    expect(getShouldApply(['APP-PLUS'], 'QUICKAPP')).toBe(false);
    expect(getShouldApply(['APP-PLUS'], 'QUICKAPP-WEBVIEW')).toBe(false);
    expect(getShouldApply(['APP-PLUS'], 'QUICKAPP-WEBVIEW-UNION')).toBe(false);
    expect(getShouldApply(['APP-PLUS'], 'QUICKAPP-WEBVIEW-HUAWEI')).toBe(false);
    expect(getShouldApply(['APP-PLUS-NVUE'], 'APP')).toBe(true);
    expect(getShouldApply(['APP-PLUS-NVUE'], 'APP-PLUS')).toBe(true);
    expect(getShouldApply(['APP-PLUS-NVUE'], 'APP-PLUS-NVUE')).toBe(true);
    expect(getShouldApply(['APP-PLUS-NVUE'], 'QUICKAPP')).toBe(false);
    expect(getShouldApply(['APP-PLUS-NVUE'], 'QUICKAPP-WEBVIEW')).toBe(false);
    expect(getShouldApply(['APP-PLUS-NVUE'], 'QUICKAPP-WEBVIEW-UNION')).toBe(false);
    expect(getShouldApply(['APP-PLUS-NVUE'], 'QUICKAPP-WEBVIEW-HUAWEI')).toBe(false);
  });

  it('QUICKAPP', () => {
    expect(getShouldApply(['QUICKAPP'], 'QUICKAPP-WEBVIEW')).toBe(true);
    expect(getShouldApply(['QUICKAPP'], 'QUICKAPP-WEBVIEW-UNION')).toBe(true);
    expect(getShouldApply(['QUICKAPP'], 'QUICKAPP-WEBVIEW-HUAWEI')).toBe(true);
    expect(getShouldApply(['QUICKAPP'], 'APP')).toBe(false);
    expect(getShouldApply(['QUICKAPP'], 'APP-PLUS')).toBe(false);
    expect(getShouldApply(['QUICKAPP'], 'APP-PLUS-NVUE')).toBe(false);
  });
});
