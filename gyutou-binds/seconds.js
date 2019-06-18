Gyutou.prototype.binds.seconds = {
  input: function(event) {
    const input = event.target;

    this.validateInput(input);
  },

  keydown: function(event) {
    const input = event.target;

    if (!event.metaKey
      && !event.ctrlKey
      && !this.checkKeyAllowed(event.keyCode)) {
      event.preventDefault();
    }

    // Backspace
    if (event.keyCode == 8
        && input.selectionStart == 0
        && input.selectionStart == input.selectionEnd) {
      this.inputs[0].focus();
    }

    // Left arrow
    if (event.keyCode == 37
        && input.selectionStart == 0) {
      this.inputs[0].focus();
    }
  },

  blur: function(event) {
    if (event.target.value.length == 1) {
      event.target.value = event.target.value.toString().padStart(2, '0');
    }

    const minutesElement = Array.from(this.inputs).find(input => input.dataset.gyutouFormat === 'minutes');


    setTimeout(() => {
      if (document.activeElement === minutesElement) {
        return;
      }

      minutesElement.value = minutesElement.value || '00';

      minutesElement.blur();

      if (minutesElement.value !== '00') {
        event.target.value = event.target.value || '00';
      }
    }, 1);
  }
};
