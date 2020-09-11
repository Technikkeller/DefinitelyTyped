import express from "express";
import HydraExpress from "hydra-express";
import {IHydra} from "hydra";

HydraExpress.init("", "", () => {}, () => {});

HydraExpress.shutdown();

const app: typeof express = HydraExpress.getExpress();
const hydra: IHydra = HydraExpress.getHydra();
const conf: {[key: string]: unknown} = HydraExpress.getRuntimeConfig();

HydraExpress.log("info", "");
HydraExpress.registerRoutes({"": express.Router()});

HydraExpress.sendResponse(200, {"y": "x"}, {"x": "y"});