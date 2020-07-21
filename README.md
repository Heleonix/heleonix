# Heleonix

Flexible declarative framework for web sites and web applications.

## Install

## TODO

### IMPLEMENT

    - @heleonix/testing wrapped mocks, auto deep mocks, auto shallow mocks, manual mocks
        ○ @heleonix/testing-jasmine
        ○ @heleonix/testing-jest
    - Store full path to each view being rendered in the presenter and pass it to an exception if any
    - Review all implementation and implement validation functions which throw exceptions for all components and all cases
    - Use Object.is to compare values in setters of data, property, state decorators

### CONTEXT

Context is an object with string values, which splits resources of applications:

```javascript
{
    env: 'dev',
    brand: 'brand1',
    culture: 'uk-UK'
}
```

In webpack plugins context is specified as below:

```javascript
[
    // Least specific
    {
        name: "env",
        values: ["dev", "test", "prod"],
    },
    {
        name: "brand",
        values: ["brand1", "brand2", "brand3"],
    },
    {
        name: "culture",
        values: ["en-US", "uk-UK"],
    },
    // MOst specific
];
```

Context-specific files are named in format:

MyFile.ext
MyFile.uk-UK.brand1.dev.ext
MyFile.uk-UK.ext
MyFile.dev.ext
MyFile.brand1.ext

### DICTIONARIES (MERGEABLE)

Buttons.en-US.dic
Buttons.en-US.brand1.dic
Buttons.es-ES.brand1.dic

Buttons.en-US.dic:

```xml
<Dictionary>
    <Add>Add</Add>
    <Remove>Remove</Remove>
    <Ok>OK {usertitle}</Ok>
    <!--for this message you must provide params: username, usertitle-->
    <OkOrCancel>
        Hi {username}! Are you {.Ok} or {@BaseControls.Cancel}?
    </OkOrCancel>
</Dictionary>
```

Compiled into:

```javascript
{
	items: {
		"Add": "Add",
		"Remove": "Remove",
		"Ok": "OK {usertitle}",
		"OkOrCancel": "Hi {username}! Are you {.Ok} or {#BaseControls.Cancel}?"
	}
}
```

BaseControls.en-US.brand1.dic:

```
<Dictionary>
	<Cancel>Cancel</Cancel>
</Dictionary>
```

Compiled into:

```
{
	"items": {
		"Cancel": "Cancel"
	}
}
```

### STYLES (MERGEABLE, EXTENDABLE)

Skin is applied as class="auto generated classes" to the root native html elements only i.e.:

```xml
<div class="auto generated classes">
	<button />
	<button />
	<button />
</div>
```

OR

```xml
<li class="auto generated classes">one</li>
<li class="auto generated classes">two</li>
<li class="auto generated classes">three</li>
```

MyView.style
MyView.brand1.style
MyView.en-US.brand1.style

MyView.style:

```xml
<Style extends="MyBaseView">
	<border-color value="#aaa" />
  <width>
	<color>
    <!-- Think about conditional setting -->
  </color>
</Style>
```

Compiled into:

```javascript
{
	"extends": "MyBaseView",
	"items": {
		"border-color": "#aaa";
		"color": "vm => vm.isValid ? 'green' : 'red'"
	}
}
```

Style.js:

```javascript
class Style extends Resource {
	parse(definition) {
		// Parses definition and extracts static part and dynamic part (typeof function)
		// remembers dynamic part to call it
	}

	get staticClass() {
	}

	getDynamicClass(vm) {
		// runs dynamic class. If output is the same as previous,
		// returns previous cached value, otherwise generates new
		// dynamic string, caches it and returns
	}
}
```

### THEMES

TBD

### CONTROLS

```xml
<Control as="FromToList">
    <FromToList
        name="roleSelector"
        isDisplayed=".state1"
        isVisible="=shouldDisplay"
        from.items="=items"
        to.items=".selected"
        add.text="@Buttons.add | sex"
        add.extraValue="1"
        remove.text="@Buttons.remove"
        add.template="#Buttons.CustomAddButton"
        to.ListItem.template="CustomListItem"
    >
          <template for="add">
            <div>
                <content />
                <!--Useful for wrapping only-->
            </div>
            OR
            <!--Fully custom template, but not workflow-->
            <button name="btn" value="=extraValue">
                <!--Other data are automatically added -->
                <Children />
            </button>
        </template>
    </FromToList>

    <OnEvent name="SomeEvent">
        <Set />
        <Raise />
        <Run></Run>
    </OnEvent>
    <OnEvent name="roleSelector.add.SomeEvent">
        <Set target="=prop1" value=".prop2" />
        <Raise event="SomeEvent" prop1="=prop1" prop2=".prop2" />
        <Run task="FetchSomething" prop1="=prop1" prop2=".prop2">
            <OnSuccess>
                <Set />
                <Raise />
            </OnSuccess>
            <OnFail>
                <Set />
                <Raise />
            </OnFail>
        </Run>
    </OnEvent>
    <OnChange target="roleSelector.add.text">
        <Set />
        <Raise />
        <Run></Run>
    </OnChange>
</Control>
```

FromToList.view
FromToList.brand1.view
FromToList.brand1.en.view

FromToList.view:

```xml
<Control>
	<div>
		<List name="from" />
		<Button name="add" />
		<Button name="remove" />
		<List name="to" />
	</div>
</Control>
```

Switch:

```xml
TODO
```

For:

```xml
<div>
	<Button value={1} text="Press me"/>
	<Tabs name="users" prop1="{value1}" prop2={value2} prop3={value3}>
		/*these templates implement at the end*/
		<Header.template> <!--[name] for specific instance or View name for all instances-->
			<div>
				<Checkbox ... />
			</div>
		</Header.template>
		<Header.Checkbox.template>
			<div>---</div>
			<Checkbox … />
			<div>---</div>
		</Header.Checkbox.template>
		<Tab.template>
			.......
		</Tab.template>
		<template>
			<Header … />
			<div>---------</div>
			<children … />
			<div>---------</div>
		<template>
		<For name="tabs">
			<Tab>
				<Button name="go"/>
			</Tab>
		</For-tabs>
	</Tabs>
</div>
```

### SERVICES

Can inject another serices.

HttpService - provides many scenarios with requests:

-   like sequential requests
-   parallel requests
-   polling with intervals and specified number of retries
-   optimistic updates with pending statuses
-   etc
-   Returns an empty object with internal promise, so it can be bound to a view, so when promise is resolved, the empty object is populated with data and model is updated and view is refreshed.

### CONVERTERS

classes with "format" and "parse" functions. Can inject dictionaries.

### TASKS

have "run" function and any number of properties. Can inject services and settings.

### SETTINGS (MERGEABLE)

Key/Value pairs like dictionaries but with values of any JSON type and they cannot have replacement parameters and references to other keys or settings.

### PROVIDERS

Provide dictionary definitions, control definitions, style definitions, theme definitions, settings definitions.
Can inject services and settings.

### APPLICATION

class Application {
    static get dictionaryDefinitionProvider() {}
    static get styleDefinitionProvider() {}
    static get themeDefinitionProvider() {}
    static get controlDefinitionProvider() {}
    static get settingsDefinitionProvider() {}

    static get tasks() {}
    static get converters() {}
    static get services() {}
}

index.html -> `<div id="root"></div>`

index.js -> `new MyApplication().run()`
