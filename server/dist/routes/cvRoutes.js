"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cvController_1 = require("../controllers/cvController");
const router = (0, express_1.Router)();
router.get("/download", cvController_1.downloadCv);
exports.default = router;
