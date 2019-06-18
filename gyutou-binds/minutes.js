Gyutou.prototype.binds.minutes = {
  input: function(event) {
    const input = event.target;

    this.validateInput(input);

    if (input.value.length > 1) {
      const secondsElement = Array.from(this.inputs).find(input => input.dataset.gyutouFormat === 'seconds');

      secondsElement.focus();
      secondsElement.setSelectionRange(0, 2);
    }
  },

  keydown: function(event) {
    const input = event.target;

    if (!event.metaKey
        && !event.ctrlKey
        && !this.checkKeyAllowed(event.keyCode)) {
      event.preventDefault();
    }

    if (event.keyCode == 39 // Right arrow
        && input.selectionStart == input.value.length) {
      this.inputs[1].focus();
    }

    // Check if the value of minutes is too long
    if (input.selectionStart === input.selectionEnd
        && event.target.value.length > 1
        && this.checkKeyNumeric(event.keyCode)) {
      // Focus and insert character into seconds input field
      const secondsElement = Array.from(this.inputs).find(input => input.dataset.gyutouFormat === 'seconds');

      secondsElement.focus();
      secondsElement.setSelectionRange(0, 2);
    }
  },

  blur: function(event) {
    if (event.target.value.length == 1) {
      event.target.value = event.target.value.toString().padStart(2, '0');
    }
  }
};
