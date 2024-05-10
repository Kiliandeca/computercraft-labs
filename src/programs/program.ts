import { autonomousMiner } from "./autonomousMiner";
import { factoryBreaker } from "./factory/breaker";
import { factoryComputer } from "./factory/computer";
import { factoryPlacer } from "./factory/placer";
import { factoryTurtle } from "./factory/turtle";
import { updateStartup } from "./updateStartup";

export abstract class Program {
    static name: string;

    abstract start(params?: Object): void;
    abstract resume?(): void;
}

export const programs: {[name: string]: Program} = {
  autonomousMiner,
  factoryBreaker,
  factoryComputer,
  factoryPlacer,
  factoryTurtle,
  updateStartup,
}