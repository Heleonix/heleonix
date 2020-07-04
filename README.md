# Heleonix

Strict and declarative MVVM framework for web sites and web applications.

## Install

## TODO

### IMPLEMENT
	- @heleonix/testing wrapped mocks, auto deep mocks, auto shallow mocks, manual mocks
		○ @heleonix/testing-jasmine
		○ @heleonix/testing-jest
	- Store full path to each view being rendered in the presenter and pass it to an exception if any
	- Review all implementation and implement validation functions which throw exceptions for all components and all cases
	- Use Object.is to compare values in setters of data, property, state decorators

### BINDINGS

```
class Binding {
	source
	target
  sourceItem
  targetItem
	observe(sender, args) {}
}

class PropertyBinding extends Binding {
}
```

### CONTEXT

Context is an object with string values, which splits resources of applications:

```
{
	env: 'dev' // Least specific
	brand: 'brand1',
	culture: 'uk-UK', // Most specific
}
```

In webpack plugins context is specified as below:
[
	env: ["dev", "test", "prod"],
	brand: ["brand1", "brand2", "brand3"],
	culture: ["en-US", "uk-UK"]
]

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

```
<Dictionary>
	<Add>Add</Add>
	<Remove>Remove</Remove>
	<Ok>OK {usertitle}</Ok>
	// for this message you must provide params: username, usertitle
	<OkOrCancel>
		Hi {username}! Are you {.Ok} or {BaseControls.Cancel}?
	</OkOrCancel>
</Dictionary>
```

Compiled into:

```
{
	items: {
		"Add": "Add",
		"Remove": "Remove",
		"Ok": "OK {usertitle}",
		"OkOrCancel": "Hi {username}! Do you {.Ok} or {BaseControls.Cancel}?"
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

Style is applied as class="auto generated classes" to the root native html elements only i.e.:
```
<div class="auto generated classes">
	<button/>
	<button/>
	<button/>
</div>
```

OR

```
<li class="auto generated classes">one</li>
<li class="auto generated classes">two</li>
<li class="auto generated classes">three</li>
```

MyView.style
MyView.brand1.style
MyView.en-US.brand1.style

MyView.style:

```
<Style extends="MyBaseView">
	<border-color value="#aaa" />
  <width>
	<color>
    <!-- Think about conditional setting -->
  </color>
</Style>
```

Compiled into:

```
{
	"extends": "MyBaseView",
	"items": {
		"border-color": "#aaa";
		"color": "vm => vm.isValid ? 'green' : 'red'"
	}
}
```

Style.js:

```
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

### VIEWS

data ans state are not observable and call 'notify' on their view

```
<Page>
…
</Page>

<Partial>
…
</Partial>

<Control as="FromToList">
	<FromToList name="roleSelector"
		from.items="{data.items}"
		to.items="{data.selected}"
		add.text="{texts.add}"
		remove.text="{texts.remove}"
		add.template="CustomAddButton" <!--later-->
		to.ListItem.template="CustomListItem"<!--later-->
	</FromToList>
  
  <OnEvent name="SomeEvent">
  	<Set />
    <Raise />
    <Run></Run>
  </OnEvent>

	<OnEvent name="roleSelector.SomeEvent">
    <Set target="data.prop1" value="{state.prop2}" />
    <Raise event="SomeEvent" prop1="{data.prop1}" prop2="{state.prop2}" />
    <Run task="FetchSomething" prop1="data.prop1" prop2="{state.prop2}" />
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

	<OnChange property="roleSelector.add.text">
		<Set />
    <Raise />
    <Run></Run>
	</OnChange>
  
  <OnChange property="data.prop1">
		<Set />
    <Raise />
    <Run></Run>
	</OnChange>
</View>
```

FromToList.view
FromToList.brand1.view
FromToList.brand1.en.view

FromToList.view:
```
<Partial>
	<div>
		<List name="from" />
		<Button name="add" />
		<Button name="remove" />
		<List name="to" />
	</div>
</Partial>
```

name:
`<[name].template>` will be handled specially
Everything else will be passed into a control and used by the control internally as <children>
```
<!--Deep events and deep properties are defined relatively to an element they're defined on-->
<!--They start deep searching from an element where they're defined-->
<View>
	<Panel Button.clicked={handleClicked} /*deep event*/>
		<FromToList
			from.items={model.items}
			to.items={model.result}
			add.text={texts.add} /*deep property*/
			remove.text={texts.remove}
			added={handleAdded}
			removed={handleRemoved}
			/*templates below implement in the beginning*/
			add.template="CustomAddButton"
			to.ListItem.template="CustomListItem"
		/>
	</Panel>
</View>

CustomFromToList.view
<View>
	<div>
		<List name="from" />
		<Button name="add" click={handleAddClick} />
		<Splitter>
			<div>---------</div>
		</Splitter>
		<Button name="remove" click={handleRemoveClick} />
		<List name="to" />
	</div>
how to auto-spread properties to elements
</View>
```

For:
```
<div>
	<Button value={1} text="Press me"/>
	<Tabs name="users" prop1={value1} prop2={value2} prop3={value3}>
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

Switch:
```
<Switch name="someItems" by="id" OR by={id}>
	<Case value="{data.someValue}">
	</Case>
	<Case value="123">
	</Case>
	<Default>
	</Default>
</Switch>
```

### SERVICES
HttpService - provides many scenarios with requests:
- like sequential requests
- parallel requests
- polling with intervals and specified number of retries
- optimistic updates with pending statuses
- etc
- Returns an empty object with internal promise, so it can be bound to a view, so when promise is resolved, the empty object is populated with data and model is updated and view is refreshed.

### APP STRUCTURE

Controls

Pages

Partials

Services

Styles

Tasks

Templates

Themes

MyApplication.js

index.html -> `<div id="root"></div>`

index.js -> `new MyApplication().run()`
