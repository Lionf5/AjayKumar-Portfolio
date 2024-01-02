import ComboBoxInputSdk from '../components/ComboBoxInput/corvid/ComboBoxInput.corvid';
import CheckboxSdk from '@wix/thunderbolt-elements/src/components/Checkbox/corvid/Checkbox.corvid';
import CheckboxGroupSdk from '@wix/thunderbolt-elements/src/components/CheckboxGroup/corvid/CheckboxGroup.corvid';
import DatePickerSdk from '@wix/thunderbolt-elements/src/components/DatePicker/corvid/DatePicker.corvid';
import FormContainerSdk from '@wix/thunderbolt-elements/src/components/FormContainer/corvid/FormContainer.corvid';
import RadioGroupSdk from '@wix/thunderbolt-elements/src/components/RadioGroup/corvid/RadioGroup.corvid';
import TextAreaInputSdk from '@wix/thunderbolt-elements/src/components/TextAreaInput/corvid/TextAreaInput.corvid';
import TextInputSdk from '@wix/thunderbolt-elements/src/components/TextInput/corvid/TextInput.corvid';


const ComboBoxInput = {
  sdk: ComboBoxInputSdk
};

const Checkbox = {
  sdk: CheckboxSdk
};

const CheckboxGroup = {
  sdk: CheckboxGroupSdk
};

const DatePicker = {
  sdk: DatePickerSdk
};

const FormContainer = {
  sdk: FormContainerSdk
};

const RadioGroup = {
  sdk: RadioGroupSdk
};

const TextAreaInput = {
  sdk: TextAreaInputSdk
};

const TextInput = {
  sdk: TextInputSdk
};


export const components = {
  ['ComboBoxInput']: ComboBoxInput,
  ['Checkbox']: Checkbox,
  ['CheckboxGroup']: CheckboxGroup,
  ['DatePicker']: DatePicker,
  ['FormContainer']: FormContainer,
  ['RadioGroup']: RadioGroup,
  ['TextAreaInput']: TextAreaInput,
  ['TextInput']: TextInput
};

