import { Application, ControlDefinitionProvider, IControlDefinition } from "@heleonix/core";

import { Cls } from "@heleonix/controls";

class MyControlDefinitionProvider extends ControlDefinitionProvider {
    public getDefinition(tag: string): IControlDefinition {
        if (tag === "MyApplication") {
            return {
                tag: tag,
                items: [
                    {
                        tag: "Panel",
                        name: "pnl",
                        children: [{ tag: "User", name: "user" }],
                    },
                ],
            };
        }

        if (tag === "Panel") {
            return {
                tag: tag,
                items: [
                    {
                        tag: "div",
                        name: "d",
                        children: [{ tag: "Children", name: "children" }],
                    },
                ],
            };
        }

        if (tag === "User") {
            return {
                tag: tag,
                items: [
                    {
                        tag: "Panel",
                        name: "p",
                        children: [
                            { tag: "Input", name: "user" },
                            { tag: "Input", name: "pass" },
                        ],
                    },
                ],
            };
        }

        if (tag === "Input") {
            return {
                tag: tag,
                items: [
                    {
                        tag: "input",
                        name: "i",
                    },
                ],
            };
        }

        throw "NO SUCH CONTROL";
    }
}

class MyApplication extends Application {
    public constructor() {
        super();
    }

    public get controlDefinitionProvider() {
        return MyControlDefinitionProvider;
    }
}

const app = new MyApplication();

app.run();
