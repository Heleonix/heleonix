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

```javascript
[
    // Most specific
    {
        "name": "culture",
        "values": ["en-US", "uk-UK"],
    },
    {
        "name": "customer",
        "values": ["customer1", "customer2", "customer3"],
    },
    {
        "name": "env",
        "values": ["dev", "test", "prod"],
    }
    // Least specific
]
```

Context-specific files are named in format:

MyFile.ext
MyFile.uk-UK.customer1.dev.ext
MyFile.uk-UK.ext
MyFile.dev.ext
MyFile.customer1.ext

### DICTIONARIES (MERGEABLE)

Buttons.en-US.hxd
Buttons.en-US.customer1.hxd
Buttons.en-GB.customer1.hxd

Buttons.en-US.customer2.test.hxd:

```xml
<Dictionary>
    <Add>Add</Add>
    <Remove>Remove</Remove>
    <Ok>OK {usertitle}</Ok>
    <!--for this message you must provide params: username, usertitle-->
    <OkOrCancel>
        Hi {username}! Are you {@Ok} or {@BaseControls.Cancel}?
    </OkOrCancel>
</Dictionary>
```

Compiled into:

```json
{
    "name": "Buttons",
    "context": {
        "culture": "en-US",
        "customer": "customer2",
        "env": "test"
    },
    "items": {
        "Add": "Add",
        "Remove": "Remove",
        "Ok": "OK {usertitle}",
        "OkOrCancel": "Hi {username}! Are you {@Ok} or {@BaseControls.Cancel}?"
    }
}
```

Have methods:

-   setup(definition), like components
-   getValue(key, args)

### CONFIGS (MERGEABLE): *.hxc

Key/Value pairs like dictionaries but with values of any JSON type and they cannot have replacement parameters and references to other keys or configs.

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

MyComponent.hxs
MyComponent.customer1.hxs
MyComponent.en-US.customer1.hxs

MyComponent.hxs:

```xml
<Style>
	<border-color value="$primary" />
    <background-color value="myProp" />
    <OnUpdating property="myProp">
        <padding value="10px" />
    <OnUpdating />
    <OnAdding property="">
    </OnAdding>
    ...
    <OnRaising event="someEvent">
        <color value="someEvent.someVslue" />
    </OnRaising>
    <If property="isInvalid">
    </If>
    <!---->
    <Style name="descendant.component.name">
        <color value="#123" />
    </Style>
    <!-- All descendant buttons in this component. Works as Template -->
    <Style name="CustomCmpnt.Button">
        <color value="#123" />
    </Style>
</Style>
```

Compiled into:

```json
{
	"items": {
		"border-color": "$primary",
	}
}
```

Style.js:

### THEMES: *.hxt

TBD


### TEMPLATES: *.hxm

```xml
<!--CustomAddButton-->
<Template>
    <div>
        <button />
    </div>
    <OnUpdating property="extraValueForCustomComponents" name="handleUpdate">
        ...
    </OnUpdating>
</Template>

<Template>
    <FromToList name="roleSelector"
        isReadonly="#UIConfig.isReadonly | converter1"
        from2.items="availableItems"
        from2.Item.Template=""
        to.items="selectedItems"
        add.Template="@MyTemplates.CustomAddButton - for exactly the control with the 'add' name"
        Button.Template="@MyTemplates.CustomAddButton - for all descendant buttons in this component. If there is a control with name 'Button' and Button component, handle it as an error"
        subControlName.Button.Template="@MyTemplates.CustomAddButton - for all buttons in the 'subControlName' component"
        add.text="@Buttons.add | converter1"
        add.extraValueForCustomComponents="extraValue"
    >
        <from.Template>
            <div><List name="from2"/></div>
        </from.Template>
        <Button.Template></Button.Template>
    </FromToList>
    <OnAdding property="roleSelector.from.items" name="doSomethingOnAdding">
        <Update property="roleSelector.prop1" value="roleSelector.add.prop2" />
        <Add />
        <Remove />
        <Move />
        <Raise event="someEvent" />
        <Execute action="FetchSomething" prop1="prop1" prop2="prop2" prop3="prop3" />
    </OnAdding>
    <OnRaising event="roleSelector.add.click" name="handleAdding">
        <!--...-->
    </OnRaising>
</Template>
```

FromToList.hxm:

```xml
<Template>
	<div>
		<List name="from" />
		<Button name="add" />
		<Button name="remove" />
		<List name="to" />
	</div>
</Template>
```

Switch:

```xml
TODO
```

If:

```xml
TODO
```

List:

```xml
<div>
	<List name="myUsers" items="users" key="id" extraProperty="extraValue" Item.template="@Templates.CustomListItem" />
</div>

<!--CustomListItem: Dynamic name is the value of the key or 0, 1, 2 etc for getting/setting properties via myUsers.0.btn-
every item has 'key' and spread item's properties
->
<Template>
    <button name="key" value="extraProperty">someUserData</button>
</Template>
```

### SERVICES

Can inject other services.

HttpService - provides many scenarios with requests:

-   sequential requests
-   parallel requests
-   polling with intervals and specified number of retries
-   optimistic updates with pending statuses
-   etc
-   Returns an empty object with internal promise, so it can be bound to a view, so when promise is resolved, the empty object is populated with data and model is updated and view is refreshed.

### CONVERTERS

classes with "format", "parse", getDictionary(dictionaryName, keyName, ...args), getConfig(...) functions.

### ACTIONS

have "execute" function and an object with all passed properties
have getConfig(name, key) function.
Can inject services.

### PROVIDERS

Provide dictionary definitions, component definitions, style definitions, theme definitions, configs definitions (in yhis case a config to fetch other configs needs to be available earlier, i.e. defined at compile time).
Can inject services.
have getConfig(name, key) function.

index.html -> `<div id="root"></div>`

index.js -> `new MyApplication().run()`
