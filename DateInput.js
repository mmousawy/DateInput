class DateInput
{
  constructor(options = null)
  {
    // Define callback of input formats
    this.inputCallbacks = {
      minutes: (event) => {
        const input = event.target;

        this.validateInput(input);

        if (input.value.length > 1) {
          this.inputs[1].focus();
          this.inputs[1].setSelectionRange(0, 2);
        }
      },
      seconds: (event) => {
        const input = event.target;

        this.validateInput(input);
      }
    };

    // Define callback of keydown event on inputs
    this.keydownCallbacks = {
      minutes: (event) => {
        if (!event.metaKey
            && !this.checkKeyAllowed(event.keyCode)) {
          event.preventDefault();
        }

        const input = event.target;

        // Check if the value of minutes is too long
        if (input.selectionStart === input.selectionEnd
            && event.target.value.length > 1
            && this.checkKeyNumeric(event.keyCode)) {
          // Focus and insert character into seconds input field
          this.inputs[1].focus();
        }
      },
      seconds: (event) => {
        const input = event.target;

        if (!event.metaKey
          && !this.checkKeyAllowed(event.keyCode)) {
          event.preventDefault();
        }

        // Backspace
        if (event.keyCode == 8
            && input.value.length == 0) {
          this.inputs[0].focus();
        }
      }
    };

    this.blurCallbacks = {
      minutes: (event) => {
        if (event.target.value.length == 1) {
          event.target.value = event.target.value.toString().padStart(2, '0');
        }
      },
      seconds: (event) => {
        if (event.target.value.length == 1) {
          event.target.value = event.target.value.toString().padStart(2, '0');
        }
      }
    }

    // Check options attribute is provided and has content
    if (!options
        || Object.keys(options).length < 1) {
      console.warn('DateInput: options not provided');
    }

    this.inputs = document.querySelectorAll(options.selector);
    this.bindEvents();
  }

  bindEvents()
  {
    // Loop through inputs and bind events
    this.inputs.forEach(input => {
      if (!input.dataset.dateInputFormat) {
        console.warn('DateInput: input does not have attribute "data-date-input-format" defined: ', input);
        return;
      }

      if (!this.inputCallbacks.hasOwnProperty(input.dataset.dateInputFormat)) {
        console.warn(`DateInput: "${input.dataset.dateInputFormat}" does not correspond to a formatCallback.
        Defined callbacks: ${Object.keys(this.inputCallbacks)}`);
        return;
      }

      // Bind the callbacks to the input
      input.addEventListener('input', this.inputCallbacks[input.dataset.dateInputFormat]);
      input.addEventListener('keydown', this.keydownCallbacks[input.dataset.dateInputFormat]);
      input.addEventListener('blur', this.blurCallbacks[input.dataset.dateInputFormat]);
    });
  }

  checkKeyAllowed(keyCode)
  {
    return (
      // Key is backspace
      keyCode === 8

      // Key is tab
      || keyCode === 9

      // Alt key
      || keyCode === 18

      // Delete key
      || keyCode === 46

      // Key is arrow key
      || (keyCode >= 37
          && keyCode <= 40)

      // Key is number
      || (keyCode >= 47
          && keyCode <= 58)

      // Key is number on keypad
      || (keyCode >= 96
          && keyCode <= 105)
    );
  }

  checkKeyNumeric(keyCode)
  {
    // Check if input is a number (0-9 on keyboard)
    return (
      // Key is number
      (keyCode >= 47
          && keyCode <= 58)

      // Key is number on keypad
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

    console.log(input.value);

    value = Math.max(0, Math.min(value, 59));

    if (input.value[0] == '0' && input.value.length > 1) {
      input.value = '0' + value;
    } else {
      input.value = value;
    }
  }
}
