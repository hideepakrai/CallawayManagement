import {
  __extends,
  init_tslib_es6,
  tslib_es6_exports
} from "./chunk-ZQZUO572.js";
import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS
} from "./chunk-2LSFTFF7.js";

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/CanonicalizeLocaleList.js
function CanonicalizeLocaleList(locales) {
  return Intl.getCanonicalLocales(locales);
}
var init_CanonicalizeLocaleList = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/CanonicalizeLocaleList.js"() {
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/CanonicalizeTimeZoneName.js
function CanonicalizeTimeZoneName(tz, _a) {
  var tzData = _a.tzData, uppercaseLinks = _a.uppercaseLinks;
  var uppercasedTz = tz.toUpperCase();
  var uppercasedZones = Object.keys(tzData).reduce(function(all, z) {
    all[z.toUpperCase()] = z;
    return all;
  }, {});
  var ianaTimeZone = uppercaseLinks[uppercasedTz] || uppercasedZones[uppercasedTz];
  if (ianaTimeZone === "Etc/UTC" || ianaTimeZone === "Etc/GMT") {
    return "UTC";
  }
  return ianaTimeZone;
}
var init_CanonicalizeTimeZoneName = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/CanonicalizeTimeZoneName.js"() {
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/262.js
function ToString(o) {
  if (typeof o === "symbol") {
    throw TypeError("Cannot convert a Symbol value to a string");
  }
  return String(o);
}
function ToNumber(val) {
  if (val === void 0) {
    return NaN;
  }
  if (val === null) {
    return 0;
  }
  if (typeof val === "boolean") {
    return val ? 1 : 0;
  }
  if (typeof val === "number") {
    return val;
  }
  if (typeof val === "symbol" || typeof val === "bigint") {
    throw new TypeError("Cannot convert symbol/bigint to number");
  }
  return Number(val);
}
function ToInteger(n) {
  var number = ToNumber(n);
  if (isNaN(number) || SameValue(number, -0)) {
    return 0;
  }
  if (isFinite(number)) {
    return number;
  }
  var integer = Math.floor(Math.abs(number));
  if (number < 0) {
    integer = -integer;
  }
  if (SameValue(integer, -0)) {
    return 0;
  }
  return integer;
}
function TimeClip(time) {
  if (!isFinite(time)) {
    return NaN;
  }
  if (Math.abs(time) > 8.64 * 1e15) {
    return NaN;
  }
  return ToInteger(time);
}
function ToObject(arg) {
  if (arg == null) {
    throw new TypeError("undefined/null cannot be converted to object");
  }
  return Object(arg);
}
function SameValue(x, y) {
  if (Object.is) {
    return Object.is(x, y);
  }
  if (x === y) {
    return x !== 0 || 1 / x === 1 / y;
  }
  return x !== x && y !== y;
}
function ArrayCreate(len) {
  return new Array(len);
}
function HasOwnProperty(o, prop) {
  return Object.prototype.hasOwnProperty.call(o, prop);
}
function Type(x) {
  if (x === null) {
    return "Null";
  }
  if (typeof x === "undefined") {
    return "Undefined";
  }
  if (typeof x === "function" || typeof x === "object") {
    return "Object";
  }
  if (typeof x === "number") {
    return "Number";
  }
  if (typeof x === "boolean") {
    return "Boolean";
  }
  if (typeof x === "string") {
    return "String";
  }
  if (typeof x === "symbol") {
    return "Symbol";
  }
  if (typeof x === "bigint") {
    return "BigInt";
  }
}
function mod(x, y) {
  return x - Math.floor(x / y) * y;
}
function Day(t) {
  return Math.floor(t / MS_PER_DAY);
}
function WeekDay(t) {
  return mod(Day(t) + 4, 7);
}
function DayFromYear(y) {
  return Date.UTC(y, 0) / MS_PER_DAY;
}
function TimeFromYear(y) {
  return Date.UTC(y, 0);
}
function YearFromTime(t) {
  return new Date(t).getUTCFullYear();
}
function DaysInYear(y) {
  if (y % 4 !== 0) {
    return 365;
  }
  if (y % 100 !== 0) {
    return 366;
  }
  if (y % 400 !== 0) {
    return 365;
  }
  return 366;
}
function DayWithinYear(t) {
  return Day(t) - DayFromYear(YearFromTime(t));
}
function InLeapYear(t) {
  return DaysInYear(YearFromTime(t)) === 365 ? 0 : 1;
}
function MonthFromTime(t) {
  var dwy = DayWithinYear(t);
  var leap = InLeapYear(t);
  if (dwy >= 0 && dwy < 31) {
    return 0;
  }
  if (dwy < 59 + leap) {
    return 1;
  }
  if (dwy < 90 + leap) {
    return 2;
  }
  if (dwy < 120 + leap) {
    return 3;
  }
  if (dwy < 151 + leap) {
    return 4;
  }
  if (dwy < 181 + leap) {
    return 5;
  }
  if (dwy < 212 + leap) {
    return 6;
  }
  if (dwy < 243 + leap) {
    return 7;
  }
  if (dwy < 273 + leap) {
    return 8;
  }
  if (dwy < 304 + leap) {
    return 9;
  }
  if (dwy < 334 + leap) {
    return 10;
  }
  if (dwy < 365 + leap) {
    return 11;
  }
  throw new Error("Invalid time");
}
function DateFromTime(t) {
  var dwy = DayWithinYear(t);
  var mft = MonthFromTime(t);
  var leap = InLeapYear(t);
  if (mft === 0) {
    return dwy + 1;
  }
  if (mft === 1) {
    return dwy - 30;
  }
  if (mft === 2) {
    return dwy - 58 - leap;
  }
  if (mft === 3) {
    return dwy - 89 - leap;
  }
  if (mft === 4) {
    return dwy - 119 - leap;
  }
  if (mft === 5) {
    return dwy - 150 - leap;
  }
  if (mft === 6) {
    return dwy - 180 - leap;
  }
  if (mft === 7) {
    return dwy - 211 - leap;
  }
  if (mft === 8) {
    return dwy - 242 - leap;
  }
  if (mft === 9) {
    return dwy - 272 - leap;
  }
  if (mft === 10) {
    return dwy - 303 - leap;
  }
  if (mft === 11) {
    return dwy - 333 - leap;
  }
  throw new Error("Invalid time");
}
function HourFromTime(t) {
  return mod(Math.floor(t / MS_PER_HOUR), HOURS_PER_DAY);
}
function MinFromTime(t) {
  return mod(Math.floor(t / MS_PER_MINUTE), MINUTES_PER_HOUR);
}
function SecFromTime(t) {
  return mod(Math.floor(t / MS_PER_SECOND), SECONDS_PER_MINUTE);
}
function IsCallable(fn) {
  return typeof fn === "function";
}
function OrdinaryHasInstance(C, O, internalSlots) {
  if (!IsCallable(C)) {
    return false;
  }
  if (internalSlots === null || internalSlots === void 0 ? void 0 : internalSlots.boundTargetFunction) {
    var BC = internalSlots === null || internalSlots === void 0 ? void 0 : internalSlots.boundTargetFunction;
    return O instanceof BC;
  }
  if (typeof O !== "object") {
    return false;
  }
  var P = C.prototype;
  if (typeof P !== "object") {
    throw new TypeError("OrdinaryHasInstance called on an object with an invalid prototype property.");
  }
  return Object.prototype.isPrototypeOf.call(P, O);
}
function msFromTime(t) {
  return mod(t, MS_PER_SECOND);
}
var MS_PER_DAY, HOURS_PER_DAY, MINUTES_PER_HOUR, SECONDS_PER_MINUTE, MS_PER_SECOND, MS_PER_MINUTE, MS_PER_HOUR;
var init__ = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/262.js"() {
    MS_PER_DAY = 864e5;
    HOURS_PER_DAY = 24;
    MINUTES_PER_HOUR = 60;
    SECONDS_PER_MINUTE = 60;
    MS_PER_SECOND = 1e3;
    MS_PER_MINUTE = MS_PER_SECOND * SECONDS_PER_MINUTE;
    MS_PER_HOUR = MS_PER_MINUTE * MINUTES_PER_HOUR;
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/CoerceOptionsToObject.js
function CoerceOptionsToObject(options) {
  if (typeof options === "undefined") {
    return /* @__PURE__ */ Object.create(null);
  }
  return ToObject(options);
}
var init_CoerceOptionsToObject = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/CoerceOptionsToObject.js"() {
    init__();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/DefaultNumberOption.js
function DefaultNumberOption(val, min, max, fallback) {
  if (val !== void 0) {
    val = Number(val);
    if (isNaN(val) || val < min || val > max) {
      throw new RangeError("".concat(val, " is outside of range [").concat(min, ", ").concat(max, "]"));
    }
    return Math.floor(val);
  }
  return fallback;
}
var init_DefaultNumberOption = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/DefaultNumberOption.js"() {
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/GetNumberOption.js
function GetNumberOption(options, property, minimum, maximum, fallback) {
  var val = options[property];
  return DefaultNumberOption(val, minimum, maximum, fallback);
}
var init_GetNumberOption = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/GetNumberOption.js"() {
    init_DefaultNumberOption();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/GetOption.js
function GetOption(opts, prop, type, values, fallback) {
  if (typeof opts !== "object") {
    throw new TypeError("Options must be an object");
  }
  var value = opts[prop];
  if (value !== void 0) {
    if (type !== "boolean" && type !== "string") {
      throw new TypeError("invalid type");
    }
    if (type === "boolean") {
      value = Boolean(value);
    }
    if (type === "string") {
      value = ToString(value);
    }
    if (values !== void 0 && !values.filter(function(val) {
      return val == value;
    }).length) {
      throw new RangeError("".concat(value, " is not within ").concat(values.join(", ")));
    }
    return value;
  }
  return fallback;
}
var init_GetOption = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/GetOption.js"() {
    init__();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/GetOptionsObject.js
function GetOptionsObject(options) {
  if (typeof options === "undefined") {
    return /* @__PURE__ */ Object.create(null);
  }
  if (typeof options === "object") {
    return options;
  }
  throw new TypeError("Options must be an object");
}
var init_GetOptionsObject = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/GetOptionsObject.js"() {
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/GetStringOrBooleanOption.js
function GetStringOrBooleanOption(opts, prop, values, trueValue, falsyValue, fallback) {
  var value = opts[prop];
  if (value === void 0) {
    return fallback;
  }
  if (value === true) {
    return trueValue;
  }
  var valueBoolean = Boolean(value);
  if (valueBoolean === false) {
    return falsyValue;
  }
  value = ToString(value);
  if (value === "true" || value === "false") {
    return fallback;
  }
  if ((values || []).indexOf(value) === -1) {
    throw new RangeError("Invalid value ".concat(value));
  }
  return value;
}
var init_GetStringOrBooleanOption = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/GetStringOrBooleanOption.js"() {
    init__();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/IsSanctionedSimpleUnitIdentifier.js
function removeUnitNamespace(unit) {
  return unit.slice(unit.indexOf("-") + 1);
}
function IsSanctionedSimpleUnitIdentifier(unitIdentifier) {
  return SIMPLE_UNITS.indexOf(unitIdentifier) > -1;
}
var SANCTIONED_UNITS, SIMPLE_UNITS;
var init_IsSanctionedSimpleUnitIdentifier = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/IsSanctionedSimpleUnitIdentifier.js"() {
    SANCTIONED_UNITS = [
      "angle-degree",
      "area-acre",
      "area-hectare",
      "concentr-percent",
      "digital-bit",
      "digital-byte",
      "digital-gigabit",
      "digital-gigabyte",
      "digital-kilobit",
      "digital-kilobyte",
      "digital-megabit",
      "digital-megabyte",
      "digital-petabyte",
      "digital-terabit",
      "digital-terabyte",
      "duration-day",
      "duration-hour",
      "duration-millisecond",
      "duration-minute",
      "duration-month",
      "duration-second",
      "duration-week",
      "duration-year",
      "length-centimeter",
      "length-foot",
      "length-inch",
      "length-kilometer",
      "length-meter",
      "length-mile-scandinavian",
      "length-mile",
      "length-millimeter",
      "length-yard",
      "mass-gram",
      "mass-kilogram",
      "mass-ounce",
      "mass-pound",
      "mass-stone",
      "temperature-celsius",
      "temperature-fahrenheit",
      "volume-fluid-ounce",
      "volume-gallon",
      "volume-liter",
      "volume-milliliter"
    ];
    SIMPLE_UNITS = SANCTIONED_UNITS.map(removeUnitNamespace);
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/IsValidTimeZoneName.js
function IsValidTimeZoneName(tz, _a) {
  var tzData = _a.tzData, uppercaseLinks = _a.uppercaseLinks;
  var uppercasedTz = tz.toUpperCase();
  var zoneNames = /* @__PURE__ */ new Set();
  var linkNames = /* @__PURE__ */ new Set();
  Object.keys(tzData).map(function(z) {
    return z.toUpperCase();
  }).forEach(function(z) {
    return zoneNames.add(z);
  });
  Object.keys(uppercaseLinks).forEach(function(linkName) {
    linkNames.add(linkName.toUpperCase());
    zoneNames.add(uppercaseLinks[linkName].toUpperCase());
  });
  return zoneNames.has(uppercasedTz) || linkNames.has(uppercasedTz);
}
var init_IsValidTimeZoneName = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/IsValidTimeZoneName.js"() {
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/IsWellFormedCurrencyCode.js
function toUpperCase(str) {
  return str.replace(/([a-z])/g, function(_, c) {
    return c.toUpperCase();
  });
}
function IsWellFormedCurrencyCode(currency) {
  currency = toUpperCase(currency);
  if (currency.length !== 3) {
    return false;
  }
  if (NOT_A_Z_REGEX.test(currency)) {
    return false;
  }
  return true;
}
var NOT_A_Z_REGEX;
var init_IsWellFormedCurrencyCode = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/IsWellFormedCurrencyCode.js"() {
    NOT_A_Z_REGEX = /[^A-Z]/;
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/IsWellFormedUnitIdentifier.js
function toLowerCase(str) {
  return str.replace(/([A-Z])/g, function(_, c) {
    return c.toLowerCase();
  });
}
function IsWellFormedUnitIdentifier(unit) {
  unit = toLowerCase(unit);
  if (IsSanctionedSimpleUnitIdentifier(unit)) {
    return true;
  }
  var units = unit.split("-per-");
  if (units.length !== 2) {
    return false;
  }
  var numerator = units[0], denominator = units[1];
  if (!IsSanctionedSimpleUnitIdentifier(numerator) || !IsSanctionedSimpleUnitIdentifier(denominator)) {
    return false;
  }
  return true;
}
var init_IsWellFormedUnitIdentifier = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/IsWellFormedUnitIdentifier.js"() {
    init_IsSanctionedSimpleUnitIdentifier();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ApplyUnsignedRoundingMode.js
