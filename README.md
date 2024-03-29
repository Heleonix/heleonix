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

```json
{
    "env": "dev",
    "customer": "customer1",
    "culture": "uk-UK"
}
```

In webpack plugins context is specified as below:

```json
[
    // Least specific
    {
        "name": "env",
        "values": ["dev", "test", "prod"],
    },
    {
        "name": "customer",
        "values": ["customer1", "customer2", "customer3"],
    },
    {
        "name": "culture",
        "values": ["en-US", "uk-UK"],
    },
    // Most specific
];
```

Context-specific files are named in format:

MyFile.ext
MyFile.uk-UK.customer1.dev.ext
MyFile.uk-UK.ext
MyFile.dev.ext
MyFile.customer1.ext

### DICTIONARIES (MERGEABLE)

Buttons.en-US.dic
Buttons.en-US.customer1.dic
Buttons.es-ES.customer1.dic

Buttons.test.customer2.en-US.dic:

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

```json
{
    "name": "Buttons",
    "context": {
        "env": "test",
        "customer": "customer1",
        "culture": "en-US"
    },
    "items": {
        "Add": "Add",
        "Remove": "Remove",
        "Ok": "OK {usertitle}",
        "OkOrCancel": "Hi {username}! Are you {.Ok} or {#BaseControls.Cancel}?"
    }
}
```

Have methods:

-   setup(definition), like controls
-   getValue(key, args)

### SETTINGS (MERGEABLE)

Key/Value pairs like dictionaries but with values of any JSON type and they cannot have replacement parameters and references to other keys or settings.

### STYLES (MERGEABLE, EXTENDABLE)

Style is applied as class="auto generated classes" to the root native html elements only, i.e.:

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
MyView.customer1.style
MyView.en-US.customer1.style

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

```json
{
	"extends": "MyBaseView",
	"items": {
		"border-color": "#aaa";
		"color": "vm => vm.isValid ? 'green' : 'red'"
	}
}
```

Style.js:

### THEMES

TBD

### CONTROLS

````xml
<!--CustomAddButton-->
<Control>
    <div>
        <button />
    </div>
    <OnChanging property="extraValueForCustomControls=" name="handleChanging">
        ...
    </OnChanging>
</Control>

<Control>
    <FromToList name="roleSelector"
        isReadonly="settings.UIConfig.isReadonly | converter1"
        from.items="availableItems"
        from.items.Item.template=""
        to.items="selectedItems"
        add.template="dictionaries.MyTemplates.CustomAddButton - for exactly the control with the 'add' name"
        Button.template="dictionaries.MyTemplates.CustomAddButton - for all buttons in this control. If there is a control with name 'Button' and Button control, handle it as an error"
        subControlName.Button.template="dictionaries.MyTemplates.CustomAddButton - for all buttons in the 'subControlName' control"
        add.text="dictionaries.Buttons.add | converter1"
        add.extraValueForCustomControls="extraValue"
    />
    <OnAdding property="roleSelector.from.items" name="doSomethingOnAdding">
        <Update property="roleSelector.prop1" value="roleSelector.add.prop2" />
        <Add />
        <Remove />
        <Move />
        <Raise event="someEvent" />
        <Call task="FetchSomething" prop1="prop1" prop2="prop2" prop3="prop3" />
    </OnAdding>
    <OnRaising event="add.clicked" name="doSomethingOnClicked">
        <!--...-->
    </OnRaising>
</Control>



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
````

Switch:

```xml
TODO
```

When:

```xml
TODO
```

List:

```xml
<div>
	<List name="myUsers" for="users" by="id" extraProperty="extraValue" Item.template="Dictionaries.Templates.CustomListItem" />
</div>

<!--CustomListItem: Dynamic name is [0], [1], [2] etc for getting/setting properties via myUsers.[0].id-->
<Control>
    <button name="id" value="extraProperty">item.id</button>
</Control>
```

### SERVICES

Can inject another services.

HttpService - provides many scenarios with requests:

-   sequential requests
-   parallel requests
-   polling with intervals and specified number of retries
-   optimistic updates with pending statuses
-   etc
-   Returns an empty object with internal promise, so it can be bound to a view, so when promise is resolved, the empty object is populated with data and model is updated and view is refreshed.

### CONVERTERS

classes with "format", "parse", getDictionary(dictionaryName, keyName, ...args), getSetting(...) functions.

### TASKS

have "run" function and any number of properties.
have getSetting(settingName, settingKey) function.
Can inject services.

### PROVIDERS

Provide dictionary definitions, control definitions, style definitions, theme definitions, settings definitions.
Can inject services.
have getSetting(settingName, settingKey) function.

index.html -> `<div id="root"></div>`

index.js -> `new MyApplication().run()`
