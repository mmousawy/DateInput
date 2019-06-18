class Gyutou
{
  constructor(options = null)
  {
    // Check options attribute is provided and has content
    if (!options
        || Object.keys(options).length < 1) {
      console.warn(`${this.constructor.name}: options not provided`);
    }

    this.inputs = document.querySelectorAll(options.selector);
  }

  bindEvents()
  {
    // Loop through inputs and bind events
    this.inputs.forEach(input => {
      if (!input.dataset.gyutouFormat) {
        console.warn(`${this.constructor.name}: input does not have attribute "data-gyutou-format" defined:`, input);
        return;
      }

      if (!this.binds.hasOwnProperty(input.dataset.gyutouFormat)) {
        console.warn(`Gyutou: "${input.dataset.gyutouFormat}" does not correspond to a format for input:`, input, `Available formats: "${Object.keys(this.binds).join('", "')}"`);
        return;
      }

      // Bind the corresponding callbacks to the input
      Object.keys(this.binds[input.dataset.gyutouFormat]).forEach(eventName => {
        const boundCallback = this.binds[input.dataset.gyutouFormat][eventName].bind(this);
        input.addEventListener(eventName, boundCallback);
      });
    });
  }

  checkKeyAllowed(keyCode)
  {
    return (
      // Backspace
      keyCode === 8

      // Tab
      || keyCode === 9

      // Alt
      || keyCode === 18

      // Delete
      || keyCode === 46

      // Arrow
      || (keyCode >= 37
          && keyCode <= 40)

      // Number
      || (keyCode >= 47
          && keyCode <= 58)

      // Number on keypad
      || (keyCode >= 96
          && keyCode <= 105)
    );
  }

  checkKeyNumeric(keyCode)
  {
    // Check if input is a number (0-9 on keyboard)
    return (
      // Number
      (keyCode >= 47
          && keyCode <= 58)

      // Number on keypad
      || (keyCode >= 96
          && keyCode <= 105)
    );
  }

  validateInput(input)
  {
    const valid = input.checkValidity();
    let value = parseInt(input.value);

    // Attempt to fix input value if not valid
    if (isNaN(value)) {
      return false;
    }

    value = Math.max(0, Math.min(value, 59));

    if (input.value[0] == '0' && input.value.length > 1) {
      input.value = '0' + value;
    } else {
      input.value = value;
    }
  }
}

Gyutou.prototype.binds = {};
