import { NotValid } from "./errors/not-valid.js";
import { PhoneNumber } from "./phone-number.js";

it("should validate a phone number with exactly 11 digits", () => {
  const phone = "12345678901";

  const isPhoneValid = PhoneNumber.validate(phone);

  expect(isPhoneValid).toBe(true);
});

it("should not be able to create phone number that don't have 11 digits.", () => {
  const phone = "123456";

  const createPhoneNumber = PhoneNumber.create(phone);

  expect(createPhoneNumber).toBeInstanceOf(NotValid);
});

it("should be able to create phone number that have 11 digits.", () => {
  const phone = "12345678901";

  const createPhoneNumber = PhoneNumber.create(phone);

  expect(createPhoneNumber).toBeInstanceOf(PhoneNumber);
});
