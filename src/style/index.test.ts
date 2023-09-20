import { describe, expect, it } from 'vitest';
import { defaultOptions } from '../options';
import { transformStyle } from './index';

describe('style', () => {
  it('postcss replace []', async () => {
    expect(await transformStyle('test.css', '.w-\\[10px\\]{width:10px}')).toBe(
      '.w--10px-{width:10px}',
    );
  });
  it('lightningcss replace []', async () => {
    expect(
      await transformStyle('test.css', '.w-\\[10px\\]{width:10px}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe('.w--10px-{width:10px}');
  });

  it('postcss replace !, [] and .', async () => {
    expect(await transformStyle('test.css', '.\\!w-\\[200\\.5px\\]{width:200.5px!important}')).toBe(
      '.-i-w--200-d-5px-{width:200.5px!important}',
    );
  });
  it('lightningcss replace !, [] and .', async () => {
    expect(
      await transformStyle('test.css', '.\\!w-\\[200\\.5px\\]{width:200.5px!important}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe('.-i-w--200-d-5px-{width:200.5px!important}');
  });

  it('postcss replace /', async () => {
    expect(await transformStyle('test.css', '.top-1\\/2{top:50%}')).toBe('.top-1-s-2{top:50%}');
  });
  it('lightningcss replace /', async () => {
    expect(
      await transformStyle('test.css', '.top-1\\/2{top:50%}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe('.top-1-s-2{top:50%}');
  });

  it("postcss replace [], (), ' and /", async () => {
    expect(
      await transformStyle(
        'test.css',
        ".bg-\\[url\\(\\'\\/img\\/grid\\.svg\\'\\)\\]{background-image:url(/img/grid.svg)}",
      ),
    ).toBe('.bg--url--q--s-img-s-grid-d-svg-q---{background-image:url(/img/grid.svg)}');
  });
  it("lightningcss replace [], (), ' and /", async () => {
    expect(
      await transformStyle(
        'test.css',
        ".bg-\\[url\\(\\'\\/img\\/grid\\.svg\\'\\)\\]{background-image:url(/img/grid.svg)}",
        {
          ...defaultOptions,
          styleHandler: 'lightningcss',
        },
      ),
    ).toBe('.bg--url--q--s-img-s-grid-d-svg-q---{background-image:url(/img/grid.svg)}');
  });

  it('postcss replace [] and .', async () => {
    expect(await transformStyle('test.css', '.w-\\[200\\.5rpx\\]{width:200.5rpx}')).toBe(
      '.w--200-d-5rpx-{width:200.5rpx}',
    );
  });
  it('lightningcss replace [] and .', async () => {
    expect(
      await transformStyle('test.css', '.w-\\[200\\.5rpx\\]{width:200.5rpx}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe('.w--200-d-5rpx-{width:200.5rpx}');
  });

  it('postcss replace :', async () => {
    expect(await transformStyle('test.css', '.sm\\:m-auto{margin:auto}')).toBe(
      '.sm_m-auto{margin:auto}',
    );
  });
  it('lightningcss replace :', async () => {
    expect(
      await transformStyle('test.css', '.sm\\:m-auto{margin:auto}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe('.sm_m-auto{margin:auto}');
  });

  it('postcss replace [] and #', async () => {
    expect(
      await transformStyle(
        'test.css',
        '.bg-\\[\\#fff\\]{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}',
      ),
    ).toBe(
      '.bg---h-fff-{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}',
    );
  });
  it('lightningcss replace [] and #', async () => {
    expect(
      await transformStyle(
        'test.css',
        '.bg-\\[\\#fff\\]{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}',
        {
          ...defaultOptions,
          styleHandler: 'lightningcss',
        },
      ),
    ).toBe(
      '.bg---h-fff-{--tw-bg-opacity:1;background-color:rgb(255 255 255/var(--tw-bg-opacity))}',
    );
  });

  it('postcss replace [], (), and ,', async () => {
    expect(
      await transformStyle(
        'test.css',
        '.bg-\\[rgba\\(255\\,255\\,255\\,1\\)\\]{background-color:rgba(255,255,255,1)}',
      ),
    ).toBe('.bg--rgba-255-c-255-c-255-c-1--{background-color:rgba(255,255,255,1)}');
    expect(
      await transformStyle(
        'test.css',
        '.bg-\\[rgba\\(255\\2c 255\\2c 255\\2c 1\\)\\]{background-color:rgba(255,255,255,1)}',
      ),
    ).toBe('.bg--rgba-255-c-255-c-255-c-1--{background-color:rgba(255,255,255,1)}');
  });
  it('lightningcss replace [], (), and ,', async () => {
    expect(
      await transformStyle(
        'test.css',
        '.bg-\\[rgba\\(255\\,255\\,255\\,1\\)\\]{background-color:rgba(255,255,255,1)}',
        { ...defaultOptions, styleHandler: 'lightningcss' },
      ),
    ).toBe('.bg--rgba-255-c-255-c-255-c-1--{background-color:#fff}');
    expect(
      await transformStyle(
        'test.css',
        '.bg-\\[rgba\\(255\\2c 255\\2c 255\\2c 1\\)\\]{background-color:rgba(255,255,255,1)}',
        { ...defaultOptions, styleHandler: 'lightningcss' },
      ),
    ).toBe('.bg--rgba-255-c-255-c-255-c-1--{background-color:#fff}');
  });

  it('postcss replace [] and %', async () => {
    expect(await transformStyle('test.css', '.w-\\[10\\%\\]{width:10%}')).toBe(
      '.w--10-p--{width:10%}',
    );
  });
  it('lightningcss replace [] and %', async () => {
    expect(
      await transformStyle('test.css', '.w-\\[10\\%\\]{width:10%}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe('.w--10-p--{width:10%}');
  });

  // TODO
  it('postcss replace space-between', async () => {
    expect(
      await transformStyle('test.css', '.space-x-0 > :not([hidden]) ~ :not([hidden]) {}'),
    ).toBe(
      '.space-x-0>view:not([hidden]):not(:first-child),.space-x-0>button:not([hidden]):not(:first-child),.space-x-0>text:not([hidden]):not(:first-child),.space-x-0>image:not([hidden]):not(:first-child) {}',
    );
    expect(await transformStyle('test.css', '.space-x-0>:not([hidden])~:not([hidden]) {}')).toBe(
      '.space-x-0>view:not([hidden]):not(:first-child),.space-x-0>button:not([hidden]):not(:first-child),.space-x-0>text:not([hidden]):not(:first-child),.space-x-0>image:not([hidden]):not(:first-child) {}',
    );
    expect(
      await transformStyle('test.css', '.space-x-reverse > :not([hidden]) ~ :not([hidden]) {}'),
    ).toBe(
      '.space-x-reverse>view:not([hidden]):not(:first-child),.space-x-reverse>button:not([hidden]):not(:first-child),.space-x-reverse>text:not([hidden]):not(:first-child),.space-x-reverse>image:not([hidden]):not(:first-child) {}',
    );
    expect(
      await transformStyle('test.css', '.space-x-reverse>:not([hidden])~:not([hidden]) {}'),
    ).toBe(
      '.space-x-reverse>view:not([hidden]):not(:first-child),.space-x-reverse>button:not([hidden]):not(:first-child),.space-x-reverse>text:not([hidden]):not(:first-child),.space-x-reverse>image:not([hidden]):not(:first-child) {}',
    );
  });
  it('lightningcss replace space-between', async () => {
    expect(
      await transformStyle('test.css', '.space-x-0 > :not([hidden]) ~ :not([hidden]) {}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe(
      '.space-x-0>view:not([hidden]):not(:first-child),.space-x-0>button:not([hidden]):not(:first-child),.space-x-0>text:not([hidden]):not(:first-child),.space-x-0>image:not([hidden]):not(:first-child) {}',
    );
    expect(
      await transformStyle('test.css', '.space-x-0>:not([hidden])~:not([hidden]) {}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe(
      '.space-x-0>view:not([hidden]):not(:first-child),.space-x-0>button:not([hidden]):not(:first-child),.space-x-0>text:not([hidden]):not(:first-child),.space-x-0>image:not([hidden]):not(:first-child) {}',
    );
    expect(
      await transformStyle('test.css', '.space-x-reverse > :not([hidden]) ~ :not([hidden]) {}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe(
      '.space-x-reverse>view:not([hidden]):not(:first-child),.space-x-reverse>button:not([hidden]):not(:first-child),.space-x-reverse>text:not([hidden]):not(:first-child),.space-x-reverse>image:not([hidden]):not(:first-child) {}',
    );
    expect(
      await transformStyle('test.css', '.space-x-reverse>:not([hidden])~:not([hidden]) {}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe(
      '.space-x-reverse>view:not([hidden]):not(:first-child),.space-x-reverse>button:not([hidden]):not(:first-child),.space-x-reverse>text:not([hidden]):not(:first-child),.space-x-reverse>image:not([hidden]):not(:first-child) {}',
    );
  });

  // TODO
  it('postcss replace divide-width', async () => {
    expect(await transformStyle('test.css', '.divide-x > :not([hidden]) ~ :not([hidden]) {}')).toBe(
      '.divide-x>view:not([hidden]):not(:first-child),.divide-x>button:not([hidden]):not(:first-child),.divide-x>text:not([hidden]):not(:first-child),.divide-x>image:not([hidden]):not(:first-child) {}',
    );
    expect(await transformStyle('test.css', '.divide-x>:not([hidden])~:not([hidden]) {}')).toBe(
      '.divide-x>view:not([hidden]):not(:first-child),.divide-x>button:not([hidden]):not(:first-child),.divide-x>text:not([hidden]):not(:first-child),.divide-x>image:not([hidden]):not(:first-child) {}',
    );
    expect(
      await transformStyle('test.css', '.divide-x-reverse > :not([hidden]) ~ :not([hidden]) {}'),
    ).toBe(
      '.divide-x-reverse>view:not([hidden]):not(:first-child),.divide-x-reverse>button:not([hidden]):not(:first-child),.divide-x-reverse>text:not([hidden]):not(:first-child),.divide-x-reverse>image:not([hidden]):not(:first-child) {}',
    );
    expect(
      await transformStyle('test.css', '.divide-x-reverse>:not([hidden])~:not([hidden]) {}'),
    ).toBe(
      '.divide-x-reverse>view:not([hidden]):not(:first-child),.divide-x-reverse>button:not([hidden]):not(:first-child),.divide-x-reverse>text:not([hidden]):not(:first-child),.divide-x-reverse>image:not([hidden]):not(:first-child) {}',
    );
  });
  it('lightningcss replace divide-width', async () => {
    expect(
      await transformStyle('test.css', '.divide-x > :not([hidden]) ~ :not([hidden]) {}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe(
      '.divide-x>view:not([hidden]):not(:first-child),.divide-x>button:not([hidden]):not(:first-child),.divide-x>text:not([hidden]):not(:first-child),.divide-x>image:not([hidden]):not(:first-child) {}',
    );
    expect(
      await transformStyle('test.css', '.divide-x>:not([hidden])~:not([hidden]) {}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe(
      '.divide-x>view:not([hidden]):not(:first-child),.divide-x>button:not([hidden]):not(:first-child),.divide-x>text:not([hidden]):not(:first-child),.divide-x>image:not([hidden]):not(:first-child) {}',
    );
    expect(
      await transformStyle('test.css', '.divide-x-reverse > :not([hidden]) ~ :not([hidden]) {}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe(
      '.divide-x-reverse>view:not([hidden]):not(:first-child),.divide-x-reverse>button:not([hidden]):not(:first-child),.divide-x-reverse>text:not([hidden]):not(:first-child),.divide-x-reverse>image:not([hidden]):not(:first-child) {}',
    );
    expect(
      await transformStyle('test.css', '.divide-x-reverse>:not([hidden])~:not([hidden]) {}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe(
      '.divide-x-reverse>view:not([hidden]):not(:first-child),.divide-x-reverse>button:not([hidden]):not(:first-child),.divide-x-reverse>text:not([hidden]):not(:first-child),.divide-x-reverse>image:not([hidden]):not(:first-child) {}',
    );
  });

  it('postcss replace html', async () => {
    expect(await transformStyle('test.css', 'html{line-height:1.5}')).toBe('page{line-height:1.5}');
  });
  it('lightningcss replace html', async () => {
    expect(
      await transformStyle('test.css', 'html{line-height:1.5}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe('page{line-height:1.5}');
  });

  it('postcss replace body', async () => {
    expect(await transformStyle('test.css', 'body{margin:0}')).toBe('page{margin:0}');
  });
  it('lightningcss replace body', async () => {
    expect(
      await transformStyle('test.css', 'body{margin:0}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe('page{margin:0}');
  });

  it('postcss replace img', async () => {
    expect(
      await transformStyle(
        'test.css',
        'img,svg,video,canvas,audio,iframe,embed,object{display:block}',
      ),
    ).toBe('image,svg,video,canvas,audio,iframe,embed,object{display:block}');
    expect(
      await transformStyle(
        'test.css',
        'uni-image>img{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;display:block;position:absolute;top:0;left:0;width:100%;height:100%;opacity:0}',
      ),
    ).toBe(
      'uni-image>img{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;display:block;position:absolute;top:0;left:0;width:100%;height:100%;opacity:0}',
    );
    expect(
      await transformStyle('test.css', '.ql-container img{display:inline-block;max-width:100%}'),
    ).toBe('.ql-container img{display:inline-block;max-width:100%}');
  });
  it('lightningcss replace img', async () => {
    expect(
      await transformStyle(
        'test.css',
        'img,svg,video,canvas,audio,iframe,embed,object{display:block}',
        {
          ...defaultOptions,
          styleHandler: 'lightningcss',
        },
      ),
    ).toBe('image,svg,video,canvas,audio,iframe,embed,object{display:block}');
    // TODO
    expect(
      await transformStyle(
        'test.css',
        'uni-image>img{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;display:block;position:absolute;top:0;left:0;width:100%;height:100%;opacity:0}',
        { ...defaultOptions, styleHandler: 'lightningcss' },
      ),
    ).toBe(
      'uni-image>img{-webkit-touch-callout:none;-webkit-user-select:none;user-select:none;display:block;position:absolute;top:0;left:0;width:100%;height:100%;opacity:0}',
    );
    expect(
      await transformStyle('test.css', '.ql-container img{display:inline-block;max-width:100%}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe('.ql-container img{display:inline-block;max-width:100%}');
  });

  it('postcss replace span', async () => {
    expect(await transformStyle('test.css', 'span{color:inherit}')).toBe('text{color:inherit}');
  });
  it('lightningcss replace span', async () => {
    expect(
      await transformStyle('test.css', 'span{color:inherit}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe('text{color:inherit}');
  });

  it('postcss replace a', async () => {
    expect(await transformStyle('test.css', 'a{color:inherit}')).toBe(
      'functional-page-navigator,navigator{color:inherit}',
    );
    expect(await transformStyle('test.css', 'textarea{resize:vertical}')).toBe(
      'textarea{resize:vertical}',
    );
  });
  it('lightningcss replace a', async () => {
    expect(
      await transformStyle('test.css', 'a{color:inherit}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe('functional-page-navigator\\,navigator{color:inherit}');
    expect(
      await transformStyle('test.css', 'textarea{resize:vertical}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe('textarea{resize:vertical}');
  });

  it('postcss replace *', async () => {
    expect(await transformStyle('test.css', '*,::before,::after{--tw-blur:}')).toBe(
      'page,cover-image,cover-view,match-media,movable-area,movable-view,scroll-view,swiper,swiper-item,view,icon,progress,rich-text,text,button,checkbox,checkbox-group,editor,form,input,label,picker,picker-view,picker-view-column,radio,radio-group,slider,switch,textarea,functional-page-navigator,navigator,audio,camera,image,live-player,live-pusher,video,voip-room,map,canvas,ad,ad-custom,official-account,open-data,web-view,navigation-bar,page-meta,::before,::after{--tw-blur:}',
    );
  });
  it('lightningcss replace *', async () => {
    expect(
      await transformStyle('test.css', '*,::before,::after{--tw-blur:}', {
        ...defaultOptions,
        styleHandler: 'lightningcss',
      }),
    ).toBe(
      'page\\,cover-image\\,cover-view\\,match-media\\,movable-area\\,movable-view\\,scroll-view\\,swiper\\,swiper-item\\,view\\,icon\\,progress\\,rich-text\\,text\\,button\\,checkbox\\,checkbox-group\\,editor\\,form\\,input\\,label\\,picker\\,picker-view\\,picker-view-column\\,radio\\,radio-group\\,slider\\,switch\\,textarea\\,functional-page-navigator\\,navigator\\,audio\\,camera\\,image\\,live-player\\,live-pusher\\,video\\,voip-room\\,map\\,canvas\\,ad\\,ad-custom\\,official-account\\,open-data\\,web-view\\,navigation-bar\\,page-meta,:before,:after{--tw-blur:}',
    );
  });
});