function ApplyUnsignedRoundingMode(x, r1, r2, unsignedRoundingMode) {
  if (x === r1)
    return r1;
  if (unsignedRoundingMode === void 0) {
    throw new Error("unsignedRoundingMode is mandatory");
  }
  if (unsignedRoundingMode === "zero") {
    return r1;
  }
  if (unsignedRoundingMode === "infinity") {
    return r2;
  }
  var d1 = x - r1;
  var d2 = r2 - x;
  if (d1 < d2) {
    return r1;
  }
  if (d2 < d1) {
    return r2;
  }
  if (d1 !== d2) {
    throw new Error("Unexpected error");
  }
  if (unsignedRoundingMode === "half-zero") {
    return r1;
  }
  if (unsignedRoundingMode === "half-infinity") {
    return r2;
  }
  if (unsignedRoundingMode !== "half-even") {
    throw new Error("Unexpected value for unsignedRoundingMode: ".concat(unsignedRoundingMode));
  }
  var cardinality = r1 / (r2 - r1) % 2;
  if (cardinality === 0) {
    return r1;
  }
  return r2;
}
var init_ApplyUnsignedRoundingMode = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ApplyUnsignedRoundingMode.js"() {
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/CollapseNumberRange.js
function CollapseNumberRange(result) {
  return result;
}
var init_CollapseNumberRange = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/CollapseNumberRange.js"() {
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/utils.js
function getMagnitude(x) {
  return Math.floor(Math.log(x) * Math.LOG10E);
}
function repeat(s, times) {
  if (typeof s.repeat === "function") {
    return s.repeat(times);
  }
  var arr = new Array(times);
  for (var i = 0; i < arr.length; i++) {
    arr[i] = s;
  }
  return arr.join("");
}
function setInternalSlot(map, pl, field, value) {
  if (!map.get(pl)) {
    map.set(pl, /* @__PURE__ */ Object.create(null));
  }
  var slots = map.get(pl);
  slots[field] = value;
}
function setMultiInternalSlots(map, pl, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var k = _a[_i];
    setInternalSlot(map, pl, k, props[k]);
  }
}
function getInternalSlot(map, pl, field) {
  return getMultiInternalSlots(map, pl, field)[field];
}
function getMultiInternalSlots(map, pl) {
  var fields = [];
  for (var _i = 2; _i < arguments.length; _i++) {
    fields[_i - 2] = arguments[_i];
  }
  var slots = map.get(pl);
  if (!slots) {
    throw new TypeError("".concat(pl, " InternalSlot has not been initialized"));
  }
  return fields.reduce(function(all, f) {
    all[f] = slots[f];
    return all;
  }, /* @__PURE__ */ Object.create(null));
}
function isLiteralPart(patternPart) {
  return patternPart.type === "literal";
}
function defineProperty(target, name, _a) {
  var value = _a.value;
  Object.defineProperty(target, name, {
    configurable: true,
    enumerable: false,
    writable: true,
    value
  });
}
function invariant(condition, message, Err) {
  if (Err === void 0) {
    Err = Error;
  }
  if (!condition) {
    throw new Err(message);
  }
}
var init_utils = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/utils.js"() {
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ComputeExponentForMagnitude.js
function ComputeExponentForMagnitude(numberFormat, magnitude, _a) {
  var getInternalSlots = _a.getInternalSlots;
  var internalSlots = getInternalSlots(numberFormat);
  var notation = internalSlots.notation, dataLocaleData = internalSlots.dataLocaleData, numberingSystem = internalSlots.numberingSystem;
  switch (notation) {
    case "standard":
      return 0;
    case "scientific":
      return magnitude;
    case "engineering":
      return Math.floor(magnitude / 3) * 3;
    default: {
      var compactDisplay = internalSlots.compactDisplay, style = internalSlots.style, currencyDisplay = internalSlots.currencyDisplay;
      var thresholdMap = void 0;
      if (style === "currency" && currencyDisplay !== "name") {
        var currency = dataLocaleData.numbers.currency[numberingSystem] || dataLocaleData.numbers.currency[dataLocaleData.numbers.nu[0]];
        thresholdMap = currency.short;
      } else {
        var decimal = dataLocaleData.numbers.decimal[numberingSystem] || dataLocaleData.numbers.decimal[dataLocaleData.numbers.nu[0]];
        thresholdMap = compactDisplay === "long" ? decimal.long : decimal.short;
      }
      if (!thresholdMap) {
        return 0;
      }
      var num = String(Math.pow(10, magnitude));
      var thresholds = Object.keys(thresholdMap);
      if (num < thresholds[0]) {
        return 0;
      }
      if (num > thresholds[thresholds.length - 1]) {
        return thresholds[thresholds.length - 1].length - 1;
      }
      var i = thresholds.indexOf(num);
      if (i === -1) {
        return 0;
      }
      var magnitudeKey = thresholds[i];
      var compactPattern = thresholdMap[magnitudeKey].other;
      if (compactPattern === "0") {
        return 0;
      }
      return magnitudeKey.length - thresholdMap[magnitudeKey].other.match(/0+/)[0].length;
    }
  }
}
var init_ComputeExponentForMagnitude = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ComputeExponentForMagnitude.js"() {
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ToRawPrecision.js
function ToRawPrecision(x, minPrecision, maxPrecision) {
  var p = maxPrecision;
  var m;
  var e;
  var xFinal;
  if (x === 0) {
    m = repeat("0", p);
    e = 0;
    xFinal = 0;
  } else {
    var xToString = x.toString();
    var xToStringExponentIndex = xToString.indexOf("e");
    var _a = xToString.split("e"), xToStringMantissa = _a[0], xToStringExponent = _a[1];
    var xToStringMantissaWithoutDecimalPoint = xToStringMantissa.replace(".", "");
    if (xToStringExponentIndex >= 0 && xToStringMantissaWithoutDecimalPoint.length <= p) {
      e = +xToStringExponent;
      m = xToStringMantissaWithoutDecimalPoint + repeat("0", p - xToStringMantissaWithoutDecimalPoint.length);
      xFinal = x;
    } else {
      e = getMagnitude(x);
      var decimalPlaceOffset = e - p + 1;
      var n = Math.round(adjustDecimalPlace(x, decimalPlaceOffset));
      if (adjustDecimalPlace(n, p - 1) >= 10) {
        e = e + 1;
        n = Math.floor(n / 10);
      }
      m = n.toString();
      xFinal = adjustDecimalPlace(n, p - 1 - e);
    }
  }
  var int;
  if (e >= p - 1) {
    m = m + repeat("0", e - p + 1);
    int = e + 1;
  } else if (e >= 0) {
    m = "".concat(m.slice(0, e + 1), ".").concat(m.slice(e + 1));
    int = e + 1;
  } else {
    m = "0.".concat(repeat("0", -e - 1)).concat(m);
    int = 1;
  }
  if (m.indexOf(".") >= 0 && maxPrecision > minPrecision) {
    var cut = maxPrecision - minPrecision;
    while (cut > 0 && m[m.length - 1] === "0") {
      m = m.slice(0, -1);
      cut--;
    }
    if (m[m.length - 1] === ".") {
      m = m.slice(0, -1);
    }
  }
  return { formattedString: m, roundedNumber: xFinal, integerDigitsCount: int };
  function adjustDecimalPlace(x2, magnitude) {
    return magnitude < 0 ? x2 * Math.pow(10, -magnitude) : x2 / Math.pow(10, magnitude);
  }
}
var init_ToRawPrecision = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ToRawPrecision.js"() {
    init_utils();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ToRawFixed.js
function ToRawFixed(x, minFraction, maxFraction) {
  var f = maxFraction;
  var n = Math.round(x * Math.pow(10, f));
  var xFinal = n / Math.pow(10, f);
  var m;
  if (n < 1e21) {
    m = n.toString();
  } else {
    m = n.toString();
    var _a = m.split("e"), mantissa = _a[0], exponent = _a[1];
    m = mantissa.replace(".", "");
    m = m + repeat("0", Math.max(+exponent - m.length + 1, 0));
  }
  var int;
  if (f !== 0) {
    var k = m.length;
    if (k <= f) {
      var z = repeat("0", f + 1 - k);
      m = z + m;
      k = f + 1;
    }
    var a = m.slice(0, k - f);
    var b = m.slice(k - f);
    m = "".concat(a, ".").concat(b);
    int = a.length;
  } else {
    int = m.length;
  }
  var cut = maxFraction - minFraction;
  while (cut > 0 && m[m.length - 1] === "0") {
    m = m.slice(0, -1);
    cut--;
  }
  if (m[m.length - 1] === ".") {
    m = m.slice(0, -1);
  }
  return { formattedString: m, roundedNumber: xFinal, integerDigitsCount: int };
}
var init_ToRawFixed = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ToRawFixed.js"() {
    init_utils();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericToString.js
function FormatNumericToString(intlObject, x) {
  var isNegative = x < 0 || SameValue(x, -0);
  if (isNegative) {
    x = -x;
  }
  var result;
  var rourndingType = intlObject.roundingType;
  switch (rourndingType) {
    case "significantDigits":
      result = ToRawPrecision(x, intlObject.minimumSignificantDigits, intlObject.maximumSignificantDigits);
      break;
    case "fractionDigits":
      result = ToRawFixed(x, intlObject.minimumFractionDigits, intlObject.maximumFractionDigits);
      break;
    default:
      result = ToRawPrecision(x, 1, 2);
      if (result.integerDigitsCount > 1) {
        result = ToRawFixed(x, 0, 0);
      }
      break;
  }
  x = result.roundedNumber;
  var string = result.formattedString;
  var int = result.integerDigitsCount;
  var minInteger = intlObject.minimumIntegerDigits;
  if (int < minInteger) {
    var forwardZeros = repeat("0", minInteger - int);
    string = forwardZeros + string;
  }
  if (isNegative) {
    x = -x;
  }
  return { roundedNumber: x, formattedString: string };
}
var init_FormatNumericToString = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericToString.js"() {
    init__();
    init_ToRawPrecision();
    init_utils();
    init_ToRawFixed();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ComputeExponent.js
function ComputeExponent(numberFormat, x, _a) {
  var getInternalSlots = _a.getInternalSlots;
  if (x === 0) {
    return [0, 0];
  }
  if (x < 0) {
    x = -x;
  }
  var magnitude = getMagnitude(x);
  var exponent = ComputeExponentForMagnitude(numberFormat, magnitude, {
    getInternalSlots
  });
  x = exponent < 0 ? x * Math.pow(10, -exponent) : x / Math.pow(10, exponent);
  var formatNumberResult = FormatNumericToString(getInternalSlots(numberFormat), x);
  if (formatNumberResult.roundedNumber === 0) {
    return [exponent, magnitude];
  }
  var newMagnitude = getMagnitude(formatNumberResult.roundedNumber);
  if (newMagnitude === magnitude - exponent) {
    return [exponent, magnitude];
  }
  return [
    ComputeExponentForMagnitude(numberFormat, magnitude + 1, {
      getInternalSlots
    }),
    magnitude + 1
  ];
}
var init_ComputeExponent = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/ComputeExponent.js"() {
    init_utils();
    init_ComputeExponentForMagnitude();
    init_FormatNumericToString();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/CurrencyDigits.js
function CurrencyDigits(c, _a) {
  var currencyDigitsData = _a.currencyDigitsData;
  return HasOwnProperty(currencyDigitsData, c) ? currencyDigitsData[c] : 2;
}
var init_CurrencyDigits = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/CurrencyDigits.js"() {
    init__();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatApproximately.js
