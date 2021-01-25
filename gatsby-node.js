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
exports.sourceNodes = exports.pluginOptionsSchema = void 0;
var garmin_connect_1 = require("garmin-connect");
var getActivities_1 = require("./garmin/getActivities");
var getSteps_1 = require("./garmin/getSteps");
var Endpoints_1 = __importDefault(require("./utils/Endpoints"));
var GarminPluginOptions_1 = require("./utils/GarminPluginOptions");
var pluginOptionsSchema = function (_a) {
    var _b;
    var Joi = _a.Joi;
    return Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required(),
        startDate: Joi.number().required(),
        endpoints: Joi.array().items((_b = Joi.string()).valid.apply(_b, Endpoints_1.default.values)),
        debug: Joi.boolean(),
    });
};
exports.pluginOptionsSchema = pluginOptionsSchema;
var sourceNodes = function (_a, pluginOptions) {
    var actions = _a.actions, createNodeId = _a.createNodeId, createContentDigest = _a.createContentDigest, reporter = _a.reporter, cache = _a.cache;
    return __awaiter(void 0, void 0, void 0, function () {
        var GCClient, activities, steps, e_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    GCClient = new garmin_connect_1.GarminConnect();
                    pluginOptions = __assign(__assign({}, GarminPluginOptions_1.defaultGarminPluginOptions), pluginOptions);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 7, , 8]);
                    return [4 /*yield*/, GCClient.login(pluginOptions.email, pluginOptions.password)];
                case 2:
                    _b.sent();
                    if (!(pluginOptions.endpoints.indexOf("Activities") !== -1)) return [3 /*break*/, 4];
                    return [4 /*yield*/, getActivities_1.getActivities({
                            cache: cache,
                            pluginOptions: pluginOptions,
                            reporter: reporter,
                            GCClient: GCClient,
                        })];
                case 3:
                    activities = _b.sent();
                    if (activities && activities.length > 0) {
                        activities.forEach(function (activity) {
                            actions.createNode({
                                data: activity,
                                id: createNodeId("GarminActivity" + activity.activityId),
                                internal: {
                                    type: "GarminActivity",
                                    contentDigest: createContentDigest(activity),
                                },
                            }, {
                                name: "gatsby-source-garmin",
                            });
                        });
                        reporter.success("source-garmin: " + activities.length + " activities fetched");
                    }
                    _b.label = 4;
                case 4:
                    if (!(pluginOptions.endpoints.indexOf("Steps") !== -1)) return [3 /*break*/, 6];
                    return [4 /*yield*/, getSteps_1.getSteps({
                            cache: cache,
                            pluginOptions: pluginOptions,
                            reporter: reporter,
                            GCClient: GCClient,
                        })];
                case 5:
                    steps = _b.sent();
                    if (steps && steps.length > 0) {
                        steps.forEach(function (step) {
                            actions.createNode({
                                data: step,
                                id: createNodeId("GarminSteps" + step.date),
                                internal: {
                                    type: "GarminSteps",
                                    contentDigest: createContentDigest(step),
                                },
                            }, {
                                name: "gatsby-source-garmin",
                            });
                        });
                        reporter.success("source-garmin: " + steps.length + " days of steps fetched");
                    }
                    _b.label = 6;
                case 6: return [3 /*break*/, 8];
                case 7:
                    e_1 = _b.sent();
                    if (pluginOptions.debug) {
                        reporter.panic("source-garmin: ", e_1);
                    }
                    else {
                        reporter.panic("source-garmin: " + e_1.message);
                    }
                    return [3 /*break*/, 8];
                case 8: return [2 /*return*/];
            }
        });
    });
};
exports.sourceNodes = sourceNodes;
//# sourceMappingURL=gatsby-node.js.map