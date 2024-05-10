import { autonomousMiner } from "./autonomousMiner";
import { factoryBreaker } from "./factory/breaker";
import { factoryComputer } from "./factory/computer";
import { factoryPlacer } from "./factory/placer";
import { factoryTurtle } from "./factory/turtle";
import { updateStartup } from "./updateStartup";
import { playerKillSwitch } from "./playerKillSwitch";

export abstract class Program {
    abstract name: string;
    abstract start(params?: Object): void;
}

export const programs: {[name: string]: Program} = {
  autonomousMiner,
  factoryBreaker,
  factoryComputer,
  factoryPlacer,
  factoryTurtle,
  updateStartup,
  playerKillSwitch,
}