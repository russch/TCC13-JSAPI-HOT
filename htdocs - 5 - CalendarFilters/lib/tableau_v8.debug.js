//! tableau_v8.debug.js
//


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Stuff that is called immediately and needs to be called for every inclusion of this script file
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

window._tableauInternal = window._tableauInternal || {};

(function (t) {

  // jrockwood-2011-04-27:
  // Note that this function is called immediately, which is necessary since
  // we extract the server root from the last loaded <script> in the page.
  // If we run this immediately then we know that the last loaded <script>
  // in the page is this one since the browser guarantees execution order
  // of <script> tags based on when they're defined in the page.
  function serverRoot() {
    var e, r, scriptEls;

    scriptEls = document.getElementsByTagName("script");
    e = scriptEls[scriptEls.length - 1];
    r = new RegExp(".*?[^/:]\/").exec(e.src);
    if (!r || (r[0].toLowerCase().indexOf("http://") === -1 && r[0].toLowerCase().indexOf("https://") === -1)) {
      r = new RegExp(".*?[^/:]\/").exec(window.location.href);
    }

    return r ? r[0].toLowerCase() : "";
  }

  // We need to add something to the global namespace so that we can keep track
  // between invocations of this script file.
  t._apiScripts = t._apiScripts || [];
  t._apiScripts.push(serverRoot());

}(window._tableauInternal));


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This should only be executed once
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if (!window._tableauInternal._apiLoaded) {
  window._tableauInternal._apiLoaded = true;

  (function() {

    // Include the slimmed down mscorlib
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// MscorlibSlim.script
//
// jrockwood-2012-09-12
//
// We use Script# for the JavaScript API, which works great except for one thing.
// It has a dependency on mscorlib.js, which contains the type system as well
// as utility methods.
//
// This class preserves a few of the nice to use and low maintenance classes,
// like StringBuilder, Delegate (for anonymous functions capturing 'this' in
// the correct way), and IEnumerable support (foreach in C#). It also tweaks
// the Type system so that we don't need to add prototypes to Function. See the
// comments below for details on how we're doing that. (Search for Type System).
//
// I'm also including the rest of the mscorlib functions in debug mode only
// that throw exceptions. This will at least flag the developer to quit using
// something during unit tests. I'm also trying to preserve the same ordering
// as in mscorlib.js so that it's easier to reconcile differences.
//
// There are a couple of preprocessor definitions that control the output:
// THROW_ON_UNDEFINED_MSCORLIB_CLASSES
//   This includes definitions for methods that we are not implementing, but
//   throws an exception with a helpful error message.
// EXPOSE_INTERNAL_CLASSES
//   This allows classes defined in the tab namespace to "leak through" and be
//   accessible to the outside world. This is needed for unit tests to be able
//   to test internal stuff.
//
// HOW TO USE
// ----------
// This file is designed to be #included in another .script file.
//
// 1) #include this file within an anonymous function and before you include the
//    generated Script# code.
//
// 2) Call restoreTypeSystem() before leaving the anonymous function to clean up.
//
// 3) Add this file as a link to the project as a TemplateFileDependency, so that
//    if this file changes it will recompile the project containing it. You do
//    that by adding a link to this file in your project and then manually editing
//    the .csproj file and replacing <None> with <TemplateFileDependency> where
//    it lists this file.
//
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// (function() {

////////////////////////////////////////////////////////////////////////////////
// Utility methods (generated via Script.IsNull, etc.)
////////////////////////////////////////////////////////////////////////////////

var ss = {
  version: '0.7.4.0',

  isUndefined: function (o) {
    return (o === undefined);
  },

  isNull: function (o) {
    return (o === null);
  },

  isNullOrUndefined: function (o) {
    return (o === null) || (o === undefined);
  },

  isValue: function (o) {
    return (o !== null) && (o !== undefined);
  }
};

function informDevOfUnsupportedMethod(methodName, additionalMessage) {
  try {
    throw new Error(methodName + " is not supported in MscorlibSlim. " + additionalMessage);
  } catch (e) {
    throw e.message + "\n" + e.stack;
  }
}

////////////////////////////////////////////////////////////////////////////
// Object Extensions

if (!Object.clearKeys) {
  Object.clearKeys = function Object$clearKeys(d) {
    informDevOfUnsupportedMethod("Object.clearKeys");
  }
}

if (!Object.keyExists) {
  Object.keyExists = function Object$keyExists(d, key) {
    informDevOfUnsupportedMethod("Object.keyExists");
  }
}

if (!Object.keys) {
  Object.keys = function Object$keys(d) {
    informDevOfUnsupportedMethod("Object.keys");
  }
}

if (!Object.getKeyCount) {
  Object.getKeyCount = function Object$getKeyCount(d) {
    informDevOfUnsupportedMethod("Object.getKeyCount");
  }
}

////////////////////////////////////////////////////////////////////////////
// Boolean Extensions

if (!Boolean.parse) {
  Boolean.parse = function Boolean$parse(s) {
    informDevOfUnsupportedMethod("Boolean.parse");
  }
}

////////////////////////////////////////////////////////////////////////////
// Number Extensions

if (!Number.parse) {
  Number.parse = function Number$parse(s) {
    informDevOfUnsupportedMethod("Number.parse");
  }
}

if (!Number.prototype.format) {
  Number.prototype.format = function Number$format(format) {
    informDevOfUnsupportedMethod("Number.format");
  }
}

if (!Number.prototype.localeFormat) {
  Number.prototype.localeFormat = function Number$format(format) {
    informDevOfUnsupportedMethod("Number.localeFormat");
  }
}

////////////////////////////////////////////////////////////////////////////
// String Extensions

if (!String.compare) {
  String.compare = function String$compare(s1, s2, ignoreCase) {
    informDevOfUnsupportedMethod("String.compare");
  }
}

if (!String.prototype.compareTo) {
  String.prototype.compareTo = function String$compareTo(s, ignoreCase) {
    informDevOfUnsupportedMethod("String.compareTo");
  }
}

if (!String.concat) {
  String.concat = function String$concat() {
    informDevOfUnsupportedMethod("String.concat");
  }
}

if (!String.prototype.endsWith) {
  String.prototype.endsWith = function String$endsWith(suffix) {
    informDevOfUnsupportedMethod("String.endsWith");
  }
}

if (!String.equals) {
  String.equals = function String$equals1(s1, s2, ignoreCase) {
    informDevOfUnsupportedMethod("String.equals");
  }
}

if (!String.format) {
  String.format = function String$format(format) {
    informDevOfUnsupportedMethod("String.format");
  }
}

if (!String.fromChar) {
  String.fromChar = function String$fromChar(ch, count) {
    informDevOfUnsupportedMethod("String.fromChar");
  }
}

if (!String.prototype.htmlDecode) {
  String.prototype.htmlDecode = function String$htmlDecode() {
    informDevOfUnsupportedMethod("String.htmlDecode");
  }
}

if (!String.prototype.htmlEncode) {
  String.prototype.htmlEncode = function String$htmlEncode() {
    informDevOfUnsupportedMethod("String.htmlEncode");
  }
}

if (!String.prototype.indexOfAny) {
  String.prototype.indexOfAny = function String$indexOfAny(chars, startIndex, count) {
    informDevOfUnsupportedMethod("String.indexOfAny");
  }
}

if (!String.prototype.insert) {
  String.prototype.insert = function String$insert(index, value) {
    informDevOfUnsupportedMethod("String.insert");
  }
}

if (!String.isNullOrEmpty) {
  String.isNullOrEmpty = function String$isNullOrEmpty(s) {
    informDevOfUnsupportedMethod("String.isNullOrEmpty");
  }
}

if (!String.prototype.lastIndexOfAny) {
  String.prototype.lastIndexOfAny = function String$lastIndexOfAny(chars, startIndex, count) {
    informDevOfUnsupportedMethod("String.lastIndexOfAny");
  }
}

if (!String.localeFormat) {
  String.localeFormat = function String$localeFormat(format) {
    informDevOfUnsupportedMethod("String.localeFormat");
  }
}

if (!String.prototype.padLeft) {
  String.prototype.padLeft = function String$padLeft(totalWidth, ch) {
    informDevOfUnsupportedMethod("String.padLeft");
  }
}

if (!String.prototype.padRight) {
  String.prototype.padRight = function String$padRight(totalWidth, ch) {
    informDevOfUnsupportedMethod("String.padRight");
  }
}

if (!String.prototype.remove) {
  String.prototype.remove = function String$remove(index, count) {
    informDevOfUnsupportedMethod("String.remove");
  }
}

if (!String.prototype.replaceAll) {
  String.prototype.replaceAll = function String$replaceAll(oldValue, newValue) {
    informDevOfUnsupportedMethod("String.replaceAll");
  }
}

if (!String.prototype.startsWith) {
  String.prototype.startsWith = function String$startsWith(prefix) {
    informDevOfUnsupportedMethod("String.startsWith");
  }
}

if (!String.prototype.trim) {
  String.prototype.trim = function String$trim() {
    informDevOfUnsupportedMethod("String.trim");
  }
}

if (!String.prototype.trimEnd) {
  String.prototype.trimEnd = function String$trimEnd() {
    informDevOfUnsupportedMethod("String.trimEnd");
  }
}

if (!String.prototype.trimStart) {
  String.prototype.trimStart = function String$trimStart() {
    informDevOfUnsupportedMethod("String.trimStart");
  }
}

////////////////////////////////////////////////////////////////////////////////
// Array Extensions

if (!Array.prototype.add) {
  Array.prototype.add = function Array$add(item) {
    informDevOfUnsupportedMethod("Array.add", "Use JsArray<T> instead.");
  }
}

if (!Array.prototype.addRange) {
  Array.prototype.addRange = function Array$addRange(items) {
    informDevOfUnsupportedMethod("Array.addRange", "Use JsArray<T> instead.");
  }
}

if (!Array.prototype.aggregate) {
  Array.prototype.aggregate = function Array$aggregate(seed, callback, instance) {
    informDevOfUnsupportedMethod("Array.aggregate");
  }
}

if (!Array.prototype.clear) {
  Array.prototype.clear = function Array$clear() {
    informDevOfUnsupportedMethod("Array.clear");
  }
}

if (!Array.prototype.clone) {
  Array.prototype.clone = function Array$clone() {
    informDevOfUnsupportedMethod("Array.clone", "Use JsArray<T>.concat instead.");
  }
}

if (!Array.prototype.contains) {
  Array.prototype.contains = function Array$contains(item) {
    informDevOfUnsupportedMethod("Array.clone", "Use Utility.Contains instead.");
  }
}

if (!Array.prototype.dequeue) {
  Array.prototype.dequeue = function Array$dequeue() {
    informDevOfUnsupportedMethod("Array.dequeue", "Use JsQueue<T> instead.");
  }
}

if (!Array.prototype.enqueue) {
  Array.prototype.enqueue = function Array$enqueue(item) {
    informDevOfUnsupportedMethod("Array.enqueue", "Use JsQueue<T> instead.");
  }
}

if (!Array.prototype.peek) {
  Array.prototype.peek = function Array$peek() {
    informDevOfUnsupportedMethod("Array.peek", "Use JsQueue<T> instead.");
  }
}

if (!Array.prototype.every) {
  Array.prototype.every = function Array$every() {
    informDevOfUnsupportedMethod("Array.every");
  }
}

if (!Array.prototype.extract) {
  Array.prototype.extract = function Array$extract(index, count) {
    informDevOfUnsupportedMethod("Array.extract");
  }
}

if (!Array.prototype.filter) {
  Array.prototype.filter = function Array$filter(callback, instance) {
    informDevOfUnsupportedMethod("Array.filter");
  }
}

if (!Array.prototype.forEach) {
  Array.prototype.forEach = function Array$forEach(callback, instance) {
    informDevOfUnsupportedMethod("Array.forEach");
  }
}

if (!Array.prototype.getEnumerator) {
  Array.prototype.getEnumerator = function Array$getEnumerator() {
    informDevOfUnsupportedMethod("Array.getEnumerator", "Don't use foreach in C# on an array.");
  }
}

if (!Array.prototype.groupBy) {
  Array.prototype.groupBy = function Array$groupBy(callback, instance) {
    informDevOfUnsupportedMethod("Array.groupBy");
  }
}

if (!Array.prototype.index) {
  Array.prototype.index = function Array$index(callback, instance) {
    informDevOfUnsupportedMethod("Array.index");
  }
}

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function Array$indexOf(item, startIndex) {
    informDevOfUnsupportedMethod("Array.indexOf", "Use Utility.IndexOf instead.");
  }
}

if (!Array.prototype.insert) {
  Array.prototype.insert = function Array$insert(index, item) {
    informDevOfUnsupportedMethod("Array.insert", "Use JsArray<T>.splice instead.");
  }
}

if (!Array.prototype.insertRange) {
  Array.prototype.insertRange = function Array$insertRange(index, items) {
    informDevOfUnsupportedMethod("Array.insertRange");
  }
}

if (!Array.prototype.map) {
  Array.prototype.map = function Array$map(callback, instance) {
    informDevOfUnsupportedMethod("Array.map");
  }
}

if (!Array.parse) {
  Array.parse = function Array$parse(s) {
    informDevOfUnsupportedMethod("Array.parse");
  }
}

if (!Array.prototype.remove) {
  Array.prototype.remove = function Array$remove(item) {
    informDevOfUnsupportedMethod("Array.remove");
  }
}

if (!Array.prototype.removeAt) {
  Array.prototype.removeAt = function Array$removeAt(index) {
    informDevOfUnsupportedMethod("Array.removeAt");
  }
}

if (!Array.prototype.removeRange) {
  Array.prototype.removeRange = function Array$removeRange(index, count) {
    informDevOfUnsupportedMethod("Array.removeRange");
  }
}

if (!Array.prototype.some) {
  Array.prototype.some = function Array$some(callback, instance) {
    informDevOfUnsupportedMethod("Array.some");
  }
}

if (!Array.toArray) {
  Array.toArray = function Array$toArray(obj) {
    informDevOfUnsupportedMethod("Array.toArray");
  }
}

////////////////////////////////////////////////////////////////////////////////
// RegExp Extensions

if (!RegExp.parse) {
  RegExp.parse = function RegExp$parse(s) {
    informDevOfUnsupportedMethod("RegExp.parse");
  }
}

////////////////////////////////////////////////////////////////////////////////
// Date Extensions

if (!Date.get_now) {
  Date.get_now = function Date$get_now() {
    informDevOfUnsupportedMethod("Date.get_now", "Use new Date() instead.");
  }
}

if (!Date.get_today) {
  Date.get_today = function Date$get_today() {
    informDevOfUnsupportedMethod("Date.get_today", "Use new Date() instead.");
  }
}

if (!Date.isEmpty) {
  Date.isEmpty = function Date$isEmpty(d) {
    informDevOfUnsupportedMethod("Date.isEmpty");
  }
}

if (!Date.prototype.format) {
  Date.prototype.format = function Date$format(format) {
    informDevOfUnsupportedMethod("Date.format");
  }
}

if (!Date.prototype.localeFormat) {
  Date.prototype.localeFormat = function Date$localeFormat(format) {
    informDevOfUnsupportedMethod("Date.localeFormat");
  }
}

if (!Date.parseDate) {
  Date.parseDate = function Date$parse(s) {
    informDevOfUnsupportedMethod("Date.parse");
  }
}

////////////////////////////////////////////////////////////////////////////////
// Error Extensions

if (!Error.prototype.popStackFrame) {
  Error.prototype.popStackFrame = function Error$popStackFrame() {
    informDevOfUnsupportedMethod("Error.popStackFrame");
  }
}

if (!Error.createError) {
  Error.createError = function Error$createError(message, errorInfo, innerException) {
    informDevOfUnsupportedMethod("Error.createError");
  }
}

////////////////////////////////////////////////////////////////////////////////
// Debug Extensions

if (!ss.Debug) {
  ss.Debug = window.Debug || function() {};
}

if (!ss.Debug.writeln) {
  ss.Debug.writeln = function Debug$writeln(text) {
    informDevOfUnsupportedMethod("Debug.writeln");
  }
}

if (!ss.Debug.assert) {
  ss.Debug.assert = function Debug$assert(condition, message) {
    informDevOfUnsupportedMethod("Debug.assert");
  }
}

if (!ss.Debug.fail) {
  ss.Debug.fail = function Debug$fail(message) {
    informDevOfUnsupportedMethod("Debug.fail");
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Type System Implementation
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// Script# automatically adds Type.register* functions when generating code.
// Normally mscorlib.js defines these functions, but we're not taking a
// dependency on mscorlib because it does naughty things like add to the
// prototype of Array, Object, Function, and other native JavaScript objects.
// So, we're defining our own functions here that don't rely on adding things
// to the prototype. Well, more accurately, we add things to the prototype
// only until the type system is done registering, at which point we remove
// or restore the prototype methods at the bottom of this file.
//
// The code is not the full-blown type system. Just enough to allow us to
// call base class methods.

var Type = Function;
var originalRegistrationFunctions = {
  registerNamespace: { isPrototype: false, func: Type.registerNamespace },
  registerInterface: { isPrototype: true, func: Type.prototype.registerInterface },
  registerClass: { isPrototype: true, func: Type.prototype.registerClass },
  registerEnum: { isPrototype: true, func: Type.prototype.registerEnum }
};

// This is the namespace for internal stuff. It's a local variable inside of
// an anonymous function so it doesn't leak outside.
var tab = {};
var tabBootstrap = {};

Type.registerNamespace = function (name) {
  if (name === "tableauSoftware") {
    window.tableauSoftware = window.tableauSoftware || {};
  }
  if (name !== "tableauSoftware" && name !== "tab" && name !== "tabBootstrap") {
    throw new Error("Unknown namespace: " + name + "\n" +
      "All public classes in the API should have the namespace of \"tableauSoftware\".\n" +
      "All non-API classes should have the namespace of \"tab\"\n." +
      "All bootstrap classes should have the namespace of \"tabBootstrap\".");
  }
};

Type.prototype.registerInterface = function (name) {
  informDevOfUnsupportedMethod("Type.registerInterface", "Use [Imported] on any interfaces.");
};

Type.prototype.registerEnum = function (name, flags) {
  for (var field in this.prototype) {
    this[field] = this.prototype[field];
  }
};

Type.prototype.registerClass = function (name, baseType, interfaceType) {
  var that = this;
  this.prototype.constructor = this;
  this.__baseType = baseType || Object;
  if (baseType) {
    this.__basePrototypePending = true;
    this.__setupBase = function () {
      Type$setupBase(that);
    };
    this.initializeBase = function (instance, args) {
      Type$initializeBase(that, instance, args);
    };
    this.callBaseMethod = function (instance, name, args) {
      Type$callBaseMethod(that, instance, name, args);
    };
  }
};

function Type$setupBase(that) {
  if (that.__basePrototypePending) {
    var baseType = that.__baseType;
    if (baseType.__basePrototypePending) {
      baseType.__setupBase();
    }

    for (var memberName in baseType.prototype) {
      var memberValue = baseType.prototype[memberName];
      if (!that.prototype[memberName]) {
        that.prototype[memberName] = memberValue;
      }
    }

    delete that.__basePrototypePending;
    delete that.__setupBase;
  }
}

function Type$initializeBase(that, instance, args) {
  if (that.__basePrototypePending) {
    that.__setupBase();
  }

  if (!args) {
    that.__baseType.apply(instance);
  }
  else {
    that.__baseType.apply(instance, args);
  }
}

function Type$callBaseMethod(that, instance, name, args) {
  var baseMethod = that.__baseType.prototype[name];
  if (!args) {
    return baseMethod.apply(instance);
  }
  else {
    return baseMethod.apply(instance, args);
  }
}

// Restore the original functions on the Type (Function) object so that we
// don't pollute the global namespace.
function restoreTypeSystem() {
  for (var regFuncName in originalRegistrationFunctions) {
    if (!originalRegistrationFunctions.hasOwnProperty(regFuncName)) { continue; }

    var original = originalRegistrationFunctions[regFuncName];
    var typeOrPrototype = original.isPrototype ? Type.prototype : Type;
    if (original.func) {
      typeOrPrototype[regFuncName] = original.func;
    } else {
      delete typeOrPrototype[regFuncName];
    }
  }
}

if (!Type.prototype.get_baseType) {
  Type.prototype.get_baseType = function tableauSoftware$Type$get_baseType() {
    informDevOfUnsupportedMethod("Type.get_baseType", "Reflection is not supported.");
  };
}

if (!Type.prototype.get_fullName) {
  Type.prototype.get_fullName = function Type$get_fullName() {
    informDevOfUnsupportedMethod("Type.get_fullName", "Reflection is not supported.");
  }
}

if (!Type.prototype.get_name) {
  Type.prototype.get_name = function Type$get_name() {
    informDevOfUnsupportedMethod("Type.get_name", "Reflection is not supported.");
  }
}

if (!Type.prototype.getInterfaces) {
  Type.prototype.getInterfaces = function Type$getInterfaces() {
    informDevOfUnsupportedMethod("Type.getInterfaces", "Reflection is not supported.");
  }
}

if (!Type.prototype.isInstanceOfType) {
  Type.prototype.isInstanceOfType = function Type$isInstanceOfType(instance) {
    informDevOfUnsupportedMethod("Type.isInstanceOfType", "Reflection is not supported.");
  }
}

if (!Type.prototype.isAssignableFrom) {
  Type.prototype.isAssignableFrom = function Type$isAssignableFrom(type) {
    informDevOfUnsupportedMethod("Type.isAssignableFrom", "Reflection is not supported.");
  }
}

if (!Type.isClass) {
  Type.isClass = function Type$isClass(type) {
    informDevOfUnsupportedMethod("Type.isClass", "Reflection is not supported.");
  }
}

if (!Type.isEnum) {
  Type.isEnum = function Type$isEnum(type) {
    informDevOfUnsupportedMethod("Type.isEnum", "Reflection is not supported.");
  }
}

if (!Type.isFlags) {
  Type.isFlags = function Type$isFlags(type) {
    informDevOfUnsupportedMethod("Type.isFlags", "Reflection is not supported.");
  }
}

if (!Type.isInterface) {
  Type.isInterface = function Type$isInterface(type) {
    informDevOfUnsupportedMethod("Type.isInterface", "Reflection is not supported.");
  }
}

if (!Type.isNamespace) {
  Type.isNamespace = function Type$isNamespace(object) {
    informDevOfUnsupportedMethod("Type.isNamespace", "Reflection is not supported.");
  }
}

if (!Type.canCast) {
  Type.canCast = function Type$canCast(instance, type) {
    informDevOfUnsupportedMethod("Type.canCast", "Reflection is not supported. Don't use the 'as' or 'is' keywords in C#.");
  }
}

if (!Type.safeCast) {
  Type.safeCast = function Type$safeCast(instance, type) {
    informDevOfUnsupportedMethod("Type.safeCast", "Reflection is not supported. Don't use the 'as' or 'is' keywords in C#.");
  }
}

if (!Type.getInstanceType) {
  Type.getInstanceType = function Type$getInstanceType(instance) {
    informDevOfUnsupportedMethod("Type.getInstanceType");
  }
}

if (!Type.getType) {
  Type.getType = function Type$getType(typeName) {
    informDevOfUnsupportedMethod("Type.getType");
  }
}

if (!Type.parse) {
  Type.parse = function Type$parse(typeName) {
    informDevOfUnsupportedMethod("Type.parse");
  }
}

////////////////////////////////////////////////////////////////////////////
// Delegate
////////////////////////////////////////////////////////////////////////////

ss.Delegate = function Delegate$() {
};

ss.Delegate.registerClass('Delegate');

ss.Delegate.empty = function() { };

ss.Delegate._contains = function Delegate$_contains(targets, object, method) {
  for (var i = 0; i < targets.length; i += 2) {
    if (targets[i] === object && targets[i + 1] === method) {
      return true;
    }
  }
  return false;
};

ss.Delegate._create = function Delegate$_create(targets) {
  var delegate = function() {
    if (targets.length == 2) {
      return targets[1].apply(targets[0], arguments);
    }
    else {
      var clone = targets.concat();
      for (var i = 0; i < clone.length; i += 2) {
        if (ss.Delegate._contains(targets, clone[i], clone[i + 1])) {
          clone[i + 1].apply(clone[i], arguments);
        }
      }
      return null;
    }
  };
  delegate._targets = targets;

  return delegate;
};

ss.Delegate.create = function Delegate$create(object, method) {
  if (!object) {
    return method;
  }
  return ss.Delegate._create([object, method]);
};

ss.Delegate.combine = function Delegate$combine(delegate1, delegate2) {
  if (!delegate1) {
    if (!delegate2._targets) {
      return ss.Delegate.create(null, delegate2);
    }
    return delegate2;
  }
  if (!delegate2) {
    if (!delegate1._targets) {
      return ss.Delegate.create(null, delegate1);
    }
    return delegate1;
  }

  var targets1 = delegate1._targets ? delegate1._targets : [null, delegate1];
  var targets2 = delegate2._targets ? delegate2._targets : [null, delegate2];

  return ss.Delegate._create(targets1.concat(targets2));
};

ss.Delegate.remove = function Delegate$remove(delegate1, delegate2) {
  if (!delegate1 || (delegate1 === delegate2)) {
    return null;
  }
  if (!delegate2) {
    return delegate1;
  }

  var targets = delegate1._targets;
  var object = null;
  var method;
  if (delegate2._targets) {
    object = delegate2._targets[0];
    method = delegate2._targets[1];
  }
  else {
    method = delegate2;
  }

  for (var i = 0; i < targets.length; i += 2) {
    if ((targets[i] === object) && (targets[i + 1] === method)) {
      if (targets.length == 2) {
        return null;
      }
      targets.splice(i, 2);
      return ss.Delegate._create(targets);
    }
  }

  return delegate1;
};

ss.Delegate.createExport = function Delegate$createExport(delegate, multiUse, name) {
  informDevOfUnsupportedMethod("Delegate.createExport");
}

ss.Delegate.deleteExport = function Delegate$deleteExport(name) {
  informDevOfUnsupportedMethod("Delegate.deleteExport");
}

ss.Delegate.clearExport = function Delegate$clearExport(name) {
  informDevOfUnsupportedMethod("Delegate.clearExport");
}

////////////////////////////////////////////////////////////////////////////
// CultureInfo

ss.CultureInfo = function CultureInfo$(name, numberFormat, dateFormat) {
  informDevOfUnsupportedMethod("CultureInfo");
}
ss.CultureInfo.registerClass('CultureInfo');

////////////////////////////////////////////////////////////////////////////
// IEnumerator

ss.IEnumerator = function IEnumerator$() { };
ss.IEnumerator.prototype = {
  get_current: null,
  moveNext: null,
  reset: null
};

ss.IEnumerator.getEnumerator = function ss_IEnumerator$getEnumerator(enumerable) {
  if (enumerable) {
    return enumerable.getEnumerator ? enumerable.getEnumerator() : new ss.ArrayEnumerator(enumerable);
  }
  return null;
}

// ss.IEnumerator.registerInterface('IEnumerator');

////////////////////////////////////////////////////////////////////////////
// IEnumerable

ss.IEnumerable = function IEnumerable$() { };
ss.IEnumerable.prototype = {
  getEnumerator: null
};
// ss.IEnumerable.registerInterface('IEnumerable');

////////////////////////////////////////////////////////////////////////////
// ArrayEnumerator

ss.ArrayEnumerator = function ArrayEnumerator$(array) {
  this._array = array;
  this._index = -1;
  this.current = null;
}
ss.ArrayEnumerator.prototype = {
  moveNext: function ArrayEnumerator$moveNext() {
    this._index++;
    this.current = this._array[this._index];
    return (this._index < this._array.length);
  },
  reset: function ArrayEnumerator$reset() {
    this._index = -1;
    this.current = null;
  }
};

// ss.ArrayEnumerator.registerClass('ArrayEnumerator', null, ss.IEnumerator);

////////////////////////////////////////////////////////////////////////////
// IDisposable

ss.IDisposable = function IDisposable$() { };
ss.IDisposable.prototype = {
  dispose: null
};
// ss.IDisposable.registerInterface('IDisposable');

////////////////////////////////////////////////////////////////////////////
// StringBuilder

ss.StringBuilder = function StringBuilder$(s) {
  this._parts = !ss.isNullOrUndefined(s) ? [s] : [];
  this.isEmpty = this._parts.length == 0;
}
ss.StringBuilder.prototype = {
  append: function StringBuilder$append(s) {
    if (!ss.isNullOrUndefined(s)) {
      //this._parts.add(s);
      this._parts.push(s);
      this.isEmpty = false;
    }
    return this;
  },

  appendLine: function StringBuilder$appendLine(s) {
    this.append(s);
    this.append('\r\n');
    this.isEmpty = false;
    return this;
  },

  clear: function StringBuilder$clear() {
    this._parts = [];
    this.isEmpty = true;
  },

  toString: function StringBuilder$toString(s) {
    return this._parts.join(s || '');
  }
};

ss.StringBuilder.registerClass('StringBuilder');

////////////////////////////////////////////////////////////////////////////
// EventArgs

ss.EventArgs = function EventArgs$() {
}
ss.EventArgs.registerClass('EventArgs');

ss.EventArgs.Empty = new ss.EventArgs();

////////////////////////////////////////////////////////////////////////////
// CancelEventArgs

ss.CancelEventArgs = function CancelEventArgs$() {
    ss.CancelEventArgs.initializeBase(this);
    this.cancel = false;
}
ss.CancelEventArgs.registerClass('CancelEventArgs', ss.EventArgs);

////////////////////////////////////////////////////////////////////////////
// Tuple

ss.Tuple = function (first, second, third) {
  this.first = first;
  this.second = second;
  if (arguments.length == 3) {
    this.third = third;
  }
}
ss.Tuple.registerClass('Tuple');

////////////////////////////////////////////////////////////////////////////
// Observable

ss.Observable = function(v) {
  informDevOfUnsupportedMethod("Observable");
}

ss.Observable.registerObserver = function (o) {
  informDevOfUnsupportedMethod("Observable.registerObserver");
}
ss.Observable.registerClass('Observable');

ss.ObservableCollection = function (items) {
  informDevOfUnsupportedMethod("ObservableCollection");
}
ss.ObservableCollection.registerClass('ObservableCollection', null, ss.IEnumerable);


//})();

    // Include the CoreSlim code
//! tabcoreslim.debug.js
//

// This file cannot live by itself. It needs to be inlined into another code file
// that either uses the MscorlibSlim.script or the "real" mscorlib.js.
// (function() {

Type.registerNamespace('tab');

////////////////////////////////////////////////////////////////////////////////
// tab.EscapingUtil

tab.EscapingUtil = function tab_EscapingUtil() {
}
tab.EscapingUtil.escapeHtml = function tab_EscapingUtil$escapeHtml(html) {
    var escaped = (html || '');
    escaped = escaped.replace(new RegExp('&', 'g'), '&amp;');
    escaped = escaped.replace(new RegExp('<', 'g'), '&lt;');
    escaped = escaped.replace(new RegExp('>', 'g'), '&gt;');
    escaped = escaped.replace(new RegExp('"', 'g'), '&quot;');
    escaped = escaped.replace(new RegExp("'", 'g'), '&#39;');
    escaped = escaped.replace(new RegExp('/', 'g'), '&#47;');
    return escaped;
}


////////////////////////////////////////////////////////////////////////////////
// tab.WindowHelper

tab.WindowHelper = function tab_WindowHelper(window) {
    this._window = window;
}
tab.WindowHelper.getLocation = function tab_WindowHelper$getLocation(window) {
    return window.location;
}
tab.WindowHelper.setLocationHref = function tab_WindowHelper$setLocationHref(window, href) {
    window.location.href = href;
}
tab.WindowHelper.requestAnimationFrame = function tab_WindowHelper$requestAnimationFrame(action) {
    return tab.WindowHelper._requestAnimationFrameFunc(action);
}
tab.WindowHelper.cancelAnimationFrame = function tab_WindowHelper$cancelAnimationFrame(animationId) {
    tab.WindowHelper._cancelAnimationFrameFunc(animationId);
}
tab.WindowHelper._setDefaultRequestAnimationFrameImpl = function tab_WindowHelper$_setDefaultRequestAnimationFrameImpl() {
    var lastTime = 0;
    tab.WindowHelper._requestAnimationFrameFunc = function(callback) {
        var curTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (curTime - lastTime));
        lastTime = curTime + timeToCall;
        var id = window.setTimeout(function() {
            callback(lastTime);
        }, timeToCall);
        return id;
    };
}
tab.WindowHelper.prototype = {
    _window: null,
    
    get_pageXOffset: function tab_WindowHelper$get_pageXOffset() {
        return tab.WindowHelper._pageXOffsetFunc(this._window);
    },
    
    get_pageYOffset: function tab_WindowHelper$get_pageYOffset() {
        return tab.WindowHelper._pageYOffsetFunc(this._window);
    },
    
    get_innerWidth: function tab_WindowHelper$get_innerWidth() {
        return tab.WindowHelper._innerWidthFunc(this._window);
    },
    
    get_innerHeight: function tab_WindowHelper$get_innerHeight() {
        return tab.WindowHelper._innerHeightFunc(this._window);
    }
}


tab.EscapingUtil.registerClass('tab.EscapingUtil');
tab.WindowHelper.registerClass('tab.WindowHelper');
tab.WindowHelper._innerWidthFunc = null;
tab.WindowHelper._innerHeightFunc = null;
tab.WindowHelper._pageXOffsetFunc = null;
tab.WindowHelper._pageYOffsetFunc = null;
tab.WindowHelper._requestAnimationFrameFunc = null;
tab.WindowHelper._cancelAnimationFrameFunc = null;
(function () {
    if (('innerWidth' in window)) {
        tab.WindowHelper._innerWidthFunc = function(w) {
            return w.innerWidth;
        };
    }
    else {
        tab.WindowHelper._innerWidthFunc = function(w) {
            return w.document.documentElement.offsetWidth;
        };
    }
    if (('innerHeight' in window)) {
        tab.WindowHelper._innerHeightFunc = function(w) {
            return w.innerHeight;
        };
    }
    else {
        tab.WindowHelper._innerHeightFunc = function(w) {
            return w.document.documentElement.offsetHeight;
        };
    }
    if (ss.isValue(window.self.pageXOffset)) {
        tab.WindowHelper._pageXOffsetFunc = function(w) {
            return w.pageXOffset;
        };
    }
    else {
        tab.WindowHelper._pageXOffsetFunc = function(w) {
            return w.document.documentElement.scrollLeft;
        };
    }
    if (ss.isValue(window.self.pageYOffset)) {
        tab.WindowHelper._pageYOffsetFunc = function(w) {
            return w.pageYOffset;
        };
    }
    else {
        tab.WindowHelper._pageYOffsetFunc = function(w) {
            return w.document.documentElement.scrollTop;
        };
    }
    var vendors = [ 'ms', 'moz', 'webkit', 'o' ];
    var requestFuncName = null;
    var cancelFuncName = null;
    for (var ii = 0; ii < vendors.length && requestFuncName == null; ++ii) {
        var vendor = vendors[ii];
        var funcName = vendor + 'RequestAnimationFrame';
        if ((funcName in window)) {
            requestFuncName = funcName;
        }
        funcName = vendor + 'CancelAnimationFrame';
        if ((funcName in window)) {
            cancelFuncName = funcName;
        }
        funcName = vendor + 'CancelRequestAnimationFrame';
        if ((funcName in window)) {
            cancelFuncName = funcName;
        }
    }
    if (requestFuncName != null) {
        tab.WindowHelper._requestAnimationFrameFunc = function(callback) {
            return window[requestFuncName](callback);
        };
    }
    else {
        tab.WindowHelper._setDefaultRequestAnimationFrameImpl();
    }
    if (cancelFuncName != null) {
        tab.WindowHelper._cancelAnimationFrameFunc = function(animationId) {
            window[cancelFuncName](animationId);
        };
    }
    else {
        tab.WindowHelper._cancelAnimationFrameFunc = function(id) {
            window.clearTimeout(id);
        };
    }
})();

// }());

//! tabcoreslim.debug.js end - generated using Script# v0.7.4.0

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Script# generated code
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


Type.registerNamespace('tab');

////////////////////////////////////////////////////////////////////////////////
// tab.JsonUtil

tab.JsonUtil = function tab_JsonUtil() {
}
tab.JsonUtil.parseJson = function tab_JsonUtil$parseJson(jsonValue) {
    return tab._jQueryShim.parseJSON(jsonValue);
}
tab.JsonUtil.toJson = function tab_JsonUtil$toJson(it, pretty, indentStr) {
    pretty = (pretty || false);
    indentStr = (indentStr || '');
    var stack = [];
    return tab.JsonUtil._serialize(it, pretty, indentStr, stack);
}
tab.JsonUtil._indexOf = function tab_JsonUtil$_indexOf(array, searchElement, fromIndex) {
    if (ss.isValue((Array).prototype['indexOf'])) {
        return array.indexOf(searchElement, fromIndex);
    }
    fromIndex = (fromIndex || 0);
    var length = array.length;
    if (length > 0) {
        for (var index = fromIndex; index < length; index++) {
            if (array[index] === searchElement) {
                return index;
            }
        }
    }
    return -1;
}
tab.JsonUtil._contains = function tab_JsonUtil$_contains(array, searchElement, fromIndex) {
    var index = tab.JsonUtil._indexOf(array, searchElement, fromIndex);
    return index >= 0;
}
tab.JsonUtil._serialize = function tab_JsonUtil$_serialize(it, pretty, indentStr, stack) {
    if (tab.JsonUtil._contains(stack, it)) {
        throw Error.createError('The object contains recursive reference of sub-objects', null);
    }
    if (ss.isUndefined(it)) {
        return 'undefined';
    }
    if (it == null) {
        return 'null';
    }
    var objtype = tab._jQueryShim.type(it);
    if (objtype === 'number' || objtype === 'boolean') {
        return it.toString();
    }
    if (objtype === 'string') {
        return tab.JsonUtil._escapeString(it);
    }
    stack.push(it);
    var newObj;
    indentStr = (indentStr || '');
    var nextIndent = (pretty) ? indentStr + '\t' : '';
    var tf = (it.__json__ || it.json);
    if (tab._jQueryShim.isFunction(tf)) {
        var jsonCallback = tf;
        newObj = jsonCallback(it);
        if (it !== newObj) {
            var res = tab.JsonUtil._serialize(newObj, pretty, nextIndent, stack);
            stack.pop();
            return res;
        }
    }
    if (ss.isValue(it.nodeType) && ss.isValue(it.cloneNode)) {
        throw Error.createError("Can't serialize DOM nodes", null);
    }
    var separator = (pretty) ? ' ' : '';
    var newLine = (pretty) ? '\n' : '';
    if (tab._jQueryShim.isArray(it)) {
        return tab.JsonUtil._serializeArray(it, pretty, indentStr, stack, nextIndent, newLine);
    }
    if (objtype === 'function') {
        stack.pop();
        return null;
    }
    return tab.JsonUtil._serializeGeneric(it, pretty, indentStr, stack, nextIndent, newLine, separator);
}
tab.JsonUtil._serializeGeneric = function tab_JsonUtil$_serializeGeneric(it, pretty, indentStr, stack, nextIndent, newLine, separator) {
    var d = it;
    var bdr = new ss.StringBuilder('{');
    var init = false;
    var $dict1 = d;
    for (var $key2 in $dict1) {
        var e = { key: $key2, value: $dict1[$key2] };
        var keyStr;
        var val;
        if (typeof(e.key) === 'number') {
            keyStr = '"' + e.key + '"';
        }
        else if (typeof(e.key) === 'string') {
            keyStr = tab.JsonUtil._escapeString(e.key);
        }
        else {
            continue;
        }
        val = tab.JsonUtil._serialize(e.value, pretty, nextIndent, stack);
        if (val == null) {
            continue;
        }
        if (init) {
            bdr.append(',');
        }
        bdr.append(newLine + nextIndent + keyStr + ':' + separator + val);
        init = true;
    }
    bdr.append(newLine + indentStr + '}');
    stack.pop();
    return bdr.toString();
}
tab.JsonUtil._serializeArray = function tab_JsonUtil$_serializeArray(it, pretty, indentStr, stack, nextIndent, newLine) {
    var initialized = false;
    var sb = new ss.StringBuilder('[');
    var a = it;
    for (var i = 0; i < a.length; i++) {
        var o = a[i];
        var s = tab.JsonUtil._serialize(o, pretty, nextIndent, stack);
        if (s == null) {
            s = 'undefined';
        }
        if (initialized) {
            sb.append(',');
        }
        sb.append(newLine + nextIndent + s);
        initialized = true;
    }
    sb.append(newLine + indentStr + ']');
    stack.pop();
    return sb.toString();
}
tab.JsonUtil._escapeString = function tab_JsonUtil$_escapeString(str) {
    str = ('"' + str.replace(/(["\\])/g, '\\$1') + '"');
    str = str.replace(new RegExp('[\u000c]', 'g'), '\\f');
    str = str.replace(new RegExp('[\u0008]', 'g'), '\\b');
    str = str.replace(new RegExp('[\n]', 'g'), '\\n');
    str = str.replace(new RegExp('[\t]', 'g'), '\\t');
    str = str.replace(new RegExp('[\r]', 'g'), '\\r');
    return str;
}


Type.registerNamespace('tableauSoftware');

////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.DashboardZoneType

tableauSoftware.DashboardZoneType = function() { };
tableauSoftware.DashboardZoneType.prototype = {
    SHEET: 'SHEET', 
    FILTER: 'FILTER', 
    LEGEND: 'LEGEND', 
    TITLE: 'TITLE', 
    TEXT: 'TEXT', 
    IMAGE: 'IMAGE', 
    WEB: 'WEB'
}
tableauSoftware.DashboardZoneType.registerEnum('tableauSoftware.DashboardZoneType', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.DashboardObjectType

tableauSoftware.DashboardObjectType = function() { };
tableauSoftware.DashboardObjectType.prototype = {
    BLANK: 'BLANK', 
    WORKSHEET: 'WORKSHEET', 
    QUICK_FILTER: 'QUICK_FILTER', 
    PARAMETER_CONTROL: 'PARAMETER_CONTROL', 
    PAGE_FILTER: 'PAGE_FILTER', 
    LEGEND: 'LEGEND', 
    TITLE: 'TITLE', 
    TEXT: 'TEXT', 
    IMAGE: 'IMAGE', 
    WEB_PAGE: 'WEB_PAGE', 
    LAYOUT: 'LAYOUT'
}
tableauSoftware.DashboardObjectType.registerEnum('tableauSoftware.DashboardObjectType', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.FilterType

tableauSoftware.FilterType = function() { };
tableauSoftware.FilterType.prototype = {
    CATEGORICAL: 'CATEGORICAL', 
    QUANTITATIVE: 'QUANTITATIVE', 
    HIERARCHICAL: 'HIERARCHICAL', 
    RELATIVEDATE: 'RELATIVEDATE'
}
tableauSoftware.FilterType.registerEnum('tableauSoftware.FilterType', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.ParameterDataType

tableauSoftware.ParameterDataType = function() { };
tableauSoftware.ParameterDataType.prototype = {
    FLOAT: 'FLOAT', 
    INTEGER: 'INTEGER', 
    STRING: 'STRING', 
    BOOLEAN: 'BOOLEAN', 
    DATE: 'DATE', 
    DATETIME: 'DATETIME'
}
tableauSoftware.ParameterDataType.registerEnum('tableauSoftware.ParameterDataType', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.ParameterAllowableValuesType

tableauSoftware.ParameterAllowableValuesType = function() { };
tableauSoftware.ParameterAllowableValuesType.prototype = {
    ALL: 'ALL', 
    LIST: 'LIST', 
    RANGE: 'RANGE'
}
tableauSoftware.ParameterAllowableValuesType.registerEnum('tableauSoftware.ParameterAllowableValuesType', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.PeriodType

tableauSoftware.PeriodType = function() { };
tableauSoftware.PeriodType.prototype = {
    YEAR: 'YEAR', 
    QUARTER: 'QUARTER', 
    MONTH: 'MONTH', 
    WEEK: 'WEEK', 
    DAY: 'DAY', 
    HOUR: 'HOUR', 
    MINUTE: 'MINUTE', 
    SECOND: 'SECOND'
}
tableauSoftware.PeriodType.registerEnum('tableauSoftware.PeriodType', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.DateRangeType

tableauSoftware.DateRangeType = function() { };
tableauSoftware.DateRangeType.prototype = {
    LAST: 'LAST', 
    LASTN: 'LASTN', 
    NEXT: 'NEXT', 
    NEXTN: 'NEXTN', 
    CURR: 'CURR', 
    TODATE: 'TODATE'
}
tableauSoftware.DateRangeType.registerEnum('tableauSoftware.DateRangeType', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.SheetSizeBehavior

tableauSoftware.SheetSizeBehavior = function() { };
tableauSoftware.SheetSizeBehavior.prototype = {
    AUTOMATIC: 'AUTOMATIC', 
    EXACTLY: 'EXACTLY', 
    RANGE: 'RANGE', 
    ATLEAST: 'ATLEAST', 
    ATMOST: 'ATMOST'
}
tableauSoftware.SheetSizeBehavior.registerEnum('tableauSoftware.SheetSizeBehavior', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.SheetType

tableauSoftware.SheetType = function() { };
tableauSoftware.SheetType.prototype = {
    WORKSHEET: 'WORKSHEET', 
    DASHBOARD: 'DASHBOARD'
}
tableauSoftware.SheetType.registerEnum('tableauSoftware.SheetType', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.FilterUpdateType

tableauSoftware.FilterUpdateType = function() { };
tableauSoftware.FilterUpdateType.prototype = {
    ALL: 'ALL', 
    REPLACE: 'REPLACE', 
    ADD: 'ADD', 
    REMOVE: 'REMOVE'
}
tableauSoftware.FilterUpdateType.registerEnum('tableauSoftware.FilterUpdateType', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.NullOption

tableauSoftware.NullOption = function() { };
tableauSoftware.NullOption.prototype = {
    NULL_VALUES: 'NULL_VALUES', 
    NON_NULL_VALUES: 'NON_NULL_VALUES', 
    ALL_VALUES: 'ALL_VALUES'
}
tableauSoftware.NullOption.registerEnum('tableauSoftware.NullOption', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.CommandName

tableauSoftware.CommandName = function() { };
tableauSoftware.CommandName.prototype = {
    EXPORT_IMAGE: 'EXPORT_IMAGE', 
    EXPORT_DATA: 'EXPORT_DATA', 
    EXPORT_CROSSTAB: 'EXPORT_CROSSTAB', 
    EXPORT_PDF: 'EXPORT_PDF', 
    REVERT_ALL: 'REVERT_ALL', 
    PAUSE_AUTOMATIC_UPDATES: 'PAUSE_AUTOMATIC_UPDATES', 
    RESUME_AUTOMATIC_UPDATES: 'RESUME_AUTOMATIC_UPDATES', 
    TOGGLE_AUTOMATIC_UPDATES: 'TOGGLE_AUTOMATIC_UPDATES', 
    REFRESH_DATA: 'REFRESH_DATA', 
    SHOW_SHARE_DIALOG: 'SHOW_SHARE_DIALOG', 
    DOWNLOAD_WORKBOOK: 'DOWNLOAD_WORKBOOK'
}
tableauSoftware.CommandName.registerEnum('tableauSoftware.CommandName', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.ErrorType

tableauSoftware.ErrorType = function() { };
tableauSoftware.ErrorType.prototype = {
    internaL_ERROR: 0, 
    sessioN_TIMEOUT: 1, 
    xmlhttpreuesT_NOT_SUPPORTED: 2, 
    serveR_ERROR: 3, 
    jsoN_PARSE_ERROR: 4, 
    invaliD_PARAMETER: 5, 
    invaliD_URL: 6, 
    stalE_DATA_REFERENCE: 7, 
    viZ_NOT_IN_MANAGER: 8, 
    viZ_ALREADY_IN_MANAGER: 9, 
    nO_URL_OR_PARENT_ELEMENT_NOT_FOUND: 10
}
tableauSoftware.ErrorType.registerEnum('tableauSoftware.ErrorType', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.TableauEventName

tableauSoftware.TableauEventName = function() { };
tableauSoftware.TableauEventName.prototype = {
    interactive: 'interactive', 
    marksselection: 'marksselection', 
    parametervaluechange: 'parametervaluechange', 
    filterchange: 'filterchange', 
    customviewload: 'customviewload', 
    customviewsave: 'customviewsave', 
    customviewremove: 'customviewremove', 
    customviewsetdefault: 'customviewsetdefault', 
    tabswitch: 'tabswitch'
}
tableauSoftware.TableauEventName.registerEnum('tableauSoftware.TableauEventName', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.FieldRoleType

tableauSoftware.FieldRoleType = function() { };
tableauSoftware.FieldRoleType.prototype = {
    DIMENSION: 'DIMENSION', 
    MEASURE: 'MEASURE', 
    UNKNOWN: 'UNKNOWN'
}
tableauSoftware.FieldRoleType.registerEnum('tableauSoftware.FieldRoleType', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.FieldAggregationType

tableauSoftware.FieldAggregationType = function() { };
tableauSoftware.FieldAggregationType.prototype = {
    SUM: 'SUM', 
    AVG: 'AVG', 
    MIN: 'MIN', 
    MAX: 'MAX', 
    STDEV: 'STDEV', 
    STDEVP: 'STDEVP', 
    VAR: 'VAR', 
    VARP: 'VARP', 
    COUNT: 'COUNT', 
    COUNTD: 'COUNTD', 
    MEDIAN: 'MEDIAN', 
    ATTR: 'ATTR', 
    NONE: 'NONE', 
    YEAR: 'YEAR', 
    QTR: 'QTR', 
    MONTH: 'MONTH', 
    DAY: 'DAY', 
    HOUR: 'HOUR', 
    MINUTE: 'MINUTE', 
    SECOND: 'SECOND', 
    WEEK: 'WEEK', 
    WEEKDAY: 'WEEKDAY', 
    MONTHYEAR: 'MONTHYEAR', 
    MDY: 'MDY', 
    END: 'END', 
    trunC_YEAR: 'trunC_YEAR', 
    trunC_QTR: 'trunC_QTR', 
    trunC_MONTH: 'trunC_MONTH', 
    trunC_WEEK: 'trunC_WEEK', 
    trunC_DAY: 'trunC_DAY', 
    trunC_HOUR: 'trunC_HOUR', 
    trunC_MINUTE: 'trunC_MINUTE', 
    trunC_SECOND: 'trunC_SECOND', 
    quarT1: 'quarT1', 
    quarT3: 'quarT3', 
    SKEWNESS: 'SKEWNESS', 
    KURTOSIS: 'KURTOSIS', 
    INOUT: 'INOUT', 
    suM_XSQR: 'suM_XSQR', 
    USER: 'USER'
}
tableauSoftware.FieldAggregationType.registerEnum('tableauSoftware.FieldAggregationType', false);


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.CustomView

tableauSoftware.CustomView = function tableauSoftware_CustomView(workbook, name) {
    this._workbook = workbook;
    this._name = name;
    this._isPublic = false;
    this._isDefault = false;
    this._isStale = false;
}
tableauSoftware.CustomView._getAsync = function tableauSoftware_CustomView$_getAsync(eventContext) {
    var deferred = new tab._Deferred();
    switch (eventContext.get__eventName()) {
        case 'customviewload':
            deferred.resolve(eventContext.get__workbook().get__currentCustomView());
            break;
        case 'customviewsave':
            deferred.resolve(eventContext.get__workbook().get__updatedCustomViews()._clone());
            break;
        case 'customviewremove':
            deferred.resolve(eventContext.get__workbook().get__removedCustomViews()._clone());
            break;
        case 'customviewsetdefault':
            deferred.resolve(eventContext.get__workbook().get__updatedCustomViews()._clone());
            break;
        default:
            throw Error.createError("Internal API error: unknown TableauEventName '" + eventContext.get__eventName() + "'", null);
    }
    return deferred.get_promise();
}
tableauSoftware.CustomView._createNew = function tableauSoftware_CustomView$_createNew(workbook, dict, defaultId) {
    var cv = new tableauSoftware.CustomView(workbook, dict['name']);
    cv._isPublic = dict['isPublic'];
    cv._url = dict['_sessionUrl'];
    var ownerDict = dict['owner'];
    cv._ownerName = ownerDict['friendlyName'];
    cv._isDefault = false;
    if (defaultId != null && defaultId === dict['id']) {
        cv._isDefault = true;
    }
    cv._serverCustomizedView = dict;
    return cv;
}
tableauSoftware.CustomView._removeAsync = function tableauSoftware_CustomView$_removeAsync(workbook, cv) {
    var deferred = new tab._Deferred();
    var param = {};
    param['api.customViewParam'] = cv._getServerCustomizedView();
    workbook._viz._sendCommand('api.RemoveCustomViewCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
        if (cmd._command === 'api.RemoveCustomViewCommand') {
            cv._setStale(true);
            var res = new tab._apiServerResultParser(cmd.get_parameters());
            if (res.get__result() === 'api.success') {
                var cvs = res.get__data();
                tableauSoftware.CustomView._processCustomViews(workbook, cvs);
            }
            deferred.resolve(cv);
        }
    });
    return deferred.get_promise();
}
tableauSoftware.CustomView._saveNewAsync = function tableauSoftware_CustomView$_saveNewAsync(workbook, name) {
    var deferred = new tab._Deferred();
    var param = {};
    param['api.customViewName'] = name;
    workbook._viz._sendCommand('api.SaveNewCustomViewCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
        if (cmd._command === 'api.SaveNewCustomViewCommand') {
            var res = new tab._apiServerResultParser(cmd.get_parameters());
            if (res.get__result() === 'api.success') {
                tableauSoftware.CustomView._processCustomViewUpdate(workbook, res.get__data(), true);
            }
            var newView = null;
            if (ss.isValue(workbook.get__updatedCustomViews())) {
                newView = workbook.get__updatedCustomViews().get_item(0);
            }
            deferred.resolve(newView);
        }
    });
    return deferred.get_promise();
}
tableauSoftware.CustomView._showCustomViewAsync = function tableauSoftware_CustomView$_showCustomViewAsync(workbook, serverCustomizedView) {
    var deferred = new tab._Deferred();
    var param = {};
    if (ss.isValue(serverCustomizedView)) {
        param['api.customViewParam'] = serverCustomizedView;
    }
    workbook._viz._sendCommand('api.ShowCustomViewCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
        if (cmd._command === 'api.ShowCustomViewCommand') {
            var cv = workbook.getActiveCustomView();
            deferred.resolve(cv);
        }
    });
    return deferred.get_promise();
}
tableauSoftware.CustomView._makeCurrentCustomViewDefaultAsync = function tableauSoftware_CustomView$_makeCurrentCustomViewDefaultAsync(workbook) {
    var deferred = new tab._Deferred();
    var param = {};
    workbook._viz._sendCommand('api.MakeCurrentCustomViewDefaultCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
        if (cmd._command === 'api.MakeCurrentCustomViewDefaultCommand') {
            var cv = workbook.getActiveCustomView();
            deferred.resolve(cv);
        }
    });
    return deferred.get_promise();
}
tableauSoftware.CustomView._getCustomViewsAsync = function tableauSoftware_CustomView$_getCustomViewsAsync(workbook) {
    var deferred = new tab._Deferred();
    workbook._viz._sendCommand('api.FetchCustomViewsCommand', null, function(cmd) {
        if (cmd._command === 'api.FetchCustomViewsCommand') {
            var res = new tab._apiServerResultParser(cmd.get_parameters());
            if (res.get__result() === 'api.success') {
                var cvs = res.get__data();
                tableauSoftware.CustomView._processCustomViews(workbook, cvs);
            }
            deferred.resolve(workbook.get__customViews()._clone());
        }
    });
    return deferred.get_promise();
}
tableauSoftware.CustomView._getRemovedAsync = function tableauSoftware_CustomView$_getRemovedAsync(workbook) {
    var deferred = new tab._Deferred();
    workbook._viz._sendCommand('api.FetchCustomViewsCommand', null, function(cmd) {
        if (cmd._command === 'api.FetchCustomViewsCommand') {
            var res = new tab._apiServerResultParser(cmd.get_parameters());
            if (res.get__result() === 'api.success') {
                var cvs = res.get__data();
                tableauSoftware.CustomView._processCustomViews(workbook, cvs);
            }
            deferred.resolve(workbook.get__removedCustomViews());
        }
    });
    return deferred.get_promise();
}
tableauSoftware.CustomView._processCustomViews = function tableauSoftware_CustomView$_processCustomViews(workbook, info) {
    tableauSoftware.CustomView._processCustomViewUpdate(workbook, info, false);
}
tableauSoftware.CustomView._processCustomViewUpdate = function tableauSoftware_CustomView$_processCustomViewUpdate(workbook, info, doUpdateList) {
    if (doUpdateList) {
        workbook.set__updatedCustomViews(new tab._Collection());
    }
    workbook.set__currentCustomView(null);
    var currentViewName = null;
    if (ss.isValue(info['currentView'])) {
        var currView = info['currentView'];
        currentViewName = currView['name'];
    }
    var defaultId = null;
    if (ss.isValue(info['defaultId'])) {
        defaultId = info['defaultId'];
    }
    if (ss.isValue(info['list'])) {
        var list = info['list'];
        if (list.length > 0) {
            workbook.set__removedCustomViews(workbook.get__customViews());
            workbook.set__customViews(new tab._Collection());
            for (var i = 0; i < list.length; i++) {
                var cv = tableauSoftware.CustomView._createNew(workbook, list[i], defaultId);
                workbook.get__customViews()._add(cv.getName(), cv);
                if (workbook.get__removedCustomViews()._find(cv.getName()) >= 0) {
                    workbook.get__removedCustomViews()._remove(cv.getName());
                }
                else if (doUpdateList) {
                    workbook.get__updatedCustomViews()._add(cv.getName(), cv);
                }
                if (ss.isValue(currentViewName) && cv.getName() === currentViewName) {
                    workbook.set__currentCustomView(cv);
                }
            }
        }
    }
}
tableauSoftware.CustomView.prototype = {
    _serverCustomizedView: null,
    _workbook: null,
    _name: null,
    _ownerName: null,
    _url: null,
    _isPublic: false,
    _isDefault: false,
    _isStale: false,
    
    getWorkbook: function tableauSoftware_CustomView$getWorkbook() {
        return this._workbook;
    },
    
    getUrl: function tableauSoftware_CustomView$getUrl() {
        return this._url;
    },
    
    getName: function tableauSoftware_CustomView$getName() {
        return this._name;
    },
    
    setName: function tableauSoftware_CustomView$setName(value) {
        if (this._isStale) {
            throw tab._tableauException._create(7, 'Stale data');
        }
        this._name = value;
    },
    
    getOwnerName: function tableauSoftware_CustomView$getOwnerName() {
        return this._ownerName;
    },
    
    getAdvertised: function tableauSoftware_CustomView$getAdvertised() {
        return this._isPublic;
    },
    
    setAdvertised: function tableauSoftware_CustomView$setAdvertised(value) {
        if (this._isStale) {
            throw tab._tableauException._create(7, 'Stale data');
        }
        this._isPublic = value;
    },
    
    getDefault: function tableauSoftware_CustomView$getDefault() {
        return this._isDefault;
    },
    
    showAsync: function tableauSoftware_CustomView$showAsync() {
        if (this._isStale || ss.isNullOrUndefined(this._serverCustomizedView)) {
            throw tab._tableauException._create(7, 'Stale data');
        }
        return tableauSoftware.CustomView._showCustomViewAsync(this._workbook, this._serverCustomizedView);
    },
    
    saveAsync: function tableauSoftware_CustomView$saveAsync() {
        if (this._isStale) {
            throw tab._tableauException._create(7, 'Stale data');
        }
        this._serverCustomizedView['isPublic'] = this._isPublic;
        this._serverCustomizedView['isDefault'] = this._isDefault;
        this._serverCustomizedView['name'] = this._name;
        var deferred = new tab._Deferred();
        var param = {};
        param['api.customViewParam'] = this._serverCustomizedView;
        this._workbook._viz._sendCommand('api.UpdateCustomViewCommand', tab.JsonUtil.toJson(param, false, ''), ss.Delegate.create(this, function(cmd) {
            if (cmd._command === 'api.UpdateCustomViewCommand') {
                var res = new tab._apiServerResultParser(cmd.get_parameters());
                if (res.get__result() === 'api.success') {
                    tableauSoftware.CustomView._processCustomViewUpdate(this._workbook, res.get__data(), true);
                }
                deferred.resolve(this);
            }
        }));
        return deferred.get_promise();
    },
    
    _setStale: function tableauSoftware_CustomView$_setStale(val) {
        this._isStale = val;
    },
    
    _getServerCustomizedView: function tableauSoftware_CustomView$_getServerCustomizedView() {
        return this._serverCustomizedView;
    },
    
    _isDifferent: function tableauSoftware_CustomView$_isDifferent(other) {
        return (this._ownerName !== other._ownerName || this._url !== other._url || this._isPublic !== other._isPublic || this._isDefault !== other._isDefault);
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab.CustomViewEvent

tab.CustomViewEvent = function tab_CustomViewEvent(eventName, viz) {
    tab.CustomViewEvent.initializeBase(this, [ eventName, viz ]);
    this._context$1 = new tab._customViewEventContext(viz.getWorkbook(), this.getEventName());
}
tab.CustomViewEvent.prototype = {
    _context$1: null,
    
    getAsync: function tab_CustomViewEvent$getAsync() {
        return tableauSoftware.CustomView._getAsync(this._context$1);
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab._customViewEventContext

tab._customViewEventContext = function tab__customViewEventContext(workbook, eventName) {
    tab._customViewEventContext.initializeBase(this, [ workbook, null ]);
    this._eventName$1 = eventName;
}
tab._customViewEventContext.prototype = {
    _eventName$1: null,
    
    get__eventName: function tab__customViewEventContext$get__eventName() {
        return this._eventName$1;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.Dashboard

tableauSoftware.Dashboard = function tableauSoftware_Dashboard(jsonObject, workbook) {
    tableauSoftware.Dashboard.initializeBase(this, [ jsonObject, workbook ]);
    this._dashboardObjects$1 = new tab._Collection();
    this._worksheets$1 = new tab._Collection();
    this._activeObject$1 = null;
    this._type = 'DASHBOARD';
}
tableauSoftware.Dashboard.prototype = {
    _dashboardObjects$1: null,
    _activeObject$1: null,
    _worksheets$1: null,
    
    getObjects: function tableauSoftware_Dashboard$getObjects() {
        return this._dashboardObjects$1._clone();
    },
    
    getActiveObject: function tableauSoftware_Dashboard$getActiveObject() {
        return this._activeObject$1;
    },
    
    getWorksheets: function tableauSoftware_Dashboard$getWorksheets() {
        return this._worksheets$1._clone();
    },
    
    _addObjects: function tableauSoftware_Dashboard$_addObjects(frames) {
        var sheets = this._workbook._sheets;
        for (var i = 0; i < frames.length; i++) {
            if (ss.isValue(frames[i]._name) && frames[i]._name.length > 0) {
                var sheet = sheets.get_item(frames[i]._name);
                var obj = new tableauSoftware.DashboardObject(sheet, this);
                obj._setupInfo(frames[i]);
                this._dashboardObjects$1._add(i.toString(), obj);
                if (frames[i]._type === 'WORKSHEET') {
                    this._worksheets$1._add(frames[i]._name, sheet);
                }
            }
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.DashboardObject

tableauSoftware.DashboardObject = function tableauSoftware_DashboardObject(worksheet, dashboard) {
    this._worksheet = worksheet;
    this._dashboard = dashboard;
}
tableauSoftware.DashboardObject.prototype = {
    _worksheet: null,
    _dashboard: null,
    _frameInfo: null,
    
    getObjectType: function tableauSoftware_DashboardObject$getObjectType() {
        if (ss.isValue(this._frameInfo)) {
            return this._frameInfo._type;
        }
        return 'BLANK';
    },
    
    getWorksheet: function tableauSoftware_DashboardObject$getWorksheet() {
        if (this._frameInfo._type === 'WORKSHEET') {
            return this._worksheet;
        }
        return null;
    },
    
    getPosition: function tableauSoftware_DashboardObject$getPosition() {
        if (ss.isValue(this._frameInfo)) {
            return this._frameInfo._position;
        }
        return null;
    },
    
    getSize: function tableauSoftware_DashboardObject$getSize() {
        if (ss.isValue(this._frameInfo)) {
            return this._frameInfo._size;
        }
        return null;
    },
    
    _setupInfo: function tableauSoftware_DashboardObject$_setupInfo(frame) {
        this._frameInfo = frame;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.DataSource

tableauSoftware.DataSource = function tableauSoftware_DataSource(name, isPrimary) {
    this._name = name;
    this._fields = new tab._Collection();
    this._isPrimary = isPrimary;
}
tableauSoftware.DataSource._getDataSourcesAsync = function tableauSoftware_DataSource$_getDataSourcesAsync(sheet) {
    var deferred = new tab._Deferred();
    var param = {};
    param['api.worksheetName'] = sheet.getName();
    sheet._workbook._viz._sendCommand('api.GetDataSourcesCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
        if (cmd._command === 'api.GetDataSourcesCommand') {
            var res = new tab._apiServerResultParser(cmd.get_parameters());
            if (res.get__result() === 'api.success') {
                var dataSourcesDict = res.get__data();
                var dataSources = tableauSoftware.DataSource._processDataSources(dataSourcesDict);
                sheet.set__dataSources(dataSources);
                deferred.resolve(dataSources._clone());
            }
            else {
                deferred.reject(tab._tableauException._create(3, res.get__data()));
            }
        }
    });
    return deferred.get_promise();
}
tableauSoftware.DataSource._processDataSources = function tableauSoftware_DataSource$_processDataSources(dataSourcesDict) {
    var priDataSource = dataSourcesDict.primaryDatasource;
    var paramDataSource = dataSourcesDict.parametersDatasource;
    var dataSources = new tab._Collection();
    var primaryDataSource = null;
    var list = dataSourcesDict.dataSourceList;
    for (var i = 0; i < list.length; i++) {
        var model = list[i];
        if (model.name === paramDataSource) {
            continue;
        }
        var ds = new tableauSoftware.DataSource(model.name, (model.name === priDataSource));
        if (ds.getIsPrimary()) {
            primaryDataSource = ds;
        }
        else {
            dataSources._add(model.name, ds);
        }
        for (var j = 0; j < model.fieldList.length; j++) {
            var fm = model.fieldList[j];
            var fieldRoleType;
            var fieldAggrType;
            if (ss.isValue(fm.columnList)) {
                var columns = fm.columnList;
                for (var columnIndex = 0, len = columns.length; columnIndex < len; columnIndex++) {
                    var column = columns[columnIndex];
                    fieldRoleType = tableauSoftware.DataSource._processRoleType(column.fieldRole);
                    fieldAggrType = tableauSoftware.DataSource._processAggrType(column.aggregation);
                    var field = new tableauSoftware.Field(ds, column.name, fieldRoleType, fieldAggrType);
                    ds._addField(field);
                }
            }
            else {
                fieldRoleType = tableauSoftware.DataSource._processRoleType(fm.defaultFieldRole);
                fieldAggrType = tableauSoftware.DataSource._processAggrType(fm.defaultAggregation);
                var field = new tableauSoftware.Field(ds, fm.name, fieldRoleType, fieldAggrType);
                ds._addField(field);
            }
        }
    }
    if (ss.isValue(primaryDataSource)) {
        dataSources._addToFirst(primaryDataSource.getName(), primaryDataSource);
    }
    return dataSources;
}
tableauSoftware.DataSource._processAggrType = function tableauSoftware_DataSource$_processAggrType(aggrType) {
    if (ss.isValue(aggrType) && ss.isValue(tableauSoftware.DataSource._fieldAggrDict[aggrType])) {
        return tableauSoftware.DataSource._fieldAggrDict[aggrType];
    }
    return 'NONE';
}
tableauSoftware.DataSource._processRoleType = function tableauSoftware_DataSource$_processRoleType(roleType) {
    if (ss.isValue(roleType)) {
        if (roleType === 'dimension') {
            return 'DIMENSION';
        }
        else if (roleType === 'measure') {
            return 'MEASURE';
        }
    }
    return 'UNKNOWN';
}
tableauSoftware.DataSource.prototype = {
    _name: null,
    _fields: null,
    _isPrimary: false,
    
    getName: function tableauSoftware_DataSource$getName() {
        return this._name;
    },
    
    getFields: function tableauSoftware_DataSource$getFields() {
        return this._fields._clone();
    },
    
    getIsPrimary: function tableauSoftware_DataSource$getIsPrimary() {
        return this._isPrimary;
    },
    
    _addField: function tableauSoftware_DataSource$_addField(field) {
        this._fields._add(field.getName(), field);
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.Field

tableauSoftware.Field = function tableauSoftware_Field(dataSource, name, fieldRoleType, fieldAggrType) {
    this._dataSource = dataSource;
    this._name = name;
    this._fieldRoleType = fieldRoleType;
    this._fieldAggrType = fieldAggrType;
}
tableauSoftware.Field.prototype = {
    _dataSource: null,
    _name: null,
    _fieldRoleType: null,
    _fieldAggrType: null,
    
    getDataSource: function tableauSoftware_Field$getDataSource() {
        return this._dataSource;
    },
    
    getName: function tableauSoftware_Field$getName() {
        return this._name;
    },
    
    getRole: function tableauSoftware_Field$getRole() {
        return this._fieldRoleType;
    },
    
    getAggregation: function tableauSoftware_Field$getAggregation() {
        return this._fieldAggrType;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.FieldInfo

tableauSoftware.FieldInfo = function tableauSoftware_FieldInfo() {
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.CategoricalFilter

tableauSoftware.CategoricalFilter = function tableauSoftware_CategoricalFilter(worksheet, filterJson) {
    tableauSoftware.CategoricalFilter.initializeBase(this, [ worksheet, filterJson ]);
    this._initializeFromJson$1(filterJson);
}
tableauSoftware.CategoricalFilter.prototype = {
    _isExclude$1: false,
    _appliedValues$1: null,
    
    getIsExcludeMode: function tableauSoftware_CategoricalFilter$getIsExcludeMode() {
        return this._isExclude$1;
    },
    
    getAppliedValues: function tableauSoftware_CategoricalFilter$getAppliedValues() {
        return this._appliedValues$1;
    },
    
    updateFromJson: function tableauSoftware_CategoricalFilter$updateFromJson(filterJson) {
        this._initializeFromJson$1(filterJson);
    },
    
    _initializeFromJson$1: function tableauSoftware_CategoricalFilter$_initializeFromJson$1(filterJson) {
        if (ss.isValue(filterJson['exclude'])) {
            this._isExclude$1 = filterJson['exclude'];
        }
        if (ss.isValue(filterJson['table'])) {
            var table = filterJson['table'];
            if (ss.isValue(table['tuples'])) {
                var tuples = table['tuples'];
                var list = [];
                for (var i = 0; i < tuples.length; i++) {
                    var tuple = tuples[i];
                    if (ss.isValue(tuple['s']) && tuple['s']) {
                        var t = tuple['t'];
                        list.push(t[0]['v']);
                    }
                }
                this._appliedValues$1 = list;
            }
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.Filter

tableauSoftware.Filter = function tableauSoftware_Filter(worksheet, filterJson) {
    this._worksheet = worksheet;
    this._initializeFromJson(filterJson);
}
tableauSoftware.Filter._getAsync = function tableauSoftware_Filter$_getAsync(eventContext) {
    var deferred = new tab._Deferred();
    var worksheet = eventContext.get__worksheet();
    var param = {};
    param['api.worksheetName'] = worksheet.getName();
    param['api.fieldName'] = eventContext.get__filterName();
    param['api.filterHierarchicalLevels'] = 0;
    worksheet._workbook._viz._sendCommand('api.GetOneFilterInfoCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
        if (cmd._command === 'api.GetOneFilterInfoCommand') {
            var res = new tab._apiServerResultParser(cmd.get_parameters());
            if (res.get__result() === 'api.success') {
                var filterJson = JSON.parse(res.get__data());
                var filter = tableauSoftware.Filter._createFilter(worksheet, filterJson);
                deferred.resolve(filter);
            }
            else {
                deferred.reject(tab._tableauException._create(3, res.get__data()));
            }
        }
    });
    return deferred.get_promise();
}
tableauSoftware.Filter._getFiltersAsync = function tableauSoftware_Filter$_getFiltersAsync(worksheet) {
    var deferred = new tab._Deferred();
    var param = {};
    param['api.worksheetName'] = worksheet.getName();
    worksheet._workbook._viz._sendCommand('api.GetFiltersListCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
        if (cmd._command === 'api.GetFiltersListCommand') {
            var res = new tab._apiServerResultParser(cmd.get_parameters());
            if (res.get__result() === 'api.success') {
                var filtersListJson = JSON.parse(res.get__data());
                worksheet.set__filters(tableauSoftware.Filter._processFiltersList(worksheet, filtersListJson));
                deferred.resolve(worksheet.get__filters()._clone());
            }
            else {
                deferred.reject(tab._tableauException._create(3, res.get__data()));
            }
        }
    });
    return deferred.get_promise();
}
tableauSoftware.Filter._createFilter = function tableauSoftware_Filter$_createFilter(worksheet, filterDict) {
    if (filterDict['type'] === 'C') {
        return new tableauSoftware.CategoricalFilter(worksheet, filterDict);
    }
    else if (filterDict['type'] === 'RD') {
        return new tableauSoftware.RelativeDateFilter(worksheet, filterDict);
    }
    else if (filterDict['type'] === 'H') {
        return new tableauSoftware.HierarchicalFilter(worksheet, filterDict);
    }
    else if (filterDict['type'] === 'Q') {
        return new tableauSoftware.QuantitativeFilter(worksheet, filterDict);
    }
    return null;
}
tableauSoftware.Filter._processFiltersList = function tableauSoftware_Filter$_processFiltersList(sheet, filtersListDict) {
    var filters = new tab._Collection();
    for (var i = 0; i < filtersListDict.length; i++) {
        var filter = tableauSoftware.Filter._createFilter(sheet, filtersListDict[i]);
        if (filter != null) {
            filters._add(filter.getFieldName(), filter);
        }
    }
    return filters;
}
tableauSoftware.Filter.prototype = {
    fieldName: null,
    _worksheet: null,
    _type: null,
    _caption: null,
    
    getFilterType: function tableauSoftware_Filter$getFilterType() {
        return this._type;
    },
    
    getFieldName: function tableauSoftware_Filter$getFieldName() {
        return this._caption;
    },
    
    getWorksheet: function tableauSoftware_Filter$getWorksheet() {
        return this._worksheet;
    },
    
    getFieldAsync: function tableauSoftware_Filter$getFieldAsync() {
        var deferred = new tab._Deferred();
        var param = {};
        param['api.worksheetName'] = this._worksheet.getName();
        param['api.fieldName'] = this.fieldName;
        this._addFieldParams(param);
        this._worksheet._workbook._viz._sendCommand('api.GetOneFilterInfoCommand', tab.JsonUtil.toJson(param, false, ''), ss.Delegate.create(this, function(cmd) {
            if (cmd._command === 'api.GetOneFilterInfoCommand') {
                var res = new tab._apiServerResultParser(cmd.get_parameters());
                if (res.get__result() === 'api.success') {
                    var filterJson = JSON.parse(res.get__data());
                    this._update(filterJson);
                    deferred.resolve(null);
                }
                else {
                    deferred.reject(tab._tableauException._create(3, res.get__data()));
                }
            }
        }));
        return deferred.get_promise();
    },
    
    _update: function tableauSoftware_Filter$_update(filterJson) {
        this._initializeFromJson(filterJson);
        this.updateFromJson(filterJson);
    },
    
    _addFieldParams: function tableauSoftware_Filter$_addFieldParams(param) {
    },
    
    _initializeFromJson: function tableauSoftware_Filter$_initializeFromJson(filterJson) {
        this.fieldName = filterJson['fieldName'];
        this._caption = filterJson['caption'];
        if (filterJson['type'] === 'C') {
            this._type = 'CATEGORICAL';
        }
        else if (filterJson['type'] === 'RD') {
            this._type = 'RELATIVEDATE';
        }
        else if (filterJson['type'] === 'H') {
            this._type = 'HIERARCHICAL';
        }
        else if (filterJson['type'] === 'Q') {
            this._type = 'QUANTITATIVE';
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab.FilterEvent

tab.FilterEvent = function tab_FilterEvent(eventName, viz, worksheet, fieldName) {
    tab.FilterEvent.initializeBase(this, [ eventName, viz, worksheet ]);
    this._context$2 = new tab._filterEventContext(viz.getWorkbook(), worksheet, fieldName);
}
tab.FilterEvent.prototype = {
    _context$2: null,
    
    getAsync: function tab_FilterEvent$getAsync() {
        return tableauSoftware.Filter._getAsync(this._context$2);
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab._filterEventContext

tab._filterEventContext = function tab__filterEventContext(workbook, worksheet, fieldName) {
    tab._filterEventContext.initializeBase(this, [ workbook, worksheet ]);
    this._fieldName$1 = fieldName;
}
tab._filterEventContext.prototype = {
    _fieldName$1: null,
    
    get__filterName: function tab__filterEventContext$get__filterName() {
        return this._fieldName$1;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.HierarchicalFilter

tableauSoftware.HierarchicalFilter = function tableauSoftware_HierarchicalFilter(worksheet, filterJson) {
    tableauSoftware.HierarchicalFilter.initializeBase(this, [ worksheet, filterJson ]);
    this._initializeFromJson$1(filterJson);
}
tableauSoftware.HierarchicalFilter.prototype = {
    _appliedFieldNames$1: null,
    _appliedValuesMap$1: null,
    _levels$1: 0,
    
    getAppliedFieldNames: function tableauSoftware_HierarchicalFilter$getAppliedFieldNames() {
        return this._appliedFieldNames$1;
    },
    
    _addFieldParams: function tableauSoftware_HierarchicalFilter$_addFieldParams(param) {
        param['api.filterHierarchicalLevels'] = this._levels$1;
    },
    
    updateFromJson: function tableauSoftware_HierarchicalFilter$updateFromJson(filterJson) {
        this._initializeFromJson$1(filterJson);
    },
    
    _initializeFromJson$1: function tableauSoftware_HierarchicalFilter$_initializeFromJson$1(filterJson) {
        this._levels$1 = 0;
        if (ss.isValue(filterJson['levels'])) {
            this._levels$1 = (filterJson['levels']).length;
        }
        if (ss.isValue(filterJson['table'])) {
            this._appliedValuesMap$1 = {};
            this._appliedFieldNames$1 = [];
            var table = filterJson['table'];
            for (var i = 0; i < table.length; i++) {
                var item = table[i];
                if (ss.isValue(item['table'])) {
                    this._processTable$1(item['table']);
                }
                if (ss.isValue(item['children'])) {
                    this._processChildren$1(item['children']);
                }
            }
        }
    },
    
    _processChildren$1: function tableauSoftware_HierarchicalFilter$_processChildren$1(children) {
        for (var i = 0; i < children.length; i++) {
            var child = children[i];
            if (ss.isValue(child['table'])) {
                var table = child['table'];
                this._processTable$1(table);
            }
            if (ss.isValue(child['children'])) {
                this._processChildren$1(child['children']);
            }
        }
    },
    
    _processTable$1: function tableauSoftware_HierarchicalFilter$_processTable$1(table) {
        if (ss.isValue(table['tuples'])) {
            this._processTuples$1(table['tuples']);
        }
    },
    
    _processTuples$1: function tableauSoftware_HierarchicalFilter$_processTuples$1(tuples) {
        for (var i = 0; i < tuples.length; i++) {
            var tuple = tuples[i];
            if (tuple['s']) {
                var values = this._processTupleValue$1(tuple);
                var value = values[values.length - 1];
                if (!ss.isValue(this._appliedValuesMap$1[value])) {
                    this._appliedValuesMap$1[value] = 0;
                    this._appliedFieldNames$1.push(value);
                }
            }
        }
    },
    
    _processTupleValue$1: function tableauSoftware_HierarchicalFilter$_processTupleValue$1(tuple) {
        var list = null;
        if (ss.isValue(tuple['t'])) {
            list = [];
            var t = tuple['t'];
            for (var j = 0; j < t.length; j++) {
                var value = t[j]['v'];
                list.push(value);
            }
        }
        return list;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.QuantitativeFilter

tableauSoftware.QuantitativeFilter = function tableauSoftware_QuantitativeFilter(worksheet, filterJson) {
    tableauSoftware.QuantitativeFilter.initializeBase(this, [ worksheet, filterJson ]);
    this._initializeFromJson$1(filterJson);
}
tableauSoftware.QuantitativeFilter.prototype = {
    _domainMinValue$1: null,
    _domainMaxValue$1: null,
    _minValue$1: null,
    _maxValue$1: null,
    _includeNullValues$1: false,
    
    getMinValue: function tableauSoftware_QuantitativeFilter$getMinValue() {
        return this._minValue$1;
    },
    
    getMaxValue: function tableauSoftware_QuantitativeFilter$getMaxValue() {
        return this._maxValue$1;
    },
    
    getIncludeNullValues: function tableauSoftware_QuantitativeFilter$getIncludeNullValues() {
        return this._includeNullValues$1;
    },
    
    getDomainMinValue: function tableauSoftware_QuantitativeFilter$getDomainMinValue() {
        return this._domainMinValue$1;
    },
    
    getDomainMaxValue: function tableauSoftware_QuantitativeFilter$getDomainMaxValue() {
        return this._domainMaxValue$1;
    },
    
    updateFromJson: function tableauSoftware_QuantitativeFilter$updateFromJson(filterJson) {
        this._initializeFromJson$1(filterJson);
    },
    
    _initializeFromJson$1: function tableauSoftware_QuantitativeFilter$_initializeFromJson$1(filterJson) {
        if (ss.isValue(filterJson['range'])) {
            var range = filterJson['range'];
            if (ss.isValue(range['min'])) {
                var min = range['min'];
                if (ss.isValue(min['v'])) {
                    this._domainMinValue$1 = min['v'];
                }
            }
            if (ss.isValue(range['max'])) {
                var max = range['max'];
                if (ss.isValue(max['v'])) {
                    this._domainMaxValue$1 = max['v'];
                }
            }
        }
        if (ss.isValue(filterJson['table'])) {
            var table = filterJson['table'];
            if (ss.isValue(table['min'])) {
                var min = table['min'];
                if (ss.isValue(min['v'])) {
                    this._minValue$1 = min['v'];
                }
            }
            if (ss.isValue(table['max'])) {
                var max = table['max'];
                if (ss.isValue(max['v'])) {
                    this._maxValue$1 = max['v'];
                }
            }
            if (ss.isValue(table['included'])) {
                var inclValue = table['included'];
                this._includeNullValues$1 = (inclValue === 'include-all' || inclValue === 'include-null' || inclValue === 'include-range-or-null');
            }
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.RelativeDateFilter

tableauSoftware.RelativeDateFilter = function tableauSoftware_RelativeDateFilter(worksheet, filterJson) {
    tableauSoftware.RelativeDateFilter.initializeBase(this, [ worksheet, filterJson ]);
    this._periodType$1 = 'YEAR';
    this._rangeType$1 = 'LAST';
    this._rangeN$1 = 0;
    this._initializeFromJson$1(filterJson);
}
tableauSoftware.RelativeDateFilter.prototype = {
    _periodType$1: null,
    _rangeType$1: null,
    _rangeN$1: 0,
    
    getPeriod: function tableauSoftware_RelativeDateFilter$getPeriod() {
        return this._periodType$1;
    },
    
    getRange: function tableauSoftware_RelativeDateFilter$getRange() {
        return this._rangeType$1;
    },
    
    getRangeN: function tableauSoftware_RelativeDateFilter$getRangeN() {
        return this._rangeN$1;
    },
    
    updateFromJson: function tableauSoftware_RelativeDateFilter$updateFromJson(filterJson) {
        this._initializeFromJson$1(filterJson);
    },
    
    _initializeFromJson$1: function tableauSoftware_RelativeDateFilter$_initializeFromJson$1(filterJson) {
        var table = filterJson['table'];
        if (ss.isNullOrUndefined(table)) {
            return;
        }
        if (ss.isValue(table['periodType'])) {
            var period = (table['periodType']).toUpperCase();
            if (period === 'YEAR') {
                this._periodType$1 = 'YEAR';
            }
            else if (period === 'QUARTER') {
                this._periodType$1 = 'QUARTER';
            }
            else if (period === 'MONTH') {
                this._periodType$1 = 'MONTH';
            }
            else if (period === 'WEEK') {
                this._periodType$1 = 'WEEK';
            }
            else if (period === 'DAY') {
                this._periodType$1 = 'DAY';
            }
            else if (period === 'HOUR') {
                this._periodType$1 = 'HOUR';
            }
            else if (period === 'MINUTE') {
                this._periodType$1 = 'MINUTE';
            }
            else if (period === 'SECOND') {
                this._periodType$1 = 'SECOND';
            }
        }
        if (ss.isValue(table['rangeN'])) {
            var range = (table['rangeType']).toUpperCase();
            if (range === 'LAST') {
                this._rangeType$1 = 'LAST';
            }
            else if (range === 'LASTN') {
                this._rangeType$1 = 'LASTN';
            }
            else if (range === 'NEXT') {
                this._rangeType$1 = 'NEXT';
            }
            else if (range === 'NEXTN') {
                this._rangeType$1 = 'NEXTN';
            }
            else if (range === 'CURR') {
                this._rangeType$1 = 'CURR';
            }
            else if (range === 'TODATE') {
                this._rangeType$1 = 'TODATE';
            }
        }
        if (ss.isValue(table['rangeType'])) {
            this._rangeN$1 = table['rangeN'];
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.FrameInfo

tableauSoftware.FrameInfo = function tableauSoftware_FrameInfo() {
}
tableauSoftware.FrameInfo.prototype = {
    _type: null,
    _name: null,
    _position: null,
    _size: null,
    _attributes: null,
    _categorical: false,
    _visible: false,
    _param: null,
    _url: null
}


////////////////////////////////////////////////////////////////////////////////
// tab._loadFeedback

tab._loadFeedback = function tab__loadFeedback() {
}
tab._loadFeedback.prototype = {
    _placeholderDiv: null,
    _glassPaneElement: null,
    _displayStyle: null,
    
    _createLoadingFeedback: function tab__loadFeedback$_createLoadingFeedback(objectParams) {
        this._placeholderDiv = objectParams.parentElement;
        var placeholderStyle = this._placeholderDiv.style;
        this._displayStyle = placeholderStyle.display;
        placeholderStyle.position = 'relative';
        placeholderStyle.overflow = 'hidden';
        placeholderStyle.display = 'none';
        var html = [];
        html.push('<div style="position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 0; padding: 0; margin: 0">');
        html.push('</div>');
        var tempDiv = document.createElement('div');
        tempDiv.innerHTML = html.join('');
        this._glassPaneElement = tempDiv.firstChild;
        this._placeholderDiv.appendChild(this._glassPaneElement);
        tempDiv.innerHTML = '';
        tempDiv = null;
    },
    
    _show: function tab__loadFeedback$_show() {
        if (ss.isValue(this._placeholderDiv)) {
            this._placeholderDiv.style.display = this._displayStyle;
        }
    },
    
    _dispose: function tab__loadFeedback$_dispose() {
        if (ss.isValue(this._glassPaneElement)) {
            this._glassPaneElement.innerHTML = '';
            this._glassPaneElement.parentNode.removeChild(this._glassPaneElement);
            this._glassPaneElement = null;
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab._Utility

tab._Utility = function tab__Utility() {
}
tab._Utility.hasOwnProperty = function tab__Utility$hasOwnProperty(obj, field) {
    return obj.hasOwnProperty(field);
}
tab._Utility.isNullOrEmpty = function tab__Utility$isNullOrEmpty(obj) {
    return ss.isNullOrUndefined(obj) || (obj['length'] || 0) <= 0;
}
tab._Utility.isString = function tab__Utility$isString(obj) {
    return typeof(obj) === 'string';
}
tab._Utility.isDate = function tab__Utility$isDate(obj) {
    if (typeof(obj) === 'object' && (obj instanceof Date)) {
        return true;
    }
    else if (Object.prototype.toString.call(obj) !== '[object Date]') {
        return false;
    }
    return !(isNaN(obj.getTime()));
}
tab._Utility.indexOf = function tab__Utility$indexOf(array, searchElement, fromIndex) {
    if (ss.isValue((Array).prototype['indexOf'])) {
        return array.indexOf(searchElement, fromIndex);
    }
    fromIndex = (fromIndex || 0);
    var length = array.length;
    if (length > 0) {
        for (var index = fromIndex; index < length; index++) {
            if (array[index] === searchElement) {
                return index;
            }
        }
    }
    return -1;
}
tab._Utility.contains = function tab__Utility$contains(array, searchElement, fromIndex) {
    var index = tab._Utility.indexOf(array, searchElement, fromIndex);
    return index >= 0;
}
tab._Utility.createXhr = function tab__Utility$createXhr() {
    try {
        return new XMLHttpRequest();
    }
    catch ($e1) {
    }
    try {
        return new ActiveXObject('Microsoft.XMLHTTP');
    }
    catch ($e2) {
    }
    throw tab._tableauException._create(2, 'XMLHttpRequest not supported');
}
tab._Utility.getTopmostWindow = function tab__Utility$getTopmostWindow() {
    var win = window.self;
    while (ss.isValue(win.parent) && win.parent !== win) {
        win = win.parent;
    }
    return win;
}
tab._Utility.toBoolean = function tab__Utility$toBoolean(value, defaultIfMissing) {
    var positiveRegex = new RegExp('^(yes|y|true|t|1)$', 'i');
    if (tab._Utility.isNullOrEmpty(value)) {
        return defaultIfMissing;
    }
    var match = value.match(positiveRegex);
    return !tab._Utility.isNullOrEmpty(match);
}
tab._Utility.hasClass = function tab__Utility$hasClass(element, className) {
    var regexClass = new RegExp('[\\n\\t\\r]', 'g');
    return ss.isValue(element) && (' ' + element.className + ' ').replace(regexClass, ' ').indexOf(' ' + className + ' ') > -1;
}
tab._Utility.findParentWithClassName = function tab__Utility$findParentWithClassName(element, className, stopAtElement) {
    var parent = (ss.isValue(element)) ? element.parentNode : null;
    stopAtElement = (stopAtElement || document.body);
    while (parent != null) {
        if (tab._Utility.hasClass(parent, className)) {
            return parent;
        }
        if (parent === stopAtElement) {
            parent = null;
        }
        else {
            parent = parent.parentNode;
        }
    }
    return parent;
}
tab._Utility.hasWindowPostMessage = function tab__Utility$hasWindowPostMessage() {
    return ss.isValue(window.postMessage);
}
tab._Utility.hasDocumentAddEventListener = function tab__Utility$hasDocumentAddEventListener() {
    return ss.isValue(document.addEventListener);
}
tab._Utility.hasDocumentAttachEvent = function tab__Utility$hasDocumentAttachEvent() {
    return ss.isValue(document.attachEvent);
}
tab._Utility.hasWindowAddEventListener = function tab__Utility$hasWindowAddEventListener() {
    return ss.isValue(window.addEventListener);
}
tab._Utility.isElementOfTag = function tab__Utility$isElementOfTag(element, tagName) {
    return ss.isValue(element) && element.nodeType === 1 && element.tagName.toLowerCase() === tagName.toLowerCase();
}
tab._Utility.tableauGCS = function tab__Utility$tableauGCS(e) {
    if (ss.isValue(window.getComputedStyle)) {
        return window.getComputedStyle(e);
    }
    else {
        return e.currentStyle;
    }
}
tab._Utility.isIE = function tab__Utility$isIE() {
    return window.navigator.userAgent.indexOf('MSIE') > -1 && ss.isNullOrUndefined(window.opera);
}
tab._Utility.mobileDetect = function tab__Utility$mobileDetect() {
    var ua = window.navigator.userAgent;
    if (ua.indexOf('iPad') !== -1) {
        return true;
    }
    if (ua.indexOf('Android') !== -1) {
        return true;
    }
    if ((ua.indexOf('AppleWebKit') !== -1) && (ua.indexOf('Mobile') !== -1)) {
        return true;
    }
    return false;
}
tab._Utility.elementPosition = function tab__Utility$elementPosition(el) {
    var ret = {};
    ret.y = 0;
    ret.x = 0;
    while (!ss.isNullOrUndefined(el)) {
        ret.y += el.offsetTop;
        ret.x += el.offsetLeft;
        el = el.offsetParent;
    }
    return ret;
}


////////////////////////////////////////////////////////////////////////////////
// tab._VizCollection

tab._VizCollection = function tab__VizCollection() {
    this._vizList = [];
}
tab._VizCollection.prototype = {
    
    get__length: function tab__VizCollection$get__length() {
        return this._vizList.length;
    },
    
    _clone: function tab__VizCollection$_clone() {
        return this._vizList.concat();
    },
    
    _add: function tab__VizCollection$_add(viz) {
        var key = viz.getParentElement();
        for (var i = 0; i < this._vizList.length; i++) {
            if (this._vizList[i].getParentElement() === key) {
                throw tab._tableauException._create(9, 'A viz is already created in the element');
            }
        }
        this._vizList.push(viz);
    },
    
    _remove: function tab__VizCollection$_remove(viz) {
        var key = viz.getParentElement();
        for (var i = 0; i < this._vizList.length; i++) {
            if (this._vizList[i].getParentElement() === key) {
                this._vizList.splice(i, 1);
                return;
            }
        }
        throw tab._tableauException._create(8, 'VizManager could not find the viz');
    },
    
    _find: function tab__VizCollection$_find(viz) {
        var key = viz.getParentElement();
        for (var i = 0; i < this._vizList.length; i++) {
            if (this._vizList[i].getParentElement() === key) {
                return i;
            }
        }
        return -1;
    },
    get_item: function tab__VizCollection$get_item(key) {
        if (typeof(key) === 'number') {
            var index = key;
            if (index >= this._vizList.length) {
                return null;
            }
            return this._vizList[index];
        }
        else if (ss.isValue(key)) {
            var index = this._find(key);
            if (index >= 0) {
                return this._vizList[index];
            }
        }
        return null;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab._VizManagerImpl

tab._VizManagerImpl = function tab__VizManagerImpl() {
}
tab._VizManagerImpl.getVizs = function tab__VizManagerImpl$getVizs() {
    return tab._VizManagerImpl._vizes._clone();
}
tab._VizManagerImpl.initialize = function tab__VizManagerImpl$initialize() {
    var doc = null;
    doc = document;
    var win = null;
    win = window;
    if (tab._Utility.hasDocumentAddEventListener()) {
        window.addEventListener('message', tab._VizManagerImpl._getOnMessageDelegate(), false);
    }
    else if (tab._Utility.hasDocumentAttachEvent()) {
        doc.attachEvent('onmessage', tab._VizManagerImpl._getOnMessageDelegate());
        win.attachEvent('onmessage', tab._VizManagerImpl._getOnMessageDelegate());
    }
    else {
        win.onmessage = tab._VizManagerImpl._getOnMessageDelegate();
    }
    tab._VizManagerImpl._nextAppId = 0;
}
tab._VizManagerImpl._registerViz = function tab__VizManagerImpl$_registerViz(application) {
    tab._VizManagerImpl._vizes._add(application);
    tab._VizManagerImpl._nextAppId++;
    return tab._VizManagerImpl._nextAppId - 1;
}
tab._VizManagerImpl._unregisterViz = function tab__VizManagerImpl$_unregisterViz(application) {
    tab._VizManagerImpl._vizes._remove(application);
}
tab._VizManagerImpl._loadNextViz = function tab__VizManagerImpl$_loadNextViz(lastLoadedIndex) {
    if (ss.isNullOrUndefined(lastLoadedIndex)) {
        lastLoadedIndex = tab._VizManagerImpl._lastLoadIndex;
    }
    if (lastLoadedIndex !== tab._VizManagerImpl._lastLoadIndex) {
        return;
    }
    tab._VizManagerImpl._lastLoadIndex++;
    var app = tab._VizManagerImpl._vizes.get_item(tab._VizManagerImpl._embededVizLoadOrder[tab._VizManagerImpl._lastLoadIndex]);
    if (ss.isValue(app)) {
        app.load(tab._VizManagerImpl._lastLoadIndex);
        if (tab._Utility.hasWindowPostMessage()) {
            window.setTimeout(function() {
                tab._VizManagerImpl._loadNextViz(tab._VizManagerImpl._lastLoadIndex);
            }, 3000);
        }
    }
}
tab._VizManagerImpl._getOnMessageDelegate = function tab__VizManagerImpl$_getOnMessageDelegate() {
    return function(e) {
        tab._VizManagerImpl._onMessage(e);
    };
}
tab._VizManagerImpl._lastLoadViz = function tab__VizManagerImpl$_lastLoadViz() {
    return tab._VizManagerImpl._vizes.get_item(tab._VizManagerImpl._embededVizLoadOrder[tab._VizManagerImpl._lastLoadIndex]);
}
tab._VizManagerImpl._postLayoutInfo = function tab__VizManagerImpl$_postLayoutInfo(source) {
    if (!tab._Utility.hasWindowPostMessage()) {
        return;
    }
    var win = new tab.WindowHelper(window.self);
    var width = (ss.isValue(win.get_innerWidth())) ? win.get_innerWidth() : document.documentElement.offsetWidth;
    var height = (ss.isValue(win.get_innerHeight())) ? win.get_innerHeight() : document.documentElement.offsetHeight;
    var left = (ss.isValue(win.get_pageXOffset())) ? win.get_pageXOffset() : document.documentElement.scrollLeft;
    var top = (ss.isValue(win.get_pageYOffset())) ? win.get_pageYOffset() : document.documentElement.scrollTop;
    var msgArr = [];
    msgArr.push('layoutInfoResp');
    msgArr.push(left);
    msgArr.push(top);
    msgArr.push(width);
    msgArr.push(height);
    source.postMessage(msgArr.join(','), '*');
}
tab._VizManagerImpl._onMessage = function tab__VizManagerImpl$_onMessage(e) {
    if (ss.isNullOrUndefined(e.data)) {
        return;
    }
    var cmd = new tab._ApiCommandParser(e.data);
    var vizUniqueId = parseInt(cmd.get_vizUniqueId(), 10);
    for (var i = 0; i < tab._VizManagerImpl._vizes.get__length(); i++) {
        var theViz = tab._VizManagerImpl._vizes.get_item(i);
        if (ss.isValue(theViz) && theViz.get__uniqueId() === vizUniqueId) {
            theViz._onMessage(cmd);
            break;
        }
    }
    var multipartData = e.data.split(',');
    var messageType = multipartData[0];
    if (messageType === 'tableau.completed' || messageType === 'completed') {
        var completedID = parseInt(multipartData[1], 10);
        tab._VizManagerImpl._loadNextViz(completedID);
    }
    else if (messageType === 'tableau.loadIndicatorsLoaded') {
        var viz = tab._VizManagerImpl._lastLoadViz();
        if (ss.isValue(viz)) {
            viz._hideLoadIndicators();
        }
    }
    else if (messageType === 'layoutInfoReq') {
        tab._VizManagerImpl._postLayoutInfo(e.source);
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab._VizParameters

tab._VizParameters = function tab__VizParameters(element, url, options) {
    if (ss.isNullOrUndefined(element) || ss.isNullOrUndefined(url) || ss.isNullOrUndefined(options)) {
        throw tab._tableauException._create(10, 'URL is empty or Parent element not found');
    }
    this.tabs = !(options.hideTabs || false);
    this.toolbar = !(options.hideToolbar || false);
    this.parentElement = element;
    this.createOptions = options;
    this.width = parseInt(this.createOptions.width, 10);
    this.height = parseInt(this.createOptions.height, 10);
    var urlParts = url.split('?');
    this._urlFromApi = urlParts[0];
    var r = new RegExp('.*?[^/:]/', '').exec(this._urlFromApi);
    if (ss.isNullOrUndefined(r) || (r[0].toLowerCase().indexOf('http://') === -1 && r[0].toLowerCase().indexOf('https://') === -1)) {
        throw tab._tableauException._create(6, 'Invalid url');
    }
    this.host_url = r[0].toLowerCase();
    this.name = this._urlFromApi.replace(r[0], '');
    this.name = this.name.replace('views/', '');
    this.serverRoot = decodeURIComponent(this.host_url);
}
tab._VizParameters.prototype = {
    name: '',
    host_url: null,
    tabs: false,
    toolbar: false,
    width: 0,
    height: 0,
    serverRoot: null,
    parentElement: null,
    createOptions: null,
    _urlFromApi: null,
    
    get_url: function tab__VizParameters$get_url() {
        return this._constructUrl();
    },
    
    get_baseUrl: function tab__VizParameters$get_baseUrl() {
        return this._urlFromApi;
    },
    
    _constructUrl: function tab__VizParameters$_constructUrl() {
        var url = [];
        url.push(this.get_baseUrl());
        url.push('?:embed=y');
        if (!this.tabs) {
            url.push('&:tabs=n');
        }
        if (!this.toolbar) {
            url.push('&:toolbar=n');
        }
        return url.join('');
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.Mark

tableauSoftware.Mark = function tableauSoftware_Mark(tupleIdOrPairs) {
    this.pairs = [];
    if (tab._jQueryShim.isArray(tupleIdOrPairs)) {
        var pairArr = tupleIdOrPairs;
        for (var i = 0; i < pairArr.length; i++) {
            var pair = pairArr[i];
            if (!ss.isValue(pair.fieldName) || !ss.isValue(pair.value)) {
                throw tab._tableauException._create(5, 'Invalid parameter');
            }
            var p = new tableauSoftware.Pair(pair.fieldName, pair.value);
            this.pairs.push(p);
        }
    }
    else {
        this._tupleId = tupleIdOrPairs;
    }
}
tableauSoftware.Mark._getAsync = function tableauSoftware_Mark$_getAsync(eventContext) {
    if (ss.isValue(eventContext.get__worksheet().get__selectedMarks())) {
        var deferred = new tab._Deferred();
        deferred.resolve(eventContext.get__worksheet().get__selectedMarks()._clone());
    }
    return tableauSoftware.Mark._getSelectedMarksAsync(eventContext.get__worksheet());
}
tableauSoftware.Mark._getSelectedMarksAsync = function tableauSoftware_Mark$_getSelectedMarksAsync(sheet) {
    var deferred = new tab._Deferred();
    var param = {};
    param['api.worksheetName'] = sheet.getName();
    sheet._workbook._viz._sendCommand('api.FetchSelectedMarksCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
        if (cmd._command === 'api.FetchSelectedMarksCommand') {
            var res = new tab._apiServerResultParser(cmd.get_parameters());
            if (res.get__result() === 'api.success') {
                var pm = res.get__data();
                var dataDictionary = pm['dataDictionary'];
                var vizData = pm['vizData'];
                sheet.set__selectedMarks(tableauSoftware.Mark._processSelectedMarks(sheet, dataDictionary, vizData));
                deferred.resolve(sheet.get__selectedMarks()._clone());
            }
            else {
                deferred.reject(tab._tableauException._create(3, res.get__data()));
            }
        }
    });
    return deferred.get_promise();
}
tableauSoftware.Mark._processSelectedMarks = function tableauSoftware_Mark$_processSelectedMarks(sheet, dataDictionary, vizData) {
    var marks = new tab._Collection();
    if (ss.isNullOrUndefined(dataDictionary) || ss.isNullOrUndefined(dataDictionary.dataColumns) || !dataDictionary.dataColumns.length || ss.isNullOrUndefined(vizData) || ss.isNullOrUndefined(vizData.vizColumns)) {
        return marks;
    }
    var tupleIdsFound = false;
    for (var i = 0; i < vizData.vizColumns.length; i++) {
        if (ss.isValue(vizData.vizColumns[i].tupleIds)) {
            tupleIdsFound = true;
            break;
        }
    }
    if (!tupleIdsFound) {
        return marks;
    }
    var dataTypes = {};
    for (var i = 0; i < dataDictionary.dataColumns.length; i++) {
        switch (dataDictionary.dataColumns[i].dataType) {
            case 'tuple':
            case 'integer':
                dataTypes[dataDictionary.dataColumns[i].dataType] = tableauSoftware.Mark._parseIntArray(dataDictionary.dataColumns[i].dataValues);
                break;
            case 'real':
                dataTypes[dataDictionary.dataColumns[i].dataType] = tableauSoftware.Mark._parseRealArray(dataDictionary.dataColumns[i].dataValues);
                break;
            case 'datetime':
            case 'date':
            case 'cstring':
            case 'unknown':
            default:
                dataTypes[dataDictionary.dataColumns[i].dataType] = dataDictionary.dataColumns[i].dataValues;
                break;
        }
    }
    var tupleIds = null;
    for (var i = 0; i < vizData.vizColumns.length; i++) {
        var data = vizData.vizColumns[i];
        if (!tab._Utility.isNullOrEmpty(data.tupleIds)) {
            tupleIds = data.tupleIds;
        }
        if (!tab._Utility.isNullOrEmpty(tupleIds)) {
            if (ss.isValue(data.aliasIndices) && tab._jQueryShim.isArray(data.aliasIndices)) {
                for (var j = 0; j < data.aliasIndices.length; j++) {
                    var dataValues = dataTypes[data.dataType];
                    var value = dataValues[data.aliasIndices[j]];
                    var key = tupleIds[j].toString();
                    var mark = marks.get_item(key);
                    if (mark == null) {
                        mark = new tableauSoftware.Mark(tupleIds[j]);
                        marks._add(key, mark);
                    }
                    mark._add(new tableauSoftware.Pair(data.fieldCaption, value));
                }
            }
        }
    }
    return marks;
}
tableauSoftware.Mark._parseIntArray = function tableauSoftware_Mark$_parseIntArray(values) {
    var objarr = [];
    for (var i = 0; i < values.length; i++) {
        objarr.push(parseInt(values[i]));
    }
    return objarr;
}
tableauSoftware.Mark._parseRealArray = function tableauSoftware_Mark$_parseRealArray(values) {
    var objarr = [];
    for (var i = 0; i < values.length; i++) {
        objarr.push(parseFloat(values[i]));
    }
    return objarr;
}
tableauSoftware.Mark.prototype = {
    _tupleId: 0,
    
    getTupleID: function tableauSoftware_Mark$getTupleID() {
        return this._tupleId;
    },
    
    getPairs: function tableauSoftware_Mark$getPairs() {
        return this.pairs;
    },
    
    _add: function tableauSoftware_Mark$_add(pair) {
        this.pairs.push(pair);
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab.MarksEvent

tab.MarksEvent = function tab_MarksEvent(eventName, viz, worksheet) {
    tab.MarksEvent.initializeBase(this, [ eventName, viz, worksheet ]);
    this._context$2 = new tab._marksEventContext(viz.getWorkbook(), worksheet);
}
tab.MarksEvent.prototype = {
    _context$2: null,
    
    getAsync: function tab_MarksEvent$getAsync() {
        return tableauSoftware.Mark._getAsync(this._context$2);
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab._marksEventContext

tab._marksEventContext = function tab__marksEventContext(workbook, worksheet) {
    tab._marksEventContext.initializeBase(this, [ workbook, worksheet ]);
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.Pair

tableauSoftware.Pair = function tableauSoftware_Pair(n, v) {
    this.fieldName = n;
    this.value = v;
}
tableauSoftware.Pair.prototype = {
    fieldName: null,
    value: null
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.Parameter

tableauSoftware.Parameter = function tableauSoftware_Parameter(paramName, nam, currValue, datType, allowableValType, allowableVals, min, max, stepSz, dateStepSz) {
    this._name = nam;
    this._currentValue = currValue;
    this._dataType = datType;
    this._allowableValueType = allowableValType;
    this._allowableValues = allowableVals;
    this._minimumValue = min;
    this._maximumValue = max;
    this._stepSize = stepSz;
    this._dateStepPeriod = dateStepSz;
    this._parameterName = paramName;
}
tableauSoftware.Parameter._getAsync = function tableauSoftware_Parameter$_getAsync(eventContext) {
    if (ss.isValue(eventContext.get__workbook().get__lastChangedParameter())) {
        var deferred = new tab._Deferred();
        deferred.resolve(eventContext.get__workbook().get__lastChangedParameter());
        return deferred.get_promise();
    }
    return tableauSoftware.Parameter._getChangedAsync(eventContext.get__workbook(), eventContext.get__parameterName());
}
tableauSoftware.Parameter._changeValueAsync = function tableauSoftware_Parameter$_changeValueAsync(workbook, name, value) {
    var paramObj = null;
    if (ss.isValue(workbook.get__parameters())) {
        paramObj = workbook.get__parameters().get_item(name);
        if (paramObj == null) {
            throw tab._tableauException._create(5, 'Invalid parameter name');
        }
        if (paramObj.getAllowableValueType() !== 'ALL' && !paramObj._allowsValue(value)) {
            throw tab._tableauException._create(5, 'Invalid parameter value');
        }
    }
    var param = {};
    param['api.setParameterName'] = (ss.isValue(workbook.get__parameters())) ? paramObj.getName() : name;
    if ((ss.isValue(workbook.get__parameters()) && (paramObj.getDataType() === 'DATE' || paramObj.getDataType() === 'DATETIME')) || tab._Utility.isDate(value)) {
        var date = value;
        var year = date.getUTCFullYear();
        var month = date.getUTCMonth() + 1;
        var day = date.getUTCDate();
        var dateStr = year.toString() + '/' + month.toString() + '/' + day.toString();
        if (ss.isValue(workbook.get__parameters()) && paramObj.getDataType() === 'DATETIME') {
            var hh = date.getHours();
            var mm = date.getMinutes();
            var sec = date.getSeconds();
            dateStr += ' ' + hh.toString() + ':' + mm.toString() + ':' + sec.toString();
        }
        param['api.setParameterValue'] = dateStr;
    }
    else {
        param['api.setParameterValue'] = value.toString();
    }
    workbook.set__lastChangedParameter(null);
    var deferred = new tab._Deferred();
    workbook._viz._sendCommand('api.SetParameterValueCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
        if (cmd._command === 'api.SetParameterValueCommand') {
            var res = new tab._apiServerResultParser(cmd.get_parameters());
            if (res.get__result() === 'api.success') {
                var paramUpdated = tableauSoftware.Parameter._extractOneParameter(res.get__data());
                if (paramUpdated == null) {
                    deferred.reject(tab._tableauException._create(3, 'server error'));
                    return;
                }
                workbook.set__lastChangedParameter(paramUpdated);
                deferred.resolve(paramUpdated);
                workbook._viz._notifyParameterChange(paramUpdated._getParameterName());
            }
            else {
                deferred.reject(tab._tableauException._create(3, res.get__data()));
            }
        }
    });
    return deferred.get_promise();
}
tableauSoftware.Parameter._getParametersAsync = function tableauSoftware_Parameter$_getParametersAsync(workbook) {
    var deferred = new tab._Deferred();
    var param = {};
    workbook._viz._sendCommand('api.FetchParametersCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
        if (cmd._command === 'api.FetchParametersCommand') {
            var res = new tab._apiServerResultParser(cmd.get_parameters());
            if (res.get__result() === 'api.success') {
                var paramList = res.get__data();
                workbook.set__parameters(tableauSoftware.Parameter._processParameters(paramList));
                deferred.resolve(workbook.get__parameters()._clone());
            }
            else {
                deferred.reject(tab._tableauException._create(3, res.get__data()));
            }
        }
    });
    return deferred.get_promise();
}
tableauSoftware.Parameter._getChangedAsync = function tableauSoftware_Parameter$_getChangedAsync(workbook, parameterName) {
    var deferred = new tab._Deferred();
    var param = {};
    workbook._viz._sendCommand('api.FetchParametersCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
        if (cmd._command === 'api.FetchParametersCommand') {
            var res = new tab._apiServerResultParser(cmd.get_parameters());
            if (res.get__result() === 'api.success') {
                var paramList = res.get__data();
                var parameter = tableauSoftware.Parameter._processChangedParameters(parameterName, paramList);
                workbook.set__lastChangedParameter(parameter);
                deferred.resolve(parameter);
            }
            else {
                deferred.reject(tab._tableauException._create(3, res.get__data()));
            }
        }
    });
    return deferred.get_promise();
}
tableauSoftware.Parameter._processParameters = function tableauSoftware_Parameter$_processParameters(paramList) {
    var parameters = new tab._Collection();
    for (var i = 0; i < paramList.length; i++) {
        var p = paramList[i];
        var param = tableauSoftware.Parameter._extractOneParameter(p);
        if (param != null) {
            parameters._add(param.getName(), param);
        }
    }
    return parameters;
}
tableauSoftware.Parameter._extractOneParameter = function tableauSoftware_Parameter$_extractOneParameter(p) {
    if (!ss.isValue(p['parameterName']) || !ss.isValue(p['fieldCaption'])) {
        return null;
    }
    var dataType = tableauSoftware.Parameter._processParamDataType(p['dataType']);
    var currValue;
    var allowableValues;
    if (dataType === 'DATE' || dataType === 'DATETIME') {
        currValue = tableauSoftware.Parameter._processParamValue(dataType, p['formattedValue']);
        allowableValues = tableauSoftware.Parameter._processParamAllowableValues(dataType, p['formattedValues']);
    }
    else {
        currValue = tableauSoftware.Parameter._processParamValue(dataType, p['valueAlias']);
        allowableValues = tableauSoftware.Parameter._processParamAllowableValues(dataType, p['valuesAliases']);
    }
    if (allowableValues == null) {
        allowableValues = [];
        allowableValues.push(currValue);
    }
    var param = new tableauSoftware.Parameter(p['parameterName'], p['fieldCaption'], currValue, dataType, tableauSoftware.Parameter._processParamDomainType(p['parameterDomainType']), allowableValues, tableauSoftware.Parameter._processParamNumber(dataType, p['valueMin']), tableauSoftware.Parameter._processParamNumber(dataType, p['valueMax']), tableauSoftware.Parameter._processParamNumber(dataType, p['valueInc']), tableauSoftware.Parameter._processParamDatePeriod(p['datePeriodsCount']));
    return param;
}
tableauSoftware.Parameter._processChangedParameters = function tableauSoftware_Parameter$_processChangedParameters(parameterName, paramList) {
    for (var i = 0; i < paramList.length; i++) {
        var param = tableauSoftware.Parameter._extractOneParameter(paramList[i]);
        if (param._getParameterName() === parameterName) {
            return param;
        }
    }
    return null;
}
tableauSoftware.Parameter._processParamDomainType = function tableauSoftware_Parameter$_processParamDomainType(domainType) {
    switch (domainType) {
        case 'list':
            return 'LIST';
        case 'range':
            return 'RANGE';
        case 'any':
        default:
            return 'ALL';
    }
}
tableauSoftware.Parameter._processParamAllowableValues = function tableauSoftware_Parameter$_processParamAllowableValues(dataType, valuesAliases) {
    if (ss.isValue(valuesAliases)) {
        var objs = [];
        for (var i = 0; i < valuesAliases.length; i++) {
            objs.push(tableauSoftware.Parameter._processParamValue(dataType, valuesAliases[i]));
        }
        return objs;
    }
    else {
        return null;
    }
}
tableauSoftware.Parameter._processParamValue = function tableauSoftware_Parameter$_processParamValue(dataType, val) {
    var item = val;
    if (tab._jQueryShim.isArray(val)) {
        item = val[0];
    }
    switch (dataType) {
        case 'FLOAT':
            return parseFloat(item);
        case 'INTEGER':
            return parseInt(item);
        case 'STRING':
            return item;
        case 'BOOLEAN':
            if (item.toLowerCase() === 'true') {
                return true;
            }
            else if (item.toLowerCase() === 'false') {
                return false;
            }
            return false;
        case 'DATE':
        case 'DATETIME':
            var d = Date.parse(item);
            var date = new Date(d);
            return date;
    }
    return null;
}
tableauSoftware.Parameter._processParamNumber = function tableauSoftware_Parameter$_processParamNumber(dataType, val) {
    if (ss.isValue(val)) {
        if (dataType === 'INTEGER') {
            return parseInt(val);
        }
        else if (dataType === 'FLOAT') {
            return parseFloat(val);
        }
    }
    return null;
}
tableauSoftware.Parameter._processParamDatePeriod = function tableauSoftware_Parameter$_processParamDatePeriod(val) {
    switch (val) {
        case 'hour':
            return 'HOUR';
        case 'second':
            return 'SECOND';
        case 'minute':
            return 'MINUTE';
        case 'day':
            return 'DAY';
        case 'week':
            return 'WEEK';
        case 'month':
            return 'MONTH';
        case 'quarter':
            return 'QUARTER';
        case 'year':
        default:
            return 'YEAR';
    }
}
tableauSoftware.Parameter._processParamDataType = function tableauSoftware_Parameter$_processParamDataType(dataType) {
    if (dataType === 'boolean') {
        return 'BOOLEAN';
    }
    switch (dataType) {
        case 'real':
            return 'FLOAT';
        case 'integer':
        case 'tuple':
            return 'INTEGER';
        case 'date':
            return 'DATE';
        case 'datetime':
            return 'DATETIME';
        case 'cstring':
        default:
            return 'STRING';
    }
}
tableauSoftware.Parameter.prototype = {
    _parameterName: null,
    _name: null,
    _currentValue: null,
    _dataType: null,
    _allowableValueType: null,
    _allowableValues: null,
    _minimumValue: null,
    _maximumValue: null,
    _stepSize: null,
    _dateStepPeriod: null,
    
    getName: function tableauSoftware_Parameter$getName() {
        return this._name;
    },
    
    getCurrentValue: function tableauSoftware_Parameter$getCurrentValue() {
        return this._currentValue;
    },
    
    getDataType: function tableauSoftware_Parameter$getDataType() {
        return this._dataType;
    },
    
    getAllowableValueType: function tableauSoftware_Parameter$getAllowableValueType() {
        return this._allowableValueType;
    },
    
    getAllowableValues: function tableauSoftware_Parameter$getAllowableValues() {
        return this._allowableValues;
    },
    
    getMinimumValue: function tableauSoftware_Parameter$getMinimumValue() {
        return this._minimumValue;
    },
    
    getMaximumValue: function tableauSoftware_Parameter$getMaximumValue() {
        return this._maximumValue;
    },
    
    getStepSize: function tableauSoftware_Parameter$getStepSize() {
        return this._stepSize;
    },
    
    getDateStepPeriod: function tableauSoftware_Parameter$getDateStepPeriod() {
        return this._dateStepPeriod;
    },
    
    _allowsValue: function tableauSoftware_Parameter$_allowsValue(val) {
        if (this.getAllowableValueType() === 'ALL') {
            return true;
        }
        else if (this.getAllowableValueType() === 'LIST') {
            for (var i = 0; i < this._allowableValues.length; i++) {
                if (val === this._allowableValues[i]) {
                    return true;
                }
            }
        }
        else if (this.getAllowableValueType() === 'RANGE') {
            if (this._dataType === 'DATE' || this._dataType === 'DATETIME') {
                var dval = val;
                var min = this._allowableValues[0];
                var max = this._allowableValues[this._allowableValues.length - 1];
                if (dval >= min && dval <= max) {
                    return true;
                }
            }
            else if (this._dataType === 'INTEGER' || this._dataType === 'FLOAT') {
                var nval = val;
                var min = this._allowableValues[0];
                var max = this._allowableValues[this._allowableValues.length - 1];
                if (nval >= min && nval <= max) {
                    return true;
                }
            }
        }
        return false;
    },
    
    _getParameterName: function tableauSoftware_Parameter$_getParameterName() {
        return this._parameterName;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab.ParameterEvent

tab.ParameterEvent = function tab_ParameterEvent(eventName, viz, parameterName) {
    tab.ParameterEvent.initializeBase(this, [ eventName, viz ]);
    this._context$1 = new tab._parameterEventContext(viz.getWorkbook(), parameterName);
}
tab.ParameterEvent.prototype = {
    _context$1: null,
    
    getAsync: function tab_ParameterEvent$getAsync() {
        return tableauSoftware.Parameter._getAsync(this._context$1);
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab._parameterEventContext

tab._parameterEventContext = function tab__parameterEventContext(workbook, parameterName) {
    tab._parameterEventContext.initializeBase(this, [ workbook, null ]);
    this._parameterName$1 = parameterName;
}
tab._parameterEventContext.prototype = {
    _parameterName$1: null,
    
    get__parameterName: function tab__parameterEventContext$get__parameterName() {
        return this._parameterName$1;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.Promise

tableauSoftware.Promise = function tableauSoftware_Promise(thenFunc) {
    this.then = thenFunc;
}
tableauSoftware.Promise.prototype = {
    then: null,
    
    always: function tableauSoftware_Promise$always(callback) {
        return this.then(callback, callback);
    },
    
    otherwise: function tableauSoftware_Promise$otherwise(errback) {
        return this.then(null, errback);
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.Sheet

tableauSoftware.Sheet = function tableauSoftware_Sheet(jsonObject, workbook) {
    this._type = 'WORKSHEET';
    if (ss.isValue(jsonObject)) {
        this._internalUpdate(jsonObject);
    }
    this._workbook = workbook;
    this._size = {};
    this._size.behavior = 'AUTOMATIC';
}
tableauSoftware.Sheet.prototype = {
    _name: null,
    _index: 0,
    _workbook: null,
    _isHidden: false,
    _isActive: false,
    _repositoryUrl: null,
    _size: null,
    
    getName: function tableauSoftware_Sheet$getName() {
        return this._name;
    },
    
    getIndex: function tableauSoftware_Sheet$getIndex() {
        return this._index;
    },
    
    getWorkbook: function tableauSoftware_Sheet$getWorkbook() {
        return this._workbook;
    },
    
    getSize: function tableauSoftware_Sheet$getSize() {
        return this._size;
    },
    
    setSizeAsync: function tableauSoftware_Sheet$setSizeAsync(size) {
        if (this._type === 'WORKSHEET' && size.behavior !== 'AUTOMATIC') {
            throw tab._tableauException._create(5, 'Invalid parameter');
        }
        var deferred = new tab._Deferred();
        if (this._size.behavior === size.behavior && size.behavior === 'AUTOMATIC') {
            deferred.resolve(size);
            return deferred.get_promise();
        }
        this._size = size;
        var param = {};
        param['api.setSheetSizeName'] = this._name;
        var dict = this._workbook._sheetSizeToDictionary(size);
        param['api.minWidth'] = dict['api.minWidth'];
        param['api.minHeight'] = dict['api.minHeight'];
        param['api.maxWidth'] = dict['api.maxWidth'];
        param['api.maxHeight'] = dict['api.maxHeight'];
        this._workbook._viz._sendCommand('api.SetSheetSizeCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
            if (cmd._command === 'api.SetSheetSizeCommand') {
                var srvResult = new tab._apiServerResultParser(cmd.get_parameters());
                if (srvResult.get__result() === 'api.success') {
                    deferred.resolve(size);
                }
                else {
                    deferred.reject(tab._tableauException._create(3, srvResult.get__data()));
                }
            }
        });
        return deferred.get_promise();
    },
    
    getIsHidden: function tableauSoftware_Sheet$getIsHidden() {
        return this._isHidden;
    },
    
    getIsActive: function tableauSoftware_Sheet$getIsActive() {
        return this._isActive;
    },
    
    getSheetType: function tableauSoftware_Sheet$getSheetType() {
        return this._type;
    },
    
    getRepositoryUrl: function tableauSoftware_Sheet$getRepositoryUrl() {
        return this._repositoryUrl;
    },
    
    activateAsync: function tableauSoftware_Sheet$activateAsync() {
        return this._workbook._setActiveSheetAsync(this);
    },
    
    _update: function tableauSoftware_Sheet$_update(jsonObject) {
        this._internalUpdate(jsonObject);
    },
    
    _addObjects: function tableauSoftware_Sheet$_addObjects(frames) {
    },
    
    _internalUpdate: function tableauSoftware_Sheet$_internalUpdate(jsonObject) {
        if (('name' in jsonObject)) {
            this._name = jsonObject['name'];
        }
        if (('index' in jsonObject)) {
            this._index = jsonObject['index'];
        }
        if (('isHidden' in jsonObject)) {
            this._isHidden = jsonObject['isHidden'];
        }
        if (('isDashboard' in jsonObject)) {
            if (jsonObject['isDashboard']) {
                this._type = 'DASHBOARD';
            }
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab.TableauEvent

tab.TableauEvent = function tab_TableauEvent(eventName, viz) {
    this._viz = viz;
    this._eventName = eventName;
}
tab.TableauEvent.prototype = {
    _viz: null,
    _eventName: null,
    
    getViz: function tab_TableauEvent$getViz() {
        return this._viz;
    },
    
    getEventName: function tab_TableauEvent$getEventName() {
        return this._eventName;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab.EventContext

tab.EventContext = function tab_EventContext(workbook, worksheet) {
    this._workbook = workbook;
    this._worksheet = worksheet;
}
tab.EventContext.prototype = {
    _workbook: null,
    _worksheet: null,
    
    get__workbook: function tab_EventContext$get__workbook() {
        return this._workbook;
    },
    
    get__worksheet: function tab_EventContext$get__worksheet() {
        return this._worksheet;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab._tableauException

tab._tableauException = function tab__tableauException() {
}
tab._tableauException._create = function tab__tableauException$_create(id, message) {
    var x = new Error(message);
    x.tableauSoftwareErrorCode = id;
    return x;
}


////////////////////////////////////////////////////////////////////////////////
// tab.TabSwitchEvent

tab.TabSwitchEvent = function tab_TabSwitchEvent(eventName, viz, oldName, newName) {
    tab.TabSwitchEvent.initializeBase(this, [ eventName, viz ]);
    this._oldName$1 = oldName;
    this._newName$1 = newName;
}
tab.TabSwitchEvent.prototype = {
    _oldName$1: null,
    _newName$1: null,
    
    getOldSheetName: function tab_TabSwitchEvent$getOldSheetName() {
        return this._oldName$1;
    },
    
    getNewSheetName: function tab_TabSwitchEvent$getNewSheetName() {
        return this._newName$1;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.Viz

tableauSoftware.Viz = function tableauSoftware_Viz(parentElement, url, options) {
    this._commandCallbackList = {};
    this._reloadCallbackList = [];
    if (ss.isNullOrUndefined(parentElement) || parentElement.nodeType !== 1) {
        parentElement = document.body;
    }
    this._parameters = new tab._VizParameters(parentElement, url, options);
    this._baseUrl = this._parameters.get_url();
    this._clientUrl = this._baseUrl;
    if (ss.isValue(options)) {
        this._onFirstInteractiveCallback = options.onFirstInteractive;
    }
    this._create();
    this._uniqueId = tab._VizManagerImpl._registerViz(this);
    this.load(9999);
}
tableauSoftware.Viz.prototype = {
    _iFrame: null,
    _clientUrl: null,
    _isAutoUpdate: false,
    _parameters: null,
    _baseUrl: null,
    _loadFeedback: null,
    _uniqueId: 0,
    _isInteractive: false,
    _workbook: null,
    _commandSerialNumber: 0,
    _commandCallbackList: null,
    _onFirstInteractiveCallback: null,
    _areTabsHidden: false,
    _areToolbarsHidden: false,
    _reloadCallbackList: null,
    
    add__onVizInteractive: function tableauSoftware_Viz$add__onVizInteractive(value) {
        this.__onVizInteractive = ss.Delegate.combine(this.__onVizInteractive, value);
    },
    remove__onVizInteractive: function tableauSoftware_Viz$remove__onVizInteractive(value) {
        this.__onVizInteractive = ss.Delegate.remove(this.__onVizInteractive, value);
    },
    
    __onVizInteractive: null,
    
    add__onMarksSelection: function tableauSoftware_Viz$add__onMarksSelection(value) {
        this.__onMarksSelection = ss.Delegate.combine(this.__onMarksSelection, value);
    },
    remove__onMarksSelection: function tableauSoftware_Viz$remove__onMarksSelection(value) {
        this.__onMarksSelection = ss.Delegate.remove(this.__onMarksSelection, value);
    },
    
    __onMarksSelection: null,
    
    add__onFilterChanged: function tableauSoftware_Viz$add__onFilterChanged(value) {
        this.__onFilterChanged = ss.Delegate.combine(this.__onFilterChanged, value);
    },
    remove__onFilterChanged: function tableauSoftware_Viz$remove__onFilterChanged(value) {
        this.__onFilterChanged = ss.Delegate.remove(this.__onFilterChanged, value);
    },
    
    __onFilterChanged: null,
    
    add__onStateChanged: function tableauSoftware_Viz$add__onStateChanged(value) {
        this.__onStateChanged = ss.Delegate.combine(this.__onStateChanged, value);
    },
    remove__onStateChanged: function tableauSoftware_Viz$remove__onStateChanged(value) {
        this.__onStateChanged = ss.Delegate.remove(this.__onStateChanged, value);
    },
    
    __onStateChanged: null,
    
    add__onCustomViewLoaded: function tableauSoftware_Viz$add__onCustomViewLoaded(value) {
        this.__onCustomViewLoaded = ss.Delegate.combine(this.__onCustomViewLoaded, value);
    },
    remove__onCustomViewLoaded: function tableauSoftware_Viz$remove__onCustomViewLoaded(value) {
        this.__onCustomViewLoaded = ss.Delegate.remove(this.__onCustomViewLoaded, value);
    },
    
    __onCustomViewLoaded: null,
    
    add__onCustomViewUpdated: function tableauSoftware_Viz$add__onCustomViewUpdated(value) {
        this.__onCustomViewUpdated = ss.Delegate.combine(this.__onCustomViewUpdated, value);
    },
    remove__onCustomViewUpdated: function tableauSoftware_Viz$remove__onCustomViewUpdated(value) {
        this.__onCustomViewUpdated = ss.Delegate.remove(this.__onCustomViewUpdated, value);
    },
    
    __onCustomViewUpdated: null,
    
    add__onCustomViewRemoved: function tableauSoftware_Viz$add__onCustomViewRemoved(value) {
        this.__onCustomViewRemoved = ss.Delegate.combine(this.__onCustomViewRemoved, value);
    },
    remove__onCustomViewRemoved: function tableauSoftware_Viz$remove__onCustomViewRemoved(value) {
        this.__onCustomViewRemoved = ss.Delegate.remove(this.__onCustomViewRemoved, value);
    },
    
    __onCustomViewRemoved: null,
    
    add__onCustomViewSetDefault: function tableauSoftware_Viz$add__onCustomViewSetDefault(value) {
        this.__onCustomViewSetDefault = ss.Delegate.combine(this.__onCustomViewSetDefault, value);
    },
    remove__onCustomViewSetDefault: function tableauSoftware_Viz$remove__onCustomViewSetDefault(value) {
        this.__onCustomViewSetDefault = ss.Delegate.remove(this.__onCustomViewSetDefault, value);
    },
    
    __onCustomViewSetDefault: null,
    
    add__onTabSwitch: function tableauSoftware_Viz$add__onTabSwitch(value) {
        this.__onTabSwitch = ss.Delegate.combine(this.__onTabSwitch, value);
    },
    remove__onTabSwitch: function tableauSoftware_Viz$remove__onTabSwitch(value) {
        this.__onTabSwitch = ss.Delegate.remove(this.__onTabSwitch, value);
    },
    
    __onTabSwitch: null,
    
    get__uniqueId: function tableauSoftware_Viz$get__uniqueId() {
        return this._uniqueId;
    },
    
    getAreTabsHidden: function tableauSoftware_Viz$getAreTabsHidden() {
        return this._areTabsHidden;
    },
    
    getAreToolbarsHidden: function tableauSoftware_Viz$getAreToolbarsHidden() {
        return this._areToolbarsHidden;
    },
    
    getIsCommandBarHidden: function tableauSoftware_Viz$getIsCommandBarHidden() {
        return !this._parameters.toolbar;
    },
    
    getIsHidden: function tableauSoftware_Viz$getIsHidden() {
        return this._iFrame.style.display === 'none';
    },
    
    getIsInteractive: function tableauSoftware_Viz$getIsInteractive() {
        return this._isInteractive;
    },
    
    getParentElement: function tableauSoftware_Viz$getParentElement() {
        return this._parameters.parentElement;
    },
    
    getBaseUrl: function tableauSoftware_Viz$getBaseUrl() {
        return this._baseUrl;
    },
    
    getUrl: function tableauSoftware_Viz$getUrl() {
        return this._clientUrl;
    },
    
    getWorkbook: function tableauSoftware_Viz$getWorkbook() {
        return this._workbook;
    },
    
    getIsLayoutFrozen: function tableauSoftware_Viz$getIsLayoutFrozen() {
        return !this._isAutoUpdate;
    },
    
    addEventListener: function tableauSoftware_Viz$addEventListener(eventName, handler) {
        if (eventName === 'interactive') {
            this.add__onVizInteractive(handler);
        }
        else if (eventName === 'marksselection') {
            this.add__onMarksSelection(handler);
        }
        else if (eventName === 'parametervaluechange') {
            this.add__onStateChanged(handler);
        }
        else if (eventName === 'filterchange') {
            this.add__onFilterChanged(handler);
        }
        else if (eventName === 'customviewload') {
            this.add__onCustomViewLoaded(handler);
        }
        else if (eventName === 'customviewsave') {
            this.add__onCustomViewUpdated(handler);
        }
        else if (eventName === 'customviewremove') {
            this.add__onCustomViewRemoved(handler);
        }
        else if (eventName === 'customviewsetdefault') {
            this.add__onCustomViewSetDefault(handler);
        }
        else if (eventName === 'tabswitch') {
            this.add__onTabSwitch(handler);
        }
        else {
            throw tab._tableauException._create(5, 'Unsupported event name');
        }
    },
    
    removeEventListener: function tableauSoftware_Viz$removeEventListener(eventName, handler) {
        if (eventName === 'interactive') {
            this.remove__onVizInteractive(handler);
        }
        else if (eventName === 'marksselection') {
            this.remove__onMarksSelection(handler);
        }
        else if (eventName === 'parametervaluechange') {
            this.remove__onStateChanged(handler);
        }
        else if (eventName === 'filterchange') {
            this.remove__onFilterChanged(handler);
        }
        else if (eventName === 'customviewload') {
            this.remove__onCustomViewLoaded(handler);
        }
        else if (eventName === 'customviewsave') {
            this.remove__onCustomViewUpdated(handler);
        }
        else if (eventName === 'customviewremove') {
            this.remove__onCustomViewRemoved(handler);
        }
        else if (eventName === 'customviewsetdefault') {
            this.remove__onCustomViewSetDefault(handler);
        }
        else if (eventName === 'tabswitch') {
            this.remove__onTabSwitch(handler);
        }
        else {
            throw tab._tableauException._create(5, 'Unsupported event name');
        }
    },
    
    dispose: function tableauSoftware_Viz$dispose() {
        this.getParentElement().innerHTML = '';
        tab._VizManagerImpl._unregisterViz(this);
    },
    
    load: function tableauSoftware_Viz$load(loadOrder) {
        var loadOrderOpt = '&:loadOrderID=' + loadOrder.toString();
        var loadUniqueOpt = '&:loadUniqueID=' + this._uniqueId.toString();
        this._iFrame.src = this._baseUrl + loadOrderOpt + loadUniqueOpt;
    },
    
    show: function tableauSoftware_Viz$show() {
        this._iFrame.style.display = 'block';
    },
    
    hide: function tableauSoftware_Viz$hide() {
        this._iFrame.style.display = 'none';
    },
    
    invokeCommand: function tableauSoftware_Viz$invokeCommand(command) {
        if (command === 'EXPORT_IMAGE' || command === 'EXPORT_DATA' || command === 'EXPORT_CROSSTAB' || command === 'EXPORT_PDF' || command === 'REVERT_ALL' || command === 'REFRESH_DATA' || command === 'SHOW_SHARE_DIALOG' || command === 'DOWNLOAD_WORKBOOK') {
            var param = {};
            param['api.invokeCommandName'] = command;
            this._sendCommand('api.InvokeCommandCommand', tab.JsonUtil.toJson(param, false, ''), null);
        }
        else if (command === 'PAUSE_AUTOMATIC_UPDATES' || command === 'RESUME_AUTOMATIC_UPDATES' || command === 'TOGGLE_AUTOMATIC_UPDATES') {
            var param = {};
            param['api.invokeCommandName'] = command;
            this._sendCommand('api.InvokeCommandCommand', tab.JsonUtil.toJson(param, false, ''), ss.Delegate.create(this, this._processInvokeCommandResultDelegate));
        }
        else {
            throw tab._tableauException._create(5, 'Invalid parameter name');
        }
    },
    
    setFrameSize: function tableauSoftware_Viz$setFrameSize(width, height) {
        this._parameters.width = width;
        this._parameters.height = height;
        this._iFrame.style.width = this._parameters.width + 'px';
        this._iFrame.style.height = this._parameters.height + 'px';
        this._workbook._updateActiveSheetAsync();
    },
    
    showToolbar: function tableauSoftware_Viz$showToolbar() {
        if (this._areToolbarsHidden) {
            this._toggleToolbar();
        }
    },
    
    hideToolbar: function tableauSoftware_Viz$hideToolbar() {
        if (!this._areToolbarsHidden) {
            this._toggleToolbar();
        }
    },
    
    pauseAutomaticUpdates: function tableauSoftware_Viz$pauseAutomaticUpdates(pauseLayout) {
        var param = {};
        param['api.invokeCommandName'] = 'PAUSE_AUTOMATIC_UPDATES';
        param['api.invokeCommandParam'] = pauseLayout;
        this._sendCommand('api.InvokeCommandCommand', tab.JsonUtil.toJson(param, false, ''), ss.Delegate.create(this, this._processInvokeCommandResultDelegate));
    },
    
    resumeAutomaticUpdates: function tableauSoftware_Viz$resumeAutomaticUpdates() {
        var param = {};
        param['api.invokeCommandName'] = 'RESUME_AUTOMATIC_UPDATES';
        this._sendCommand('api.InvokeCommandCommand', tab.JsonUtil.toJson(param, false, ''), ss.Delegate.create(this, this._processInvokeCommandResultDelegate));
    },
    
    _create: function tableauSoftware_Viz$_create() {
        this._loadFeedback = new tab._loadFeedback();
        this._loadFeedback._createLoadingFeedback(this._parameters);
        this._iFrame = this._createIframe();
        this._loadFeedback._show();
        this.show();
        if (!tab._Utility.hasWindowPostMessage()) {
            if (tab._Utility.isIE()) {
                this._iFrame.onreadystatechange = this._getOnCheckForDoneDelegate();
            }
            else {
                this._iFrame.onload = this._getOnCheckForDoneDelegate();
            }
        }
        this._areToolbarsHidden = !this._parameters.toolbar;
        this._areTabsHidden = !this._parameters.tabs;
    },
    
    _hideLoadIndicators: function tableauSoftware_Viz$_hideLoadIndicators() {
        if (ss.isValue(this._loadFeedback)) {
            this._loadFeedback._dispose();
            this._loadFeedback = null;
            delete this.loadFeedback;
        }
    },
    
    _sendVizOffset: function tableauSoftware_Viz$_sendVizOffset() {
        if (!tab._Utility.hasWindowPostMessage() || ss.isNullOrUndefined(this._iFrame) || !ss.isValue(this._iFrame.contentWindow)) {
            return;
        }
        var pos = tab._Utility.elementPosition(this._iFrame);
        var param = [];
        param.push('vizOffsetResp');
        param.push(pos.x);
        param.push(pos.y);
        this._iFrame.contentWindow.postMessage(param.join(','), '*');
    },
    
    _sendCommand: function tableauSoftware_Viz$_sendCommand(command, param, callback) {
        if (!tab._Utility.hasWindowPostMessage() || ss.isNullOrUndefined(this._iFrame) || ss.isNullOrUndefined(this._iFrame.contentWindow)) {
            return;
        }
        this._commandSerialNumber++;
        this._commandCallbackList[this._commandSerialNumber] = callback;
        if (command === 'api.ShowCustomViewCommand') {
            this._reloadCallbackList.push(new tableauSoftware.Pair(command, this._commandSerialNumber));
        }
        var msgArr = [];
        msgArr.push(command);
        msgArr.push(this._commandSerialNumber);
        msgArr.push(this._uniqueId);
        if (param != null) {
            msgArr.push(param);
        }
        else {
            msgArr.push('');
        }
        this._iFrame.contentWindow.postMessage(msgArr.join(','), this._parameters.serverRoot);
    },
    
    _notifyParameterChange: function tableauSoftware_Viz$_notifyParameterChange(parameterName) {
        if (this.__onStateChanged != null) {
            this.__onStateChanged(new tab.ParameterEvent('parametervaluechange', this, parameterName));
        }
    },
    
    _notifyCustomViewLoaded: function tableauSoftware_Viz$_notifyCustomViewLoaded() {
        if (this.__onCustomViewLoaded != null) {
            this.__onCustomViewLoaded(new tab.CustomViewEvent('customviewload', this));
        }
    },
    
    _notifyCustomViewUpdated: function tableauSoftware_Viz$_notifyCustomViewUpdated() {
        if (this.__onCustomViewUpdated != null) {
            this.__onCustomViewUpdated(new tab.CustomViewEvent('customviewsave', this));
        }
    },
    
    _notifyCustomViewRemoved: function tableauSoftware_Viz$_notifyCustomViewRemoved() {
        if (this.__onCustomViewRemoved != null) {
            this.__onCustomViewRemoved(new tab.CustomViewEvent('customviewremove', this));
        }
    },
    
    _notifyCustomViewSetDefault: function tableauSoftware_Viz$_notifyCustomViewSetDefault() {
        if (this.__onCustomViewSetDefault != null) {
            this.__onCustomViewSetDefault(new tab.CustomViewEvent('customviewsetdefault', this));
        }
    },
    
    _notifyTabSwitch: function tableauSoftware_Viz$_notifyTabSwitch(oldSheetName, newSheetName) {
        if (this.__onTabSwitch != null) {
            this.__onTabSwitch(new tab.TabSwitchEvent('tabswitch', this, oldSheetName, newSheetName));
        }
    },
    
    _onMessage: function tableauSoftware_Viz$_onMessage(cmd) {
        var vizUniqueId = parseInt(cmd.get_vizUniqueId(), 10);
        if (vizUniqueId !== this._uniqueId) {
            return;
        }
        if (cmd._command === 'tableau.completed' || cmd._command === 'completed' || cmd._command === 'layoutInfoReq') {
            this._onLoaded();
        }
        else if (!cmd._command.indexOf('api.', 0)) {
            var notificationCmdId = -1;
            if (cmd.get_sourceId() === notificationCmdId.toString()) {
                this._onNotified(cmd._command, cmd.get_parameters());
            }
            else {
                var callback = this._commandCallbackList[cmd.get_sourceId()];
                if (ss.isValue(callback)) {
                    callback(cmd);
                    delete this._commandCallbackList[cmd.get_sourceId()];
                }
            }
        }
    },
    
    _processInvokeCommandResultDelegate: function tableauSoftware_Viz$_processInvokeCommandResultDelegate(cmd) {
        if (cmd._command === 'api.InvokeCommandCommand') {
            var parser = new tab._apiServerResultParser(cmd.get_parameters());
            var dict = parser.get__data();
            if (ss.isValue(dict['isAutoUpdate'])) {
                this._isAutoUpdate = dict['isAutoUpdate'];
            }
        }
    },
    
    _onNotified: function tableauSoftware_Viz$_onNotified(notification, args) {
        var notif = new tab._apiServerNotificationParser(args);
        if (notification === 'api.VizInteractiveEvent') {
            if (this.__onVizInteractive != null || this._onFirstInteractiveCallback != null) {
                if (this._workbook._name === notif.get__workbookName()) {
                    this._onWorkbookInteractive();
                }
            }
        }
        else if (notification === 'api.MarksSelectionChangedEvent') {
            if (this.__onMarksSelection != null) {
                if (this._workbook._name === notif.get__workbookName()) {
                    var sheet = this._workbook._sheets.get_item(notif.get__worksheetName());
                    sheet.set__selectedMarks(null);
                    this.__onMarksSelection(new tab.MarksEvent('marksselection', this, sheet));
                }
            }
        }
        else if (notification === 'api.FilterChangedEvent') {
            if (this.__onFilterChanged != null) {
                if (this._workbook._name === notif.get__workbookName()) {
                    var sheetName = notif.get__worksheetName();
                    var filterFieldName = notif.get__data();
                    var sheet = this._workbook._sheets.get_item(sheetName);
                    this.__onFilterChanged(new tab.FilterEvent('filterchange', this, sheet, filterFieldName));
                }
            }
        }
        else if (notification === 'api.StateChangedEvent') {
            if (this.__onStateChanged != null) {
                if (this._workbook._name === notif.get__workbookName()) {
                    this._workbook.set__lastChangedParameter(null);
                    var parameterName = notif.get__data();
                    this._notifyParameterChange(parameterName);
                }
            }
        }
        else if (notification === 'api.CustomViewsListLoadedEvent') {
            var cvlistJson = notif.get__data();
            var dict = JSON.parse(cvlistJson);
            if (ss.isNullOrUndefined(this._workbook)) {
                this._workbook = new tableauSoftware.Workbook(this, ss.Delegate.create(this, function() {
                    this._onWorkbookInteractive();
                }));
            }
            if (ss.isValue(this._workbook)) {
                tableauSoftware.CustomView._processCustomViews(this._workbook, dict);
            }
            if (this.__onCustomViewLoaded != null && !dict['customViewLoaded']) {
                this._notifyCustomViewLoaded();
            }
            for (var i = 0; i < this._reloadCallbackList.length; i++) {
                var pair = this._reloadCallbackList.pop();
                var sourceId = pair.value;
                var callback = this._commandCallbackList[sourceId.toString()];
                if (ss.isValue(callback)) {
                    var cmd = { _command: pair.fieldName };
                    callback(cmd);
                    delete this._commandCallbackList[sourceId.toString()];
                }
            }
        }
        else if (notification === 'api.CustomViewUpdatedEvent') {
            var cvlistJson = notif.get__data();
            var dict = JSON.parse(cvlistJson);
            if (ss.isNullOrUndefined(this._workbook)) {
                this._workbook = new tableauSoftware.Workbook(this, ss.Delegate.create(this, function() {
                    this._onWorkbookInteractive();
                }));
            }
            if (ss.isValue(this._workbook)) {
                tableauSoftware.CustomView._processCustomViewUpdate(this._workbook, dict, true);
            }
            if (this.__onCustomViewUpdated != null && this._workbook.get__updatedCustomViews().get__length() > 0) {
                this._notifyCustomViewUpdated();
            }
        }
        else if (notification === 'api.CustomViewRemovedEvent') {
            if (this.__onCustomViewRemoved != null) {
                this._notifyCustomViewRemoved();
            }
        }
        else if (notification === 'api.CustomViewSetDefaultEvent') {
            var cvlistJson = notif.get__data();
            var dict = JSON.parse(cvlistJson);
            if (ss.isValue(this._workbook)) {
                tableauSoftware.CustomView._processCustomViews(this._workbook, dict);
            }
            if (this.__onCustomViewSetDefault != null) {
                this._notifyCustomViewSetDefault();
            }
        }
        else if (notification === 'api.TabSwitchEvent') {
            if (this.__onTabSwitch != null) {
                if (this._workbook._name === notif.get__workbookName()) {
                    var oldSheetName = notif.get__worksheetName();
                    var currSheetName = notif.get__data();
                    this._notifyTabSwitch(oldSheetName, currSheetName);
                }
            }
        }
    },
    
    _onWorkbookInteractive: function tableauSoftware_Viz$_onWorkbookInteractive() {
        this._isInteractive = true;
        if (ss.isValue(this._onFirstInteractiveCallback)) {
            this._onFirstInteractiveCallback(new tab.TableauEvent('interactive', this));
            this._onFirstInteractiveCallback = null;
        }
        if (this.__onVizInteractive != null) {
            this.__onVizInteractive(new tab.TableauEvent('interactive', this));
        }
    },
    
    _onLoaded: function tableauSoftware_Viz$_onLoaded() {
        this._hideLoadIndicators();
        this._sendVizOffset();
        if (ss.isNullOrUndefined(this._workbook)) {
            this._workbook = new tableauSoftware.Workbook(this, ss.Delegate.create(this, function() {
                this._onWorkbookInteractive();
            }));
        }
        else {
            this._workbook._update(ss.Delegate.create(this, function() {
                this._onWorkbookInteractive();
            }));
        }
    },
    
    _checkForDone: function tableauSoftware_Viz$_checkForDone() {
        if (tab._Utility.isIE()) {
            if (this._iFrame.readyState === 'complete') {
                this._onLoaded();
                tab._VizManagerImpl._loadNextViz();
            }
        }
        else {
            this._onLoaded();
            tab._VizManagerImpl._loadNextViz();
        }
    },
    
    _onCheckForDone: function tableauSoftware_Viz$_onCheckForDone() {
        window.setTimeout(ss.Delegate.create(this, this._checkForDone), 3000);
    },
    
    _createIframe: function tableauSoftware_Viz$_createIframe() {
        if (ss.isNullOrUndefined(this.getParentElement())) {
            return null;
        }
        var ifr = document.createElement('IFrame');
        ifr.frameBorder = '0';
        ifr.setAttribute('allowTransparency', 'true');
        ifr.marginHeight = '0';
        ifr.marginWidth = '0';
        ifr.style.width = this._parameters.width + 'px';
        ifr.style.height = this._parameters.height + 'px';
        this.getParentElement().appendChild(ifr);
        return ifr;
    },
    
    _getOnCheckForDoneDelegate: function tableauSoftware_Viz$_getOnCheckForDoneDelegate() {
        return ss.Delegate.create(this, function(e) {
            this._onCheckForDone();
        });
    },
    
    _toggleToolbar: function tableauSoftware_Viz$_toggleToolbar() {
        var param = {};
        param['api.showHideToolbarValue'] = this._areToolbarsHidden;
        this._sendCommand('api.ShowHideToolbarCommand', tab.JsonUtil.toJson(param, false, ''), null);
        this._areToolbarsHidden = !this._areToolbarsHidden;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.VizManager

tableauSoftware.VizManager = function tableauSoftware_VizManager() {
}
tableauSoftware.VizManager.getVizs = function tableauSoftware_VizManager$getVizs() {
    return tab._VizManagerImpl.getVizs();
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.Workbook

tableauSoftware.Workbook = function tableauSoftware_Workbook(viz, callback) {
    this._viz = viz;
    this._sheets = new tab._Collection();
    this._activeSheet = null;
    this._parameters = null;
    this._currentCustomView = null;
    this._customViews = new tab._Collection();
    this._updatedCustomViews = new tab._Collection();
    this._removedCustomViews = new tab._Collection();
    this._getClientInfo(callback);
}
tableauSoftware.Workbook.prototype = {
    _viz: null,
    _name: null,
    _activeSheet: null,
    _sheets: null,
    _framesInfo: null,
    _currentCustomView: null,
    _customViews: null,
    _updatedCustomViews: null,
    _removedCustomViews: null,
    _parameters: null,
    _lastChangedParameter: null,
    
    get__lastChangedParameter: function tableauSoftware_Workbook$get__lastChangedParameter() {
        return this._lastChangedParameter;
    },
    set__lastChangedParameter: function tableauSoftware_Workbook$set__lastChangedParameter(value) {
        this._lastChangedParameter = value;
        return value;
    },
    
    get__parameters: function tableauSoftware_Workbook$get__parameters() {
        return this._parameters;
    },
    set__parameters: function tableauSoftware_Workbook$set__parameters(value) {
        this._parameters = value;
        return value;
    },
    
    get__customViews: function tableauSoftware_Workbook$get__customViews() {
        return this._customViews;
    },
    set__customViews: function tableauSoftware_Workbook$set__customViews(value) {
        this._customViews = value;
        return value;
    },
    
    get__updatedCustomViews: function tableauSoftware_Workbook$get__updatedCustomViews() {
        return this._updatedCustomViews;
    },
    set__updatedCustomViews: function tableauSoftware_Workbook$set__updatedCustomViews(value) {
        this._updatedCustomViews = value;
        return value;
    },
    
    get__removedCustomViews: function tableauSoftware_Workbook$get__removedCustomViews() {
        return this._removedCustomViews;
    },
    set__removedCustomViews: function tableauSoftware_Workbook$set__removedCustomViews(value) {
        this._removedCustomViews = value;
        return value;
    },
    
    get__currentCustomView: function tableauSoftware_Workbook$get__currentCustomView() {
        return this._currentCustomView;
    },
    set__currentCustomView: function tableauSoftware_Workbook$set__currentCustomView(value) {
        this._currentCustomView = value;
        return value;
    },
    
    getViz: function tableauSoftware_Workbook$getViz() {
        return this._viz;
    },
    
    getPublishedSheets: function tableauSoftware_Workbook$getPublishedSheets() {
        return this._sheets._clone();
    },
    
    getName: function tableauSoftware_Workbook$getName() {
        return this._name;
    },
    
    getActiveSheet: function tableauSoftware_Workbook$getActiveSheet() {
        return this._activeSheet;
    },
    
    getActiveCustomView: function tableauSoftware_Workbook$getActiveCustomView() {
        return this._currentCustomView;
    },
    
    revertAllAsync: function tableauSoftware_Workbook$revertAllAsync() {
        var deferred = new tab._Deferred();
        this._viz._sendCommand('api.RevertAllCommand', null, function(cmd) {
            if (cmd._command === 'api.RevertAllCommand') {
                deferred.resolve(null);
            }
        });
        return deferred.get_promise();
    },
    
    getCustomViewsAsync: function tableauSoftware_Workbook$getCustomViewsAsync() {
        return tableauSoftware.CustomView._getCustomViewsAsync(this);
    },
    
    showCustomViewAsync: function tableauSoftware_Workbook$showCustomViewAsync(customViewName) {
        if (ss.isNullOrUndefined(customViewName) || tab._Utility.isNullOrEmpty(customViewName)) {
            return tableauSoftware.CustomView._showCustomViewAsync(this, null);
        }
        else {
            var cv = this._customViews.get_item(customViewName);
            if (ss.isNullOrUndefined(cv)) {
                throw tab._tableauException._create(5, 'Invalid parameter');
            }
            return cv.showAsync();
        }
    },
    
    removeCustomViewAsync: function tableauSoftware_Workbook$removeCustomViewAsync(customViewName) {
        if (tab._Utility.isNullOrEmpty(customViewName)) {
            throw tab._tableauException._create(5, 'Invalid parameter');
        }
        var cv = this._customViews.get_item(customViewName);
        if (ss.isNullOrUndefined(cv)) {
            throw tab._tableauException._create(5, 'Invalid parameter');
        }
        return tableauSoftware.CustomView._removeAsync(this, cv);
    },
    
    rememberCustomViewAsync: function tableauSoftware_Workbook$rememberCustomViewAsync(customViewName) {
        if (tab._Utility.isNullOrEmpty(customViewName)) {
            throw tab._tableauException._create(5, 'Invalid parameter');
        }
        return tableauSoftware.CustomView._saveNewAsync(this, customViewName);
    },
    
    setActiveCustomViewAsDefaultAsync: function tableauSoftware_Workbook$setActiveCustomViewAsDefaultAsync() {
        return tableauSoftware.CustomView._makeCurrentCustomViewDefaultAsync(this);
    },
    
    getParametersAsync: function tableauSoftware_Workbook$getParametersAsync() {
        return tableauSoftware.Parameter._getParametersAsync(this);
    },
    
    changeParameterValueAsync: function tableauSoftware_Workbook$changeParameterValueAsync(name, value) {
        return tableauSoftware.Parameter._changeValueAsync(this, name, value);
    },
    
    _update: function tableauSoftware_Workbook$_update(callback) {
        this._getClientInfo(callback);
    },
    
    _setActiveSheetAsync: function tableauSoftware_Workbook$_setActiveSheetAsync(sheet) {
        var deferred = new tab._Deferred();
        if (sheet === this._activeSheet) {
            deferred.resolve(sheet);
            return deferred.get_promise();
        }
        var param = {};
        param['api.switchToSheetName'] = sheet._name;
        param['api.switchToRepositoryUrl'] = sheet._repositoryUrl;
        param['api.oldRepositoryUrl'] = this._activeSheet._repositoryUrl;
        this._viz._sendCommand('api.SwitchActiveSheetCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
            if (cmd._command === 'api.SwitchActiveSheetCommand') {
                var srvResult = new tab._apiServerResultParser(cmd.get_parameters());
                if (srvResult.get__result() === 'api.success') {
                    deferred.resolve(sheet);
                }
                else {
                    deferred.reject(tab._tableauException._create(3, srvResult.get__data()));
                }
            }
        });
        return deferred.get_promise();
    },
    
    _updateActiveSheetAsync: function tableauSoftware_Workbook$_updateActiveSheetAsync() {
        var deferred = new tab._Deferred();
        var param = {};
        param['api.switchToSheetName'] = this._activeSheet._name;
        param['api.switchToRepositoryUrl'] = this._activeSheet._repositoryUrl;
        param['api.oldRepositoryUrl'] = this._activeSheet._repositoryUrl;
        this._viz._sendCommand('api.UpdateActiveSheetCommand', tab.JsonUtil.toJson(param, false, ''), ss.Delegate.create(this, function(cmd) {
            if (cmd._command === 'api.UpdateActiveSheetCommand') {
                var srvResult = new tab._apiServerResultParser(cmd.get_parameters());
                if (srvResult.get__result() === 'api.success') {
                    deferred.resolve(this._activeSheet);
                }
                else {
                    deferred.reject(tab._tableauException._create(3, srvResult.get__data()));
                }
            }
        }));
        return deferred.get_promise();
    },
    
    _sheetSizeToDictionary: function tableauSoftware_Workbook$_sheetSizeToDictionary(size) {
        var dict = {};
        var minWidth = 0;
        var minHeight = 0;
        var maxWidth = 0;
        var maxHeight = 0;
        if (ss.isValue(size)) {
            switch (size.behavior) {
                case 'ATLEAST':
                    minHeight = size.minSize.height;
                    minWidth = size.minSize.width;
                    break;
                case 'ATMOST':
                    maxHeight = size.maxSize.height;
                    maxWidth = size.maxSize.width;
                    break;
                case 'EXACTLY':
                    maxHeight = size.maxSize.height;
                    maxWidth = size.maxSize.width;
                    minHeight = size.maxSize.height;
                    minWidth = size.maxSize.width;
                    break;
                case 'RANGE':
                    minHeight = size.minSize.height;
                    minWidth = size.minSize.width;
                    maxHeight = size.maxSize.height;
                    maxWidth = size.maxSize.width;
                    break;
                case 'AUTOMATIC':
                default:
                    break;
            }
        }
        dict['api.minWidth'] = minWidth;
        dict['api.minHeight'] = minHeight;
        dict['api.maxWidth'] = maxWidth;
        dict['api.maxHeight'] = maxHeight;
        return dict;
    },
    
    _processSheetSize: function tableauSoftware_Workbook$_processSheetSize(baseSheet, sheet) {
        if (ss.isValue(baseSheet)) {
            var minH = baseSheet['minHeight'];
            var minW = baseSheet['minWidth'];
            var maxH = baseSheet['maxHeight'];
            var maxW = baseSheet['maxWidth'];
            if (!minH && !minW) {
                if (!maxH && !maxW) {
                    sheet._size.behavior = 'AUTOMATIC';
                    sheet._size.maxSize = null;
                    sheet._size.minSize = null;
                }
                else {
                    sheet._size.behavior = 'ATMOST';
                    sheet._size.minSize = null;
                    sheet._size.maxSize = {};
                    sheet._size.maxSize.height = maxH;
                    sheet._size.maxSize.width = maxW;
                }
            }
            else if (!maxH && !maxW) {
                sheet._size.behavior = 'ATLEAST';
                sheet._size.maxSize = null;
                sheet._size.minSize = {};
                sheet._size.minSize.height = minH;
                sheet._size.minSize.width = minW;
            }
            else if (maxH === minH && maxW === minW) {
                sheet._size.behavior = 'EXACTLY';
                sheet._size.maxSize = null;
                sheet._size.minSize = {};
                sheet._size.minSize.height = minH;
                sheet._size.minSize.width = minW;
            }
            else {
                sheet._size.behavior = 'RANGE';
                sheet._size.maxSize = {};
                sheet._size.minSize = {};
                sheet._size.minSize.height = minH;
                sheet._size.minSize.width = minW;
                sheet._size.maxSize.height = maxH;
                sheet._size.maxSize.width = maxW;
            }
        }
    },
    
    _getClientInfo: function tableauSoftware_Workbook$_getClientInfo(callback) {
        this._viz._sendCommand('api.GetClientInfoCommand', null, ss.Delegate.create(this, function(cmd) {
            if (cmd._command === 'api.GetClientInfoCommand') {
                var parser = new tab._apiServerResultParser(cmd.get_parameters());
                var dict = parser.get__data();
                this._processInfo(dict);
                if (ss.isValue(callback)) {
                    callback();
                }
            }
        }));
    },
    
    _processInfo: function tableauSoftware_Workbook$_processInfo(jsonObj) {
        if (ss.isValue(jsonObj['isAutoUpdate'])) {
            this._viz._isAutoUpdate = jsonObj['isAutoUpdate'];
        }
        if (ss.isValue(jsonObj['clientUrl'])) {
            this._viz._clientUrl = jsonObj['clientUrl'];
        }
        if (ss.isValue(jsonObj['workbookName'])) {
            this._name = jsonObj['workbookName'];
        }
        this._processBaseSheets(jsonObj);
        this._processViews(jsonObj);
        this._processFrames(jsonObj);
        this._setupActiveSheet(jsonObj);
    },
    
    _setupActiveSheet: function tableauSoftware_Workbook$_setupActiveSheet(jsonObj) {
        if (this._activeSheet == null) {
            var dict = { name: jsonObj['currentSheetName'], isActive: true };
            if (('isDashboard' in jsonObj) && jsonObj['isDashboard']) {
                dict['isDashboard'] = true;
                this._activeSheet = new tableauSoftware.Dashboard(dict, this);
            }
            else {
                dict['isDashboard'] = false;
                this._activeSheet = new tableauSoftware.Worksheet(dict, this);
            }
        }
        else {
            var sheet = this._sheets.get_item(jsonObj['currentSheetName']);
            if (sheet !== this._activeSheet) {
                this._activeSheet._isActive = false;
                this._activeSheet = sheet;
                this._activeSheet._isActive = true;
            }
        }
        this._activeSheet._addObjects(this._framesInfo);
    },
    
    _processBaseSheets: function tableauSoftware_Workbook$_processBaseSheets(jsonObj) {
        var i = 0;
        var visibleSheets = jsonObj['visibleSheets'];
        var repositoryUrls = jsonObj['repositoryUrls'];
        var baseSheets = jsonObj['baseSheets'];
        if (ss.isValue(baseSheets)) {
            for (i = 0; i < visibleSheets.length; i++) {
                var baseSheet = baseSheets[i];
                var sheet = this._sheets.get_item(visibleSheets[i]);
                if (sheet == null) {
                    if (baseSheet['isDashboard']) {
                        sheet = new tableauSoftware.Dashboard(null, this);
                    }
                    else {
                        sheet = new tableauSoftware.Worksheet(null, this);
                    }
                    this._sheets._add(visibleSheets[i], sheet);
                }
                if (visibleSheets[i] === jsonObj['currentSheetName']) {
                    this._activeSheet = sheet;
                    this._activeSheet._isActive = true;
                }
                else {
                    sheet._isActive = false;
                }
                sheet._repositoryUrl = repositoryUrls[i];
                sheet._name = visibleSheets[i];
                sheet._index = i;
                sheet._isHidden = false;
                this._processSheetSize(baseSheet, sheet);
            }
        }
    },
    
    _processViews: function tableauSoftware_Workbook$_processViews(jsonObj) {
        var views = jsonObj['views'];
        for (var i = 0; i < views.length; i++) {
            var view = views[i];
            var sheet = this._sheets.get_item(view['name']);
            sheet._update(view);
        }
    },
    
    _processFrames: function tableauSoftware_Workbook$_processFrames(jsonObj) {
        var frames = jsonObj['frames'];
        this._framesInfo = [];
        for (var i = 0; i < frames.length; i++) {
            var frame = frames[i];
            var frameInfo = new tableauSoftware.FrameInfo();
            if (frame['r'] === 'color' || frame['r'] === 'shape' || frame['r'] === 'size' || frame['r'] === 'map') {
                frameInfo._type = 'LEGEND';
            }
            else if (frame['r'] === 'layout-basic' || frame['r'] === 'layout-flow') {
                frameInfo._type = 'LAYOUT';
            }
            else if (frame['r'] === 'filter') {
                frameInfo._type = 'QUICK_FILTER';
            }
            else if (frame['r'] === 'viz') {
                frameInfo._type = 'WORKSHEET';
            }
            else if (frame['r'] === 'paramctrl') {
                frameInfo._type = 'PARAMETER_CONTROL';
            }
            else if (frame['r'] === 'empty') {
                frameInfo._type = 'BLANK';
            }
            else if (frame['r'] === 'title') {
                frameInfo._type = 'TITLE';
            }
            else if (frame['r'] === 'text') {
                frameInfo._type = 'TEXT';
            }
            else if (frame['r'] === 'bitmap') {
                frameInfo._type = 'IMAGE';
            }
            else if (frame['r'] === 'web') {
                frameInfo._type = 'WEB_PAGE';
            }
            var size = {};
            size.height = parseInt(frame['h'], 10);
            size.width = parseInt(frame['w'], 10);
            frameInfo._size = size;
            var pt = {};
            pt.x = parseInt(frame['x'], 10);
            pt.y = parseInt(frame['y'], 10);
            frameInfo._position = pt;
            frameInfo._name = frame['name'];
            frameInfo._visible = frame['visible'];
            frameInfo._categorical = frame['categorical'];
            frameInfo._param = frame['param'];
            frameInfo._attributes = frame['attributes'];
            frameInfo._url = frame['url'];
            this._framesInfo.push(frameInfo);
        }
    }
}


////////////////////////////////////////////////////////////////////////////////
// tableauSoftware.Worksheet

tableauSoftware.Worksheet = function tableauSoftware_Worksheet(jsonObject, workbook) {
    tableauSoftware.Worksheet.initializeBase(this, [ jsonObject, workbook ]);
    this._framesInfo$1 = [];
}
tableauSoftware.Worksheet.prototype = {
    _framesInfo$1: null,
    _selectedMarks$1: null,
    _filters$1: null,
    _dataSources$1: null,
    
    get__filters: function tableauSoftware_Worksheet$get__filters() {
        return this._filters$1;
    },
    set__filters: function tableauSoftware_Worksheet$set__filters(value) {
        this._filters$1 = value;
        return value;
    },
    
    get__dataSources: function tableauSoftware_Worksheet$get__dataSources() {
        return this._dataSources$1;
    },
    set__dataSources: function tableauSoftware_Worksheet$set__dataSources(value) {
        this._dataSources$1 = value;
        return value;
    },
    
    get__selectedMarks: function tableauSoftware_Worksheet$get__selectedMarks() {
        return this._selectedMarks$1;
    },
    set__selectedMarks: function tableauSoftware_Worksheet$set__selectedMarks(value) {
        this._selectedMarks$1 = value;
        return value;
    },
    
    getDataSourcesAsync: function tableauSoftware_Worksheet$getDataSourcesAsync() {
        return tableauSoftware.DataSource._getDataSourcesAsync(this);
    },
    
    getFiltersAsync: function tableauSoftware_Worksheet$getFiltersAsync() {
        return tableauSoftware.Filter._getFiltersAsync(this);
    },
    
    applyFilterAsync: function tableauSoftware_Worksheet$applyFilterAsync(fieldName, values, updateType) {
        return this._applyFilterWithValuesAsync$1(fieldName, values, updateType);
    },
    
    applyRangeFilterAsync: function tableauSoftware_Worksheet$applyRangeFilterAsync(fieldName, filterOptions) {
        if (tab._Utility.isNullOrEmpty(fieldName) || ss.isNullOrUndefined(filterOptions)) {
            throw tab._tableauException._create(5, 'Invalid parameter');
        }
        var fixedUpFilterOptions = this._validateRangeFilterOption$1(filterOptions);
        if (fixedUpFilterOptions == null) {
            throw tab._tableauException._create(5, 'Invalid parameter');
        }
        var param = {};
        param['api.fieldCaption'] = fieldName;
        if (ss.isValue(fixedUpFilterOptions.min)) {
            if (tab._Utility.isDate(fixedUpFilterOptions.min)) {
                param['api.filterRangeMin'] = this._serializeDateForServer$1(fixedUpFilterOptions.min);
            }
            else {
                param['api.filterRangeMin'] = fixedUpFilterOptions.min;
            }
        }
        if (ss.isValue(fixedUpFilterOptions.max)) {
            if (tab._Utility.isDate(fixedUpFilterOptions.max)) {
                param['api.filterRangeMax'] = this._serializeDateForServer$1(fixedUpFilterOptions.max);
            }
            else {
                param['api.filterRangeMax'] = fixedUpFilterOptions.max;
            }
        }
        if (ss.isValue(fixedUpFilterOptions.nullOption)) {
            param['api.filterRangeNullOption'] = fixedUpFilterOptions.nullOption;
        }
        var deferred = new tab._Deferred();
        param['api.worksheetName'] = this.getName();
        this._workbook._viz._sendCommand('api.ApplyRangeFilterCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
            if (cmd._command === 'api.ApplyRangeFilterCommand') {
                var res = new tab._apiServerResultParser(cmd.get_parameters());
                if (res.get__result() === 'api.success') {
                    deferred.resolve(null);
                }
                else {
                    deferred.reject(tab._tableauException._create(3, res.get__data()));
                }
            }
        });
        return deferred.get_promise();
    },
    
    applyRelativeDateFilterAsync: function tableauSoftware_Worksheet$applyRelativeDateFilterAsync(fieldName, filterOptions) {
        if (tab._Utility.isNullOrEmpty(fieldName) || ss.isNullOrUndefined(filterOptions)) {
            throw tab._tableauException._create(5, 'Invalid parameter');
        }
        var fixedUpFilterOptions = this._validateRelativeDateFilterOption$1(filterOptions);
        if (fixedUpFilterOptions == null) {
            throw tab._tableauException._create(5, 'Invalid parameter');
        }
        var param = {};
        param['api.fieldCaption'] = fieldName;
        param['api.filterPeriodType'] = fixedUpFilterOptions.periodType;
        param['api.filterDateRangeType'] = fixedUpFilterOptions.rangeType;
        param['api.filterDateRange'] = fixedUpFilterOptions.rangeN;
        if (ss.isValue(fixedUpFilterOptions.anchorDate)) {
            param['api.filterDateArchorValue'] = this._serializeDateForServer$1(fixedUpFilterOptions.anchorDate);
        }
        param['api.worksheetName'] = this.getName();
        var deferred = new tab._Deferred();
        this._workbook._viz._sendCommand('api.ApplyRelativeDateFilterCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
            if (cmd._command === 'api.ApplyRelativeDateFilterCommand') {
                var res = new tab._apiServerResultParser(cmd.get_parameters());
                if (res.get__result() === 'api.success') {
                    deferred.resolve(null);
                }
                else {
                    deferred.reject(tab._tableauException._create(3, res.get__data()));
                }
            }
        });
        return deferred.get_promise();
    },
    
    applyHierarchicalFilterAsync: function tableauSoftware_Worksheet$applyHierarchicalFilterAsync(fieldName, values, updateType) {
        if (tab._Utility.isNullOrEmpty(fieldName) || ss.isNullOrUndefined(updateType) || !this._validateUpdateType$1(updateType)) {
            throw tab._tableauException._create(5, 'Invalid parameter');
        }
        var fieldValues = null;
        var levelValues = null;
        if (tab._jQueryShim.isArray(values)) {
            fieldValues = [];
            var arr = values;
            for (var i = 0; i < arr.length; i++) {
                fieldValues.push(arr[i].toString());
            }
        }
        else if (tab._Utility.isString(values)) {
            fieldValues = [];
            fieldValues.push(values.toString());
        }
        else if (ss.isValue(values) && ss.isValue(values.levels)) {
            var levelValue = values.levels;
            levelValues = [];
            if (tab._jQueryShim.isArray(levelValue)) {
                var levels = levelValue;
                for (var i = 0; i < levels.length; i++) {
                    levelValues.push(levels[i].toString());
                }
            }
            else {
                levelValues.push(levelValue.toString());
            }
        }
        else {
            throw tab._tableauException._create(5, 'Invalid parameter');
        }
        var param = {};
        param['api.fieldCaption'] = fieldName;
        param['api.filterUpdateType'] = updateType;
        if (fieldValues != null) {
            param['api.filterHierarchicalValues'] = tab.JsonUtil.toJson(fieldValues, false, '');
        }
        if (levelValues != null) {
            param['api.filterHierarchicalLevels'] = tab.JsonUtil.toJson(levelValues, false, '');
        }
        var deferred = new tab._Deferred();
        param['api.worksheetName'] = this.getName();
        this._workbook._viz._sendCommand('api.ApplyHierarchicalFilterCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
            if (cmd._command === 'api.ApplyHierarchicalFilterCommand') {
                var res = new tab._apiServerResultParser(cmd.get_parameters());
                if (res.get__result() === 'api.success') {
                    deferred.resolve(null);
                }
                else {
                    deferred.reject(tab._tableauException._create(3, res.get__data()));
                }
            }
        });
        return deferred.get_promise();
    },
    
    clearSelectedMarksAsync: function tableauSoftware_Worksheet$clearSelectedMarksAsync() {
        var deferred = new tab._Deferred();
        var param = {};
        param['api.worksheetName'] = this.getName();
        param['api.filterUpdateType'] = 'REPLACE';
        this._workbook._viz._sendCommand('api.SelectMarksCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
            if (cmd._command === 'api.SelectMarksCommand') {
                var res = new tab._apiServerResultParser(cmd.get_parameters());
                if (res.get__result() === 'api.success') {
                    deferred.resolve(new Array(0));
                }
                else {
                    deferred.reject(tab._tableauException._create(3, res.get__data()));
                }
            }
        });
        return deferred.get_promise();
    },
    
    selectMarksAsync: function tableauSoftware_Worksheet$selectMarksAsync(fieldNameOrFieldValuesMap, valueOrUpdateType, updateType) {
        if (fieldNameOrFieldValuesMap == null && valueOrUpdateType == null) {
            return this.clearSelectedMarksAsync();
        }
        if (tab._Utility.isString(fieldNameOrFieldValuesMap) && (tab._jQueryShim.isArray(valueOrUpdateType) || tab._Utility.isString(valueOrUpdateType) || !this._validateUpdateType$1(valueOrUpdateType))) {
            return this._selectMarksWithFieldNameAndValueAsync$1(fieldNameOrFieldValuesMap, valueOrUpdateType, updateType);
        }
        else if (tab._jQueryShim.isArray(fieldNameOrFieldValuesMap)) {
            return this._selectMarksWithMarksArrayAsync$1(fieldNameOrFieldValuesMap, valueOrUpdateType);
        }
        else {
            return this._selectMarksWithMultiDimOptionAsync$1(fieldNameOrFieldValuesMap, valueOrUpdateType);
        }
    },
    
    getSelectedMarksAsync: function tableauSoftware_Worksheet$getSelectedMarksAsync() {
        return tableauSoftware.Mark._getSelectedMarksAsync(this);
    },
    
    _update: function tableauSoftware_Worksheet$_update(jsonObject) {
        tableauSoftware.Worksheet.callBaseMethod(this, '_update', [ jsonObject ]);
    },
    
    _addObjects: function tableauSoftware_Worksheet$_addObjects(frames) {
        for (var i = 0; i < frames.length; i++) {
            if (ss.isValue(frames[i]._name) && frames[i]._name === this.getName()) {
                this._framesInfo$1.push(frames[i]);
            }
        }
    },
    
    _serializeDateForServer$1: function tableauSoftware_Worksheet$_serializeDateForServer$1(dt) {
        if (ss.isValue(dt) && tab._Utility.isDate(dt)) {
            var year = dt.getUTCFullYear();
            var month = dt.getUTCMonth() + 1;
            var day = dt.getUTCDate();
            return year.toString() + '-' + month.toString() + '-' + day.toString();
        }
        return '';
    },
    
    _selectMarksWithFieldNameAndValueAsync$1: function tableauSoftware_Worksheet$_selectMarksWithFieldNameAndValueAsync$1(fieldName, value, updateType) {
        var catNameList = [];
        var catValueList = [];
        var hierNameList = [];
        var hierValueList = [];
        var rangeNameList = [];
        var rangeValueList = [];
        this._parseMarksParam$1(catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, fieldName, value);
        return this._selectMarksWithValuesAsync$1(null, catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, updateType);
    },
    
    _selectMarksWithMultiDimOptionAsync$1: function tableauSoftware_Worksheet$_selectMarksWithMultiDimOptionAsync$1(fieldValuesMap, updateType) {
        var dict = fieldValuesMap;
        var catNameList = [];
        var catValueList = [];
        var hierNameList = [];
        var hierValueList = [];
        var rangeNameList = [];
        var rangeValueList = [];
        var $dict1 = dict;
        for (var $key2 in $dict1) {
            var ent = { key: $key2, value: $dict1[$key2] };
            if (fieldValuesMap.hasOwnProperty(ent.key)) {
                if (!tab._jQueryShim.isFunction(dict[ent.key])) {
                    this._parseMarksParam$1(catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, ent.key, ent.value);
                }
            }
        }
        return this._selectMarksWithValuesAsync$1(null, catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, updateType);
    },
    
    _selectMarksWithMarksArrayAsync$1: function tableauSoftware_Worksheet$_selectMarksWithMarksArrayAsync$1(marksArray, updateType) {
        var catNameList = [];
        var catValueList = [];
        var hierNameList = [];
        var hierValueList = [];
        var rangeNameList = [];
        var rangeValueList = [];
        var tupleIdList = [];
        for (var i = 0; i < marksArray.length; i++) {
            var mark = marksArray[i];
            if (ss.isValue(mark._tupleId)) {
                tupleIdList.push(mark._tupleId);
            }
            else {
                var pairs = mark.pairs;
                for (var j = 0; j < pairs.length; j++) {
                    var pair = pairs[j];
                    if (pair.hasOwnProperty('fieldName') && pair.hasOwnProperty('value') && !tab._jQueryShim.isFunction(pair.fieldName) && !tab._jQueryShim.isFunction(pair.value)) {
                        this._parseMarksParam$1(catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, pair.fieldName, pair.value);
                    }
                }
            }
        }
        return this._selectMarksWithValuesAsync$1(tupleIdList, catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, updateType);
    },
    
    _parseMarksParam$1: function tableauSoftware_Worksheet$_parseMarksParam$1(catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, fieldName, value) {
        if (tableauSoftware.Worksheet._regexHierarchicalFieldName$1.test(fieldName)) {
            this._addToParamLists$1(hierNameList, hierValueList, fieldName, value);
        }
        else if (ss.isValue(value.min) || ss.isValue(value.max)) {
            var range = {};
            if (ss.isValue(value.min)) {
                range['min'] = value.min;
            }
            if (ss.isValue(value.max)) {
                range['max'] = value.max;
            }
            if (tab._Utility.hasOwnProperty(value, 'nullOption')) {
                var nullOption = value.nullOption;
                if (!this._validateNullOption$1(nullOption)) {
                    throw tab._tableauException._create(5, 'Invalid parameter');
                }
                range['nullOption'] = nullOption;
            }
            else {
                range['nullOption'] = 'ALL_VALUES';
            }
            var jsonValue = tab.JsonUtil.toJson(range, false, '');
            this._addToParamLists$1(rangeNameList, rangeValueList, fieldName, jsonValue);
        }
        else {
            this._addToParamLists$1(catNameList, catValueList, fieldName, value);
        }
    },
    
    _addToParamLists$1: function tableauSoftware_Worksheet$_addToParamLists$1(paramNameList, paramValueList, paramName, paramValue) {
        var markValues = [];
        if (tab._jQueryShim.isArray(paramValue)) {
            var values = paramValue;
            for (var i = 0; i < values.length; i++) {
                markValues.push(values[i]);
            }
        }
        else {
            markValues.push(paramValue);
        }
        paramValueList.push(markValues);
        paramNameList.push(paramName);
    },
    
    _selectMarksWithValuesAsync$1: function tableauSoftware_Worksheet$_selectMarksWithValuesAsync$1(tupleIdList, catNameList, catValueList, hierNameList, hierValueList, rangeNameList, rangeValueList, updateType) {
        var param = {};
        if (ss.isNullOrUndefined(updateType) || !this._validateUpdateType$1(updateType)) {
            throw tab._tableauException._create(5, 'Invalid parameter');
        }
        param['api.worksheetName'] = this.getName();
        param['api.filterUpdateType'] = updateType;
        if (!tab._Utility.isNullOrEmpty(tupleIdList)) {
            param['api.tupleIds'] = tab.JsonUtil.toJson(tupleIdList, false, '');
        }
        if (!tab._Utility.isNullOrEmpty(catNameList) && !tab._Utility.isNullOrEmpty(catValueList)) {
            param['api.categoricalFieldCaption'] = tab.JsonUtil.toJson(catNameList, false, '');
            var markValues = [];
            for (var i = 0; i < catValueList.length; i++) {
                var values = tab.JsonUtil.toJson(catValueList[i], false, '');
                markValues.push(values);
            }
            param['api.categoricalMarkValues'] = tab.JsonUtil.toJson(markValues, false, '');
        }
        if (!tab._Utility.isNullOrEmpty(hierNameList) && !tab._Utility.isNullOrEmpty(hierValueList)) {
            param['api.hierarchicalFieldCaption'] = tab.JsonUtil.toJson(hierNameList, false, '');
            var markValues = [];
            for (var i = 0; i < hierValueList.length; i++) {
                var values = tab.JsonUtil.toJson(hierValueList[i], false, '');
                markValues.push(values);
            }
            param['api.hierarchicalMarkValues'] = tab.JsonUtil.toJson(markValues, false, '');
        }
        if (!tab._Utility.isNullOrEmpty(rangeNameList) && !tab._Utility.isNullOrEmpty(rangeValueList)) {
            param['api.rangeFieldCaption'] = tab.JsonUtil.toJson(rangeNameList, false, '');
            var markValues = [];
            for (var i = 0; i < rangeValueList.length; i++) {
                var values = tab.JsonUtil.toJson(rangeValueList[i], false, '');
                markValues.push(values);
            }
            param['api.rangeMarkValues'] = tab.JsonUtil.toJson(markValues, false, '');
        }
        if (tab._Utility.isNullOrEmpty(param['api.tupleIds']) && tab._Utility.isNullOrEmpty(param['api.categoricalFieldCaption']) && tab._Utility.isNullOrEmpty(param['api.hierarchicalFieldCaption']) && tab._Utility.isNullOrEmpty(param['api.rangeFieldCaption'])) {
            throw tab._tableauException._create(5, 'Invalid parameter');
        }
        var deferred = new tab._Deferred();
        this._workbook._viz._sendCommand('api.SelectMarksCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
            if (cmd._command === 'api.SelectMarksCommand') {
                var res = new tab._apiServerResultParser(cmd.get_parameters());
                if (res.get__result() === 'api.success') {
                    deferred.resolve(null);
                }
                else {
                    deferred.reject(tab._tableauException._create(3, res.get__data()));
                }
            }
        });
        return deferred.get_promise();
    },
    
    _validateRangeFilterOption$1: function tableauSoftware_Worksheet$_validateRangeFilterOption$1(filterOptions) {
        if (ss.isNullOrUndefined(filterOptions)) {
            return null;
        }
        if (ss.isNullOrUndefined(filterOptions.min) && ss.isNullOrUndefined(filterOptions.max)) {
            return null;
        }
        var fixedUpFilterOptions = {};
        if (ss.isValue(filterOptions.min)) {
            fixedUpFilterOptions.min = filterOptions.min;
        }
        if (ss.isValue(filterOptions.max)) {
            fixedUpFilterOptions.max = filterOptions.max;
        }
        if (ss.isValue(filterOptions.nullOption)) {
            if (filterOptions.nullOption === 'ALL_VALUES' || filterOptions.nullOption === 'NON_NULL_VALUES' || filterOptions.nullOption === 'NULL_VALUES') {
                fixedUpFilterOptions.nullOption = filterOptions.nullOption;
            }
            else {
                return null;
            }
        }
        return fixedUpFilterOptions;
    },
    
    _validatePeriodType$1: function tableauSoftware_Worksheet$_validatePeriodType$1(periodType) {
        switch (periodType) {
            case 'YEAR':
            case 'QUARTER':
            case 'MONTH':
            case 'WEEK':
            case 'DAY':
            case 'HOUR':
            case 'MINUTE':
            case 'SECOND':
                return true;
            default:
                return false;
        }
    },
    
    _validateDateRangeType$1: function tableauSoftware_Worksheet$_validateDateRangeType$1(rangeType) {
        switch (rangeType) {
            case 'LAST':
            case 'LASTN':
            case 'NEXT':
            case 'NEXTN':
            case 'CURR':
            case 'TODATE':
                return true;
            default:
                return false;
        }
    },
    
    _validateUpdateType$1: function tableauSoftware_Worksheet$_validateUpdateType$1(updateType) {
        switch (updateType) {
            case 'ALL':
            case 'REPLACE':
            case 'ADD':
            case 'REMOVE':
                return true;
            default:
                return false;
        }
    },
    
    _validateNullOption$1: function tableauSoftware_Worksheet$_validateNullOption$1(nullOption) {
        switch (nullOption) {
            case 'ALL_VALUES':
            case 'NON_NULL_VALUES':
            case 'NULL_VALUES':
                return true;
            default:
                return false;
        }
    },
    
    _validateRelativeDateFilterOption$1: function tableauSoftware_Worksheet$_validateRelativeDateFilterOption$1(filterOptions) {
        if (ss.isNullOrUndefined(filterOptions)) {
            return null;
        }
        if (ss.isValue(filterOptions.periodType) && this._validatePeriodType$1(filterOptions.periodType)) {
            if (ss.isValue(filterOptions.rangeType) && this._validateDateRangeType$1(filterOptions.rangeType)) {
                var fixedUpFilterOptions = {};
                if (filterOptions.rangeType === 'LASTN' || filterOptions.rangeType === 'NEXTN') {
                    if (ss.isNullOrUndefined(filterOptions.rangeN)) {
                        return null;
                    }
                    fixedUpFilterOptions.rangeN = filterOptions.rangeN;
                }
                if (ss.isValue(filterOptions.anchorDate) && !tab._Utility.isDate(filterOptions.anchorDate)) {
                    return null;
                }
                fixedUpFilterOptions.periodType = filterOptions.periodType;
                fixedUpFilterOptions.rangeType = filterOptions.rangeType;
                fixedUpFilterOptions.anchorDate = filterOptions.anchorDate;
                return fixedUpFilterOptions;
            }
        }
        return null;
    },
    
    _applyFilterWithValuesAsync$1: function tableauSoftware_Worksheet$_applyFilterWithValuesAsync$1(fieldName, values, updateType) {
        if (tab._Utility.isNullOrEmpty(fieldName) || ss.isNullOrUndefined(updateType) || !this._validateUpdateType$1(updateType)) {
            throw tab._tableauException._create(5, 'Invalid parameter');
        }
        var fieldValues = [];
        if (tab._jQueryShim.isArray(values)) {
            for (var i = 0; i < values.length; i++) {
                fieldValues.push(values[i].toString());
            }
        }
        else {
            fieldValues.push(values.toString());
        }
        var deferred = new tab._Deferred();
        var param = {};
        param['api.fieldCaption'] = fieldName;
        param['api.filterUpdateType'] = updateType;
        param['api.filterCategoricalValues'] = tab.JsonUtil.toJson(fieldValues, false, '');
        param['api.worksheetName'] = this.getName();
        this._workbook._viz._sendCommand('api.ApplyCategoricalFilterCommand', tab.JsonUtil.toJson(param, false, ''), function(cmd) {
            if (cmd._command === 'api.ApplyCategoricalFilterCommand') {
                var res = new tab._apiServerResultParser(cmd.get_parameters());
                if (res.get__result() === 'api.success') {
                    deferred.resolve(fieldName);
                }
                else {
                    deferred.reject(tab._tableauException._create(3, res.get__data()));
                }
            }
        });
        return deferred.get_promise();
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab.WorksheetEvent

tab.WorksheetEvent = function tab_WorksheetEvent(eventName, viz, worksheet) {
    tab.WorksheetEvent.initializeBase(this, [ eventName, viz ]);
    this._worksheet$1 = worksheet;
}
tab.WorksheetEvent.prototype = {
    _worksheet$1: null,
    
    getWorksheet: function tab_WorksheetEvent$getWorksheet() {
        return this._worksheet$1;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab._ApiCommandParser

tab._ApiCommandParser = function tab__ApiCommandParser(multiLineParams) {
    var index = multiLineParams.indexOf(',');
    if (index < 0) {
        this._command = multiLineParams;
        return;
    }
    this._command = multiLineParams.substr(0, index);
    var secondPart = multiLineParams.substr(index + 1);
    index = secondPart.indexOf(',');
    if (index < 0) {
        this._sourceId = secondPart;
        return;
    }
    this._sourceId = secondPart.substr(0, index);
    var thirdPart = secondPart.substr(index + 1);
    index = thirdPart.indexOf(',');
    if (index < 0) {
        this._vizUniqueId = thirdPart;
        return;
    }
    this._vizUniqueId = thirdPart.substr(0, index);
    this._parameters = thirdPart.substr(index + 1);
}
tab._ApiCommandParser.prototype = {
    _command: null,
    _vizUniqueId: null,
    _sourceId: null,
    _parameters: null,
    
    get_vizUniqueId: function tab__ApiCommandParser$get_vizUniqueId() {
        return this._vizUniqueId;
    },
    
    get_sourceId: function tab__ApiCommandParser$get_sourceId() {
        return this._sourceId;
    },
    
    get_parameters: function tab__ApiCommandParser$get_parameters() {
        return this._parameters;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab._apiServerResultParser

tab._apiServerResultParser = function tab__apiServerResultParser(serverResult) {
    var param = JSON.parse(serverResult);
    this._commandResult = param['api.commandResult'];
    this._commandData = param['api.commandData'];
}
tab._apiServerResultParser.prototype = {
    _commandResult: null,
    _commandData: null,
    
    get__result: function tab__apiServerResultParser$get__result() {
        return this._commandResult;
    },
    
    get__data: function tab__apiServerResultParser$get__data() {
        return this._commandData;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab._apiServerNotificationParser

tab._apiServerNotificationParser = function tab__apiServerNotificationParser(serverResult) {
    var param = JSON.parse(serverResult);
    this._workbookName = param['api.workbookName'];
    this._worksheetName = param['api.worksheetName'];
    this._data = param['api.commandData'];
}
tab._apiServerNotificationParser.prototype = {
    _workbookName: null,
    _worksheetName: null,
    _data: null,
    
    get__workbookName: function tab__apiServerNotificationParser$get__workbookName() {
        return this._workbookName;
    },
    
    get__worksheetName: function tab__apiServerNotificationParser$get__worksheetName() {
        return this._worksheetName;
    },
    
    get__data: function tab__apiServerNotificationParser$get__data() {
        return this._data;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab._Collection

tab._Collection = function tab__Collection() {
    this._itemList = [];
}
tab._Collection.prototype = {
    _itemList: null,
    
    get__length: function tab__Collection$get__length() {
        return this._itemList.length;
    },
    
    get__itemsMap: function tab__Collection$get__itemsMap() {
        return this._itemList;
    },
    
    _clone: function tab__Collection$_clone() {
        var dict = this._itemList;
        var copy = this._itemList.concat();
        var dictionaryCopy = copy;
        var $dict1 = dict;
        for (var $key2 in $dict1) {
            var entry = { key: $key2, value: $dict1[$key2] };
            if (tab._Utility.hasOwnProperty(this._itemList, entry.key)) {
                dictionaryCopy[entry.key] = entry.value;
            }
        }
        return copy;
    },
    
    _add: function tab__Collection$_add(key, item) {
        var dict = this.get__itemsMap();
        var index = this._find(key);
        if (index >= 0) {
            this._itemList[index] = item;
        }
        else {
            this._itemList.push(item);
        }
        dict[this._adjustKey(key)] = item;
    },
    
    _remove: function tab__Collection$_remove(key) {
        var index = this._find(key);
        if (index >= 0) {
            delete this._itemList[this._adjustKey(key)];
            this._itemList.splice(index, 1);
        }
    },
    
    _addToFirst: function tab__Collection$_addToFirst(key, item) {
        var dict = this.get__itemsMap();
        var index = this._find(key);
        if (index >= 0) {
            this._itemList.splice(index, 1);
            this._itemList.unshift(item);
        }
        else {
            this._itemList.unshift(item);
        }
        dict[key] = item;
    },
    
    _find: function tab__Collection$_find(key) {
        var adjKey = this._adjustKey(key);
        var dict = this.get__itemsMap();
        if (ss.isValue(dict[adjKey])) {
            var i = 0;
            for (i = 0; i < this._itemList.length; i++) {
                if (this._itemList[i] === dict[adjKey]) {
                    return i;
                }
            }
        }
        return -1;
    },
    
    _adjustKey: function tab__Collection$_adjustKey(key) {
        var adjustedKey = key;
        if (parseInt(key, 10).toString() === key) {
            adjustedKey = '_' + key;
        }
        return adjustedKey;
    },
    get_item: function tab__Collection$get_item(indexOrKey) {
        if (typeof(indexOrKey) === 'number') {
            return this._itemList[indexOrKey];
        }
        else if (typeof(indexOrKey) === 'string') {
            var dict = this.get__itemsMap();
            return dict[this._adjustKey(indexOrKey)];
        }
        return undefined;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab._Deferred

tab._Deferred = function tab__Deferred() {
    this._listeners = [];
    this._promise = new tableauSoftware.Promise(ss.Delegate.create(this, this.then));
    this._thenFunc = ss.Delegate.create(this, this._preResolutionThen);
    this._resolveFunc = ss.Delegate.create(this, this._transitionToFulfilled);
}
tab._Deferred.prototype = {
    _promise: null,
    _thenFunc: null,
    _resolveFunc: null,
    
    get_promise: function tab__Deferred$get_promise() {
        return this._promise;
    },
    
    then: function tab__Deferred$then(callback, errback) {
        return this._thenFunc(callback, errback);
    },
    
    resolve: function tab__Deferred$resolve(promiseOrValue) {
        return this._resolveFunc(promiseOrValue);
    },
    
    reject: function tab__Deferred$reject(e) {
        return this._resolveFunc(tab._deferredUtil.rejected(e));
    },
    
    _preResolutionThen: function tab__Deferred$_preResolutionThen(callback, errback) {
        var deferred = new tab._Deferred();
        this._listeners.push(function(promise) {
            promise.then(callback, errback).then(ss.Delegate.create(deferred, deferred.resolve), ss.Delegate.create(deferred, deferred.reject));
        });
        return deferred.get_promise();
    },
    
    _transitionToFulfilled: function tab__Deferred$_transitionToFulfilled(completed) {
        var completedPromise = tab._deferredUtil.resolve(completed);
        this._thenFunc = completedPromise.then;
        this._resolveFunc = tab._deferredUtil.resolve;
        for (var i = 0; i < this._listeners.length; i++) {
            var listener = this._listeners[i];
            listener(completedPromise);
        }
        this._listeners = null;
        return completedPromise;
    }
}


////////////////////////////////////////////////////////////////////////////////
// tab._deferredUtil

tab._deferredUtil = function tab__deferredUtil() {
}
tab._deferredUtil.resolve = function tab__deferredUtil$resolve(promiseOrValue) {
    var promise;
    if (promiseOrValue instanceof tableauSoftware.Promise) {
        promise = promiseOrValue;
    }
    else {
        if (ss.isValue(promiseOrValue) && typeof(promiseOrValue.valueOf) === 'function') {
            promiseOrValue = promiseOrValue.valueOf();
        }
        if (tab._deferredUtil.isPromise(promiseOrValue)) {
            var deferred = new tab._Deferred();
            (promiseOrValue).then(ss.Delegate.create(deferred, deferred.resolve), ss.Delegate.create(deferred, deferred.reject));
            promise = deferred.get_promise();
        }
        else {
            promise = tab._deferredUtil.resolved(promiseOrValue);
        }
    }
    return promise;
}
tab._deferredUtil.reject = function tab__deferredUtil$reject(promiseOrValue) {
    return tab._deferredUtil.resolve(promiseOrValue).then(function(value) {
        return tab._deferredUtil.rejected(value);
    }, null);
}
tab._deferredUtil.resolved = function tab__deferredUtil$resolved(value) {
    var p = new tableauSoftware.Promise(function(callback, errback) {
        try {
            return tab._deferredUtil.resolve((ss.isValue(callback)) ? callback(value) : value);
        }
        catch (e) {
            return tab._deferredUtil.rejected(e);
        }
    });
    return p;
}
tab._deferredUtil.rejected = function tab__deferredUtil$rejected(reason) {
    var p = new tableauSoftware.Promise(function(callback, errback) {
        try {
            return (ss.isValue(errback)) ? tab._deferredUtil.resolve(errback(reason)) : tab._deferredUtil.rejected(reason);
        }
        catch (e) {
            return tab._deferredUtil.rejected(e);
        }
    });
    return p;
}
tab._deferredUtil.isPromise = function tab__deferredUtil$isPromise(promiseOrValue) {
    return ss.isValue(promiseOrValue) && typeof(promiseOrValue.then) === 'function';
}


////////////////////////////////////////////////////////////////////////////////
// tab._jQueryShim

tab._jQueryShim = function tab__jQueryShim() {
}
tab._jQueryShim.isFunction = function tab__jQueryShim$isFunction(obj) {
    return tab._jQueryShim.type(obj) === 'function';
}
tab._jQueryShim.isArray = function tab__jQueryShim$isArray(obj) {
    if (ss.isValue(Array.isArray)) {
        return Array.isArray(obj);
    }
    return tab._jQueryShim.type(obj) === 'array';
}
tab._jQueryShim.type = function tab__jQueryShim$type(obj) {
    return (obj == null) ? String(obj) : (tab._jQueryShim._class2type[tab._jQueryShim._toString.call(obj)] || 'object');
}
tab._jQueryShim.trim = function tab__jQueryShim$trim(text) {
    if (ss.isValue(tab._jQueryShim._trim)) {
        return (text == null) ? '' : tab._jQueryShim._trim.call(text);
    }
    return (text == null) ? '' : text.replace(tab._jQueryShim._trimLeft, '').replace(tab._jQueryShim._trimRight, '');
}
tab._jQueryShim.parseJSON = function tab__jQueryShim$parseJSON(data) {
    if (typeof(data) !== 'string' || ss.isNullOrUndefined(data)) {
        return null;
    }
    data = tab._jQueryShim.trim(data);
    if (window.JSON && window.JSON.parse) {
        return window.JSON.parse(data);
    }
    if (tab._jQueryShim._rvalidchars.test(data.replace(tab._jQueryShim._rvalidescape, '@').replace(tab._jQueryShim._rvalidtokens, ']').replace(tab._jQueryShim._rvalidbraces, ''))) {
        return (new Function("return " + data))();
    }
    throw new Error('Invalid JSON: ' + data);
}


tab.JsonUtil.registerClass('tab.JsonUtil');
tableauSoftware.CustomView.registerClass('tableauSoftware.CustomView');
tab.TableauEvent.registerClass('tab.TableauEvent');
tab.CustomViewEvent.registerClass('tab.CustomViewEvent', tab.TableauEvent);
tab.EventContext.registerClass('tab.EventContext');
tab._customViewEventContext.registerClass('tab._customViewEventContext', tab.EventContext);
tableauSoftware.Sheet.registerClass('tableauSoftware.Sheet');
tableauSoftware.Dashboard.registerClass('tableauSoftware.Dashboard', tableauSoftware.Sheet);
tableauSoftware.DashboardObject.registerClass('tableauSoftware.DashboardObject');
tableauSoftware.DataSource.registerClass('tableauSoftware.DataSource');
tableauSoftware.Field.registerClass('tableauSoftware.Field');
tableauSoftware.FieldInfo.registerClass('tableauSoftware.FieldInfo');
tableauSoftware.Filter.registerClass('tableauSoftware.Filter');
tableauSoftware.CategoricalFilter.registerClass('tableauSoftware.CategoricalFilter', tableauSoftware.Filter);
tab.WorksheetEvent.registerClass('tab.WorksheetEvent', tab.TableauEvent);
tab.FilterEvent.registerClass('tab.FilterEvent', tab.WorksheetEvent);
tab._filterEventContext.registerClass('tab._filterEventContext', tab.EventContext);
tableauSoftware.HierarchicalFilter.registerClass('tableauSoftware.HierarchicalFilter', tableauSoftware.Filter);
tableauSoftware.QuantitativeFilter.registerClass('tableauSoftware.QuantitativeFilter', tableauSoftware.Filter);
tableauSoftware.RelativeDateFilter.registerClass('tableauSoftware.RelativeDateFilter', tableauSoftware.Filter);
tableauSoftware.FrameInfo.registerClass('tableauSoftware.FrameInfo');
tab._loadFeedback.registerClass('tab._loadFeedback');
tab._Utility.registerClass('tab._Utility');
tab._VizCollection.registerClass('tab._VizCollection');
tab._VizManagerImpl.registerClass('tab._VizManagerImpl');
tab._VizParameters.registerClass('tab._VizParameters');
tableauSoftware.Mark.registerClass('tableauSoftware.Mark');
tab.MarksEvent.registerClass('tab.MarksEvent', tab.WorksheetEvent);
tab._marksEventContext.registerClass('tab._marksEventContext', tab.EventContext);
tableauSoftware.Pair.registerClass('tableauSoftware.Pair');
tableauSoftware.Parameter.registerClass('tableauSoftware.Parameter');
tab.ParameterEvent.registerClass('tab.ParameterEvent', tab.TableauEvent);
tab._parameterEventContext.registerClass('tab._parameterEventContext', tab.EventContext);
tableauSoftware.Promise.registerClass('tableauSoftware.Promise');
tab._tableauException.registerClass('tab._tableauException');
tab.TabSwitchEvent.registerClass('tab.TabSwitchEvent', tab.TableauEvent);
tableauSoftware.Viz.registerClass('tableauSoftware.Viz');
tableauSoftware.VizManager.registerClass('tableauSoftware.VizManager');
tableauSoftware.Workbook.registerClass('tableauSoftware.Workbook');
tableauSoftware.Worksheet.registerClass('tableauSoftware.Worksheet', tableauSoftware.Sheet);
tab._ApiCommandParser.registerClass('tab._ApiCommandParser');
tab._apiServerResultParser.registerClass('tab._apiServerResultParser');
tab._apiServerNotificationParser.registerClass('tab._apiServerNotificationParser');
tab._Collection.registerClass('tab._Collection');
tab._Deferred.registerClass('tab._Deferred');
tab._deferredUtil.registerClass('tab._deferredUtil');
tab._jQueryShim.registerClass('tab._jQueryShim');
tableauSoftware.DataSource._fieldAggrDict = { sum: 'SUM', average: 'AVG', min: 'MIN', max: 'MAX', 'std-dev': 'STDEV', 'std-dev-p': 'STDEVP', 'var': 'VAR', 'var-p': 'VARP', count: 'COUNT', 'count-d': 'COUNTD', median: 'MEDIAN', attr: 'ATTR', none: 'NONE', year: 'YEAR', qtr: 'QTR', month: 'MONTH', day: 'DAY', hour: 'HOUR', minute: 'MINUTE', second: 'SECOND', week: 'WEEK', weekday: 'WEEKDAY', 'month-year': 'MONTHYEAR', mdy: 'MDY', end: 'END', 'trunc-year': 'trunC_YEAR', 'trunc-qtr': 'trunC_QTR', 'trunc-month': 'trunC_MONTH', 'trunc-week': 'trunC_WEEK', 'trunc-day': 'trunC_DAY', 'trunc-hour': 'trunC_HOUR', 'trunc-minute': 'trunC_MINUTE', 'trunc-second': 'trunC_SECOND', quart1: 'quarT1', quart3: 'quarT3', skewness: 'SKEWNESS', kurtosis: 'KURTOSIS', 'in-out': 'INOUT', 'sum-xsqr': 'suM_XSQR', user: 'USER' };
tab._VizManagerImpl._lastLoadIndex = -1;
tab._VizManagerImpl._nextAppId = 0;
tab._VizManagerImpl._vizes = new tab._VizCollection();
tab._VizManagerImpl._embededVizLoadOrder = [];
tableauSoftware.Worksheet._regexHierarchicalFieldName$1 = new RegExp('\\[[^\\]]+\\]\\.', 'g');
tab._jQueryShim._class2type = { '[object Boolean]': 'boolean', '[object Number]': 'number', '[object String]': 'string', '[object Function]': 'function', '[object Array]': 'array', '[object Date]': 'date', '[object RegExp]': 'regexp', '[object Object]': 'object' };
tab._jQueryShim._trim = String.prototype.trim;
tab._jQueryShim._toString = Object.prototype.toString;
tab._jQueryShim._trimLeft = new RegExp('^[\\s\\xA0]+');
tab._jQueryShim._trimRight = new RegExp('[\\s\\xA0]+$');
tab._jQueryShim._rvalidchars = new RegExp('^[\\],:{}\\s]*$');
tab._jQueryShim._rvalidescape = new RegExp('\\\\(?:["\\\\\\/bfnrt]|u[0-9a-fA-F]{4})', 'g');
tab._jQueryShim._rvalidtokens = new RegExp('"[^"\\\\\\n\\r]*"|true|false|null|-?\\d+(?:\\.\\d*)?(?:[eE][+\\-]?\\d+)?', 'g');
tab._jQueryShim._rvalidbraces = new RegExp('(?:^|:|,)(?:\\s*\\[)+', 'g');

    ////////////////////////////////////////////////////////////////////////////
    // API Initialization
    ////////////////////////////////////////////////////////////////////////////

    // Clean up the mscorlib stuff.
    restoreTypeSystem();

    // instantiate the static instance here instead of in the static class constructor
    // to make sure this is executed last. There is no guaranteed order of execution 
    // for the static class constructor that this class depends on.  
    tab._VizManagerImpl.initialize();

  })();
}

//! This script was generated using Script# v0.7.4.0
