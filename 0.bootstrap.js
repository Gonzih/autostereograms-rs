(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[0],{

/***/ "../pkg/autostereograms_rs.js":
/*!************************************!*\
  !*** ../pkg/autostereograms_rs.js ***!
  \************************************/
/*! exports provided: debug, render_canvas, render_img, __wbindgen_object_drop_ref, __wbindgen_string_new, __wbg_new_59cb74e423758ede, __wbg_stack_558ba5917b466edd, __wbg_error_4bb6c2a97407129a, __widl_f_log_1_, __widl_instanceof_CanvasRenderingContext2D, __widl_f_draw_image_with_html_image_element_CanvasRenderingContext2D, __widl_f_get_image_data_CanvasRenderingContext2D, __widl_f_put_image_data_CanvasRenderingContext2D, __widl_f_create_element_Document, __widl_instanceof_HTMLCanvasElement, __widl_f_get_context_HTMLCanvasElement, __widl_f_set_width_HTMLCanvasElement, __widl_f_set_height_HTMLCanvasElement, __widl_f_new_with_u8_clamped_array_and_sh_ImageData, __widl_f_data_ImageData, __widl_f_now_Performance, __widl_instanceof_Window, __widl_f_document_Window, __widl_f_performance_Window, __wbg_newnoargs_c4b2cbbd30e2d057, __wbg_call_12b949cfc461d154, __wbg_globalThis_22e06d4bea0084e3, __wbg_self_00b0599bca667294, __wbg_window_aa795c5aad79b8ac, __wbg_global_cc239dc2303f417c, __wbindgen_is_undefined, __wbindgen_object_clone_ref, __wbindgen_debug_string, __wbindgen_throw */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(global) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"debug\", function() { return debug; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render_canvas\", function() { return render_canvas; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render_img\", function() { return render_img; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_drop_ref\", function() { return __wbindgen_object_drop_ref; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_string_new\", function() { return __wbindgen_string_new; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_new_59cb74e423758ede\", function() { return __wbg_new_59cb74e423758ede; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_stack_558ba5917b466edd\", function() { return __wbg_stack_558ba5917b466edd; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_error_4bb6c2a97407129a\", function() { return __wbg_error_4bb6c2a97407129a; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_log_1_\", function() { return __widl_f_log_1_; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_instanceof_CanvasRenderingContext2D\", function() { return __widl_instanceof_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_draw_image_with_html_image_element_CanvasRenderingContext2D\", function() { return __widl_f_draw_image_with_html_image_element_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_get_image_data_CanvasRenderingContext2D\", function() { return __widl_f_get_image_data_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_put_image_data_CanvasRenderingContext2D\", function() { return __widl_f_put_image_data_CanvasRenderingContext2D; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_create_element_Document\", function() { return __widl_f_create_element_Document; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_instanceof_HTMLCanvasElement\", function() { return __widl_instanceof_HTMLCanvasElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_get_context_HTMLCanvasElement\", function() { return __widl_f_get_context_HTMLCanvasElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_set_width_HTMLCanvasElement\", function() { return __widl_f_set_width_HTMLCanvasElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_set_height_HTMLCanvasElement\", function() { return __widl_f_set_height_HTMLCanvasElement; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_new_with_u8_clamped_array_and_sh_ImageData\", function() { return __widl_f_new_with_u8_clamped_array_and_sh_ImageData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_data_ImageData\", function() { return __widl_f_data_ImageData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_now_Performance\", function() { return __widl_f_now_Performance; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_instanceof_Window\", function() { return __widl_instanceof_Window; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_document_Window\", function() { return __widl_f_document_Window; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__widl_f_performance_Window\", function() { return __widl_f_performance_Window; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_newnoargs_c4b2cbbd30e2d057\", function() { return __wbg_newnoargs_c4b2cbbd30e2d057; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_call_12b949cfc461d154\", function() { return __wbg_call_12b949cfc461d154; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_globalThis_22e06d4bea0084e3\", function() { return __wbg_globalThis_22e06d4bea0084e3; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_self_00b0599bca667294\", function() { return __wbg_self_00b0599bca667294; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_window_aa795c5aad79b8ac\", function() { return __wbg_window_aa795c5aad79b8ac; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbg_global_cc239dc2303f417c\", function() { return __wbg_global_cc239dc2303f417c; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_is_undefined\", function() { return __wbindgen_is_undefined; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_object_clone_ref\", function() { return __wbindgen_object_clone_ref; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_debug_string\", function() { return __wbindgen_debug_string; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"__wbindgen_throw\", function() { return __wbindgen_throw; });\n/* harmony import */ var _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./autostereograms_rs_bg.wasm */ \"../pkg/autostereograms_rs_bg.wasm\");\n\n\nconst heap = new Array(32);\n\nheap.fill(undefined);\n\nheap.push(undefined, null, true, false);\n\nfunction getObject(idx) { return heap[idx]; }\n\nlet heap_next = heap.length;\n\nfunction dropObject(idx) {\n    if (idx < 36) return;\n    heap[idx] = heap_next;\n    heap_next = idx;\n}\n\nfunction takeObject(idx) {\n    const ret = getObject(idx);\n    dropObject(idx);\n    return ret;\n}\n\nlet cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });\n\ncachedTextDecoder.decode();\n\nlet cachegetUint8Memory0 = null;\nfunction getUint8Memory0() {\n    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8Memory0 = new Uint8Array(_autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8Memory0;\n}\n\nfunction getStringFromWasm0(ptr, len) {\n    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));\n}\n\nfunction addHeapObject(obj) {\n    if (heap_next === heap.length) heap.push(heap.length + 1);\n    const idx = heap_next;\n    heap_next = heap[idx];\n\n    heap[idx] = obj;\n    return idx;\n}\n\nfunction debugString(val) {\n    // primitive types\n    const type = typeof val;\n    if (type == 'number' || type == 'boolean' || val == null) {\n        return  `${val}`;\n    }\n    if (type == 'string') {\n        return `\"${val}\"`;\n    }\n    if (type == 'symbol') {\n        const description = val.description;\n        if (description == null) {\n            return 'Symbol';\n        } else {\n            return `Symbol(${description})`;\n        }\n    }\n    if (type == 'function') {\n        const name = val.name;\n        if (typeof name == 'string' && name.length > 0) {\n            return `Function(${name})`;\n        } else {\n            return 'Function';\n        }\n    }\n    // objects\n    if (Array.isArray(val)) {\n        const length = val.length;\n        let debug = '[';\n        if (length > 0) {\n            debug += debugString(val[0]);\n        }\n        for(let i = 1; i < length; i++) {\n            debug += ', ' + debugString(val[i]);\n        }\n        debug += ']';\n        return debug;\n    }\n    // Test for built-in\n    const builtInMatches = /\\[object ([^\\]]+)\\]/.exec(toString.call(val));\n    let className;\n    if (builtInMatches.length > 1) {\n        className = builtInMatches[1];\n    } else {\n        // Failed to match the standard '[object ClassName]'\n        return toString.call(val);\n    }\n    if (className == 'Object') {\n        // we're a user defined class or Object\n        // JSON.stringify avoids problems with cycles, and is generally much\n        // easier than looping through ownProperties of `val`.\n        try {\n            return 'Object(' + JSON.stringify(val) + ')';\n        } catch (_) {\n            return 'Object';\n        }\n    }\n    // errors\n    if (val instanceof Error) {\n        return `${val.name}: ${val.message}\\n${val.stack}`;\n    }\n    // TODO we could test for more things here, like `Set`s and `Map`s.\n    return className;\n}\n\nlet WASM_VECTOR_LEN = 0;\n\nlet cachedTextEncoder = new TextEncoder('utf-8');\n\nconst encodeString = (typeof cachedTextEncoder.encodeInto === 'function'\n    ? function (arg, view) {\n    return cachedTextEncoder.encodeInto(arg, view);\n}\n    : function (arg, view) {\n    const buf = cachedTextEncoder.encode(arg);\n    view.set(buf);\n    return {\n        read: arg.length,\n        written: buf.length\n    };\n});\n\nfunction passStringToWasm0(arg, malloc, realloc) {\n\n    if (realloc === undefined) {\n        const buf = cachedTextEncoder.encode(arg);\n        const ptr = malloc(buf.length);\n        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);\n        WASM_VECTOR_LEN = buf.length;\n        return ptr;\n    }\n\n    let len = arg.length;\n    let ptr = malloc(len);\n\n    const mem = getUint8Memory0();\n\n    let offset = 0;\n\n    for (; offset < len; offset++) {\n        const code = arg.charCodeAt(offset);\n        if (code > 0x7F) break;\n        mem[ptr + offset] = code;\n    }\n\n    if (offset !== len) {\n        if (offset !== 0) {\n            arg = arg.slice(offset);\n        }\n        ptr = realloc(ptr, len, len = offset + arg.length * 3);\n        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);\n        const ret = encodeString(arg, view);\n\n        offset += ret.written;\n    }\n\n    WASM_VECTOR_LEN = offset;\n    return ptr;\n}\n\nlet cachegetInt32Memory0 = null;\nfunction getInt32Memory0() {\n    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetInt32Memory0 = new Int32Array(_autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetInt32Memory0;\n}\n/**\n*/\nfunction debug() {\n    _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"debug\"]();\n}\n\nlet stack_pointer = 32;\n\nfunction addBorrowedObject(obj) {\n    if (stack_pointer == 1) throw new Error('out of js stack');\n    heap[--stack_pointer] = obj;\n    return stack_pointer;\n}\n/**\n* @param {any} canvas\n* @param {any} ctx\n* @param {number} w\n* @param {number} h\n* @param {boolean} inverted\n* @param {number} n_colors\n* @param {string} seed\n*/\nfunction render_canvas(canvas, ctx, w, h, inverted, n_colors, seed) {\n    try {\n        var ptr0 = passStringToWasm0(seed, _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"], _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"]);\n        var len0 = WASM_VECTOR_LEN;\n        _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"render_canvas\"](addBorrowedObject(canvas), addBorrowedObject(ctx), w, h, inverted, n_colors, ptr0, len0);\n    } finally {\n        heap[stack_pointer++] = undefined;\n        heap[stack_pointer++] = undefined;\n    }\n}\n\n/**\n* @param {any} img\n* @param {any} ctx\n* @param {number} w\n* @param {number} h\n* @param {number} margin\n* @param {boolean} inverted\n* @param {number} n_colors\n* @param {string} seed\n*/\nfunction render_img(img, ctx, w, h, margin, inverted, n_colors, seed) {\n    try {\n        var ptr0 = passStringToWasm0(seed, _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"], _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"]);\n        var len0 = WASM_VECTOR_LEN;\n        _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"render_img\"](addBorrowedObject(img), addBorrowedObject(ctx), w, h, margin, inverted, n_colors, ptr0, len0);\n    } finally {\n        heap[stack_pointer++] = undefined;\n        heap[stack_pointer++] = undefined;\n    }\n}\n\nfunction handleError(e) {\n    _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_exn_store\"](addHeapObject(e));\n}\n\nfunction isLikeNone(x) {\n    return x === undefined || x === null;\n}\n\nlet cachegetUint8ClampedMemory0 = null;\nfunction getUint8ClampedMemory0() {\n    if (cachegetUint8ClampedMemory0 === null || cachegetUint8ClampedMemory0.buffer !== _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer) {\n        cachegetUint8ClampedMemory0 = new Uint8ClampedArray(_autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"memory\"].buffer);\n    }\n    return cachegetUint8ClampedMemory0;\n}\n\nfunction getClampedArrayU8FromWasm0(ptr, len) {\n    return getUint8ClampedMemory0().subarray(ptr / 1, ptr / 1 + len);\n}\n\nfunction passArray8ToWasm0(arg, malloc) {\n    const ptr = malloc(arg.length * 1);\n    getUint8Memory0().set(arg, ptr / 1);\n    WASM_VECTOR_LEN = arg.length;\n    return ptr;\n}\n\nconst __wbindgen_object_drop_ref = function(arg0) {\n    takeObject(arg0);\n};\n\nconst __wbindgen_string_new = function(arg0, arg1) {\n    var ret = getStringFromWasm0(arg0, arg1);\n    return addHeapObject(ret);\n};\n\nconst __wbg_new_59cb74e423758ede = function() {\n    var ret = new Error();\n    return addHeapObject(ret);\n};\n\nconst __wbg_stack_558ba5917b466edd = function(arg0, arg1) {\n    var ret = getObject(arg1).stack;\n    var ptr0 = passStringToWasm0(ret, _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"], _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"]);\n    var len0 = WASM_VECTOR_LEN;\n    getInt32Memory0()[arg0 / 4 + 1] = len0;\n    getInt32Memory0()[arg0 / 4 + 0] = ptr0;\n};\n\nconst __wbg_error_4bb6c2a97407129a = function(arg0, arg1) {\n    try {\n        console.error(getStringFromWasm0(arg0, arg1));\n    } finally {\n        _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_free\"](arg0, arg1);\n    }\n};\n\nconst __widl_f_log_1_ = function(arg0) {\n    console.log(getObject(arg0));\n};\n\nconst __widl_instanceof_CanvasRenderingContext2D = function(arg0) {\n    var ret = getObject(arg0) instanceof CanvasRenderingContext2D;\n    return ret;\n};\n\nconst __widl_f_draw_image_with_html_image_element_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3) {\n    try {\n        getObject(arg0).drawImage(getObject(arg1), arg2, arg3);\n    } catch (e) {\n        handleError(e)\n    }\n};\n\nconst __widl_f_get_image_data_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3, arg4) {\n    try {\n        var ret = getObject(arg0).getImageData(arg1, arg2, arg3, arg4);\n        return addHeapObject(ret);\n    } catch (e) {\n        handleError(e)\n    }\n};\n\nconst __widl_f_put_image_data_CanvasRenderingContext2D = function(arg0, arg1, arg2, arg3) {\n    try {\n        getObject(arg0).putImageData(getObject(arg1), arg2, arg3);\n    } catch (e) {\n        handleError(e)\n    }\n};\n\nconst __widl_f_create_element_Document = function(arg0, arg1, arg2) {\n    try {\n        var ret = getObject(arg0).createElement(getStringFromWasm0(arg1, arg2));\n        return addHeapObject(ret);\n    } catch (e) {\n        handleError(e)\n    }\n};\n\nconst __widl_instanceof_HTMLCanvasElement = function(arg0) {\n    var ret = getObject(arg0) instanceof HTMLCanvasElement;\n    return ret;\n};\n\nconst __widl_f_get_context_HTMLCanvasElement = function(arg0, arg1, arg2) {\n    try {\n        var ret = getObject(arg0).getContext(getStringFromWasm0(arg1, arg2));\n        return isLikeNone(ret) ? 0 : addHeapObject(ret);\n    } catch (e) {\n        handleError(e)\n    }\n};\n\nconst __widl_f_set_width_HTMLCanvasElement = function(arg0, arg1) {\n    getObject(arg0).width = arg1 >>> 0;\n};\n\nconst __widl_f_set_height_HTMLCanvasElement = function(arg0, arg1) {\n    getObject(arg0).height = arg1 >>> 0;\n};\n\nconst __widl_f_new_with_u8_clamped_array_and_sh_ImageData = function(arg0, arg1, arg2, arg3) {\n    try {\n        var ret = new ImageData(getClampedArrayU8FromWasm0(arg0, arg1), arg2 >>> 0, arg3 >>> 0);\n        return addHeapObject(ret);\n    } catch (e) {\n        handleError(e)\n    }\n};\n\nconst __widl_f_data_ImageData = function(arg0, arg1) {\n    var ret = getObject(arg1).data;\n    var ptr0 = passArray8ToWasm0(ret, _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"]);\n    var len0 = WASM_VECTOR_LEN;\n    getInt32Memory0()[arg0 / 4 + 1] = len0;\n    getInt32Memory0()[arg0 / 4 + 0] = ptr0;\n};\n\nconst __widl_f_now_Performance = function(arg0) {\n    var ret = getObject(arg0).now();\n    return ret;\n};\n\nconst __widl_instanceof_Window = function(arg0) {\n    var ret = getObject(arg0) instanceof Window;\n    return ret;\n};\n\nconst __widl_f_document_Window = function(arg0) {\n    var ret = getObject(arg0).document;\n    return isLikeNone(ret) ? 0 : addHeapObject(ret);\n};\n\nconst __widl_f_performance_Window = function(arg0) {\n    var ret = getObject(arg0).performance;\n    return isLikeNone(ret) ? 0 : addHeapObject(ret);\n};\n\nconst __wbg_newnoargs_c4b2cbbd30e2d057 = function(arg0, arg1) {\n    var ret = new Function(getStringFromWasm0(arg0, arg1));\n    return addHeapObject(ret);\n};\n\nconst __wbg_call_12b949cfc461d154 = function(arg0, arg1) {\n    try {\n        var ret = getObject(arg0).call(getObject(arg1));\n        return addHeapObject(ret);\n    } catch (e) {\n        handleError(e)\n    }\n};\n\nconst __wbg_globalThis_22e06d4bea0084e3 = function() {\n    try {\n        var ret = globalThis.globalThis;\n        return addHeapObject(ret);\n    } catch (e) {\n        handleError(e)\n    }\n};\n\nconst __wbg_self_00b0599bca667294 = function() {\n    try {\n        var ret = self.self;\n        return addHeapObject(ret);\n    } catch (e) {\n        handleError(e)\n    }\n};\n\nconst __wbg_window_aa795c5aad79b8ac = function() {\n    try {\n        var ret = window.window;\n        return addHeapObject(ret);\n    } catch (e) {\n        handleError(e)\n    }\n};\n\nconst __wbg_global_cc239dc2303f417c = function() {\n    try {\n        var ret = global.global;\n        return addHeapObject(ret);\n    } catch (e) {\n        handleError(e)\n    }\n};\n\nconst __wbindgen_is_undefined = function(arg0) {\n    var ret = getObject(arg0) === undefined;\n    return ret;\n};\n\nconst __wbindgen_object_clone_ref = function(arg0) {\n    var ret = getObject(arg0);\n    return addHeapObject(ret);\n};\n\nconst __wbindgen_debug_string = function(arg0, arg1) {\n    var ret = debugString(getObject(arg1));\n    var ptr0 = passStringToWasm0(ret, _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_malloc\"], _autostereograms_rs_bg_wasm__WEBPACK_IMPORTED_MODULE_0__[\"__wbindgen_realloc\"]);\n    var len0 = WASM_VECTOR_LEN;\n    getInt32Memory0()[arg0 / 4 + 1] = len0;\n    getInt32Memory0()[arg0 / 4 + 0] = ptr0;\n};\n\nconst __wbindgen_throw = function(arg0, arg1) {\n    throw new Error(getStringFromWasm0(arg0, arg1));\n};\n\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../www/node_modules/webpack/buildin/global.js */ \"./node_modules/webpack/buildin/global.js\")))\n\n//# sourceURL=webpack:///../pkg/autostereograms_rs.js?");

/***/ }),

