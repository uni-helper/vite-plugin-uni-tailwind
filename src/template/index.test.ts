import { describe, expect, it } from 'vitest';
import { transformTemplate } from '.';

describe('template', () => {
  it('replace []', () => {
    expect(transformTemplate('<view class="w-[0.5px]"></view>')).toBe(
      '<view class="w--0-d-5px-"></view>',
    );
  });

  it('replace [] and ()', () => {
    expect(transformTemplate('<view class="bg-[url()]"></view>')).toBe(
      '<view class="bg--url---"></view>',
    );
  });

  it('replace !, [] and .', () => {
    expect(transformTemplate('<view class="!w-[200.5px]"></view>')).toBe(
      '<view class="-i-w--200-d-5px-"></view>',
    );
  });

  it('replace /', () => {
    expect(transformTemplate('<view class="top-1/2"></view>')).toBe(
      '<view class="top-1-s-2"></view>',
    );
  });

  it("replace [], (), ' and /", () => {
    expect(transformTemplate('<view class="bg-[url(\'/img/grid.svg\')]"></view>')).toBe(
      '<view class="bg--url--q--s-img-s-grid-d-svg-q---"></view>',
    );
  });

  it('replace [] and .', () => {
    expect(transformTemplate('<view class="w-[200.5rpx]"></view>')).toBe(
      '<view class="w--200-d-5rpx-"></view>',
    );
  });

  it('replace :', () => {
    expect(transformTemplate('<view class="sm:mx-auto"></view>')).toBe(
      '<view class="sm_mx-auto"></view>',
    );
  });

  it('replace [] and #', () => {
    expect(transformTemplate('<view class="bg-[#fff]"></view>')).toBe(
      '<view class="bg---h-fff-"></view>',
    );
  });

  it('replace [], (), and ,', () => {
    expect(transformTemplate('<view class="bg-[rgba(255,255,255,1)]"></view>')).toBe(
      '<view class="bg--rgba-255-c-255-c-255-c-1--"></view>',
    );
  });

  it('replace [] and %', () => {
    expect(transformTemplate('<view class="w-[10%]"></view>')).toBe(
      '<view class="w--10-p--"></view>',
    );
  });

  it('replace complex class', () => {
    expect(
      transformTemplate(`<view class="{{['w-[10%]','bg-[#fff]',virtualHostClass]}}"></view>`),
    ).toBe(`<view class="{{[\\"w--10-p--\\",\\"bg---h-fff-\\",virtualHostClass]}}"></view>`);
  });

  it('support *-classname', () => {
    expect(transformTemplate('<view class="top-1/2" classname="top-1/2"></view>')).toBe(
      '<view class="top-1-s-2" classname="top-1-s-2"></view>',
    );
    expect(transformTemplate('<view class="top-1/2" label-classname="top-1/2"></view>')).toBe(
      '<view class="top-1-s-2" label-classname="top-1-s-2"></view>',
    );
  });

  it('support *-class-name', () => {
    expect(transformTemplate('<view class="top-1/2" class-name="top-1/2"></view>')).toBe(
      '<view class="top-1-s-2" class-name="top-1-s-2"></view>',
    );
    expect(transformTemplate('<view class="top-1/2" label-class-name="top-1/2"></view>')).toBe(
      '<view class="top-1-s-2" label-class-name="top-1-s-2"></view>',
    );
  });
});
