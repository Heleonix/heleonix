import { ErrorHandler } from "./errors/ErrorHandler";
import { ControlDefinitionProvider } from "./controls/ControlDefinitionProvider";
import { DictionaryDefinitionProvider } from "./dictionaries/DictionaryDefinitionProvider";
import { StyleDefinitionProvider } from "./styles/StyleDefinitionProvider";
import { ThemeDefinitionProvider } from "./themes/ThemeDefinitionProvider";
import { DIContainer } from "./injection/DIContainer";
import { Rule } from "./injection/Rule";
import { Component } from "./Component";
import { ControlManager } from "./controls/ControlManager";
import { CannotRunApplicationError } from "./errors/CannotRunApplicationError";
import { ControlEngine } from "./controls/ControlEngine";
import { Control } from "./controls/Control";
import { ContextManager } from "./context/ContextManager";
import { Injectable } from "./injection/Injectable";
import { Symbols } from "./Symbols";
import { HeleonixError } from "./errors/HeleonixError";
import { NoRootElementError } from "./errors/NoRootElementError";
import { DomElement } from "./controls/DomElement";
import { UIControl } from "./controls/UIControl";
import { Children } from "./controls/Children";
import { SettingsDefinitionProvider } from "./settings/SettingsDefinitionProvider";

export abstract class Application extends Injectable {
    public constructor() {
        super(null);
    }

    public get root(): string {
        return "html";
    }

    public get errorHandler(): typeof ErrorHandler {
        return ErrorHandler;
    }

    public abstract get controlDefinitionProvider(): typeof ControlDefinitionProvider;

    public abstract get dictionaryDefinitionProvider(): typeof DictionaryDefinitionProvider;

    public abstract get styleDefinitionProvider(): typeof StyleDefinitionProvider;

    public abstract get themeDefinitionProvider(): typeof ThemeDefinitionProvider;

    public abstract get settingsDefinitionProvider(): typeof SettingsDefinitionProvider;

    public abstract get tasks(): { [index: string]: typeof Task };

    public abstract get converters(): { [index: string]: typeof Converter };

    public abstract get services(): { [index: string]: typeof Service };

    public run(): void {
        try {
            const rootElement = document.querySelector<HTMLElement>(this.root);

            if (!rootElement) {
                throw new NoRootElementError();
            }

            const diContainer = new DIContainer(
                {
                    ...this.tasks,
                    ...this.converters,
                    ...this.services,
                    [Symbols.ErrorHandler]: this.errorHandler,
                    [Symbols.ControlManager]: ControlManager,
                    DomElement: DomElement,
                    UIControl: UIControl,
                    Children: Children,
                    ContextManager: ContextManager,
                    ControlEngine: ControlEngine,
                    ControlDefinitionProvider: this.controlDefinitionProvider,
                    DictionaryDefinitionProvider: this.dictionaryDefinitionProvider,
                    StyleDefinitionProvider: this.styleDefinitionProvider,
                    ThemeDefinitionProvider: this.themeDefinitionProvider,
                    SettingsDefinitionProvider: this.settingsDefinitionProvider,
                },
                [
                    new Rule(ErrorHandler, true, [Component]),

                    new Rule(ContextManager, true, [DictionaryManager, StyleManager, ThemeManager]),

                    new Rule(ControlDefinitionProvider, true, [ControlManager]),
                    new Rule(DictionaryDefinitionProvider, true, [DictionaryManager]),
                    new Rule(StyleDefinitionProvider, true, [StyleManager]),
                    new Rule(ThemeDefinitionProvider, true, [ThemeManager]),

                    new Rule(ControlManager, true, [ControlEngine]),

                    new Rule(ControlEngine, true, [Application, Control]),

                    new Rule(Control, false, [ControlManager]),
                ],
            );

            diContainer.init(this);

            const controlEngine = diContainer.inject<ControlEngine>(ControlEngine.name, this);

            controlEngine.buildItem(
                { control: this.constructor.name, name: this.constructor.name, data: [], children: [] },
                null,
                rootElement,
            );
        } catch (e) {
            throw new CannotRunApplicationError(e);
        }
    }
}
