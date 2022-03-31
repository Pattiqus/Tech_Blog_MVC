"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classImporter = void 0;
// # Import: NodeJS Packages
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function classImporter(rel__dirname) {
    return __awaiter(this, void 0, void 0, function* () {
        const importer = (from) => __awaiter(this, void 0, void 0, function* () {
            const imported = {};
            const joinPath = function (...args) {
                return '.' + path_1.default.sep + path_1.default.join(...args);
            };
            const fsPath = path_1.default.join(process.cwd() + path_1.default.sep + rel__dirname);
            return yield new Promise(resolve => {
                fs_1.default.readdirSync(fsPath).forEach((name) => __awaiter(this, void 0, void 0, function* () {
                    const info = fs_1.default.statSync(path_1.default.join(fsPath, name));
                    if (info.isDirectory()) {
                        imported[name] = importer(joinPath(from, name));
                    }
                    else {
                        // only import files that we can `require`
                        const ext = path_1.default.extname(name);
                        const base = path_1.default.basename(name, ext);
                        if (require.extensions[ext]) {
                            // const importedClass = <any>require(path.join(fsPath, name))
                            // imported[base] = new importedClass();
                            // eslint-disable-next-line @typescript-eslint/no-var-requires
                            // imported[base] = await import(path.join(fsPath, name));
                            const requireFile = (() => __awaiter(this, void 0, void 0, function* () {
                                const fileName = path_1.default.join(fsPath, name);
                                const file = yield Promise.resolve().then(() => __importStar(require(fileName)));
                                return file;
                            }))().then(classFile => {
                                const classInstance = new classFile[base]();
                                return classInstance;
                            })
                                .catch(error => {
                                // Handle/report error
                                console.error(error);
                            });
                            imported[base] = yield requireFile;
                            console.log("🟠🟠🟠", imported[base]);
                            // imported[base] = new imported[base];
                        }
                        else {
                            console.log('cannot require ', ext);
                        }
                    }
                }));
                resolve(true);
            }).then(() => {
                console.log('🔥🔥', imported);
                return imported;
            });
        });
        return yield importer(rel__dirname);
    });
}
exports.classImporter = classImporter;
;