/***/ "../pkg/autostereograms_rs_bg.wasm":
/*!*****************************************!*\
  !*** ../pkg/autostereograms_rs_bg.wasm ***!
  \*****************************************/
/*! exports provided: memory, debug, render_canvas, render_img, __wbindgen_malloc, __wbindgen_realloc, __wbindgen_free, __wbindgen_exn_store */
/***/ (function(module, exports, __webpack_require__) {

eval("\"use strict\";\n// Instantiate WebAssembly module\nvar wasmExports = __webpack_require__.w[module.i];\n__webpack_require__.r(exports);\n// export exports from WebAssembly module\nfor(var name in wasmExports) if(name != \"__webpack_init__\") exports[name] = wasmExports[name];\n// exec imports from WebAssembly module (for esm order)\n/* harmony import */ var m0 = __webpack_require__(/*! ./autostereograms_rs.js */ \"../pkg/autostereograms_rs.js\");\n\n\n// exec wasm module\nwasmExports[\"__webpack_init__\"]()\n\n//# sourceURL=webpack:///../pkg/autostereograms_rs_bg.wasm?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var autostereograms_rs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! autostereograms-rs */ \"../pkg/autostereograms_rs.js\");\n\n\nautostereograms_rs__WEBPACK_IMPORTED_MODULE_0__[\"debug\"]();\n\nfunction demo_one_render() {\n    let source_canvas = document.getElementById(\"source-one\");\n    let canvas = document.getElementById(\"autostereogram-one\");\n    let ctx = canvas.getContext(\"2d\");\n\n    let seed = \"33333333333333333333333\"\n\n    let margin = 0;\n    canvas.width = source_canvas.width + margin * 2;\n    canvas.height = source_canvas.height + margin * 2;\n\n    let w = canvas.width;\n    let h = canvas.height;\n\n    console.log(\"Canvas height is\", h, \"width is\", w);\n\n    autostereograms_rs__WEBPACK_IMPORTED_MODULE_0__[\"render_canvas\"](source_canvas, ctx, w, h, false, 3, seed);\n}\n\nfunction init_demo_one() {\n    render_circle();\n}\n\nfunction render_circle() {\n    let canvas = document.getElementById(\"source-one\");\n    let ctx = canvas.getContext(\"2d\");\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n\n    ctx.beginPath();\n    ctx.arc(canvas.width/2, canvas.height/2, 80, 0, 2 * Math.PI, false);\n    ctx.fillStyle = 'black';\n    ctx.fill();\n    ctx.lineWidth = 5;\n    ctx.strokeStyle = '#000';\n    ctx.stroke();\n\n    demo_one_render();\n}\n\nfunction render_square() {\n    let canvas = document.getElementById(\"source-one\");\n    let ctx = canvas.getContext(\"2d\");\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n\n    ctx.beginPath();\n    ctx.rect(canvas.width/2-80, canvas.height/2-80, 160, 160);\n    ctx.fillStyle = 'black';\n    ctx.fill();\n    ctx.lineWidth = 5;\n    ctx.strokeStyle = '#000';\n    ctx.stroke();\n\n    demo_one_render();\n}\n\nfunction render_triangle() {\n    let canvas = document.getElementById(\"source-one\");\n    let ctx = canvas.getContext(\"2d\");\n    ctx.clearRect(0, 0, canvas.width, canvas.height);\n\n    ctx.beginPath();\n    ctx.beginPath();\n    ctx.moveTo(100, 100);\n    ctx.lineTo(100, 300);\n    ctx.lineTo(300, 300);\n    ctx.closePath();\n    ctx.fillStyle = 'black';\n    ctx.fill();\n    ctx.lineWidth = 5;\n    ctx.strokeStyle = '#000';\n    ctx.stroke();\n\n    demo_one_render();\n}\n\nfunction getID(id) {\n    return document.getElementById(id)\n}\n\ninit_demo_one();\ngetID(\"demo-one-circle\").onclick = render_circle;\ngetID(\"demo-one-square\").onclick = render_square;\ngetID(\"demo-one-triangle\").onclick = render_triangle;\n\nfunction showorigin() {\n    getID(\"demo-one-img-wrapper\").style.display = \"block\";\n    getID(\"demo-one-target-wrapper\").style.display = \"none\";\n\n    getID(\"demo-one-show-origin\").style.display = \"none\";\n    getID(\"demo-one-show-canvas\").style.display = \"inline\";\n}\n\nfunction showcanvas() {\n    getID(\"demo-one-img-wrapper\").style.display = \"none\";\n    getID(\"demo-one-target-wrapper\").style.display = \"block\";\n\n    getID(\"demo-one-show-origin\").style.display = \"inline\";\n    getID(\"demo-one-show-canvas\").style.display = \"none\";\n}\n\ngetID(\"demo-one-show-origin\").onclick = showorigin;\ngetID(\"demo-one-show-canvas\").onclick = showcanvas;\nshowcanvas();\n\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var g;\n\n// This works in non-strict mode\ng = (function() {\n\treturn this;\n})();\n\ntry {\n\t// This works if eval is allowed (see CSP)\n\tg = g || new Function(\"return this\")();\n} catch (e) {\n\t// This works if the window reference is available\n\tif (typeof window === \"object\") g = window;\n}\n\n// g can still be undefined, but nothing to do about it...\n// We return undefined, instead of nothing here, so it's\n// easier to handle this case. if(!global) { ...}\n\nmodule.exports = g;\n\n\n//# sourceURL=webpack:///(webpack)/buildin/global.js?");

/***/ })

}]);