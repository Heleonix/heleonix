import { ErrorHandler } from "./errors/ErrorHandler";
import { ControlDefinitionProvider } from "./controls/ControlDefinitionProvider";
import { DictionaryDefinitionProvider } from "./dictionaries/DictionaryDefinitionProvider";
import { StyleDefinitionProvider } from "./styles/StyleDefinitionProvider";
import { ThemeDefinitionProvider } from "./themes/ThemeDefinitionProvider";
import { DIContainer } from "./injection/DIContainer";
import { Rule } from "./injection/Rule";
import { Component } from "./Component";
import { ControlManager } from "./controls/ControlManager";
import { ControlEngine } from "./controls/ControlEngine";
import { Control } from "./controls/Control";
import { ContextManager } from "./context/ContextManager";
import { Injectable } from "./injection/Injectable";
import { Symbols } from "./Symbols";
import { NoRootElementError } from "./errors/NoRootElementError";
import { DomControl } from "./controls/DomControl";
import { DefinitiveControl } from "./controls/DefinitiveControl";
import { Children } from "./controls/Children";
import { SettingsDefinitionProvider } from "./settings/SettingsDefinitionProvider";
import { inject } from "./injection/inject";
import { ApplicationLifecycleError } from "./errors/ApplicationLifecycleError";
import { ApplicationLifecycleStage } from "./errors/ApplicationLifecycleStage";

export abstract class Application extends Injectable {
    private readonly [Symbols.Application_DIContainer]: DIContainer;

    private [Symbols.Application_rootControl]: Control | undefined;

    public constructor() {
        const diContainer = new DIContainer();

        super(diContainer.injector);

        this[Symbols.Application_DIContainer] = diContainer;
    }

    public get rootSelector(): string {
        return "body";
    }

    public get errorHandler(): typeof ErrorHandler {
        return ErrorHandler;
    }

    public abstract get controlDefinitionProvider(): typeof ControlDefinitionProvider;

    //public abstract get dictionaryDefinitionProvider(): typeof DictionaryDefinitionProvider;

    //public abstract get styleDefinitionProvider(): typeof StyleDefinitionProvider;

    //public abstract get themeDefinitionProvider(): typeof ThemeDefinitionProvider;

    //public abstract get settingsDefinitionProvider(): typeof SettingsDefinitionProvider;

    //public abstract get tasks(): { [index: string]: typeof Task };

    //public abstract get converters(): { [index: string]: typeof Converter };

    //public abstract get services(): { [index: string]: typeof Service };

    public start(): void {
        try {
            const rootElement = document.querySelector<HTMLElement>(this.rootSelector);

            if (!rootElement) {
                throw new NoRootElementError(this.rootSelector);
            }

            this[Symbols.Application_DIContainer].init(
                {
                    //...this.tasks,
                    //...this.converters,
                    //...this.services,
                    [Symbols.ErrorHandler]: this.errorHandler,
                    [Symbols.ControlManager]: ControlManager,
                    [DomControl.name]: DomControl,
                    [DefinitiveControl.name]: DefinitiveControl,
                    [Children.name]: Children,
                    [ContextManager.name]: ContextManager,
                    [ControlEngine.name]: ControlEngine,
                    [ControlDefinitionProvider.name]: this.controlDefinitionProvider,
                    //[DictionaryDefinitionProvider.name]: this.dictionaryDefinitionProvider,
                    //[StyleDefinitionProvider.name]: this.styleDefinitionProvider,
                    //[ThemeDefinitionProvider.name]: this.themeDefinitionProvider,
                    //[SettingsDefinitionProvider.name]: this.settingsDefinitionProvider,
                },
                [
                    new Rule(ErrorHandler, true, [Component]),

                    //new Rule(ContextManager, true, [DictionaryManager, StyleManager, ThemeManager]),

                    new Rule(ControlDefinitionProvider, true, [ControlManager]),
                    //new Rule(DictionaryDefinitionProvider, true, [DictionaryManager]),
                    //new Rule(StyleDefinitionProvider, true, [StyleManager]),
                    //new Rule(ThemeDefinitionProvider, true, [ThemeManager]),

                    new Rule(ControlManager, true, [ControlEngine]),

                    new Rule(ControlEngine, true, [Application, Control]),

                    new Rule(Control, false, [ControlManager]),
                ],
            );

            const controlEngine = this[Symbols.Application_DIContainer].inject<ControlEngine>(ControlEngine.name, this);

            this[Symbols.Application_rootControl] = controlEngine.buildItem(
                { tag: this.constructor.name, name: this.constructor.name, properties: [], children: [] },
                undefined,
                rootElement,
            );

            if (!this[Symbols.Application_rootControl]) {
                throw
            }
        } catch (e) {
            throw new ApplicationLifecycleError(ApplicationLifecycleStage.Start, e);
        }
    }

    public stop(): void {
        try {
            const rootControl = this[Symbols.Application_rootControl];

            if (!rootControl) {
                return;
            }

            const controlEngine = this[Symbols.Application_DIContainer].inject<ControlEngine>(ControlEngine.name, this);

            controlEngine.destroy(rootControl);

            this[Symbols.Application_rootControl] = undefined;
        } catch (e) {
            throw new ApplicationLifecycleError(ApplicationLifecycleStage.Stop, e);
        }
    }
}
