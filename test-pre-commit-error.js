// This file has a linting error
const badVariable = 'this will fail linting due to var instead of const';
if (badVariable) {
  console.log(badVariable);
}
