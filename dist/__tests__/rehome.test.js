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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const model_1 = require("../digipet/model");
const server_1 = __importDefault(require("../server"));
describe("When a user rehomes a digipet, they can now hatch another one", () => {
    beforeAll(() => {
        // setup: give an initial digipet
        const startingDigipet = {
            happiness: 75,
            nutrition: 80,
            discipline: 60,
        };
        model_1.setDigipet(startingDigipet);
    });
    test("GET /digipet informs them that they have a digipet with expected stats", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(server_1.default).get("/digipet");
        expect(response.body.message).toMatch(/your digipet/i);
    }));
    test("1st GET /digipet/rehome informs them they have rehomed the digipet", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(server_1.default).get("/digipet/rehome");
        expect(response.body.message).toMatch(/rehome/i);
    }));
    test("2nd GET /digipet shows they don't have a digipet stats change", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(server_1.default).get("/digipet");
        expect(response.body.message).toMatch(/hatch/i);
    }));
    test("3rd GET /digipet/hatch shows you can hatch a digipet", () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield supertest_1.default(server_1.default).get("/digipet/hatch");
        expect(response.body.message).toMatch(/success/i);
        expect(response.body.message).toMatch(/hatch/i);
        expect(response.body.digipet).toHaveProperty("happiness", model_1.INITIAL_DIGIPET.happiness);
        expect(response.body.digipet).toHaveProperty("nutrition", model_1.INITIAL_DIGIPET.nutrition);
        expect(response.body.digipet).toHaveProperty("discipline", model_1.INITIAL_DIGIPET.discipline);
    }));
});
