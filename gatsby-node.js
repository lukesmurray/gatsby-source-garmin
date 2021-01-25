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
exports.createPages = exports.createSchemaCustomization = void 0;
var promises_1 = __importDefault(require("fs/promises"));
var garmin_connect_1 = require("garmin-connect");
var createSchemaCustomization = function () {
    return Promise.resolve();
};
exports.createSchemaCustomization = createSchemaCustomization;
var createPages = function () { return __awaiter(void 0, void 0, void 0, function () {
    function writeJson(name, data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promises_1.default.writeFile("responses/" + name + ".json", JSON.stringify(data, null, 2))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    }
    var GCClient, userInfo, socialProfile, socialConnections, deviceInfo, activities, activity, newsFeed, steps, hr, sleep, sleepData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                GCClient = new garmin_connect_1.GarminConnect();
                return [4 /*yield*/, GCClient.login()];
            case 1:
                _a.sent();
                return [4 /*yield*/, GCClient.getUserInfo()];
            case 2:
                userInfo = _a.sent();
                return [4 /*yield*/, writeJson("userInfo", userInfo)];
            case 3:
                _a.sent();
                return [4 /*yield*/, GCClient.getSocialProfile()];
            case 4:
                socialProfile = _a.sent();
                return [4 /*yield*/, writeJson("socialProfile", socialProfile)];
            case 5:
                _a.sent();
                return [4 /*yield*/, GCClient.getSocialConnections()];
            case 6:
                socialConnections = _a.sent();
                return [4 /*yield*/, writeJson("socialConnections", socialConnections)];
            case 7:
                _a.sent();
                return [4 /*yield*/, GCClient.getDeviceInfo()];
            case 8:
                deviceInfo = _a.sent();
                return [4 /*yield*/, writeJson("deviceInfo", deviceInfo)];
            case 9:
                _a.sent();
                return [4 /*yield*/, GCClient.getActivities(0, 10)];
            case 10:
                activities = _a.sent();
                return [4 /*yield*/, writeJson("activities", activities)];
            case 11:
                _a.sent();
                return [4 /*yield*/, GCClient.getActivity(activities[0])];
            case 12:
                activity = _a.sent();
                return [4 /*yield*/, writeJson("activity", activity)];
            case 13:
                _a.sent();
                return [4 /*yield*/, GCClient.getNewsFeed(0, 10)];
            case 14:
                newsFeed = _a.sent();
                return [4 /*yield*/, writeJson("newsFeed", newsFeed)];
            case 15:
                _a.sent();
                return [4 /*yield*/, GCClient.getSteps()];
            case 16:
                steps = _a.sent();
                return [4 /*yield*/, writeJson("steps", steps)];
            case 17:
                _a.sent();
                return [4 /*yield*/, GCClient.getHeartRate()];
            case 18:
                hr = _a.sent();
                return [4 /*yield*/, writeJson("heartRate", hr)];
            case 19:
                _a.sent();
                return [4 /*yield*/, GCClient.getSleep()];
            case 20:
                sleep = _a.sent();
                return [4 /*yield*/, writeJson("sleep", sleep)];
            case 21:
                _a.sent();
                return [4 /*yield*/, GCClient.getSleepData()];
            case 22:
                sleepData = _a.sent();
                return [4 /*yield*/, writeJson("sleepData", sleepData)];
            case 23:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.createPages = createPages;
//# sourceMappingURL=gatsby-node.js.map