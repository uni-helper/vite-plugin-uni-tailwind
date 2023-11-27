import { describe, expect, it } from 'vitest';
import { babelTransformClass, babelGetVendorName, babelTransformScript } from '.';

describe('babel', () => {
  it('babelTransformClass', () => {
    expect(babelTransformClass('w-[0.5px]')).toBe('w--0-d-5px-');
    expect(babelTransformClass('bg-[url()]')).toBe('bg--url---');
    expect(babelTransformClass('!w-[200.5px]')).toBe('-i-w--200-d-5px-');
    expect(babelTransformClass('top-1/2')).toBe('top-1-s-2');
    expect(babelTransformClass("bg-[url('/img/grid.svg')]")).toBe(
      'bg--url--q--s-img-s-grid-d-svg-q---',
    );
    expect(babelTransformClass('w-[200.5rpx]')).toBe('w--200-d-5rpx-');
    expect(babelTransformClass('sm:mx-auto')).toBe('sm_mx-auto');
    expect(babelTransformClass('bg-[#fff]')).toBe('bg---h-fff-');
    expect(babelTransformClass('bg-[rgba(255,255,255,1)]')).toBe('bg--rgba-255-c-255-c-255-c-1--');
    expect(babelTransformClass('w-[10%]')).toBe('w--10-p--');
    expect(babelTransformClass(`{{['w-[10%]','bg-[#fff]',virtualHostClass]}}`)).toBe(
      `{{["w--10-p--","bg---h-fff-",virtualHostClass]}}`,
    );
  });

  it('babelGetVendorName', () => {
    expect(
      babelGetVendorName(`"use strict";
      var __defProp = Object.defineProperty;
      var __defProps = Object.defineProperties;
      var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
      var __getOwnPropSymbols = Object.getOwnPropertySymbols;
      var __hasOwnProp = Object.prototype.hasOwnProperty;
      var __propIsEnum = Object.prototype.propertyIsEnumerable;
      var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
      var __spreadValues = (a, b) => {
        for (var prop in b || (b = {}))
          if (__hasOwnProp.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
        if (__getOwnPropSymbols)
          for (var prop of __getOwnPropSymbols(b)) {
            if (__propIsEnum.call(b, prop))
              __defNormalProp(a, prop, b[prop]);
          }
        return a;
      };
      var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
      const common_vendor = require("../common/vendor.js");
      const __unplugin_components_0 = () => "../components/v-status-bar/v-status-bar.js";
      if (!Array) {
        const _easycom_v_status_bar2 = __unplugin_components_0;
        _easycom_v_status_bar2();
      }
      const _easycom_v_status_bar = () => "../components/v-status-bar/v-status-bar.js";
      if (!Math) {
        _easycom_v_status_bar();
      }
      const __default__ = common_vendor.defineComponent({
        name: "ComplexLayout",
        options: {
          virtualHost: true
        }
      });
      const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(__spreadProps(__spreadValues({}, __default__), {
        setup(__props) {
          return (_ctx, _cache) => {
            return {
              a: common_vendor.p({
                ["container-class"]: "bg-[#fff]",
                ["container-style"]: {
                  backgroundColor: "#fff"
                }
              })
            };
          };
        }
      }));
      const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/Users/wurui/Documents/millcloud/guangda/miniapp/src/layouts/complex.vue"]]);
      wx.createComponent(Component);
    `),
    ).toBe('common_vendor');
    expect(
      babelGetVendorName(`"use strict";var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,s=(t,r,o)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o;const c=require("../common/vendor.js");if(!Array){(()=>"../components/v-status-bar/v-status-bar.js")()}Math;const p=c.defineComponent({name:"ComplexLayout",options:{virtualHost:!0}}),i=c.defineComponent((f=((e,t)=>{for(var r in t||(t={}))n.call(t,r)&&s(e,r,t[r]);if(o)for(var r of o(t))a.call(t,r)&&s(e,r,t[r]);return e})({},p),t(f,r({setup:e=>(e,t)=>({a:c.p({"container-class":"bg-[#fff]","container-style":{backgroundColor:"#fff"}})})}))));var f;wx.createComponent(i);
      `),
    ).toBe('c');
  });

  it('babelTransformScript', () => {
    expect(
      babelTransformScript(
        `"use strict";
    var __defProp = Object.defineProperty;
    var __defProps = Object.defineProperties;
    var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
    var __getOwnPropSymbols = Object.getOwnPropertySymbols;
    var __hasOwnProp = Object.prototype.hasOwnProperty;
    var __propIsEnum = Object.prototype.propertyIsEnumerable;
    var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
    var __spreadValues = (a, b) => {
      for (var prop in b || (b = {}))
        if (__hasOwnProp.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      if (__getOwnPropSymbols)
        for (var prop of __getOwnPropSymbols(b)) {
          if (__propIsEnum.call(b, prop))
            __defNormalProp(a, prop, b[prop]);
        }
      return a;
    };
    var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
    const common_vendor = require("../common/vendor.js");
    const __unplugin_components_0 = () => "../components/v-status-bar/v-status-bar.js";
    if (!Array) {
      const _easycom_v_status_bar2 = __unplugin_components_0;
      _easycom_v_status_bar2();
    }
    const _easycom_v_status_bar = () => "../components/v-status-bar/v-status-bar.js";
    if (!Math) {
      _easycom_v_status_bar();
    }
    const __default__ = common_vendor.defineComponent({
      name: "ComplexLayout",
      options: {
        virtualHost: true
      }
    });
    const _sfc_main = /* @__PURE__ */ common_vendor.defineComponent(__spreadProps(__spreadValues({}, __default__), {
      setup(__props) {
        return (_ctx, _cache) => {
          return {
            a: common_vendor.p({
              ["container-class"]: "bg-[#fff]",
              ["test-class"]: {
                "bg-[#fff]": true,
              },
              ["container-style"]: {
                backgroundColor: "#fff"
              }
            })
          };
        };
      }
    }));
    const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "/miniprogram/src/layouts/complex.vue"]]);
    wx.createComponent(Component);
    `,
        { renderProps: 'p' },
      ),
    ).toMatchInlineSnapshot(`
      "\\"use strict\\";
      var __defProp=Object.defineProperty;
      var __defProps=Object.defineProperties;
      var __getOwnPropDescs=Object.getOwnPropertyDescriptors;
      var __getOwnPropSymbols=Object.getOwnPropertySymbols;
      var __hasOwnProp=Object.prototype.hasOwnProperty;
      var __propIsEnum=Object.prototype.propertyIsEnumerable;
      var __defNormalProp=(obj,key,value)=>key in obj?__defProp(obj,key,{enumerable:true,configurable:true,writable:true,value}):obj[key]=value;
      var __spreadValues=(a,b)=>{
      for(var prop in b||(b={}))
      if(__hasOwnProp.call(b,prop))
      __defNormalProp(a,prop,b[prop]);
      if(__getOwnPropSymbols)
      for(var prop of __getOwnPropSymbols(b)){
      if(__propIsEnum.call(b,prop))
      __defNormalProp(a,prop,b[prop]);
      }
      return a;
      };
      var __spreadProps=(a,b)=>__defProps(a,__getOwnPropDescs(b));
      const common_vendor=require(\\"../common/vendor.js\\");
      const __unplugin_components_0=()=>\\"../components/v-status-bar/v-status-bar.js\\";
      if(!Array){
      const _easycom_v_status_bar2=__unplugin_components_0;
      _easycom_v_status_bar2();
      }
      const _easycom_v_status_bar=()=>\\"../components/v-status-bar/v-status-bar.js\\";
      if(!Math){
      _easycom_v_status_bar();
      }
      const __default__=common_vendor.defineComponent({
      name:\\"ComplexLayout\\",
      options:{
      virtualHost:true
      }
      });
      const _sfc_main=/* @__PURE__ */common_vendor.defineComponent(__spreadProps(__spreadValues({},__default__),{
      setup(__props){
      return(_ctx,_cache)=>{
      return{
      a:common_vendor.p({
      [\\"container-class\\"]:\\"bg---h-fff-\\",
      [\\"test-class\\"]:{
      \\"bg---h-fff-\\":true
      },
      [\\"container-style\\"]:{
      backgroundColor:\\"#fff\\"
      }
      })
      };
      };
      }
      }));
      const Component=/* @__PURE__ */common_vendor._export_sfc(_sfc_main,[[\\"__file\\",\\"/miniprogram/src/layouts/complex.vue\\"]]);
      wx.createComponent(Component);"
    `);
    expect(
      babelTransformScript(
        `"use strict";var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,s=(t,r,o)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o;const c=require("../common/vendor.js");if(!Array){(()=>"../components/v-status-bar/v-status-bar.js")()}Math;const p=c.defineComponent({name:"ComplexLayout",options:{virtualHost:!0}}),i=c.defineComponent((f=((e,t)=>{for(var r in t||(t={}))n.call(t,r)&&s(e,r,t[r]);if(o)for(var r of o(t))a.call(t,r)&&s(e,r,t[r]);return e})({},p),t(f,r({setup:e=>(e,t)=>({a:c.p({"container-class":"bg-[#fff]","test-class":{"bg-[#fff]":true},"container-style":{backgroundColor:"#fff"}})})}))));var f;wx.createComponent(i);`,
        { renderProps: 'p' },
      ),
    ).toBe(
      `"use strict";var e=Object.defineProperty,t=Object.defineProperties,r=Object.getOwnPropertyDescriptors,o=Object.getOwnPropertySymbols,n=Object.prototype.hasOwnProperty,a=Object.prototype.propertyIsEnumerable,s=(t,r,o)=>r in t?e(t,r,{enumerable:!0,configurable:!0,writable:!0,value:o}):t[r]=o;const c=require("../common/vendor.js");if(!Array){(()=>"../components/v-status-bar/v-status-bar.js")();}Math;const p=c.defineComponent({name:"ComplexLayout",options:{virtualHost:!0}}),i=c.defineComponent((f=((e,t)=>{for(var r in t||(t={}))n.call(t,r)&&s(e,r,t[r]);if(o)for(var r of o(t))a.call(t,r)&&s(e,r,t[r]);return e;})({},p),t(f,r({setup:(e)=>(e,t)=>({a:c.p({"container-class":"bg---h-fff-","test-class":{"bg---h-fff-":true},"container-style":{backgroundColor:"#fff"}})})}))));var f;wx.createComponent(i);`,
    );
  });
});
