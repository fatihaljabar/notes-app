export const customValidationHeadingHandler = (event) => {
  event.target.setCustomValidity(''); // Reset validasi awal

  if (event.target.validity.valueMissing) {
    event.target.setCustomValidity('Wajib diisi.');
    return;
  }

  if (event.target.validity.tooShort) {
    event.target.setCustomValidity('Minimal panjang adalah tiga karakter.');
    return;
  }

  if (event.target.validity.patternMismatch) {
    event.target.setCustomValidity(
      'Tidak boleh diawali dengan simbol,\n\
        mengandung white space atau spasi, dan\n\
        mengandung karakter spesial seperti dolar ($).'
    );
    return;
  }
};
