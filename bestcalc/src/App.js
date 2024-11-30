import "./style.css";
import { useReducer } from "react";

const ACTION = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  CLEAR: "clear",
  DELETE_DIGIT: "delete",
  EVALUATE: "evaluate",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTION.ADD_DIGIT:
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTION.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTION.CLEAR:
      return {};
    case ACTION.DELETE_DIGIT:
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return { ...state, currentOperand: null };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case ACTION.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    default:
      return state;
  }
}

function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;
    case "-":
      computation = prev - current;
      break;
    case "*":
      computation = prev * current;
      break;
    case "/":
      computation = prev / current;
      break;
    default:
      return;
  }
  return computation.toString();
}

const initialState = {
  currentOperand: "",
  previousOperand: "",
  operation: null,
};

function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div className="Calculator-grid">
      <div className="Output">
        <div className="previousOperand">
          {previousOperand} {operation}
        </div>
        <div className="currentOperand">{currentOperand}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTION.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: ACTION.DELETE_DIGIT })}>
        DEL
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTION.CHOOSE_OPERATION,
            payload: { operation: "/" },
          })
        }
      >
        /
      </button>
      <button
        onClick={() =>
          dispatch({ type: ACTION.ADD_DIGIT, payload: { digit: 1 } })
        }
      >
        1
      </button>
      <button
        onClick={() =>
          dispatch({ type: ACTION.ADD_DIGIT, payload: { digit: 2 } })
        }
      >
        2
      </button>
      <button
        onClick={() =>
          dispatch({ type: ACTION.ADD_DIGIT, payload: { digit: 3 } })
        }
      >
        3
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTION.CHOOSE_OPERATION,
            payload: { operation: "*" },
          })
        }
      >
        *
      </button>
      <button
        onClick={() =>
          dispatch({ type: ACTION.ADD_DIGIT, payload: { digit: 4 } })
        }
      >
        4
      </button>
      <button
        onClick={() =>
          dispatch({ type: ACTION.ADD_DIGIT, payload: { digit: 5 } })
        }
      >
        5
      </button>
      <button
        onClick={() =>
          dispatch({ type: ACTION.ADD_DIGIT, payload: { digit: 6 } })
        }
      >
        6
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTION.CHOOSE_OPERATION,
            payload: { operation: "+" },
          })
        }
      >
        +
      </button>
      <button
        onClick={() =>
          dispatch({ type: ACTION.ADD_DIGIT, payload: { digit: 7 } })
        }
      >
        7
      </button>
      <button
        onClick={() =>
          dispatch({ type: ACTION.ADD_DIGIT, payload: { digit: 8 } })
        }
      >
        8
      </button>
      <button
        onClick={() =>
          dispatch({ type: ACTION.ADD_DIGIT, payload: { digit: 9 } })
        }
      >
        9
      </button>
      <button
        onClick={() =>
          dispatch({
            type: ACTION.CHOOSE_OPERATION,
            payload: { operation: "-" },
          })
        }
      >
        -
      </button>
      <button
        onClick={() =>
          dispatch({ type: ACTION.ADD_DIGIT, payload: { digit: "." } })
        }
      >
        .
      </button>
      <button
        onClick={() =>
          dispatch({ type: ACTION.ADD_DIGIT, payload: { digit: 0 } })
        }
      >
        0
      </button>
      <button
        className="span-two"
        onClick={() => dispatch({ type: ACTION.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
