# Simple React Form Handler

Use `<form>` and receive values on submit.

## How to use

Install the package: `npm i simple-react-form-handler` or `yarn add simple-react-form-handler`

1. Add conguration in your package.json

```js
const FunctionA = () => {
  const onSubmit = async (formData) => {
      console.log({formData});
      // should print { "first-name": "the value that you type" }
  }
  return (
    <FormHandler onSubmit={onSubmit} className="css-classes">
      <input name="first-name"/>
    </FormHandler>
  )
}
```