function FormatApproximately(numberFormat, result, _a) {
  var getInternalSlots = _a.getInternalSlots;
  var internalSlots = getInternalSlots(numberFormat);
  var symbols = internalSlots.dataLocaleData.numbers.symbols[internalSlots.numberingSystem];
  var approximatelySign = symbols.approximatelySign;
  result.push({ type: "approximatelySign", value: approximatelySign });
  return result;
}
var init_FormatApproximately = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatApproximately.js"() {
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/digit-mapping.generated.js
var digitMapping;
var init_digit_mapping_generated = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/digit-mapping.generated.js"() {
    digitMapping = {
      "adlm": [
        "𞥐",
        "𞥑",
        "𞥒",
        "𞥓",
        "𞥔",
        "𞥕",
        "𞥖",
        "𞥗",
        "𞥘",
        "𞥙"
      ],
      "ahom": [
        "𑜰",
        "𑜱",
        "𑜲",
        "𑜳",
        "𑜴",
        "𑜵",
        "𑜶",
        "𑜷",
        "𑜸",
        "𑜹"
      ],
      "arab": [
        "٠",
        "١",
        "٢",
        "٣",
        "٤",
        "٥",
        "٦",
        "٧",
        "٨",
        "٩"
      ],
      "arabext": [
        "۰",
        "۱",
        "۲",
        "۳",
        "۴",
        "۵",
        "۶",
        "۷",
        "۸",
        "۹"
      ],
      "bali": [
        "᭐",
        "᭑",
        "᭒",
        "᭓",
        "᭔",
        "᭕",
        "᭖",
        "᭗",
        "᭘",
        "᭙"
      ],
      "beng": [
        "০",
        "১",
        "২",
        "৩",
        "৪",
        "৫",
        "৬",
        "৭",
        "৮",
        "৯"
      ],
      "bhks": [
        "𑱐",
        "𑱑",
        "𑱒",
        "𑱓",
        "𑱔",
        "𑱕",
        "𑱖",
        "𑱗",
        "𑱘",
        "𑱙"
      ],
      "brah": [
        "𑁦",
        "𑁧",
        "𑁨",
        "𑁩",
        "𑁪",
        "𑁫",
        "𑁬",
        "𑁭",
        "𑁮",
        "𑁯"
      ],
      "cakm": [
        "𑄶",
        "𑄷",
        "𑄸",
        "𑄹",
        "𑄺",
        "𑄻",
        "𑄼",
        "𑄽",
        "𑄾",
        "𑄿"
      ],
      "cham": [
        "꩐",
        "꩑",
        "꩒",
        "꩓",
        "꩔",
        "꩕",
        "꩖",
        "꩗",
        "꩘",
        "꩙"
      ],
      "deva": [
        "०",
        "१",
        "२",
        "३",
        "४",
        "५",
        "६",
        "७",
        "८",
        "९"
      ],
      "diak": [
        "𑥐",
        "𑥑",
        "𑥒",
        "𑥓",
        "𑥔",
        "𑥕",
        "𑥖",
        "𑥗",
        "𑥘",
        "𑥙"
      ],
      "fullwide": [
        "０",
        "１",
        "２",
        "３",
        "４",
        "５",
        "６",
        "７",
        "８",
        "９"
      ],
      "gong": [
        "𑶠",
        "𑶡",
        "𑶢",
        "𑶣",
        "𑶤",
        "𑶥",
        "𑶦",
        "𑶧",
        "𑶨",
        "𑶩"
      ],
      "gonm": [
        "𑵐",
        "𑵑",
        "𑵒",
        "𑵓",
        "𑵔",
        "𑵕",
        "𑵖",
        "𑵗",
        "𑵘",
        "𑵙"
      ],
      "gujr": [
        "૦",
        "૧",
        "૨",
        "૩",
        "૪",
        "૫",
        "૬",
        "૭",
        "૮",
        "૯"
      ],
      "guru": [
        "੦",
        "੧",
        "੨",
        "੩",
        "੪",
        "੫",
        "੬",
        "੭",
        "੮",
        "੯"
      ],
      "hanidec": [
        "〇",
        "一",
        "二",
        "三",
        "四",
        "五",
        "六",
        "七",
        "八",
        "九"
      ],
      "hmng": [
        "𖭐",
        "𖭑",
        "𖭒",
        "𖭓",
        "𖭔",
        "𖭕",
        "𖭖",
        "𖭗",
        "𖭘",
        "𖭙"
      ],
      "hmnp": [
        "𞅀",
        "𞅁",
        "𞅂",
        "𞅃",
        "𞅄",
        "𞅅",
        "𞅆",
        "𞅇",
        "𞅈",
        "𞅉"
      ],
      "java": [
        "꧐",
        "꧑",
        "꧒",
        "꧓",
        "꧔",
        "꧕",
        "꧖",
        "꧗",
        "꧘",
        "꧙"
      ],
      "kali": [
        "꤀",
        "꤁",
        "꤂",
        "꤃",
        "꤄",
        "꤅",
        "꤆",
        "꤇",
        "꤈",
        "꤉"
      ],
      "khmr": [
        "០",
        "១",
        "២",
        "៣",
        "៤",
        "៥",
        "៦",
        "៧",
        "៨",
        "៩"
      ],
      "knda": [
        "೦",
        "೧",
        "೨",
        "೩",
        "೪",
        "೫",
        "೬",
        "೭",
        "೮",
        "೯"
      ],
      "lana": [
        "᪀",
        "᪁",
        "᪂",
        "᪃",
        "᪄",
        "᪅",
        "᪆",
        "᪇",
        "᪈",
        "᪉"
      ],
      "lanatham": [
        "᪐",
        "᪑",
        "᪒",
        "᪓",
        "᪔",
        "᪕",
        "᪖",
        "᪗",
        "᪘",
        "᪙"
      ],
      "laoo": [
        "໐",
        "໑",
        "໒",
        "໓",
        "໔",
        "໕",
        "໖",
        "໗",
        "໘",
        "໙"
      ],
      "lepc": [
        "᪐",
        "᪑",
        "᪒",
        "᪓",
        "᪔",
        "᪕",
        "᪖",
        "᪗",
        "᪘",
        "᪙"
      ],
      "limb": [
        "᥆",
        "᥇",
        "᥈",
        "᥉",
        "᥊",
        "᥋",
        "᥌",
        "᥍",
        "᥎",
        "᥏"
      ],
      "mathbold": [
        "𝟎",
        "𝟏",
        "𝟐",
        "𝟑",
        "𝟒",
        "𝟓",
        "𝟔",
        "𝟕",
        "𝟖",
        "𝟗"
      ],
      "mathdbl": [
        "𝟘",
        "𝟙",
        "𝟚",
        "𝟛",
        "𝟜",
        "𝟝",
        "𝟞",
        "𝟟",
        "𝟠",
        "𝟡"
      ],
      "mathmono": [
        "𝟶",
        "𝟷",
        "𝟸",
        "𝟹",
        "𝟺",
        "𝟻",
        "𝟼",
        "𝟽",
        "𝟾",
        "𝟿"
      ],
      "mathsanb": [
        "𝟬",
        "𝟭",
        "𝟮",
        "𝟯",
        "𝟰",
        "𝟱",
        "𝟲",
        "𝟳",
        "𝟴",
        "𝟵"
      ],
      "mathsans": [
        "𝟢",
        "𝟣",
        "𝟤",
        "𝟥",
        "𝟦",
        "𝟧",
        "𝟨",
        "𝟩",
        "𝟪",
        "𝟫"
      ],
      "mlym": [
        "൦",
        "൧",
        "൨",
        "൩",
        "൪",
        "൫",
        "൬",
        "൭",
        "൮",
        "൯"
      ],
      "modi": [
        "𑙐",
        "𑙑",
        "𑙒",
        "𑙓",
        "𑙔",
        "𑙕",
        "𑙖",
        "𑙗",
        "𑙘",
        "𑙙"
      ],
      "mong": [
        "᠐",
        "᠑",
        "᠒",
        "᠓",
        "᠔",
        "᠕",
        "᠖",
        "᠗",
        "᠘",
        "᠙"
      ],
      "mroo": [
        "𖩠",
        "𖩡",
        "𖩢",
        "𖩣",
        "𖩤",
        "𖩥",
        "𖩦",
        "𖩧",
        "𖩨",
        "𖩩"
      ],
      "mtei": [
        "꯰",
        "꯱",
        "꯲",
        "꯳",
        "꯴",
        "꯵",
        "꯶",
        "꯷",
        "꯸",
        "꯹"
      ],
      "mymr": [
        "၀",
        "၁",
        "၂",
        "၃",
        "၄",
        "၅",
        "၆",
        "၇",
        "၈",
        "၉"
      ],
      "mymrshan": [
        "႐",
        "႑",
        "႒",
        "႓",
        "႔",
        "႕",
        "႖",
        "႗",
        "႘",
        "႙"
      ],
      "mymrtlng": [
        "꧰",
        "꧱",
        "꧲",
        "꧳",
        "꧴",
        "꧵",
        "꧶",
        "꧷",
        "꧸",
        "꧹"
      ],
      "newa": [
        "𑑐",
        "𑑑",
        "𑑒",
        "𑑓",
        "𑑔",
        "𑑕",
        "𑑖",
        "𑑗",
        "𑑘",
        "𑑙"
      ],
      "nkoo": [
        "߀",
        "߁",
        "߂",
        "߃",
        "߄",
        "߅",
        "߆",
        "߇",
        "߈",
        "߉"
      ],
      "olck": [
        "᱐",
        "᱑",
        "᱒",
        "᱓",
        "᱔",
        "᱕",
        "᱖",
        "᱗",
        "᱘",
        "᱙"
      ],
      "orya": [
        "୦",
        "୧",
        "୨",
        "୩",
        "୪",
        "୫",
        "୬",
        "୭",
        "୮",
        "୯"
      ],
      "osma": [
        "𐒠",
        "𐒡",
        "𐒢",
        "𐒣",
        "𐒤",
        "𐒥",
        "𐒦",
        "𐒧",
        "𐒨",
        "𐒩"
      ],
      "rohg": [
        "𐴰",
        "𐴱",
        "𐴲",
        "𐴳",
        "𐴴",
        "𐴵",
        "𐴶",
        "𐴷",
        "𐴸",
        "𐴹"
      ],
      "saur": [
        "꣐",
        "꣑",
        "꣒",
        "꣓",
        "꣔",
        "꣕",
        "꣖",
        "꣗",
        "꣘",
        "꣙"
      ],
      "segment": [
        "🯰",
        "🯱",
        "🯲",
        "🯳",
        "🯴",
        "🯵",
        "🯶",
        "🯷",
        "🯸",
        "🯹"
      ],
      "shrd": [
        "𑇐",
        "𑇑",
        "𑇒",
        "𑇓",
        "𑇔",
        "𑇕",
        "𑇖",
        "𑇗",
        "𑇘",
        "𑇙"
      ],
      "sind": [
        "𑋰",
        "𑋱",
        "𑋲",
        "𑋳",
        "𑋴",
        "𑋵",
        "𑋶",
        "𑋷",
        "𑋸",
        "𑋹"
      ],
      "sinh": [
        "෦",
        "෧",
        "෨",
        "෩",
        "෪",
        "෫",
        "෬",
        "෭",
        "෮",
        "෯"
      ],
      "sora": [
        "𑃰",
        "𑃱",
        "𑃲",
        "𑃳",
        "𑃴",
        "𑃵",
        "𑃶",
        "𑃷",
        "𑃸",
        "𑃹"
      ],
      "sund": [
        "᮰",
        "᮱",
        "᮲",
        "᮳",
        "᮴",
        "᮵",
        "᮶",
        "᮷",
        "᮸",
        "᮹"
      ],
      "takr": [
        "𑛀",
        "𑛁",
        "𑛂",
        "𑛃",
        "𑛄",
        "𑛅",
        "𑛆",
        "𑛇",
        "𑛈",
        "𑛉"
      ],
      "talu": [
        "᧐",
        "᧑",
        "᧒",
        "᧓",
        "᧔",
        "᧕",
        "᧖",
        "᧗",
        "᧘",
        "᧙"
      ],
      "tamldec": [
        "௦",
        "௧",
        "௨",
        "௩",
        "௪",
        "௫",
        "௬",
        "௭",
        "௮",
        "௯"
      ],
      "telu": [
        "౦",
        "౧",
        "౨",
        "౩",
        "౪",
        "౫",
        "౬",
        "౭",
        "౮",
        "౯"
      ],
      "thai": [
        "๐",
        "๑",
        "๒",
        "๓",
        "๔",
        "๕",
        "๖",
        "๗",
        "๘",
        "๙"
      ],
      "tibt": [
        "༠",
        "༡",
        "༢",
        "༣",
        "༤",
        "༥",
        "༦",
        "༧",
        "༨",
        "༩"
      ],
      "tirh": [
        "𑓐",
        "𑓑",
        "𑓒",
        "𑓓",
        "𑓔",
        "𑓕",
        "𑓖",
        "𑓗",
        "𑓘",
        "𑓙"
      ],
      "vaii": [
        "ᘠ",
        "ᘡ",
        "ᘢ",
        "ᘣ",
        "ᘤ",
        "ᘥ",
        "ᘦ",
        "ᘧ",
        "ᘨ",
        "ᘩ"
      ],
      "wara": [
        "𑣠",
        "𑣡",
        "𑣢",
        "𑣣",
        "𑣤",
        "𑣥",
        "𑣦",
        "𑣧",
        "𑣨",
        "𑣩"
      ],
      "wcho": [
        "𞋰",
        "𞋱",
        "𞋲",
        "𞋳",
        "𞋴",
        "𞋵",
        "𞋶",
        "𞋷",
        "𞋸",
        "𞋹"
      ]
    };
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/regex.generated.js
var S_UNICODE_REGEX;
var init_regex_generated = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/regex.generated.js"() {
    S_UNICODE_REGEX = /[\$\+<->\^`\|~\xA2-\xA6\xA8\xA9\xAC\xAE-\xB1\xB4\xB8\xD7\xF7\u02C2-\u02C5\u02D2-\u02DF\u02E5-\u02EB\u02ED\u02EF-\u02FF\u0375\u0384\u0385\u03F6\u0482\u058D-\u058F\u0606-\u0608\u060B\u060E\u060F\u06DE\u06E9\u06FD\u06FE\u07F6\u07FE\u07FF\u09F2\u09F3\u09FA\u09FB\u0AF1\u0B70\u0BF3-\u0BFA\u0C7F\u0D4F\u0D79\u0E3F\u0F01-\u0F03\u0F13\u0F15-\u0F17\u0F1A-\u0F1F\u0F34\u0F36\u0F38\u0FBE-\u0FC5\u0FC7-\u0FCC\u0FCE\u0FCF\u0FD5-\u0FD8\u109E\u109F\u1390-\u1399\u166D\u17DB\u1940\u19DE-\u19FF\u1B61-\u1B6A\u1B74-\u1B7C\u1FBD\u1FBF-\u1FC1\u1FCD-\u1FCF\u1FDD-\u1FDF\u1FED-\u1FEF\u1FFD\u1FFE\u2044\u2052\u207A-\u207C\u208A-\u208C\u20A0-\u20BF\u2100\u2101\u2103-\u2106\u2108\u2109\u2114\u2116-\u2118\u211E-\u2123\u2125\u2127\u2129\u212E\u213A\u213B\u2140-\u2144\u214A-\u214D\u214F\u218A\u218B\u2190-\u2307\u230C-\u2328\u232B-\u2426\u2440-\u244A\u249C-\u24E9\u2500-\u2767\u2794-\u27C4\u27C7-\u27E5\u27F0-\u2982\u2999-\u29D7\u29DC-\u29FB\u29FE-\u2B73\u2B76-\u2B95\u2B97-\u2BFF\u2CE5-\u2CEA\u2E50\u2E51\u2E80-\u2E99\u2E9B-\u2EF3\u2F00-\u2FD5\u2FF0-\u2FFB\u3004\u3012\u3013\u3020\u3036\u3037\u303E\u303F\u309B\u309C\u3190\u3191\u3196-\u319F\u31C0-\u31E3\u3200-\u321E\u322A-\u3247\u3250\u3260-\u327F\u328A-\u32B0\u32C0-\u33FF\u4DC0-\u4DFF\uA490-\uA4C6\uA700-\uA716\uA720\uA721\uA789\uA78A\uA828-\uA82B\uA836-\uA839\uAA77-\uAA79\uAB5B\uAB6A\uAB6B\uFB29\uFBB2-\uFBC1\uFDFC\uFDFD\uFE62\uFE64-\uFE66\uFE69\uFF04\uFF0B\uFF1C-\uFF1E\uFF3E\uFF40\uFF5C\uFF5E\uFFE0-\uFFE6\uFFE8-\uFFEE\uFFFC\uFFFD]|\uD800[\uDD37-\uDD3F\uDD79-\uDD89\uDD8C-\uDD8E\uDD90-\uDD9C\uDDA0\uDDD0-\uDDFC]|\uD802[\uDC77\uDC78\uDEC8]|\uD805\uDF3F|\uD807[\uDFD5-\uDFF1]|\uD81A[\uDF3C-\uDF3F\uDF45]|\uD82F\uDC9C|\uD834[\uDC00-\uDCF5\uDD00-\uDD26\uDD29-\uDD64\uDD6A-\uDD6C\uDD83\uDD84\uDD8C-\uDDA9\uDDAE-\uDDE8\uDE00-\uDE41\uDE45\uDF00-\uDF56]|\uD835[\uDEC1\uDEDB\uDEFB\uDF15\uDF35\uDF4F\uDF6F\uDF89\uDFA9\uDFC3]|\uD836[\uDC00-\uDDFF\uDE37-\uDE3A\uDE6D-\uDE74\uDE76-\uDE83\uDE85\uDE86]|\uD838[\uDD4F\uDEFF]|\uD83B[\uDCAC\uDCB0\uDD2E\uDEF0\uDEF1]|\uD83C[\uDC00-\uDC2B\uDC30-\uDC93\uDCA0-\uDCAE\uDCB1-\uDCBF\uDCC1-\uDCCF\uDCD1-\uDCF5\uDD0D-\uDDAD\uDDE6-\uDE02\uDE10-\uDE3B\uDE40-\uDE48\uDE50\uDE51\uDE60-\uDE65\uDF00-\uDFFF]|\uD83D[\uDC00-\uDED7\uDEE0-\uDEEC\uDEF0-\uDEFC\uDF00-\uDF73\uDF80-\uDFD8\uDFE0-\uDFEB]|\uD83E[\uDC00-\uDC0B\uDC10-\uDC47\uDC50-\uDC59\uDC60-\uDC87\uDC90-\uDCAD\uDCB0\uDCB1\uDD00-\uDD78\uDD7A-\uDDCB\uDDCD-\uDE53\uDE60-\uDE6D\uDE70-\uDE74\uDE78-\uDE7A\uDE80-\uDE86\uDE90-\uDEA8\uDEB0-\uDEB6\uDEC0-\uDEC2\uDED0-\uDED6\uDF00-\uDF92\uDF94-\uDFCA]/;
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/format_to_parts.js
function formatToParts(numberResult, data, pl, options) {
  var sign = numberResult.sign, exponent = numberResult.exponent, magnitude = numberResult.magnitude;
  var notation = options.notation, style = options.style, numberingSystem = options.numberingSystem;
  var defaultNumberingSystem = data.numbers.nu[0];
  var compactNumberPattern = null;
  if (notation === "compact" && magnitude) {
    compactNumberPattern = getCompactDisplayPattern(numberResult, pl, data, style, options.compactDisplay, options.currencyDisplay, numberingSystem);
  }
  var nonNameCurrencyPart;
  if (style === "currency" && options.currencyDisplay !== "name") {
    var byCurrencyDisplay = data.currencies[options.currency];
    if (byCurrencyDisplay) {
      switch (options.currencyDisplay) {
        case "code":
          nonNameCurrencyPart = options.currency;
          break;
        case "symbol":
          nonNameCurrencyPart = byCurrencyDisplay.symbol;
          break;
        default:
          nonNameCurrencyPart = byCurrencyDisplay.narrow;
          break;
      }
    } else {
      nonNameCurrencyPart = options.currency;
    }
  }
  var numberPattern;
  if (!compactNumberPattern) {
    if (style === "decimal" || style === "unit" || style === "currency" && options.currencyDisplay === "name") {
      var decimalData = data.numbers.decimal[numberingSystem] || data.numbers.decimal[defaultNumberingSystem];
      numberPattern = getPatternForSign(decimalData.standard, sign);
    } else if (style === "currency") {
      var currencyData = data.numbers.currency[numberingSystem] || data.numbers.currency[defaultNumberingSystem];
      numberPattern = getPatternForSign(currencyData[options.currencySign], sign);
    } else {
      var percentPattern = data.numbers.percent[numberingSystem] || data.numbers.percent[defaultNumberingSystem];
      numberPattern = getPatternForSign(percentPattern, sign);
    }
  } else {
    numberPattern = compactNumberPattern;
  }
  var decimalNumberPattern = CLDR_NUMBER_PATTERN.exec(numberPattern)[0];
  numberPattern = numberPattern.replace(CLDR_NUMBER_PATTERN, "{0}").replace(/'(.)'/g, "$1");
  if (style === "currency" && options.currencyDisplay !== "name") {
    var currencyData = data.numbers.currency[numberingSystem] || data.numbers.currency[defaultNumberingSystem];
    var afterCurrency = currencyData.currencySpacing.afterInsertBetween;
    if (afterCurrency && !S_DOLLAR_UNICODE_REGEX.test(nonNameCurrencyPart)) {
      numberPattern = numberPattern.replace("¤{0}", "¤".concat(afterCurrency, "{0}"));
    }
    var beforeCurrency = currencyData.currencySpacing.beforeInsertBetween;
    if (beforeCurrency && !CARET_S_UNICODE_REGEX.test(nonNameCurrencyPart)) {
      numberPattern = numberPattern.replace("{0}¤", "{0}".concat(beforeCurrency, "¤"));
    }
  }
  var numberPatternParts = numberPattern.split(/({c:[^}]+}|\{0\}|[¤%\-\+])/g);
  var numberParts = [];
  var symbols = data.numbers.symbols[numberingSystem] || data.numbers.symbols[defaultNumberingSystem];
  for (var _i = 0, numberPatternParts_1 = numberPatternParts; _i < numberPatternParts_1.length; _i++) {
    var part = numberPatternParts_1[_i];
    if (!part) {
      continue;
    }
    switch (part) {
      case "{0}": {
        numberParts.push.apply(numberParts, paritionNumberIntoParts(
          symbols,
          numberResult,
          notation,
          exponent,
          numberingSystem,
          // If compact number pattern exists, do not insert group separators.
          !compactNumberPattern && Boolean(options.useGrouping),
          decimalNumberPattern
        ));
        break;
      }
      case "-":
        numberParts.push({ type: "minusSign", value: symbols.minusSign });
        break;
      case "+":
        numberParts.push({ type: "plusSign", value: symbols.plusSign });
        break;
      case "%":
        numberParts.push({ type: "percentSign", value: symbols.percentSign });
        break;
      case "¤":
        numberParts.push({ type: "currency", value: nonNameCurrencyPart });
        break;
      default:
        if (/^\{c:/.test(part)) {
          numberParts.push({
            type: "compact",
            value: part.substring(3, part.length - 1)
          });
        } else {
          numberParts.push({ type: "literal", value: part });
        }
        break;
    }
  }
  switch (style) {
    case "currency": {
      if (options.currencyDisplay === "name") {
        var unitPattern = (data.numbers.currency[numberingSystem] || data.numbers.currency[defaultNumberingSystem]).unitPattern;
        var unitName = void 0;
        var currencyNameData = data.currencies[options.currency];
        if (currencyNameData) {
          unitName = selectPlural(pl, numberResult.roundedNumber * Math.pow(10, exponent), currencyNameData.displayName);
        } else {
          unitName = options.currency;
        }
        var unitPatternParts = unitPattern.split(/(\{[01]\})/g);
        var result = [];
        for (var _a = 0, unitPatternParts_1 = unitPatternParts; _a < unitPatternParts_1.length; _a++) {
          var part = unitPatternParts_1[_a];
          switch (part) {
            case "{0}":
              result.push.apply(result, numberParts);
              break;
            case "{1}":
              result.push({ type: "currency", value: unitName });
              break;
            default:
              if (part) {
                result.push({ type: "literal", value: part });
              }
              break;
          }
        }
        return result;
      } else {
        return numberParts;
      }
    }
    case "unit": {
      var unit = options.unit, unitDisplay = options.unitDisplay;
      var unitData = data.units.simple[unit];
      var unitPattern = void 0;
      if (unitData) {
        unitPattern = selectPlural(pl, numberResult.roundedNumber * Math.pow(10, exponent), data.units.simple[unit][unitDisplay]);
      } else {
        var _b = unit.split("-per-"), numeratorUnit = _b[0], denominatorUnit = _b[1];
        unitData = data.units.simple[numeratorUnit];
        var numeratorUnitPattern = selectPlural(pl, numberResult.roundedNumber * Math.pow(10, exponent), data.units.simple[numeratorUnit][unitDisplay]);
        var perUnitPattern = data.units.simple[denominatorUnit].perUnit[unitDisplay];
        if (perUnitPattern) {
          unitPattern = perUnitPattern.replace("{0}", numeratorUnitPattern);
        } else {
          var perPattern = data.units.compound.per[unitDisplay];
          var denominatorPattern = selectPlural(pl, 1, data.units.simple[denominatorUnit][unitDisplay]);
          unitPattern = unitPattern = perPattern.replace("{0}", numeratorUnitPattern).replace("{1}", denominatorPattern.replace("{0}", ""));
        }
      }
      var result = [];
      for (var _c = 0, _d = unitPattern.split(/(\s*\{0\}\s*)/); _c < _d.length; _c++) {
        var part = _d[_c];
        var interpolateMatch = /^(\s*)\{0\}(\s*)$/.exec(part);
        if (interpolateMatch) {
          if (interpolateMatch[1]) {
            result.push({ type: "literal", value: interpolateMatch[1] });
          }
          result.push.apply(result, numberParts);
          if (interpolateMatch[2]) {
            result.push({ type: "literal", value: interpolateMatch[2] });
          }
        } else if (part) {
          result.push({ type: "unit", value: part });
        }
      }
      return result;
    }
    default:
      return numberParts;
  }
}
function paritionNumberIntoParts(symbols, numberResult, notation, exponent, numberingSystem, useGrouping, decimalNumberPattern) {
  var result = [];
  var n = numberResult.formattedString, x = numberResult.roundedNumber;
  if (isNaN(x)) {
    return [{ type: "nan", value: n }];
  } else if (!isFinite(x)) {
    return [{ type: "infinity", value: n }];
  }
  var digitReplacementTable = digitMapping[numberingSystem];
  if (digitReplacementTable) {
    n = n.replace(/\d/g, function(digit) {
      return digitReplacementTable[+digit] || digit;
    });
  }
  var decimalSepIndex = n.indexOf(".");
  var integer;
  var fraction;
  if (decimalSepIndex > 0) {
    integer = n.slice(0, decimalSepIndex);
    fraction = n.slice(decimalSepIndex + 1);
  } else {
    integer = n;
  }
  if (useGrouping && (notation !== "compact" || x >= 1e4)) {
    var groupSepSymbol = symbols.group;
    var groups = [];
    var integerNumberPattern = decimalNumberPattern.split(".")[0];
    var patternGroups = integerNumberPattern.split(",");
    var primaryGroupingSize = 3;
    var secondaryGroupingSize = 3;
    if (patternGroups.length > 1) {
      primaryGroupingSize = patternGroups[patternGroups.length - 1].length;
    }
    if (patternGroups.length > 2) {
      secondaryGroupingSize = patternGroups[patternGroups.length - 2].length;
    }
    var i = integer.length - primaryGroupingSize;
    if (i > 0) {
      groups.push(integer.slice(i, i + primaryGroupingSize));
      for (i -= secondaryGroupingSize; i > 0; i -= secondaryGroupingSize) {
        groups.push(integer.slice(i, i + secondaryGroupingSize));
      }
      groups.push(integer.slice(0, i + secondaryGroupingSize));
    } else {
      groups.push(integer);
    }
    while (groups.length > 0) {
      var integerGroup = groups.pop();
      result.push({ type: "integer", value: integerGroup });
      if (groups.length > 0) {
        result.push({ type: "group", value: groupSepSymbol });
      }
    }
  } else {
    result.push({ type: "integer", value: integer });
  }
  if (fraction !== void 0) {
    result.push({ type: "decimal", value: symbols.decimal }, { type: "fraction", value: fraction });
  }
  if ((notation === "scientific" || notation === "engineering") && isFinite(x)) {
    result.push({ type: "exponentSeparator", value: symbols.exponential });
    if (exponent < 0) {
      result.push({ type: "exponentMinusSign", value: symbols.minusSign });
      exponent = -exponent;
    }
    var exponentResult = ToRawFixed(exponent, 0, 0);
    result.push({
      type: "exponentInteger",
      value: exponentResult.formattedString
    });
  }
  return result;
}
function getPatternForSign(pattern, sign) {
  if (pattern.indexOf(";") < 0) {
    pattern = "".concat(pattern, ";-").concat(pattern);
  }
  var _a = pattern.split(";"), zeroPattern = _a[0], negativePattern = _a[1];
  switch (sign) {
    case 0:
      return zeroPattern;
    case -1:
      return negativePattern;
    default:
      return negativePattern.indexOf("-") >= 0 ? negativePattern.replace(/-/g, "+") : "+".concat(zeroPattern);
  }
}
function getCompactDisplayPattern(numberResult, pl, data, style, compactDisplay, currencyDisplay, numberingSystem) {
  var _a;
  var roundedNumber = numberResult.roundedNumber, sign = numberResult.sign, magnitude = numberResult.magnitude;
  var magnitudeKey = String(Math.pow(10, magnitude));
  var defaultNumberingSystem = data.numbers.nu[0];
  var pattern;
  if (style === "currency" && currencyDisplay !== "name") {
    var byNumberingSystem = data.numbers.currency;
    var currencyData = byNumberingSystem[numberingSystem] || byNumberingSystem[defaultNumberingSystem];
    var compactPluralRules = (_a = currencyData.short) === null || _a === void 0 ? void 0 : _a[magnitudeKey];
    if (!compactPluralRules) {
      return null;
    }
    pattern = selectPlural(pl, roundedNumber, compactPluralRules);
  } else {
    var byNumberingSystem = data.numbers.decimal;
    var byCompactDisplay = byNumberingSystem[numberingSystem] || byNumberingSystem[defaultNumberingSystem];
    var compactPlaralRule = byCompactDisplay[compactDisplay][magnitudeKey];
    if (!compactPlaralRule) {
      return null;
    }
    pattern = selectPlural(pl, roundedNumber, compactPlaralRule);
  }
  if (pattern === "0") {
    return null;
  }
  pattern = getPatternForSign(pattern, sign).replace(/([^\s;\-\+\d¤]+)/g, "{c:$1}").replace(/0+/, "0");
  return pattern;
}
function selectPlural(pl, x, rules) {
  return rules[pl.select(x)] || rules.other;
}
var CARET_S_UNICODE_REGEX, S_DOLLAR_UNICODE_REGEX, CLDR_NUMBER_PATTERN;
var init_format_to_parts = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/format_to_parts.js"() {
    init_ToRawFixed();
    init_digit_mapping_generated();
    init_regex_generated();
    CARET_S_UNICODE_REGEX = new RegExp("^".concat(S_UNICODE_REGEX.source));
    S_DOLLAR_UNICODE_REGEX = new RegExp("".concat(S_UNICODE_REGEX.source, "$"));
    CLDR_NUMBER_PATTERN = /[#0](?:[\.,][#0]+)*/g;
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/PartitionNumberPattern.js
function PartitionNumberPattern(numberFormat, x, _a) {
  var _b;
  var getInternalSlots = _a.getInternalSlots;
  var internalSlots = getInternalSlots(numberFormat);
  var pl = internalSlots.pl, dataLocaleData = internalSlots.dataLocaleData, numberingSystem = internalSlots.numberingSystem;
  var symbols = dataLocaleData.numbers.symbols[numberingSystem] || dataLocaleData.numbers.symbols[dataLocaleData.numbers.nu[0]];
  var magnitude = 0;
  var exponent = 0;
  var n;
  if (isNaN(x)) {
    n = symbols.nan;
  } else if (x == Number.POSITIVE_INFINITY || x == Number.NEGATIVE_INFINITY) {
    n = symbols.infinity;
  } else {
    if (!SameValue(x, -0)) {
      if (!isFinite(x)) {
        throw new Error("Input must be a mathematical value");
      }
      if (internalSlots.style == "percent") {
        x *= 100;
      }
      ;
      _b = ComputeExponent(numberFormat, x, {
        getInternalSlots
      }), exponent = _b[0], magnitude = _b[1];
      x = exponent < 0 ? x * Math.pow(10, -exponent) : x / Math.pow(10, exponent);
    }
    var formatNumberResult = FormatNumericToString(internalSlots, x);
    n = formatNumberResult.formattedString;
    x = formatNumberResult.roundedNumber;
  }
  var sign;
  var signDisplay = internalSlots.signDisplay;
  switch (signDisplay) {
    case "never":
      sign = 0;
      break;
    case "auto":
      if (SameValue(x, 0) || x > 0 || isNaN(x)) {
        sign = 0;
      } else {
        sign = -1;
      }
      break;
    case "always":
      if (SameValue(x, 0) || x > 0 || isNaN(x)) {
        sign = 1;
      } else {
        sign = -1;
      }
      break;
    default:
      if (x === 0 || isNaN(x)) {
        sign = 0;
      } else if (x > 0) {
        sign = 1;
      } else {
        sign = -1;
      }
  }
  return formatToParts({ roundedNumber: x, formattedString: n, exponent, magnitude, sign }, internalSlots.dataLocaleData, pl, internalSlots);
}
var init_PartitionNumberPattern = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/PartitionNumberPattern.js"() {
    init_FormatNumericToString();
    init__();
    init_ComputeExponent();
    init_format_to_parts();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/PartitionNumberRangePattern.js
function PartitionNumberRangePattern(numberFormat, x, y, _a) {
  var getInternalSlots = _a.getInternalSlots;
  if (isNaN(x) || isNaN(y)) {
    throw new RangeError("Input must be a number");
  }
  var result = [];
  var xResult = PartitionNumberPattern(numberFormat, x, { getInternalSlots });
  var yResult = PartitionNumberPattern(numberFormat, y, { getInternalSlots });
  if (xResult === yResult) {
    return FormatApproximately(numberFormat, xResult, { getInternalSlots });
  }
  for (var _i = 0, xResult_1 = xResult; _i < xResult_1.length; _i++) {
    var r = xResult_1[_i];
    r.source = "startRange";
  }
  result = result.concat(xResult);
  var internalSlots = getInternalSlots(numberFormat);
  var symbols = internalSlots.dataLocaleData.numbers.symbols[internalSlots.numberingSystem];
  result.push({ type: "literal", value: symbols.rangeSign, source: "shared" });
  for (var _b = 0, yResult_1 = yResult; _b < yResult_1.length; _b++) {
    var r = yResult_1[_b];
    r.source = "endRange";
  }
  result = result.concat(yResult);
  return CollapseNumberRange(result);
}
var init_PartitionNumberRangePattern = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/PartitionNumberRangePattern.js"() {
    init_PartitionNumberPattern();
    init_CollapseNumberRange();
    init_FormatApproximately();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericRange.js
function FormatNumericRange(numberFormat, x, y, _a) {
  var getInternalSlots = _a.getInternalSlots;
  var parts = PartitionNumberRangePattern(numberFormat, x, y, {
    getInternalSlots
  });
  return parts.map(function(part) {
    return part.value;
  }).join("");
}
var init_FormatNumericRange = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericRange.js"() {
    init_PartitionNumberRangePattern();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericRangeToParts.js
function FormatNumericRangeToParts(numberFormat, x, y, _a) {
  var getInternalSlots = _a.getInternalSlots;
  var parts = PartitionNumberRangePattern(numberFormat, x, y, {
    getInternalSlots
  });
  return parts.map(function(part, index) {
    return {
      type: part.type,
      value: part.value,
      source: part.source,
      result: index.toString()
    };
  });
}
var init_FormatNumericRangeToParts = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericRangeToParts.js"() {
    init_PartitionNumberRangePattern();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericToParts.js
function FormatNumericToParts(nf, x, implDetails) {
  var parts = PartitionNumberPattern(nf, x, implDetails);
  var result = ArrayCreate(0);
  for (var _i = 0, parts_1 = parts; _i < parts_1.length; _i++) {
    var part = parts_1[_i];
    result.push({
      type: part.type,
      value: part.value
    });
  }
  return result;
}
var init_FormatNumericToParts = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/FormatNumericToParts.js"() {
    init_PartitionNumberPattern();
    init__();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/GetUnsignedRoundingMode.js
function GetUnsignedRoundingMode(roundingMode, isNegative) {
  if (isNegative) {
    return negativeMapping[roundingMode];
  }
  return positiveMapping[roundingMode];
}
var negativeMapping, positiveMapping;
var init_GetUnsignedRoundingMode = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/GetUnsignedRoundingMode.js"() {
    negativeMapping = {
      ceil: "zero",
      floor: "infinity",
      expand: "infinity",
      trunc: "zero",
      halfCeil: "half-zero",
      halfFloor: "half-infinity",
      halfExpand: "half-infinity",
      halfTrunc: "half-zero",
      halfEven: "half-even"
    };
    positiveMapping = {
      ceil: "infinity",
      floor: "zero",
      expand: "infinity",
      trunc: "zero",
      halfCeil: "half-infinity",
      halfFloor: "half-zero",
      halfExpand: "half-infinity",
      halfTrunc: "half-zero",
      halfEven: "half-even"
    };
  }
});

// node_modules/@formatjs/intl-localematcher/lib/abstract/CanonicalizeLocaleList.js
function CanonicalizeLocaleList2(locales) {
  return Intl.getCanonicalLocales(locales);
}
var init_CanonicalizeLocaleList2 = __esm({
  "node_modules/@formatjs/intl-localematcher/lib/abstract/CanonicalizeLocaleList.js"() {
  }
});

// node_modules/@formatjs/intl-localematcher/lib/abstract/utils.js
function invariant2(condition, message, Err) {
  if (Err === void 0) {
    Err = Error;
  }
  if (!condition) {
    throw new Err(message);
  }
}
var UNICODE_EXTENSION_SEQUENCE_REGEX;
var init_utils2 = __esm({
  "node_modules/@formatjs/intl-localematcher/lib/abstract/utils.js"() {
    UNICODE_EXTENSION_SEQUENCE_REGEX = /-u(?:-[0-9a-z]{2,8})+/gi;
  }
});

// node_modules/@formatjs/intl-localematcher/lib/abstract/BestAvailableLocale.js
function BestAvailableLocale(availableLocales, locale) {
  var candidate = locale;
  while (true) {
    if (availableLocales.has(candidate)) {
      return candidate;
    }
    var pos = candidate.lastIndexOf("-");
    if (!~pos) {
      return void 0;
    }
    if (pos >= 2 && candidate[pos - 2] === "-") {
      pos -= 2;
    }
    candidate = candidate.slice(0, pos);
  }
}
var init_BestAvailableLocale = __esm({
  "node_modules/@formatjs/intl-localematcher/lib/abstract/BestAvailableLocale.js"() {
  }
});

// node_modules/@formatjs/intl-localematcher/lib/abstract/LookupMatcher.js
function LookupMatcher(availableLocales, requestedLocales, getDefaultLocale) {
  var result = { locale: "" };
  for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
    var locale = requestedLocales_1[_i];
    var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, "");
    var availableLocale = BestAvailableLocale(availableLocales, noExtensionLocale);
    if (availableLocale) {
      result.locale = availableLocale;
      if (locale !== noExtensionLocale) {
        result.extension = locale.slice(noExtensionLocale.length + 1, locale.length);
      }
      return result;
    }
  }
  result.locale = getDefaultLocale();
  return result;
}
var init_LookupMatcher = __esm({
  "node_modules/@formatjs/intl-localematcher/lib/abstract/LookupMatcher.js"() {
    init_utils2();
    init_BestAvailableLocale();
  }
});

// node_modules/@formatjs/intl-localematcher/lib/abstract/BestFitMatcher.js
function BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale) {
  var minimizedAvailableLocaleMap = {};
  var availableLocaleMap = {};
  var canonicalizedLocaleMap = {};
  var minimizedAvailableLocales = /* @__PURE__ */ new Set();
  availableLocales.forEach(function(locale2) {
    var minimizedLocale = new Intl.Locale(locale2).minimize().toString();
    var canonicalizedLocale = Intl.getCanonicalLocales(locale2)[0] || locale2;
    minimizedAvailableLocaleMap[minimizedLocale] = locale2;
    availableLocaleMap[locale2] = locale2;
    canonicalizedLocaleMap[canonicalizedLocale] = locale2;
    minimizedAvailableLocales.add(minimizedLocale);
    minimizedAvailableLocales.add(locale2);
    minimizedAvailableLocales.add(canonicalizedLocale);
  });
  var foundLocale;
  for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
    var l = requestedLocales_1[_i];
    if (foundLocale) {
      break;
    }
    var noExtensionLocale = l.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, "");
    if (availableLocales.has(noExtensionLocale)) {
      foundLocale = noExtensionLocale;
      break;
    }
    if (minimizedAvailableLocales.has(noExtensionLocale)) {
      foundLocale = noExtensionLocale;
      break;
    }
    var locale = new Intl.Locale(noExtensionLocale);
    var maximizedRequestedLocale = locale.maximize().toString();
    var minimizedRequestedLocale = locale.minimize().toString();
    if (minimizedAvailableLocales.has(minimizedRequestedLocale)) {
      foundLocale = minimizedRequestedLocale;
      break;
    }
    foundLocale = BestAvailableLocale(minimizedAvailableLocales, maximizedRequestedLocale);
  }
  if (!foundLocale) {
    return { locale: getDefaultLocale() };
  }
  return {
    locale: availableLocaleMap[foundLocale] || canonicalizedLocaleMap[foundLocale] || minimizedAvailableLocaleMap[foundLocale] || foundLocale
  };
}
var init_BestFitMatcher = __esm({
  "node_modules/@formatjs/intl-localematcher/lib/abstract/BestFitMatcher.js"() {
    init_BestAvailableLocale();
    init_utils2();
  }
});

// node_modules/@formatjs/intl-localematcher/lib/abstract/UnicodeExtensionValue.js
function UnicodeExtensionValue(extension, key) {
  invariant2(key.length === 2, "key must have 2 elements");
  var size = extension.length;
  var searchValue = "-".concat(key, "-");
  var pos = extension.indexOf(searchValue);
  if (pos !== -1) {
    var start = pos + 4;
    var end = start;
    var k = start;
    var done = false;
    while (!done) {
      var e = extension.indexOf("-", k);
      var len = void 0;
      if (e === -1) {
        len = size - k;
      } else {
        len = e - k;
      }
      if (len === 2) {
        done = true;
      } else if (e === -1) {
        end = size;
        done = true;
      } else {
        end = e;
        k = e + 1;
      }
    }
    return extension.slice(start, end);
  }
  searchValue = "-".concat(key);
  pos = extension.indexOf(searchValue);
  if (pos !== -1 && pos + 3 === size) {
    return "";
  }
  return void 0;
}
var init_UnicodeExtensionValue = __esm({
  "node_modules/@formatjs/intl-localematcher/lib/abstract/UnicodeExtensionValue.js"() {
    init_utils2();
  }
});

// node_modules/@formatjs/intl-localematcher/lib/abstract/ResolveLocale.js
function ResolveLocale(availableLocales, requestedLocales, options, relevantExtensionKeys, localeData, getDefaultLocale) {
  var matcher = options.localeMatcher;
  var r;
  if (matcher === "lookup") {
    r = LookupMatcher(availableLocales, requestedLocales, getDefaultLocale);
  } else {
    r = BestFitMatcher(availableLocales, requestedLocales, getDefaultLocale);
  }
  var foundLocale = r.locale;
  var result = { locale: "", dataLocale: foundLocale };
  var supportedExtension = "-u";
  for (var _i = 0, relevantExtensionKeys_1 = relevantExtensionKeys; _i < relevantExtensionKeys_1.length; _i++) {
    var key = relevantExtensionKeys_1[_i];
    invariant2(foundLocale in localeData, "Missing locale data for ".concat(foundLocale));
    var foundLocaleData = localeData[foundLocale];
    invariant2(typeof foundLocaleData === "object" && foundLocaleData !== null, "locale data ".concat(key, " must be an object"));
    var keyLocaleData = foundLocaleData[key];
    invariant2(Array.isArray(keyLocaleData), "keyLocaleData for ".concat(key, " must be an array"));
    var value = keyLocaleData[0];
    invariant2(typeof value === "string" || value === null, "value must be string or null but got ".concat(typeof value, " in key ").concat(key));
    var supportedExtensionAddition = "";
    if (r.extension) {
      var requestedValue = UnicodeExtensionValue(r.extension, key);
      if (requestedValue !== void 0) {
        if (requestedValue !== "") {
          if (~keyLocaleData.indexOf(requestedValue)) {
            value = requestedValue;
            supportedExtensionAddition = "-".concat(key, "-").concat(value);
          }
        } else if (~requestedValue.indexOf("true")) {
          value = "true";
          supportedExtensionAddition = "-".concat(key);
        }
      }
    }
    if (key in options) {
      var optionsValue = options[key];
      invariant2(typeof optionsValue === "string" || typeof optionsValue === "undefined" || optionsValue === null, "optionsValue must be String, Undefined or Null");
      if (~keyLocaleData.indexOf(optionsValue)) {
        if (optionsValue !== value) {
          value = optionsValue;
          supportedExtensionAddition = "";
        }
      }
    }
    result[key] = value;
    supportedExtension += supportedExtensionAddition;
  }
  if (supportedExtension.length > 2) {
    var privateIndex = foundLocale.indexOf("-x-");
    if (privateIndex === -1) {
      foundLocale = foundLocale + supportedExtension;
    } else {
      var preExtension = foundLocale.slice(0, privateIndex);
      var postExtension = foundLocale.slice(privateIndex, foundLocale.length);
      foundLocale = preExtension + supportedExtension + postExtension;
    }
    foundLocale = Intl.getCanonicalLocales(foundLocale)[0];
  }
  result.locale = foundLocale;
  return result;
}
var init_ResolveLocale = __esm({
  "node_modules/@formatjs/intl-localematcher/lib/abstract/ResolveLocale.js"() {
    init_LookupMatcher();
    init_BestFitMatcher();
    init_utils2();
    init_UnicodeExtensionValue();
  }
});

// node_modules/@formatjs/intl-localematcher/lib/abstract/LookupSupportedLocales.js
function LookupSupportedLocales(availableLocales, requestedLocales) {
  var subset = [];
  for (var _i = 0, requestedLocales_1 = requestedLocales; _i < requestedLocales_1.length; _i++) {
    var locale = requestedLocales_1[_i];
    var noExtensionLocale = locale.replace(UNICODE_EXTENSION_SEQUENCE_REGEX, "");
    var availableLocale = BestAvailableLocale(availableLocales, noExtensionLocale);
    if (availableLocale) {
      subset.push(availableLocale);
    }
  }
  return subset;
}
var init_LookupSupportedLocales = __esm({
  "node_modules/@formatjs/intl-localematcher/lib/abstract/LookupSupportedLocales.js"() {
    init_utils2();
    init_BestAvailableLocale();
  }
});

// node_modules/@formatjs/intl-localematcher/lib/index.js
var lib_exports = {};
__export(lib_exports, {
  LookupSupportedLocales: () => LookupSupportedLocales,
  ResolveLocale: () => ResolveLocale,
  match: () => match
});
function match(requestedLocales, availableLocales, defaultLocale, opts) {
  var locales = availableLocales.reduce(function(all, l) {
    all.add(l);
    return all;
  }, /* @__PURE__ */ new Set());
  return ResolveLocale(locales, CanonicalizeLocaleList2(requestedLocales), {
    localeMatcher: (opts === null || opts === void 0 ? void 0 : opts.algorithm) || "best fit"
  }, [], {}, function() {
    return defaultLocale;
  }).locale;
}
var init_lib = __esm({
  "node_modules/@formatjs/intl-localematcher/lib/index.js"() {
    init_CanonicalizeLocaleList2();
    init_ResolveLocale();
    init_LookupSupportedLocales();
    init_ResolveLocale();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/SetNumberFormatUnitOptions.js
function SetNumberFormatUnitOptions(nf, options, _a) {
  if (options === void 0) {
    options = /* @__PURE__ */ Object.create(null);
  }
  var getInternalSlots = _a.getInternalSlots;
  var internalSlots = getInternalSlots(nf);
  var style = GetOption(options, "style", "string", ["decimal", "percent", "currency", "unit"], "decimal");
  internalSlots.style = style;
  var currency = GetOption(options, "currency", "string", void 0, void 0);
  if (currency !== void 0 && !IsWellFormedCurrencyCode(currency)) {
    throw RangeError("Malformed currency code");
  }
  if (style === "currency" && currency === void 0) {
    throw TypeError("currency cannot be undefined");
  }
  var currencyDisplay = GetOption(options, "currencyDisplay", "string", ["code", "symbol", "narrowSymbol", "name"], "symbol");
  var currencySign = GetOption(options, "currencySign", "string", ["standard", "accounting"], "standard");
  var unit = GetOption(options, "unit", "string", void 0, void 0);
  if (unit !== void 0 && !IsWellFormedUnitIdentifier(unit)) {
    throw RangeError("Invalid unit argument for Intl.NumberFormat()");
  }
  if (style === "unit" && unit === void 0) {
    throw TypeError("unit cannot be undefined");
  }
  var unitDisplay = GetOption(options, "unitDisplay", "string", ["short", "narrow", "long"], "short");
  if (style === "currency") {
    internalSlots.currency = currency.toUpperCase();
    internalSlots.currencyDisplay = currencyDisplay;
    internalSlots.currencySign = currencySign;
  }
  if (style === "unit") {
    internalSlots.unit = unit;
    internalSlots.unitDisplay = unitDisplay;
  }
}
var init_SetNumberFormatUnitOptions = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/SetNumberFormatUnitOptions.js"() {
    init_GetOption();
    init_IsWellFormedCurrencyCode();
    init_IsWellFormedUnitIdentifier();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/SetNumberFormatDigitOptions.js
function SetNumberFormatDigitOptions(internalSlots, opts, mnfdDefault, mxfdDefault, notation) {
  var mnid = GetNumberOption(opts, "minimumIntegerDigits", 1, 21, 1);
  var mnfd = opts.minimumFractionDigits;
  var mxfd = opts.maximumFractionDigits;
  var mnsd = opts.minimumSignificantDigits;
  var mxsd = opts.maximumSignificantDigits;
  internalSlots.minimumIntegerDigits = mnid;
  var roundingPriority = GetOption(opts, "roundingPriority", "string", ["auto", "morePrecision", "lessPrecision"], "auto");
  var hasSd = mnsd !== void 0 || mxsd !== void 0;
  var hasFd = mnfd !== void 0 || mxfd !== void 0;
  var needSd = true;
  var needFd = true;
  if (roundingPriority === "auto") {
    needSd = hasSd;
    if (hasSd || !hasFd && notation === "compact") {
      needFd = false;
    }
  }
  if (needSd) {
    if (hasSd) {
      mnsd = DefaultNumberOption(mnsd, 1, 21, 1);
      mxsd = DefaultNumberOption(mxsd, mnsd, 21, 21);
      internalSlots.minimumSignificantDigits = mnsd;
      internalSlots.maximumSignificantDigits = mxsd;
    } else {
      internalSlots.minimumSignificantDigits = 1;
      internalSlots.maximumSignificantDigits = 21;
    }
  }
  if (needFd) {
    if (hasFd) {
      mnfd = DefaultNumberOption(mnfd, 0, 20, void 0);
      mxfd = DefaultNumberOption(mxfd, 0, 20, void 0);
      if (mnfd === void 0) {
        mnfd = Math.min(mnfdDefault, mxfd);
      } else if (mxfd === void 0) {
        mxfd = Math.max(mxfdDefault, mnfd);
      } else if (mnfd > mxfd) {
        throw new RangeError("Invalid range, ".concat(mnfd, " > ").concat(mxfd));
      }
      internalSlots.minimumFractionDigits = mnfd;
      internalSlots.maximumFractionDigits = mxfd;
    } else {
      internalSlots.minimumFractionDigits = mnfdDefault;
      internalSlots.maximumFractionDigits = mxfdDefault;
    }
  }
  if (needSd || needFd) {
    if (roundingPriority === "morePrecision") {
      internalSlots.roundingType = "morePrecision";
    } else if (roundingPriority === "lessPrecision") {
      internalSlots.roundingType = "lessPrecision";
    } else if (hasSd) {
      internalSlots.roundingType = "significantDigits";
    } else {
      internalSlots.roundingType = "fractionDigits";
    }
  } else {
    internalSlots.roundingType = "morePrecision";
    internalSlots.minimumFractionDigits = 0;
    internalSlots.maximumFractionDigits = 0;
    internalSlots.minimumSignificantDigits = 1;
    internalSlots.maximumSignificantDigits = 2;
  }
}
var init_SetNumberFormatDigitOptions = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/SetNumberFormatDigitOptions.js"() {
    init_GetNumberOption();
    init_DefaultNumberOption();
    init_GetOption();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/InitializeNumberFormat.js
function InitializeNumberFormat(nf, locales, opts, _a) {
  var getInternalSlots = _a.getInternalSlots, localeData = _a.localeData, availableLocales = _a.availableLocales, numberingSystemNames = _a.numberingSystemNames, getDefaultLocale = _a.getDefaultLocale, currencyDigitsData = _a.currencyDigitsData;
  var requestedLocales = CanonicalizeLocaleList(locales);
  var options = CoerceOptionsToObject(opts);
  var opt = /* @__PURE__ */ Object.create(null);
  var matcher = GetOption(options, "localeMatcher", "string", ["lookup", "best fit"], "best fit");
  opt.localeMatcher = matcher;
  var numberingSystem = GetOption(options, "numberingSystem", "string", void 0, void 0);
  if (numberingSystem !== void 0 && numberingSystemNames.indexOf(numberingSystem) < 0) {
    throw RangeError("Invalid numberingSystems: ".concat(numberingSystem));
  }
  opt.nu = numberingSystem;
  var r = ResolveLocale(
    availableLocales,
    requestedLocales,
    opt,
    // [[RelevantExtensionKeys]] slot, which is a constant
    ["nu"],
    localeData,
    getDefaultLocale
  );
  var dataLocaleData = localeData[r.dataLocale];
  invariant(!!dataLocaleData, "Missing locale data for ".concat(r.dataLocale));
  var internalSlots = getInternalSlots(nf);
  internalSlots.locale = r.locale;
  internalSlots.dataLocale = r.dataLocale;
  internalSlots.numberingSystem = r.nu;
  internalSlots.dataLocaleData = dataLocaleData;
  SetNumberFormatUnitOptions(nf, options, { getInternalSlots });
  var style = internalSlots.style;
  var mnfdDefault;
  var mxfdDefault;
  if (style === "currency") {
    var currency = internalSlots.currency;
    var cDigits = CurrencyDigits(currency, { currencyDigitsData });
    mnfdDefault = cDigits;
    mxfdDefault = cDigits;
  } else {
    mnfdDefault = 0;
    mxfdDefault = style === "percent" ? 0 : 3;
  }
  var notation = GetOption(options, "notation", "string", ["standard", "scientific", "engineering", "compact"], "standard");
  internalSlots.notation = notation;
  SetNumberFormatDigitOptions(internalSlots, options, mnfdDefault, mxfdDefault, notation);
  var roundingIncrement = GetNumberOption(options, "roundingIncrement", 1, 5e3, 1);
  if (VALID_ROUND_INCREMENT_VALUES.indexOf(roundingIncrement) === -1) {
    throw new RangeError("Invalid rounding increment value: ".concat(roundingIncrement, ".\nValid values are ").concat(VALID_ROUND_INCREMENT_VALUES, "."));
  }
  if (roundingIncrement !== 1 && internalSlots.roundingType !== "fractionDigits") {
    throw new TypeError("For roundingIncrement > 1 only fractionDigits is a valid roundingType");
  }
  if (roundingIncrement !== 1 && internalSlots.maximumFractionDigits !== internalSlots.minimumFractionDigits) {
    throw new RangeError("With roundingIncrement > 1, maximumFractionDigits and minimumFractionDigits must be equal.");
  }
  internalSlots.roundingIncrement = roundingIncrement;
  var trailingZeroDisplay = GetOption(options, "trailingZeroDisplay", "string", ["auto", "stripIfInteger"], "auto");
  internalSlots.trailingZeroDisplay = trailingZeroDisplay;
  var compactDisplay = GetOption(options, "compactDisplay", "string", ["short", "long"], "short");
  var defaultUseGrouping = "auto";
  if (notation === "compact") {
    internalSlots.compactDisplay = compactDisplay;
    defaultUseGrouping = "min2";
  }
  internalSlots.useGrouping = GetStringOrBooleanOption(options, "useGrouping", ["min2", "auto", "always"], "always", false, defaultUseGrouping);
  internalSlots.signDisplay = GetOption(options, "signDisplay", "string", ["auto", "never", "always", "exceptZero", "negative"], "auto");
  internalSlots.roundingMode = GetOption(options, "roundingMode", "string", [
    "ceil",
    "floor",
    "expand",
    "trunc",
    "halfCeil",
    "halfFloor",
    "halfExpand",
    "halfTrunc",
    "halfEven"
  ], "halfExpand");
  return nf;
}
var VALID_ROUND_INCREMENT_VALUES;
var init_InitializeNumberFormat = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/NumberFormat/InitializeNumberFormat.js"() {
    init_CanonicalizeLocaleList();
    init_GetOption();
    init_lib();
    init_SetNumberFormatUnitOptions();
    init_CurrencyDigits();
    init_SetNumberFormatDigitOptions();
    init_utils();
    init_CoerceOptionsToObject();
    init_GetNumberOption();
    init_GetStringOrBooleanOption();
    VALID_ROUND_INCREMENT_VALUES = [
      1,
      2,
      5,
      10,
      20,
      25,
      50,
      100,
      200,
      250,
      500,
      1e3,
      2e3
    ];
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/PartitionPattern.js
function PartitionPattern(pattern) {
  var result = [];
  var beginIndex = pattern.indexOf("{");
  var endIndex = 0;
  var nextIndex = 0;
  var length = pattern.length;
  while (beginIndex < pattern.length && beginIndex > -1) {
    endIndex = pattern.indexOf("}", beginIndex);
    invariant(endIndex > beginIndex, "Invalid pattern ".concat(pattern));
    if (beginIndex > nextIndex) {
      result.push({
        type: "literal",
        value: pattern.substring(nextIndex, beginIndex)
      });
    }
    result.push({
      type: pattern.substring(beginIndex + 1, endIndex),
      value: void 0
    });
    nextIndex = endIndex + 1;
    beginIndex = pattern.indexOf("{", nextIndex);
  }
  if (nextIndex < length) {
    result.push({
      type: "literal",
      value: pattern.substring(nextIndex, length)
    });
  }
  return result;
}
var init_PartitionPattern = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/PartitionPattern.js"() {
    init_utils();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/SupportedLocales.js
function SupportedLocales(availableLocales, requestedLocales, options) {
  var matcher = "best fit";
  if (options !== void 0) {
    options = ToObject(options);
    matcher = GetOption(options, "localeMatcher", "string", ["lookup", "best fit"], "best fit");
  }
  if (matcher === "best fit") {
    return LookupSupportedLocales(availableLocales, requestedLocales);
  }
  return LookupSupportedLocales(availableLocales, requestedLocales);
}
var init_SupportedLocales = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/SupportedLocales.js"() {
    init__();
    init_GetOption();
    init_lib();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/data.js
function isMissingLocaleDataError(e) {
  return e.type === "MISSING_LOCALE_DATA";
}
var MissingLocaleDataError;
var init_data = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/data.js"() {
    init_tslib_es6();
    MissingLocaleDataError = /** @class */
    function(_super) {
      __extends(MissingLocaleDataError2, _super);
      function MissingLocaleDataError2() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.type = "MISSING_LOCALE_DATA";
        return _this;
      }
      return MissingLocaleDataError2;
    }(Error);
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/types/relative-time.js
var init_relative_time = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/types/relative-time.js"() {
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/types/date-time.js
var RangePatternType;
var init_date_time = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/types/date-time.js"() {
    (function(RangePatternType2) {
      RangePatternType2["startRange"] = "startRange";
      RangePatternType2["shared"] = "shared";
      RangePatternType2["endRange"] = "endRange";
    })(RangePatternType || (RangePatternType = {}));
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/types/list.js
var init_list = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/types/list.js"() {
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/types/plural-rules.js
var init_plural_rules = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/types/plural-rules.js"() {
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/types/number.js
var init_number = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/types/number.js"() {
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/types/displaynames.js
var init_displaynames = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/types/displaynames.js"() {
  }
});

// node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/index.js
var lib_exports2 = {};
__export(lib_exports2, {
  ApplyUnsignedRoundingMode: () => ApplyUnsignedRoundingMode,
  ArrayCreate: () => ArrayCreate,
  CanonicalizeLocaleList: () => CanonicalizeLocaleList,
  CanonicalizeTimeZoneName: () => CanonicalizeTimeZoneName,
  CoerceOptionsToObject: () => CoerceOptionsToObject,
  CollapseNumberRange: () => CollapseNumberRange,
  ComputeExponent: () => ComputeExponent,
  ComputeExponentForMagnitude: () => ComputeExponentForMagnitude,
  CurrencyDigits: () => CurrencyDigits,
  DateFromTime: () => DateFromTime,
  Day: () => Day,
  DayFromYear: () => DayFromYear,
  DayWithinYear: () => DayWithinYear,
  DaysInYear: () => DaysInYear,
  FormatApproximately: () => FormatApproximately,
  FormatNumericRange: () => FormatNumericRange,
  FormatNumericRangeToParts: () => FormatNumericRangeToParts,
  FormatNumericToParts: () => FormatNumericToParts,
  FormatNumericToString: () => FormatNumericToString,
  GetNumberOption: () => GetNumberOption,
  GetOption: () => GetOption,
  GetOptionsObject: () => GetOptionsObject,
  GetStringOrBooleanOption: () => GetStringOrBooleanOption,
  GetUnsignedRoundingMode: () => GetUnsignedRoundingMode,
  HasOwnProperty: () => HasOwnProperty,
  HourFromTime: () => HourFromTime,
  InLeapYear: () => InLeapYear,
  InitializeNumberFormat: () => InitializeNumberFormat,
  IsSanctionedSimpleUnitIdentifier: () => IsSanctionedSimpleUnitIdentifier,
  IsValidTimeZoneName: () => IsValidTimeZoneName,
  IsWellFormedCurrencyCode: () => IsWellFormedCurrencyCode,
  IsWellFormedUnitIdentifier: () => IsWellFormedUnitIdentifier,
  MinFromTime: () => MinFromTime,
  MonthFromTime: () => MonthFromTime,
  OrdinaryHasInstance: () => OrdinaryHasInstance,
  PartitionNumberPattern: () => PartitionNumberPattern,
  PartitionNumberRangePattern: () => PartitionNumberRangePattern,
  PartitionPattern: () => PartitionPattern,
  RangePatternType: () => RangePatternType,
  SANCTIONED_UNITS: () => SANCTIONED_UNITS,
  SIMPLE_UNITS: () => SIMPLE_UNITS,
  SameValue: () => SameValue,
  SecFromTime: () => SecFromTime,
  SetNumberFormatDigitOptions: () => SetNumberFormatDigitOptions,
  SetNumberFormatUnitOptions: () => SetNumberFormatUnitOptions,
  SupportedLocales: () => SupportedLocales,
  TimeClip: () => TimeClip,
  TimeFromYear: () => TimeFromYear,
  ToNumber: () => ToNumber,
  ToObject: () => ToObject,
  ToRawFixed: () => ToRawFixed,
  ToRawPrecision: () => ToRawPrecision,
  ToString: () => ToString,
  Type: () => Type,
  WeekDay: () => WeekDay,
  YearFromTime: () => YearFromTime,
  _formatToParts: () => formatToParts,
  defineProperty: () => defineProperty,
  getInternalSlot: () => getInternalSlot,
  getMagnitude: () => getMagnitude,
  getMultiInternalSlots: () => getMultiInternalSlots,
  invariant: () => invariant,
  isLiteralPart: () => isLiteralPart,
  isMissingLocaleDataError: () => isMissingLocaleDataError,
  msFromTime: () => msFromTime,
  removeUnitNamespace: () => removeUnitNamespace,
  setInternalSlot: () => setInternalSlot,
  setMultiInternalSlots: () => setMultiInternalSlots
});
var init_lib2 = __esm({
  "node_modules/@formatjs/intl-relativetimeformat/node_modules/@formatjs/ecma402-abstract/lib/index.js"() {
    init_CanonicalizeLocaleList();
    init_CanonicalizeTimeZoneName();
    init_CoerceOptionsToObject();
    init_GetNumberOption();
    init_GetOption();
    init_GetOptionsObject();
    init_GetStringOrBooleanOption();
    init_IsSanctionedSimpleUnitIdentifier();
    init_IsValidTimeZoneName();
    init_IsWellFormedCurrencyCode();
    init_IsWellFormedUnitIdentifier();
    init_ApplyUnsignedRoundingMode();
    init_CollapseNumberRange();
    init_ComputeExponent();
    init_ComputeExponentForMagnitude();
    init_CurrencyDigits();
    init_FormatApproximately();
    init_FormatNumericRange();
    init_FormatNumericRangeToParts();
    init_FormatNumericToParts();
    init_FormatNumericToString();
    init_GetUnsignedRoundingMode();
    init_InitializeNumberFormat();
    init_PartitionNumberPattern();
    init_PartitionNumberRangePattern();
    init_SetNumberFormatDigitOptions();
    init_SetNumberFormatUnitOptions();
    init_ToRawFixed();
    init_ToRawPrecision();
    init_format_to_parts();
    init_PartitionPattern();
    init_SupportedLocales();
    init_utils();
    init_data();
    init_relative_time();
    init_date_time();
    init_list();
    init_plural_rules();
    init_number();
    init_displaynames();
    init_utils();
    init__();
  }
});

// node_modules/@formatjs/intl-relativetimeformat/abstract/InitializeRelativeTimeFormat.js
var require_InitializeRelativeTimeFormat = __commonJS({
  "node_modules/@formatjs/intl-relativetimeformat/abstract/InitializeRelativeTimeFormat.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.InitializeRelativeTimeFormat = void 0;
    var ecma402_abstract_1 = (init_lib2(), __toCommonJS(lib_exports2));
    var intl_localematcher_1 = (init_lib(), __toCommonJS(lib_exports));
    var NUMBERING_SYSTEM_REGEX = /^[a-z0-9]{3,8}(-[a-z0-9]{3,8})*$/i;
    function InitializeRelativeTimeFormat(rtf, locales, options, _a) {
      var getInternalSlots = _a.getInternalSlots, availableLocales = _a.availableLocales, relevantExtensionKeys = _a.relevantExtensionKeys, localeData = _a.localeData, getDefaultLocale = _a.getDefaultLocale;
      var internalSlots = getInternalSlots(rtf);
      internalSlots.initializedRelativeTimeFormat = true;
      var requestedLocales = (0, ecma402_abstract_1.CanonicalizeLocaleList)(locales);
      var opt = /* @__PURE__ */ Object.create(null);
      var opts = (0, ecma402_abstract_1.CoerceOptionsToObject)(options);
      var matcher = (0, ecma402_abstract_1.GetOption)(opts, "localeMatcher", "string", ["best fit", "lookup"], "best fit");
      opt.localeMatcher = matcher;
      var numberingSystem = (0, ecma402_abstract_1.GetOption)(
        opts,
        // @ts-expect-error TS option is wack
        "numberingSystem",
        "string",
        void 0,
        void 0
      );
      if (numberingSystem !== void 0) {
        if (!NUMBERING_SYSTEM_REGEX.test(numberingSystem)) {
          throw new RangeError("Invalid numbering system ".concat(numberingSystem));
        }
      }
      opt.nu = numberingSystem;
      var r = (0, intl_localematcher_1.ResolveLocale)(availableLocales, requestedLocales, opt, relevantExtensionKeys, localeData, getDefaultLocale);
      var locale = r.locale, nu = r.nu;
      internalSlots.locale = locale;
      internalSlots.style = (0, ecma402_abstract_1.GetOption)(opts, "style", "string", ["long", "narrow", "short"], "long");
      internalSlots.numeric = (0, ecma402_abstract_1.GetOption)(opts, "numeric", "string", ["always", "auto"], "always");
      var fields = localeData[r.dataLocale];
      (0, ecma402_abstract_1.invariant)(!!fields, "Missing locale data for ".concat(r.dataLocale));
      internalSlots.fields = fields;
      internalSlots.numberFormat = new Intl.NumberFormat(locales);
      internalSlots.pluralRules = new Intl.PluralRules(locales);
      internalSlots.numberingSystem = nu;
      return rtf;
    }
    exports.InitializeRelativeTimeFormat = InitializeRelativeTimeFormat;
  }
});

// node_modules/@formatjs/intl-relativetimeformat/abstract/SingularRelativeTimeUnit.js
var require_SingularRelativeTimeUnit = __commonJS({
  "node_modules/@formatjs/intl-relativetimeformat/abstract/SingularRelativeTimeUnit.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.SingularRelativeTimeUnit = void 0;
    var ecma402_abstract_1 = (init_lib2(), __toCommonJS(lib_exports2));
    function SingularRelativeTimeUnit(unit) {
      (0, ecma402_abstract_1.invariant)((0, ecma402_abstract_1.Type)(unit) === "String", "unit must be a string");
      if (unit === "seconds")
        return "second";
      if (unit === "minutes")
        return "minute";
      if (unit === "hours")
        return "hour";
      if (unit === "days")
        return "day";
      if (unit === "weeks")
        return "week";
      if (unit === "months")
        return "month";
      if (unit === "quarters")
        return "quarter";
      if (unit === "years")
        return "year";
      if (unit !== "second" && unit !== "minute" && unit !== "hour" && unit !== "day" && unit !== "week" && unit !== "month" && unit !== "quarter" && unit !== "year") {
        throw new RangeError("invalid unit");
      }
      return unit;
    }
    exports.SingularRelativeTimeUnit = SingularRelativeTimeUnit;
  }
});

// node_modules/@formatjs/intl-relativetimeformat/abstract/MakePartsList.js
var require_MakePartsList = __commonJS({
  "node_modules/@formatjs/intl-relativetimeformat/abstract/MakePartsList.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.MakePartsList = void 0;
    var ecma402_abstract_1 = (init_lib2(), __toCommonJS(lib_exports2));
    function MakePartsList(pattern, unit, parts) {
      var patternParts = (0, ecma402_abstract_1.PartitionPattern)(pattern);
      var result = [];
      for (var _i = 0, patternParts_1 = patternParts; _i < patternParts_1.length; _i++) {
        var patternPart = patternParts_1[_i];
        if (patternPart.type === "literal") {
          result.push({
            type: "literal",
            value: patternPart.value
          });
        } else {
          (0, ecma402_abstract_1.invariant)(patternPart.type === "0", "Malformed pattern ".concat(pattern));
          for (var _a = 0, parts_1 = parts; _a < parts_1.length; _a++) {
            var part = parts_1[_a];
            result.push({
              type: part.type,
              value: part.value,
              unit
            });
          }
        }
      }
      return result;
    }
    exports.MakePartsList = MakePartsList;
  }
});

// node_modules/@formatjs/intl-relativetimeformat/abstract/PartitionRelativeTimePattern.js
var require_PartitionRelativeTimePattern = __commonJS({
  "node_modules/@formatjs/intl-relativetimeformat/abstract/PartitionRelativeTimePattern.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.PartitionRelativeTimePattern = void 0;
    var ecma402_abstract_1 = (init_lib2(), __toCommonJS(lib_exports2));
    var SingularRelativeTimeUnit_1 = require_SingularRelativeTimeUnit();
    var MakePartsList_1 = require_MakePartsList();
    function PartitionRelativeTimePattern(rtf, value, unit, _a) {
      var getInternalSlots = _a.getInternalSlots;
      (0, ecma402_abstract_1.invariant)((0, ecma402_abstract_1.Type)(value) === "Number", "value must be number, instead got ".concat(typeof value), TypeError);
      (0, ecma402_abstract_1.invariant)((0, ecma402_abstract_1.Type)(unit) === "String", "unit must be number, instead got ".concat(typeof value), TypeError);
      if (isNaN(value) || !isFinite(value)) {
        throw new RangeError("Invalid value ".concat(value));
      }
      var resolvedUnit = (0, SingularRelativeTimeUnit_1.SingularRelativeTimeUnit)(unit);
      var _b = getInternalSlots(rtf), fields = _b.fields, style = _b.style, numeric = _b.numeric, pluralRules = _b.pluralRules, numberFormat = _b.numberFormat;
      var entry = resolvedUnit;
      if (style === "short") {
        entry = "".concat(resolvedUnit, "-short");
      } else if (style === "narrow") {
        entry = "".concat(resolvedUnit, "-narrow");
      }
      if (!(entry in fields)) {
        entry = resolvedUnit;
      }
      var patterns = fields[entry];
      if (numeric === "auto") {
        if ((0, ecma402_abstract_1.ToString)(value) in patterns) {
          return [
            {
              type: "literal",
              value: patterns[(0, ecma402_abstract_1.ToString)(value)]
            }
          ];
        }
      }
      var tl = "future";
      if ((0, ecma402_abstract_1.SameValue)(value, -0) || value < 0) {
        tl = "past";
      }
      var po = patterns[tl];
      var fv = typeof numberFormat.formatToParts === "function" ? numberFormat.formatToParts(Math.abs(value)) : (
        // TODO: If formatToParts is not supported, we assume the whole formatted
        // number is a part
        [
          {
            type: "literal",
            value: numberFormat.format(Math.abs(value)),
            unit
          }
        ]
      );
      var pr = pluralRules.select(value);
      var pattern = po[pr];
      return (0, MakePartsList_1.MakePartsList)(pattern, resolvedUnit, fv);
    }
    exports.PartitionRelativeTimePattern = PartitionRelativeTimePattern;
  }
});

// node_modules/@formatjs/intl-relativetimeformat/get_internal_slots.js
var require_get_internal_slots = __commonJS({
  "node_modules/@formatjs/intl-relativetimeformat/get_internal_slots.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var internalSlotMap = /* @__PURE__ */ new WeakMap();
    function getInternalSlots(x) {
      var internalSlots = internalSlotMap.get(x);
      if (!internalSlots) {
        internalSlots = /* @__PURE__ */ Object.create(null);
        internalSlotMap.set(x, internalSlots);
      }
      return internalSlots;
    }
    exports.default = getInternalSlots;
  }
});

// node_modules/@formatjs/intl-relativetimeformat/index.js
var require_intl_relativetimeformat = __commonJS({
  "node_modules/@formatjs/intl-relativetimeformat/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var ecma402_abstract_1 = (init_lib2(), __toCommonJS(lib_exports2));
    var InitializeRelativeTimeFormat_1 = require_InitializeRelativeTimeFormat();
    var PartitionRelativeTimePattern_1 = require_PartitionRelativeTimePattern();
    var get_internal_slots_1 = tslib_1.__importDefault(require_get_internal_slots());
    var RelativeTimeFormat = (
      /** @class */
      function() {
        function RelativeTimeFormat2(locales, options) {
          var newTarget = this && this instanceof RelativeTimeFormat2 ? this.constructor : void 0;
          if (!newTarget) {
            throw new TypeError("Intl.RelativeTimeFormat must be called with 'new'");
          }
          return (0, InitializeRelativeTimeFormat_1.InitializeRelativeTimeFormat)(this, locales, options, {
            getInternalSlots: get_internal_slots_1.default,
            availableLocales: RelativeTimeFormat2.availableLocales,
            relevantExtensionKeys: RelativeTimeFormat2.relevantExtensionKeys,
            localeData: RelativeTimeFormat2.localeData,
            getDefaultLocale: RelativeTimeFormat2.getDefaultLocale
          });
        }
        RelativeTimeFormat2.prototype.format = function(value, unit) {
          if (typeof this !== "object") {
            throw new TypeError("format was called on a non-object");
          }
          var internalSlots = (0, get_internal_slots_1.default)(this);
          if (!internalSlots.initializedRelativeTimeFormat) {
            throw new TypeError("format was called on a invalid context");
          }
          return (0, PartitionRelativeTimePattern_1.PartitionRelativeTimePattern)(this, Number(value), (0, ecma402_abstract_1.ToString)(unit), {
            getInternalSlots: get_internal_slots_1.default
          }).map(function(el) {
            return el.value;
          }).join("");
        };
        RelativeTimeFormat2.prototype.formatToParts = function(value, unit) {
          if (typeof this !== "object") {
            throw new TypeError("formatToParts was called on a non-object");
          }
          var internalSlots = (0, get_internal_slots_1.default)(this);
          if (!internalSlots.initializedRelativeTimeFormat) {
            throw new TypeError("formatToParts was called on a invalid context");
          }
          return (0, PartitionRelativeTimePattern_1.PartitionRelativeTimePattern)(this, Number(value), (0, ecma402_abstract_1.ToString)(unit), { getInternalSlots: get_internal_slots_1.default });
        };
        RelativeTimeFormat2.prototype.resolvedOptions = function() {
          if (typeof this !== "object") {
            throw new TypeError("resolvedOptions was called on a non-object");
          }
          var internalSlots = (0, get_internal_slots_1.default)(this);
          if (!internalSlots.initializedRelativeTimeFormat) {
            throw new TypeError("resolvedOptions was called on a invalid context");
          }
          return {
            locale: internalSlots.locale,
            style: internalSlots.style,
            numeric: internalSlots.numeric,
            numberingSystem: internalSlots.numberingSystem
          };
        };
        RelativeTimeFormat2.supportedLocalesOf = function(locales, options) {
          return (0, ecma402_abstract_1.SupportedLocales)(RelativeTimeFormat2.availableLocales, (0, ecma402_abstract_1.CanonicalizeLocaleList)(locales), options);
        };
        RelativeTimeFormat2.__addLocaleData = function() {
          var data = [];
          for (var _i = 0; _i < arguments.length; _i++) {
            data[_i] = arguments[_i];
          }
          for (var _a = 0, data_1 = data; _a < data_1.length; _a++) {
            var _b = data_1[_a], d = _b.data, locale = _b.locale;
            var minimizedLocale = new Intl.Locale(locale).minimize().toString();
            RelativeTimeFormat2.localeData[locale] = RelativeTimeFormat2.localeData[minimizedLocale] = d;
            RelativeTimeFormat2.availableLocales.add(minimizedLocale);
            RelativeTimeFormat2.availableLocales.add(locale);
            if (!RelativeTimeFormat2.__defaultLocale) {
              RelativeTimeFormat2.__defaultLocale = minimizedLocale;
            }
          }
        };
        RelativeTimeFormat2.getDefaultLocale = function() {
          return RelativeTimeFormat2.__defaultLocale;
        };
        RelativeTimeFormat2.localeData = {};
        RelativeTimeFormat2.availableLocales = /* @__PURE__ */ new Set();
        RelativeTimeFormat2.__defaultLocale = "";
        RelativeTimeFormat2.relevantExtensionKeys = ["nu"];
        RelativeTimeFormat2.polyfilled = true;
        return RelativeTimeFormat2;
      }()
    );
    exports.default = RelativeTimeFormat;
    try {
      if (typeof Symbol !== "undefined") {
        Object.defineProperty(RelativeTimeFormat.prototype, Symbol.toStringTag, {
          value: "Intl.RelativeTimeFormat",
          writable: false,
          enumerable: false,
          configurable: true
        });
      }
      Object.defineProperty(RelativeTimeFormat.prototype.constructor, "length", {
        value: 0,
        writable: false,
        enumerable: false,
        configurable: true
      });
      Object.defineProperty(RelativeTimeFormat.supportedLocalesOf, "length", {
        value: 1,
        writable: false,
        enumerable: false,
        configurable: true
      });
    } catch (e) {
    }
  }
});

// node_modules/@formatjs/intl-relativetimeformat/supported-locales.generated.js
var require_supported_locales_generated = __commonJS({
  "node_modules/@formatjs/intl-relativetimeformat/supported-locales.generated.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.supportedLocales = void 0;
    exports.supportedLocales = ["af", "af-NA", "agq", "ak", "am", "ar", "ar-AE", "ar-BH", "ar-DJ", "ar-DZ", "ar-EG", "ar-EH", "ar-ER", "ar-IL", "ar-IQ", "ar-JO", "ar-KM", "ar-KW", "ar-LB", "ar-LY", "ar-MA", "ar-MR", "ar-OM", "ar-PS", "ar-QA", "ar-SA", "ar-SD", "ar-SO", "ar-SS", "ar-SY", "ar-TD", "ar-TN", "ar-YE", "as", "asa", "ast", "az", "az-Cyrl", "az-Latn", "bas", "be", "be-tarask", "bem", "bez", "bg", "bm", "bn", "bn-IN", "bo", "bo-IN", "br", "brx", "bs", "bs-Cyrl", "bs-Latn", "ca", "ca-AD", "ca-ES-valencia", "ca-FR", "ca-IT", "ccp", "ccp-IN", "ce", "ceb", "cgg", "chr", "ckb", "ckb-IR", "cs", "cy", "da", "da-GL", "dav", "de", "de-AT", "de-BE", "de-CH", "de-IT", "de-LI", "de-LU", "dje", "doi", "dsb", "dua", "dyo", "dz", "ebu", "ee", "ee-TG", "el", "el-CY", "en", "en-001", "en-150", "en-AE", "en-AG", "en-AI", "en-AS", "en-AT", "en-AU", "en-BB", "en-BE", "en-BI", "en-BM", "en-BS", "en-BW", "en-BZ", "en-CA", "en-CC", "en-CH", "en-CK", "en-CM", "en-CX", "en-CY", "en-DE", "en-DG", "en-DK", "en-DM", "en-ER", "en-FI", "en-FJ", "en-FK", "en-FM", "en-GB", "en-GD", "en-GG", "en-GH", "en-GI", "en-GM", "en-GU", "en-GY", "en-HK", "en-IE", "en-IL", "en-IM", "en-IN", "en-IO", "en-JE", "en-JM", "en-KE", "en-KI", "en-KN", "en-KY", "en-LC", "en-LR", "en-LS", "en-MG", "en-MH", "en-MO", "en-MP", "en-MS", "en-MT", "en-MU", "en-MW", "en-MY", "en-NA", "en-NF", "en-NG", "en-NL", "en-NR", "en-NU", "en-NZ", "en-PG", "en-PH", "en-PK", "en-PN", "en-PR", "en-PW", "en-RW", "en-SB", "en-SC", "en-SD", "en-SE", "en-SG", "en-SH", "en-SI", "en-SL", "en-SS", "en-SX", "en-SZ", "en-TC", "en-TK", "en-TO", "en-TT", "en-TV", "en-TZ", "en-UG", "en-UM", "en-VC", "en-VG", "en-VI", "en-VU", "en-WS", "en-ZA", "en-ZM", "en-ZW", "eo", "es", "es-419", "es-AR", "es-BO", "es-BR", "es-BZ", "es-CL", "es-CO", "es-CR", "es-CU", "es-DO", "es-EA", "es-EC", "es-GQ", "es-GT", "es-HN", "es-IC", "es-MX", "es-NI", "es-PA", "es-PE", "es-PH", "es-PR", "es-PY", "es-SV", "es-US", "es-UY", "es-VE", "et", "eu", "ewo", "fa", "fa-AF", "ff", "ff-Adlm", "ff-Adlm-BF", "ff-Adlm-CM", "ff-Adlm-GH", "ff-Adlm-GM", "ff-Adlm-GW", "ff-Adlm-LR", "ff-Adlm-MR", "ff-Adlm-NE", "ff-Adlm-NG", "ff-Adlm-SL", "ff-Adlm-SN", "ff-Latn", "ff-Latn-BF", "ff-Latn-CM", "ff-Latn-GH", "ff-Latn-GM", "ff-Latn-GN", "ff-Latn-GW", "ff-Latn-LR", "ff-Latn-MR", "ff-Latn-NE", "ff-Latn-NG", "ff-Latn-SL", "fi", "fil", "fo", "fo-DK", "fr", "fr-BE", "fr-BF", "fr-BI", "fr-BJ", "fr-BL", "fr-CA", "fr-CD", "fr-CF", "fr-CG", "fr-CH", "fr-CI", "fr-CM", "fr-DJ", "fr-DZ", "fr-GA", "fr-GF", "fr-GN", "fr-GP", "fr-GQ", "fr-HT", "fr-KM", "fr-LU", "fr-MA", "fr-MC", "fr-MF", "fr-MG", "fr-ML", "fr-MQ", "fr-MR", "fr-MU", "fr-NC", "fr-NE", "fr-PF", "fr-PM", "fr-RE", "fr-RW", "fr-SC", "fr-SN", "fr-SY", "fr-TD", "fr-TG", "fr-TN", "fr-VU", "fr-WF", "fr-YT", "fur", "fy", "ga", "ga-GB", "gd", "gl", "gsw", "gsw-FR", "gsw-LI", "gu", "guz", "gv", "ha", "ha-GH", "ha-NE", "haw", "he", "hi", "hr", "hr-BA", "hsb", "hu", "hy", "ia", "id", "ig", "ii", "is", "it", "it-CH", "it-SM", "it-VA", "ja", "jgo", "jmc", "jv", "ka", "kab", "kam", "kde", "kea", "kgp", "khq", "ki", "kk", "kkj", "kl", "kln", "km", "kn", "ko", "ko-KP", "kok", "ks", "ks-Arab", "ksb", "ksf", "ksh", "ku", "kw", "ky", "lag", "lb", "lg", "lkt", "ln", "ln-AO", "ln-CF", "ln-CG", "lo", "lrc", "lrc-IQ", "lt", "lu", "luo", "luy", "lv", "mai", "mas", "mas-TZ", "mer", "mfe", "mg", "mgh", "mgo", "mi", "mk", "ml", "mn", "mni", "mni-Beng", "mr", "ms", "ms-BN", "ms-ID", "ms-SG", "mt", "mua", "my", "mzn", "naq", "nb", "nb-SJ", "nd", "nds", "nds-NL", "ne", "ne-IN", "nl", "nl-AW", "nl-BE", "nl-BQ", "nl-CW", "nl-SR", "nl-SX", "nmg", "nn", "nnh", "no", "nus", "nyn", "om", "om-KE", "or", "os", "os-RU", "pa", "pa-Arab", "pa-Guru", "pcm", "pl", "ps", "ps-PK", "pt", "pt-AO", "pt-CH", "pt-CV", "pt-GQ", "pt-GW", "pt-LU", "pt-MO", "pt-MZ", "pt-PT", "pt-ST", "pt-TL", "qu", "qu-BO", "qu-EC", "rm", "rn", "ro", "ro-MD", "rof", "ru", "ru-BY", "ru-KG", "ru-KZ", "ru-MD", "ru-UA", "rw", "rwk", "sa", "sah", "saq", "sat", "sat-Olck", "sbp", "sc", "sd", "sd-Arab", "sd-Deva", "se", "se-FI", "se-SE", "seh", "ses", "sg", "shi", "shi-Latn", "shi-Tfng", "si", "sk", "sl", "smn", "sn", "so", "so-DJ", "so-ET", "so-KE", "sq", "sq-MK", "sq-XK", "sr", "sr-Cyrl", "sr-Cyrl-BA", "sr-Cyrl-ME", "sr-Cyrl-XK", "sr-Latn", "sr-Latn-BA", "sr-Latn-ME", "sr-Latn-XK", "su", "su-Latn", "sv", "sv-AX", "sv-FI", "sw", "sw-CD", "sw-KE", "sw-UG", "ta", "ta-LK", "ta-MY", "ta-SG", "te", "teo", "teo-KE", "tg", "th", "ti", "ti-ER", "tk", "to", "tr", "tr-CY", "tt", "twq", "tzm", "ug", "uk", "und", "ur", "ur-IN", "uz", "uz-Arab", "uz-Cyrl", "uz-Latn", "vai", "vai-Latn", "vai-Vaii", "vi", "vun", "wae", "wo", "xh", "xog", "yav", "yi", "yo", "yo-BJ", "yrl", "yrl-CO", "yrl-VE", "yue", "yue-Hans", "yue-Hant", "zgh", "zh", "zh-Hans", "zh-Hans-HK", "zh-Hans-MO", "zh-Hans-SG", "zh-Hant", "zh-Hant-HK", "zh-Hant-MO", "zu"];
  }
});

// node_modules/@formatjs/intl-relativetimeformat/should-polyfill.js
var require_should_polyfill = __commonJS({
  "node_modules/@formatjs/intl-relativetimeformat/should-polyfill.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.shouldPolyfill = void 0;
    var intl_localematcher_1 = (init_lib(), __toCommonJS(lib_exports));
    var supported_locales_generated_1 = require_supported_locales_generated();
    function supportedLocalesOf(locale) {
      if (!locale) {
        return true;
      }
      var locales = Array.isArray(locale) ? locale : [locale];
      return Intl.RelativeTimeFormat.supportedLocalesOf(locales).length === locales.length;
    }
    function hasResolvedOptionsNumberingSystem(locale) {
      try {
        return "numberingSystem" in new Intl.RelativeTimeFormat(locale || "en", {
          numeric: "auto"
        }).resolvedOptions();
      } catch (_) {
        return false;
      }
    }
    function shouldPolyfill(locale) {
      if (locale === void 0) {
        locale = "en";
      }
      if (!("RelativeTimeFormat" in Intl) || !supportedLocalesOf(locale) || !hasResolvedOptionsNumberingSystem(locale)) {
        return (0, intl_localematcher_1.match)([locale], supported_locales_generated_1.supportedLocales, "en");
      }
    }
    exports.shouldPolyfill = shouldPolyfill;
  }
});

// node_modules/@formatjs/intl-relativetimeformat/polyfill.js
var require_polyfill = __commonJS({
  "node_modules/@formatjs/intl-relativetimeformat/polyfill.js"(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    var tslib_1 = (init_tslib_es6(), __toCommonJS(tslib_es6_exports));
    var _1 = tslib_1.__importDefault(require_intl_relativetimeformat());
    var should_polyfill_1 = require_should_polyfill();
    if ((0, should_polyfill_1.shouldPolyfill)()) {
      Object.defineProperty(Intl, "RelativeTimeFormat", {
        value: _1.default,
        writable: true,
        enumerable: false,
        configurable: true
      });
    }
  }
});
export default require_polyfill();
//# sourceMappingURL=@formatjs_intl-relativetimeformat_polyfill.js.map
