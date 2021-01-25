"use strict";
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
exports.getActivities = void 0;
var compareAsc_1 = __importDefault(require("date-fns/compareAsc"));
var Sleep_1 = __importDefault(require("../utils/Sleep"));
var getActivities = function (_a) {
    var cache = _a.cache, pluginOptions = _a.pluginOptions, reporter = _a.reporter, GCClient = _a.GCClient;
    return __awaiter(void 0, void 0, void 0, function () {
        var activities_1, cachedActivitiesIds, startDate_1, lastFetch, lastFetchDate, limit, start, loadedActivities, validActivities, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 9, , 10]);
                    activities_1 = [];
                    return [4 /*yield*/, cache.get("GarminActivities")];
                case 1:
                    cachedActivitiesIds = (_b.sent()) || [];
                    if (cachedActivitiesIds.length > 0) {
                        cachedActivitiesIds.forEach(function (activityId) { return __awaiter(void 0, void 0, void 0, function () {
                            var cachedActivity;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, cache.get("GarminActivity" + activityId)];
                                    case 1:
                                        cachedActivity = _a.sent();
                                        activities_1.push(cachedActivity);
                                        return [2 /*return*/];
                                }
                            });
                        }); });
                        if (pluginOptions.debug) {
                            reporter.success("source-garmin: " + cachedActivitiesIds.length + " activities restored from cache");
                        }
                    }
                    startDate_1 = new Date(pluginOptions.startDate);
                    return [4 /*yield*/, cache.get("GarminActivitiesLastFetch")];
                case 2:
                    lastFetch = _b.sent();
                    if (lastFetch !== undefined) {
                        lastFetchDate = new Date(lastFetch);
                        // start date before last fetch date
                        if (compareAsc_1.default(startDate_1, lastFetchDate) === -1) {
                            startDate_1 = lastFetchDate;
                        }
                    }
                    limit = 20;
                    start = 0;
                    if (pluginOptions.debug) {
                        reporter.info("source-garmin: Fetching activities since " + startDate_1.toLocaleString());
                    }
                    _b.label = 3;
                case 3:
                    if (!true) return [3 /*break*/, 6];
                    return [4 /*yield*/, GCClient.getActivities(start, limit)];
                case 4:
                    loadedActivities = _b.sent();
                    validActivities = loadedActivities.filter(function (a) {
                        compareAsc_1.default(startDate_1, new Date(a.beginTimestamp)) !== 1;
                    });
                    if (validActivities.length === 0) {
                        // past the start date or no remaining activities
                        return [3 /*break*/, 6];
                    }
                    // add all the activities to the cache
                    validActivities.forEach(function (a) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, cache.set("GarminActivity" + a.id, a)];
                            case 1: return [2 /*return*/, _a.sent()];
                        }
                    }); }); });
                    if (pluginOptions.debug) {
                        reporter.success("source-garmin: " + validActivities.length + " activities loaded from garmin");
                    }
                    activities_1.push.apply(activities_1, validActivities);
                    start += limit;
                    return [4 /*yield*/, Sleep_1.default(2000)];
                case 5:
                    _b.sent();
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, cache.set("GarminActivities", activities_1.map(function (a) { return a.id; }))];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, cache.set("GarminActivitiesLastFetch", Date.now())];
                case 8:
                    _b.sent();
                    return [2 /*return*/, activities_1];
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
exports.getActivities = getActivities;
//# sourceMappingURL=getActivities.js.map