"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatHrId = exports.getHeartRate = void 0;
var addDays_1 = __importDefault(require("date-fns/addDays"));
var compareAsc_1 = __importDefault(require("date-fns/compareAsc"));
var format_1 = __importDefault(require("date-fns/format"));
var getHeartRate = function (_a) {
    var cache = _a.cache, pluginOptions = _a.pluginOptions, reporter = _a.reporter, GCClient = _a.GCClient;
    return __awaiter(void 0, void 0, void 0, function () {
        var heartRate_1, cacheHrIds, startDate, lastFetch, lastFetchDate, end, current, loadedHeartRate, storedSteps, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 10]);
                    heartRate_1 = [];
                    return [4 /*yield*/, cache.get("GarminHrs")];
                case 1:
                    cacheHrIds = (_b.sent()) || [];
                    if (cacheHrIds.length > 0) {
                        cacheHrIds.forEach(function (hrId) { return __awaiter(void 0, void 0, void 0, function () {
                            var cachedHr;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, cache.get(hrId)];
                                    case 1:
                                        cachedHr = _a.sent();
                                        cachedHr.date = new Date(cachedHr.date);
                                        heartRate_1.push(cachedHr);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        if (pluginOptions.debug) {
                            reporter.info("source-garmin: " + cacheHrIds.length + " heart rates restored from cache");
                        }
                    }
                    startDate = new Date(pluginOptions.startDate);
                    return [4 /*yield*/, cache.get("GarminHrsLastFetch")];
                case 2:
                    lastFetch = _b.sent();
                    if (lastFetch !== undefined) {
                        lastFetchDate = new Date(lastFetch);
                        // start date before last fetch date
                        if (compareAsc_1.default(startDate, lastFetchDate) === -1) {
                            startDate = lastFetchDate;
                        }
                    }
                    if (pluginOptions.debug) {
                        reporter.info("source-garmin: Fetching heart rates since " +
                            startDate.toLocaleString());
                    }
                    end = addDays_1.default(new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()), -1);
                    current = new Date(end.getTime());
                    _b.label = 3;
                case 3:
                    if (!(compareAsc_1.default(startDate, current) !== 1)) return [3 /*break*/, 6];
                    return [4 /*yield*/, GCClient.getHeartRate(current)];
                case 4:
                    loadedHeartRate = _b.sent();
                    if (pluginOptions.debug) {
                        reporter.info("source-garmin: Loaded heart rates for " + formatHrDate(current));
                    }
                    storedSteps = {
                        date: current,
                        data: loadedHeartRate,
                    };
                    return [4 /*yield*/, cache.set(formatHrId(current), __assign(__assign({}, storedSteps), { date: storedSteps.date.getTime() }))];
                case 5:
                    _b.sent();
                    heartRate_1.push(storedSteps);
                    current = addDays_1.default(current, -1);
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, cache.set("GarminHrs", heartRate_1.map(function (step) { return formatHrId(step.date); }))];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, cache.set("GarminHrsLastFetch", Date.now())];
                case 8:
                    _b.sent();
                    return [2 /*return*/, heartRate_1];
                case 9:
                    e_1 = _b.sent();
                    if (pluginOptions.debug) {
                        reporter.panic("source-garmin: ", e_1);
                    }
                    else {
                        reporter.panic("source-garmin: " + e_1.message);
                    }
                    return [2 /*return*/, []];
                case 10: return [2 /*return*/];
            }
        });
    });
};
exports.getHeartRate = getHeartRate;
function formatHrId(date) {
    return "GarminHeartRates" + formatHrDate(date);
}
exports.formatHrId = formatHrId;
function formatHrDate(date) {
    return format_1.default(date, "yyyy-MM-dd");
}
//# sourceMappingURL=getHeartRate.js.map