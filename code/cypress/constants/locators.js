const EXCLUDING_PAPER_TAPE_MODAL_ELEMENTS =
  ':not([class^="react-draggable"] button:nth-of-type(1))';
const PAPER_TAPE_MODAL = '[class="react-draggable"]';

export const LocatorConstants = {
  PREVIOUSLY_DISPLAYED_VALUE: '[class="previous"]',
  DISPLAYED_VALUE: '[class="current"]',
  ALL_KEYS: `button${EXCLUDING_PAPER_TAPE_MODAL_ELEMENTS}`,
  LEFT_PARENTHESIS_KEY: `button:nth-of-type(1)${EXCLUDING_PAPER_TAPE_MODAL_ELEMENTS}`,
  RIGHT_PARENTHESIS_KEY: "button:nth-of-type(2)",
  MEMORY_CLEAR_KEY: "button:nth-of-type(3)",
  ADD_MEMORY_KEY: "button:nth-of-type(4)",
  SUBTRACT_FROM_MEMORY_KEY: "button:nth-of-type(5)",
  RECALL_MEMORY_KEY: "button:nth-of-type(6)",
  RECALL_MEMORY_KEY_WHEN_SELECTED: 'button:nth-of-type(6)[class="selected"]',
  RECALL_MEMORY_KEY_NOT_SELECTED:
    'button:nth-of-type(6):not([class="selected"])',
  CLEAR_KEY: "button:nth-of-type(7)",
  GENERIC_KEY_LOCATOR_TO_SELECT_BY_GIVEN_TEXT: "button",
  GENERIC_KEY_LOCATOR_NTH_OF_TYPE: "button:nth-of-type",
  TOGGLE_POSITIVE_NEGATIVE_KEY: "button:nth-of-type(8)",
  PERCENTAGE_KEY: "button:nth-of-type(9)",
  DIVISION_KEY: "button:nth-of-type(10)",
  DIVISION_KEY_WHEN_SELECTED: 'button:nth-of-type(10)[class="op-select"]',
  DIVISION_KEY_NOT_SELECTED: 'button:nth-of-type(10):not([class="op-select"])',
  SHIFT_KEY: "button:nth-of-type(11)",
  SHIFT_KEY_WHEN_SELECTED: 'button:nth-of-type(11)[class="selected"]',
  SHIFT_KEY_NOT_SELECTED: 'button:nth-of-type(11):not([class="selected"])',
  SQUARE_KEY: "button:nth-of-type(12)",
  CUBE_KEY: "button:nth-of-type(13)",
  VARIABLE_EXPONENT: "button:nth-of-type(14)",
  X_TO_THE_POWER_OF_Y: "button:nth-of-type(14)",
  X_TO_THE_POWER_OF_Y_WHEN_SELECTED: 'button:nth-of-type(14)[class="selected"]',
  X_TO_THE_POWER_OF_Y_NOT_SELECTED:
    'button:nth-of-type(14):not([class="selected"])',
  Y_TO_THE_POWER_OF_X: "button:nth-of-type(15)",
  Y_TO_THE_POWER_OF_X_WHEN_SELECTED: 'button:nth-of-type(15)[class="selected"]',
  Y_TO_THE_POWER_OF_X_NOT_SELECTED:
    'button:nth-of-type(15):not([class="selected"])',
  E_TO_THE_POWER_OF: "button:nth-of-type(15)",
  TEN_TO_THE_POWER_OF: "button:nth-of-type(16)",
  TWO_TO_THE_POWER_OF: "button:nth-of-type(16)", // SHIFTED
  SEVEN_KEY: "button:nth-of-type(17)",
  EIGHT_KEY: "button:nth-of-type(18)",
  NINE_KEY: "button:nth-of-type(19)",
  MULTIPLICATION_KEY: "button:nth-of-type(20)",
  MULTIPLICATION_KEY_WHEN_SELECTED: 'button:nth-of-type(20)[class="op-select"]',
  MULTIPLICATION_KEY_NOT_SELECTED:
    'button:nth-of-type(20):not([class="op-select"])',
  INVERSE_KEY: "button:nth-of-type(21)",
  REMOVE_THE_INDEX_2_RADICAL: "button:nth-of-type(22)",
  REMOVE_THE_INDEX_3_RADICAL: "button:nth-of-type(23)",
  RAISE_TO_USER_ENTERED_POWER: "button:nth-of-type(24)",
  NATURAL_LOGARITHM_KEY: "button:nth-of-type(25)",
  BASE_TEN_LOGARITHM_KEY: "button:nth-of-type(26)",
  BASE_TWO_LOGARITHM_KEY: "button:nth-of-type(26)", // SHIFTED
  FOUR_KEY: "button:nth-of-type(27)",
  FIVE_KEY: "button:nth-of-type(28)",
  SIX_KEY: "button:nth-of-type(29)",
  SUBTRACTION_KEY: "button:nth-of-type(30)",
  SUBTRACTION_KEY_WHEN_SELECTED: 'button:nth-of-type(30)[class="op-select"]',
  SUBTRACTION_KEY_NOT_SELECTED:
    'button:nth-of-type(30):not([class="op-select"])',
  FACTORIAL_KEY: "button:nth-of-type(31)",
  SINE_KEY: "button:nth-of-type(32)",
  INVERSE_SINE_KEY: "button:nth-of-type(32)", // SHIFTED
  COSINE_KEY: "button:nth-of-type(33)",
  INVERSE_COSINE_KEY: "button:nth-of-type(33)", // SHIFTED
  TANGENT_KEY: "button:nth-of-type(34)",
  INVERSE_TANGENT_KEY: "button:nth-of-type(34)", // SHIFTED
  E_KEY: "button:nth-of-type(35)",
  EXPONENTIAL_NOTATION_KEY: "button:nth-of-type(36)",
  ONE_KEY: "button:nth-of-type(37)",
  TWO_KEY: "button:nth-of-type(38)",
  THREE_KEY: "button:nth-of-type(39)",
  ADDITION_KEY: "button:nth-of-type(40)",
  ADDITION_KEY_WHEN_SELECTED: 'button:nth-of-type(40)[class="op-select"]',
  ADDITION_KEY_NOT_SELECTED: 'button:nth-of-type(40):not([class="op-select"])',
  TOGGLE_MEASUREMENT_KEY: "button:nth-of-type(41)",
  HYPERBOLIC_SINE_KEY: "button:nth-of-type(42)",
  INVERSE_HYPERBOLIC_SINE_KEY: "button:nth-of-type(42)", // SHIFTED
  HYPERBOLIC_COSINE_KEY: "button:nth-of-type(43)",
  INVERSE_HYPERBOLIC_COSINE_KEY: "button:nth-of-type(43)", // SHIFTED
  HYPERBOLIC_TANGENT_KEY: "button:nth-of-type(44)",
  INVERSE_HYPERBOLIC_TANGENT_KEY: "button:nth-of-type(44)", // SHIFTED
  PI_KEY: "button:nth-of-type(45)",
  RANDOM_KEY: "button:nth-of-type(46)",
  ZERO_KEY: "button:nth-of-type(47)",
  DECIMAL_KEY: "button:nth-of-type(48)",
  EQUALS_KEY: "button:nth-of-type(49)",
  CALCULATOR: '[class="calculator-grid"]',
  MEASUREMENT_DISPLAY: '[class="measurement"]',
  DOCUMENT_BODY: "body",
  PAPER_TAPE_MODAL,
  X_TO_CLOSE_PAPER_TAPE: `[class="close"]`,
  PAPER_TAPE_CONTENT: `[class="modal-content"]`,
  PAPER_TAPE_CLEAR: `${PAPER_TAPE_MODAL} button`,
  PAPER_TAPE_MODAL_WHEN_PRESENT:
    '[class^="react-draggable"][style*="display: block"]',
  PAPER_TAPE_MODAL_WHEN_NOT_PRESENT:
    '[class^="react-draggable"][style*="display: none"]',
};
