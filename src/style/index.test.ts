import { describe, expect, it } from 'vitest';
import { transformStyle } from '.';

describe('style', () => {
  it('replace []', () => {
    expect(transformStyle('.w-\\[10px\\] {}')).toBe('.w--10px- {}');
  });

  it('replace [] and ()', () => {
    expect(transformStyle('bg-\\[url\\(\\)\\] {}')).toBe('bg--url--- {}');
  });

  it('replace !, [] and .', () => {
    expect(transformStyle('.\\!w-\\[200\\.5px\\] {}')).toBe('.-i-w--200-d-5px- {}');
  });

  it('replace /', () => {
    expect(transformStyle('.top-1\\/2 {}')).toBe('.top-1-s-2 {}');
  });

  it("replace [], (), ' and /", () => {
    expect(transformStyle(".bg-\\[url\\(\\'\\/img\\/grid\\.svg\\'\\)\\] {}")).toBe(
      '.bg--url--q--s-img-s-grid-d-svg-q--- {}',
    );
  });

  it('replace [] and .', () => {
    expect(transformStyle('.w-\\[200\\.5rpx\\] {}')).toBe('.w--200-d-5rpx- {}');
  });

  it('replace :', () => {
    expect(transformStyle('.sm\\:mx-auto {}')).toBe('.sm_mx-auto {}');
  });

  it('replace [] and #', () => {
    expect(transformStyle('.bg-\\[\\#fff\\] {}')).toBe('.bg---h-fff- {}');
  });

  it('replace [], (), and ,', () => {
    expect(transformStyle('.bg-\\[rgba\\(255\\,255\\,255\\,1\\)\\] {}')).toBe(
      '.bg--rgba-255-c-255-c-255-c-1-- {}',
    );
  });

  it('replace [] and %', () => {
    expect(transformStyle('.w-\\[10\\%\\] {}')).toBe('.w--10-p-- {}');
  });

  it('replace space-between', () => {
    expect(transformStyle('.space-x-0 > :not([hidden]) ~ :not([hidden]) {}')).toBe(
      '.space-x-0>view:not([hidden]):not(:first-child),.space-x-0>button:not([hidden]):not(:first-child),.space-x-0>text:not([hidden]):not(:first-child),.space-x-0>image:not([hidden]):not(:first-child) {}',
    );
    expect(transformStyle('.space-x-0>:not([hidden])~:not([hidden]) {}')).toBe(
      '.space-x-0>view:not([hidden]):not(:first-child),.space-x-0>button:not([hidden]):not(:first-child),.space-x-0>text:not([hidden]):not(:first-child),.space-x-0>image:not([hidden]):not(:first-child) {}',
    );
    expect(transformStyle('.space-x-reverse > :not([hidden]) ~ :not([hidden]) {}')).toBe(
      '.space-x-reverse>view:not([hidden]):not(:first-child),.space-x-reverse>button:not([hidden]):not(:first-child),.space-x-reverse>text:not([hidden]):not(:first-child),.space-x-reverse>image:not([hidden]):not(:first-child) {}',
    );
    expect(transformStyle('.space-x-reverse>:not([hidden])~:not([hidden]) {}')).toBe(
      '.space-x-reverse>view:not([hidden]):not(:first-child),.space-x-reverse>button:not([hidden]):not(:first-child),.space-x-reverse>text:not([hidden]):not(:first-child),.space-x-reverse>image:not([hidden]):not(:first-child) {}',
    );
  });

  it('replace divide-width', () => {
    expect(transformStyle('.divide-x > :not([hidden]) ~ :not([hidden]) {}')).toBe(
      '.divide-x>view:not([hidden]):not(:first-child),.divide-x>button:not([hidden]):not(:first-child),.divide-x>text:not([hidden]):not(:first-child),.divide-x>image:not([hidden]):not(:first-child) {}',
    );
    expect(transformStyle('.divide-x>:not([hidden])~:not([hidden]) {}')).toBe(
      '.divide-x>view:not([hidden]):not(:first-child),.divide-x>button:not([hidden]):not(:first-child),.divide-x>text:not([hidden]):not(:first-child),.divide-x>image:not([hidden]):not(:first-child) {}',
    );
    expect(transformStyle('.divide-x-reverse > :not([hidden]) ~ :not([hidden]) {}')).toBe(
      '.divide-x-reverse>view:not([hidden]):not(:first-child),.divide-x-reverse>button:not([hidden]):not(:first-child),.divide-x-reverse>text:not([hidden]):not(:first-child),.divide-x-reverse>image:not([hidden]):not(:first-child) {}',
    );
    expect(transformStyle('.divide-x-reverse>:not([hidden])~:not([hidden]) {}')).toBe(
      '.divide-x-reverse>view:not([hidden]):not(:first-child),.divide-x-reverse>button:not([hidden]):not(:first-child),.divide-x-reverse>text:not([hidden]):not(:first-child),.divide-x-reverse>image:not([hidden]):not(:first-child) {}',
    );
  });

  it('replace html', () => {
    expect(transformStyle('html {}')).toBe('page {}');
  });

  it('replace body', () => {
    expect(transformStyle('body {}')).toBe('page {}');
  });

  it('replace img', () => {
    expect(transformStyle('img,svg,video,canvas,audio,iframe,embed,object {}')).toBe(
      'image,svg,video,canvas,audio,iframe,embed,object {}',
    );
    expect(
      transformStyle(
        'uni-image>img{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;display:block;position:absolute;top:0;left:0;width:100%;height:100%;opacity:0}',
      ),
    ).toBe(
      'uni-image>img{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;display:block;position:absolute;top:0;left:0;width:100%;height:100%;opacity:0}',
    );
    expect(transformStyle('.ql-container img{display:inline-block;max-width:100%}')).toBe(
      '.ql-container img{display:inline-block;max-width:100%}',
    );
  });

  it('replace span', () => {
    expect(transformStyle('span {}')).toBe('text {}');
  });

  it('replace a', () => {
    expect(transformStyle('a {}')).toBe('functional-page-navigator,navigator {}');
    expect(transformStyle('textarea {}')).toBe('textarea {}');
  });

  it('replace *', () => {
    expect(transformStyle('*, ::before, ::after {}')).toBe(
      'page,cover-image,cover-view,match-media,movable-area,movable-view,scroll-view,swiper,swiper-item,view,icon,progress,rich-text,text,button,checkbox,checkbox-group,editor,form,input,label,picker,picker-view,picker-view-column,radio,radio-group,slider,switch,textarea,functional-page-navigator,navigator,audio,camera,image,live-player,live-pusher,video,voip-room,map,canvas,ad,ad-custom,official-account,open-data,web-view,navigation-bar,page-meta, ::before, ::after {}',
    );
  });
});
