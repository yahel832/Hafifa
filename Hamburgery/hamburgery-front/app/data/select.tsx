export const categories = [
  { value: 'matcha', label: 'matcha' },
  { value: 'coffee', label: 'coffee' },
  { value: 'orange', label: 'orange' },
  { value: 'chocolate', label: 'chocolate' },
  { value: 'boba', label: 'boba' }
]

export const possibleDays = [
  { value: 'sunday', label: 'ראשון' },
  { value: 'monday', label: 'שני' },
  { value: 'tuesday', label: 'שלישי' },
  { value: 'wednesday', label: 'רביעי' },
  { value: 'thursday', label: 'חמישי' },
  { value: 'friday', label: 'שישי' },
  { value: 'saturday', label: 'שבת' }
]

export const costumStyles = {
    control: (base: any, state: any) => ({
        ...base,
        border: state.isFocused ? '1px solid #54ac5a' : '1px solid #9e9e9e',
        boxShadow: 'none',
        '&:hover': {
            border: '1px solid #54ac5a',
        },
        height: 25,
        minHeight: 25
    }),
    valueContainer: (base: any) => ({
    ...base,
    height: 17,
    padding: '0 6px',
    }),
    input: (base: any) => ({
        ...base,
        margin: 0,
        padding: 0,
        height: 17
    }),
    indicatorsContainer: (base: any) => ({
        ...base,
        height: 25,
    }),
    dropdownIndicator: (base: any) => ({
        ...base,
        padding: 4,
    }),
};
